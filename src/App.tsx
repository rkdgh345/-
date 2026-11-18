import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  FileSearch,
  Info,
  Layers,
  Zap,
} from 'lucide-react';
import {
  POWER_TERMS,
  QUIZ_QUESTIONS,
  QUIZ_TRACKS,
  QuizQuestion,
  QuizTrack,
  WrongNoteEntry,
} from './data/powerTerms';
import { QuizSessionView } from './components/QuizSessionView';
import { GlossaryView } from './components/GlossaryView';
import { WrongNotesView } from './components/WrongNotesView';
import { ContextDetectorView } from './components/ContextDetectorView';
import { TermDetailModal } from './components/TermDetailModal';
import { CompanionSidebar } from './components/CompanionSidebar';

type ActiveTab = 'quiz' | 'glossary' | 'wrong-notes' | 'detector';

const BOOKMARKS_KEY = 'power_term_notes_bookmarks_v1';
const WRONG_NOTES_KEY = 'power_term_notes_wrong_v1';

function buildQuestionFromTerm(termId: string): QuizQuestion | null {
  const authored = QUIZ_QUESTIONS.find((q) => q.termId === termId);
  if (authored) return authored;

  const target = POWER_TERMS.find((t) => t.id === termId);
  if (!target) return null;

  const distractors = POWER_TERMS.filter((t) => t.id !== termId).slice(0, 3);
  const options = [
    {
      id: `opt-${target.id}`,
      label: target.acronym
        ? `${target.termKr} (${target.acronym})`
        : target.termKr,
    },
    ...distractors.map((d) => ({
      id: `opt-${d.id}`,
      label: d.acronym ? `${d.termKr} (${d.acronym})` : d.termKr,
      wrongReason: `${d.termKr}${d.acronym ? `(${d.acronym})` : ''}은(는) "${d.summary}"를 의미하므로 질문의 설명과는 다른 개념입니다.`,
    })),
  ];

  // Deterministic rotation based on termId length so correct answer isn't always option 1
  const shift = target.id.length % options.length;
  const rotated = [...options.slice(shift), ...options.slice(0, shift)];

  return {
    id: `gen-${target.id}`,
    termId: target.id,
    termLabel: target.termKr,
    category: target.category,
    difficulty: target.difficulty,
    question: `다음 설명에 해당하는 전력·에너지 핵심 용어는 무엇일까요? "${target.summary}"`,
    options: rotated,
    correctOptionId: `opt-${target.id}`,
    correctExplanation: target.detailedExplanation,
    highlightPhrase: target.termKr,
    sourceLabel: target.source,
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('glossary');
  const [previousTab, setPreviousTab] = useState<ActiveTab>('quiz');

  const [activeTrack, setActiveTrack] = useState<QuizTrack>(QUIZ_TRACKS[0]);
  const [customQuestions, setCustomQuestions] = useState<QuizQuestion[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answersRecord, setAnswersRecord] = useState<
    Record<string, { selectedOptionId: string; isCorrect: boolean }>
  >({});

  const [detailTermId, setDetailTermId] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState(false);
  const [showMobileTracks, setShowMobileTracks] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(BOOKMARKS_KEY);
      return raw ? JSON.parse(raw) : ['reserve-margin', 'smp'];
    } catch {
      return ['reserve-margin', 'smp'];
    }
  });

  const [wrongNotes, setWrongNotes] = useState<WrongNoteEntry[]>(() => {
    try {
      const raw = localStorage.getItem(WRONG_NOTES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(WRONG_NOTES_KEY, JSON.stringify(wrongNotes));
    } catch {
      // Ignore storage quota errors
    }
  }, [wrongNotes]);

  const activeQuestions = useMemo(() => {
    if (customQuestions && customQuestions.length > 0) return customQuestions;
    return activeTrack.questionIds
      .map((id) => QUIZ_QUESTIONS.find((q) => q.id === id))
      .filter((q): q is QuizQuestion => Boolean(q));
  }, [activeTrack, customQuestions]);

  const navigateTab = (tab: ActiveTab) => {
    if (tab !== activeTab) {
      setPreviousTab(activeTab);
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectTrack = (track: QuizTrack) => {
    setCustomQuestions(null);
    setActiveTrack(track);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setAnswersRecord({});
    setShowMobileTracks(false);
    navigateTab('quiz');
  };

  const handleStartCustomQuiz = (termIds: string[], title: string) => {
    const built = termIds
      .map((id) => buildQuestionFromTerm(id))
      .filter((q): q is QuizQuestion => Boolean(q));
    if (built.length === 0) return;

    setActiveTrack({
      id: 'custom-detected',
      title,
      subtitle: `${built.length}개 검출 용어 맞춤 학습`,
      badgeLabel: title,
      questionIds: built.map((q) => q.id),
    });
    setCustomQuestions(built);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setAnswersRecord({});
    navigateTab('quiz');
  };

  const handleSelectOption = (question: QuizQuestion, optionId: string) => {
    if (selectedOptionId !== null) return;
    setSelectedOptionId(optionId);

    const isCorrect = optionId === question.correctOptionId;
    setAnswersRecord((prev) => ({
      ...prev,
      [question.id]: { selectedOptionId: optionId, isCorrect },
    }));

    if (!isCorrect) {
      const chosenOpt = question.options.find((o) => o.id === optionId);
      const today = new Date().toLocaleDateString('ko-KR', {
        month: 'numeric',
        day: 'numeric',
      });
      setWrongNotes((prev) => {
        const filtered = prev.filter((item) => item.termId !== question.termId);
        return [
          {
            termId: question.termId,
            questionId: question.id,
            selectedOptionLabel: chosenOpt?.label ?? '오답 보기',
            wrongReason:
              chosenOpt?.wrongReason ??
              '선택한 항목은 질문에서 묻는 핵심 개념과 다릅니다.',
            savedAt: today,
            reviewCount: 1,
          },
          ...filtered,
        ];
      });
    }
  };

  const handleRetryQuestion = (questionId: string) => {
    setSelectedOptionId(null);
    setAnswersRecord((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      const nextIdx = currentIndex + 1;
      const nextQ = activeQuestions[nextIdx];
      setCurrentIndex(nextIdx);
      setSelectedOptionId(answersRecord[nextQ?.id]?.selectedOptionId ?? null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestartSession = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setAnswersRecord({});
  };

  const handleToggleBookmark = (termId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(termId) ? prev.filter((id) => id !== termId) : [...prev, termId]
    );
  };

  const handleMarkReviewed = (termId: string) => {
    setWrongNotes((prev) => prev.filter((item) => item.termId !== termId));
  };

  const detailTerm = useMemo(
    () => POWER_TERMS.find((t) => t.id === detailTermId) ?? null,
    [detailTermId]
  );

  const totalScore = Object.values(answersRecord).filter((r) => r.isCorrect).length * 100;
  const solvedCount = Object.keys(answersRecord).length;

  const pageMeta: Record<ActiveTab, { title: string; subtitle: string }> = {
    quiz: {
      title: '퀴즈 학습',
      subtitle: '전력용어노트 학습 센터',
    },
    glossary: {
      title: '전력 용어 사전',
      subtitle: '전력용어노트 학습 센터',
    },
    'wrong-notes': {
      title: '오답 노트',
      subtitle: '전력용어노트 학습 센터',
    },
    detector: {
      title: '문맥 용어 검출',
      subtitle: '전력용어노트 학습 센터',
    },
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] pb-20 md:pb-10">
      {/* Educational Disclaimer Strip */}
      <div className="bg-[#eff4ff] border-b border-[#dce9ff] px-3 py-1.5 text-[11px] text-[#3f4850]">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 justify-center md:justify-start">
          <Info className="w-3.5 h-3.5 text-[#006194] shrink-0" />
          <span className="truncate">
            ※ 본 서비스는 공식 정부 서비스가 아닌 교육·학습용 도구이며, 실제 전력계통·시장 지표는 공식 기관 발표를 참고하세요.
          </span>
        </div>
      </div>

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#dce9ff]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Back / Brand */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => navigateTab(activeTab === 'glossary' ? previousTab : 'glossary')}
              className="md:hidden w-9 h-9 -ml-1.5 rounded-xl flex items-center justify-center text-[#0b1c30] hover:bg-[#eff4ff] transition-colors shrink-0"
              aria-label="이전 화면으로 이동"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => navigateTab('glossary')}
              className="text-left min-w-0 cursor-pointer"
            >
              <div className="hidden md:block text-base font-bold tracking-tight text-[#0b1c30] whitespace-nowrap shrink-0">
                전력용어노트
              </div>
              <div className="md:hidden">
                <div className="text-[15px] font-bold text-[#0b1c30] leading-tight truncate">
                  {pageMeta[activeTab].title}
                </div>
                <div className="text-[11px] text-[#565e74] leading-tight truncate">
                  {pageMeta[activeTab].subtitle}
                </div>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop Single-Line Nav Links */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#3f4850]"
            aria-label="주요 학습 메뉴"
          >
            <button
              type="button"
              onClick={() => navigateTab('glossary')}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'glossary'
                  ? 'border-[#006194] text-[#006194] font-bold'
                  : 'border-transparent hover:text-[#0b1c30]'
              }`}
            >
              용어 사전
            </button>
            <button
              type="button"
              onClick={() => navigateTab('wrong-notes')}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'wrong-notes'
                  ? 'border-[#006194] text-[#006194] font-bold'
                  : 'border-transparent hover:text-[#0b1c30]'
              }`}
            >
              오답 노트 ({wrongNotes.length})
            </button>
            <button
              type="button"
              onClick={() => navigateTab('detector')}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'detector'
                  ? 'border-[#006194] text-[#006194] font-bold'
                  : 'border-transparent hover:text-[#0b1c30]'
              }`}
            >
              문맥 검출
            </button>
            <button
              type="button"
              onClick={() => navigateTab('quiz')}
              className={`py-1 whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'quiz'
                  ? 'border-[#006194] text-[#006194] font-bold'
                  : 'border-transparent hover:text-[#0b1c30]'
              }`}
            >
              퀴즈 학습
            </button>
          </nav>

          {/* Zone 3: Right Profile / Track Drawer Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowMobileTracks((v) => !v)}
              className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#eff4ff] text-[#006194] text-xs font-bold whitespace-nowrap shrink-0"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>과정·시뮬레이터</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTab('wrong-notes')}
              className="w-9 h-9 rounded-full overflow-hidden border border-[#cce5ff] bg-[#eff4ff] flex items-center justify-center shrink-0 cursor-pointer"
              aria-label="학습자 프로필 및 오답노트 확인"
              title="오답 노트 및 학습 현황"
            >
              {!avatarError ? (
                <img
                  src="/src/assets/images/trainee_avatar_1794967906877.jpg"
                  alt="학습자 프로필"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-[#006194]">학습</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 pt-5 pb-6">
        {/* Mobile Collapsible Track & Simulator Panel */}
        {showMobileTracks && (
          <div className="lg:hidden mb-5">
            <CompanionSidebar
              activeTrackId={activeTrack.id}
              onSelectTrack={handleSelectTrack}
              totalScore={totalScore}
              solvedCount={solvedCount}
              bookmarkedCount={bookmarkedIds.length}
              wrongNotesCount={wrongNotes.length}
              onOpenWrongNotes={() => {
                setShowMobileTracks(false);
                navigateTab('wrong-notes');
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
          {/* Primary Active Learning Column */}
          <section className="max-w-xl w-full mx-auto lg:max-w-none">
            {activeTab === 'quiz' && (
              <QuizSessionView
                track={activeTrack}
                questions={activeQuestions}
                currentIndex={currentIndex}
                selectedOptionId={selectedOptionId}
                answersRecord={answersRecord}
                onSelectOption={handleSelectOption}
                onRetryQuestion={handleRetryQuestion}
                onNextQuestion={handleNextQuestion}
                onRestartSession={handleRestartSession}
                onOpenTerm={(termId) => setDetailTermId(termId)}
                onGoToWrongNotes={() => navigateTab('wrong-notes')}
                onSwitchToGlossary={() => navigateTab('glossary')}
                wrongNotesCount={wrongNotes.length}
              />
            )}

            {activeTab === 'glossary' && (
              <GlossaryView
                bookmarkedIds={bookmarkedIds}
                onToggleBookmark={handleToggleBookmark}
                onOpenTerm={(termId) => setDetailTermId(termId)}
                onStartTermQuiz={(termId) => {
                  const term = POWER_TERMS.find((t) => t.id === termId);
                  handleStartCustomQuiz(
                    [termId],
                    `${term?.termKr ?? '선택 용어'} 집중 퀴즈`
                  );
                }}
              />
            )}

            {activeTab === 'wrong-notes' && (
              <WrongNotesView
                wrongNotes={wrongNotes}
                onRetryTermQuiz={(termId) => {
                  const term = POWER_TERMS.find((t) => t.id === termId);
                  handleStartCustomQuiz(
                    [termId],
                    `오답 복습 · ${term?.termKr ?? '전력 용어'}`
                  );
                }}
                onMarkReviewed={handleMarkReviewed}
                onOpenTerm={(termId) => setDetailTermId(termId)}
                onGoToQuiz={() => navigateTab('quiz')}
              />
            )}

            {activeTab === 'detector' && (
              <ContextDetectorView
                onOpenTerm={(termId) => setDetailTermId(termId)}
                onStartCustomQuiz={handleStartCustomQuiz}
              />
            )}
          </section>

          {/* Desktop Companion Column */}
          <div className="hidden lg:block sticky top-20">
            <CompanionSidebar
              activeTrackId={activeTrack.id}
              onSelectTrack={handleSelectTrack}
              totalScore={totalScore}
              solvedCount={solvedCount}
              bookmarkedCount={bookmarkedIds.length}
              wrongNotesCount={wrongNotes.length}
              onOpenWrongNotes={() => navigateTab('wrong-notes')}
            />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#dce9ff]"
        aria-label="하단 학습 메뉴"
      >
        <div className="grid grid-cols-4 h-14 items-center">
          <button
            type="button"
            onClick={() => navigateTab('glossary')}
            className={`flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
              activeTab === 'glossary' ? 'text-[#006194] font-bold' : 'text-[#565e74]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px]">용어사전</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTab('wrong-notes')}
            className={`relative flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
              activeTab === 'wrong-notes' ? 'text-[#006194] font-bold' : 'text-[#565e74]'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span className="text-[10px]">
              오답노트{wrongNotes.length > 0 ? ` (${wrongNotes.length})` : ''}
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigateTab('detector')}
            className={`flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
              activeTab === 'detector' ? 'text-[#006194] font-bold' : 'text-[#565e74]'
            }`}
          >
            <FileSearch className="w-4 h-4" />
            <span className="text-[10px]">문맥검출</span>
          </button>

          <button
            type="button"
            onClick={() => navigateTab('quiz')}
            className={`flex flex-col items-center justify-center gap-0.5 h-full transition-colors ${
              activeTab === 'quiz' ? 'text-[#006194] font-bold' : 'text-[#565e74]'
            }`}
          >
            <Zap className={`w-4 h-4 ${activeTab === 'quiz' ? 'fill-current' : ''}`} />
            <span className="text-[10px]">퀴즈학습</span>
          </button>
        </div>
      </nav>

      {/* Term Detail Modal */}
      <TermDetailModal
        term={detailTerm}
        isBookmarked={detailTerm ? bookmarkedIds.includes(detailTerm.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onStartTermQuiz={(termId) => {
          const term = POWER_TERMS.find((t) => t.id === termId);
          handleStartCustomQuiz([termId], `${term?.termKr ?? '전력 용어'} 집중 퀴즈`);
        }}
        onSelectRelatedTerm={(termId) => setDetailTermId(termId)}
        onClose={() => setDetailTermId(null)}
      />
    </div>
  );
}
