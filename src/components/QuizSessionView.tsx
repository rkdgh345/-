import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Award,
  Bookmark,
  BookOpen,
  Check,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  Lock,
  RotateCcw,
  Sparkles,
  Unlock,
  X,
  XCircle,
  Zap,
  BarChart3,
} from 'lucide-react';
import { QuizQuestion, QuizTrack } from '../data/powerTerms';

interface QuizSessionViewProps {
  track: QuizTrack;
  questions: QuizQuestion[];
  currentIndex: number;
  selectedOptionId: string | null;
  answersRecord: Record<string, { selectedOptionId: string; isCorrect: boolean }>;
  onSelectOption: (question: QuizQuestion, optionId: string) => void;
  onRetryQuestion: (questionId: string) => void;
  onNextQuestion: () => void;
  onRestartSession: () => void;
  onOpenTerm: (termId: string) => void;
  onGoToWrongNotes: () => void;
  onSwitchToGlossary: () => void;
  wrongNotesCount: number;
}

export const QuizSessionView: React.FC<QuizSessionViewProps> = ({
  track,
  questions,
  currentIndex,
  selectedOptionId,
  answersRecord,
  onSelectOption,
  onRetryQuestion,
  onNextQuestion,
  onRestartSession,
  onOpenTerm,
  onGoToWrongNotes,
  onSwitchToGlossary,
  wrongNotesCount,
}) => {
  const [showSummary, setShowSummary] = useState(false);

  const totalCount = questions.length;
  const currentQuestion = questions[currentIndex] ?? questions[0];

  if (!currentQuestion) {
    return (
      <div className="bg-white rounded-2xl border border-[#dce9ff] p-8 text-center">
        <p className="text-base font-semibold text-[#0b1c30]">출제할 문항이 없습니다.</p>
        <p className="text-sm text-[#3f4850] mt-2">
          용어 사전이나 문맥 검출기에서 학습할 용어를 선택해 주세요.
        </p>
        <button
          type="button"
          onClick={onSwitchToGlossary}
          className="mt-5 px-5 py-3 rounded-xl bg-[#006194] text-white text-sm font-semibold hover:bg-[#004b73] transition-colors"
        >
          용어 사전 보러가기
        </button>
      </div>
    );
  }

  const isAnswered = selectedOptionId !== null;
  const isCorrect = isAnswered && selectedOptionId === currentQuestion.correctOptionId;
  const selectedOption = currentQuestion.options.find((o) => o.id === selectedOptionId);
  const correctOption = currentQuestion.options.find(
    (o) => o.id === currentQuestion.correctOptionId
  );

  const isLastQuestion = currentIndex >= totalCount - 1;
  const nextQuestion = !isLastQuestion ? questions[currentIndex + 1] : null;

  const progressPercent = Math.round(((currentIndex + 1) / totalCount) * 100);

  const correctTotal = Object.values(answersRecord).filter((r) => r.isCorrect).length;
  const answeredTotal = Object.keys(answersRecord).length;
  const totalScore = correctTotal * 100;

  const renderHighlightedText = (text: string, phrase?: string) => {
    if (!phrase || !text.includes(phrase)) {
      return <span>{text}</span>;
    }
    const parts = text.split(phrase);
    return (
      <>
        {parts[0]}
        <mark className="bg-[#ffddb8]/85 text-[#2a1700] font-semibold px-1.5 py-0.5 rounded">
          {phrase}
        </mark>
        {parts.slice(1).join(phrase)}
      </>
    );
  };

  if (showSummary) {
    const accuracy = totalCount > 0 ? Math.round((correctTotal / totalCount) * 100) : 0;
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-[#dce9ff] shadow-[0_2px_12px_rgba(11,28,48,0.05)] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006194] bg-[#e5eeff] px-3 py-1 rounded-full">
                <Award className="w-3.5 h-3.5" />
                학습 결과 요약
              </span>
              <h2 className="text-xl font-bold text-[#0b1c30] mt-3">{track.title}</h2>
              <p className="text-sm text-[#3f4850] mt-1">{track.subtitle}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-bold text-[#006194] font-mono-num">
                {totalScore}점
              </div>
              <div className="text-xs text-[#3f4850] mt-0.5 tabular-nums">
                정답률 {accuracy}% ({correctTotal}/{totalCount})
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-[#eff4ff] rounded-xl p-3.5 border border-[#dce9ff]">
              <div className="text-xs text-[#3f4850]">풀이 완료</div>
              <div className="text-lg font-bold text-[#0b1c30] mt-1 font-mono-num">
                {answeredTotal}/{totalCount}
              </div>
            </div>
            <div className="bg-[#eff4ff] rounded-xl p-3.5 border border-[#dce9ff]">
              <div className="text-xs text-[#3f4850]">정답 문항</div>
              <div className="text-lg font-bold text-[#006194] mt-1 font-mono-num">
                {correctTotal}문항
              </div>
            </div>
            <div className="bg-[#fff7eb] rounded-xl p-3.5 border border-[#ffddb8]">
              <div className="text-xs text-[#825100]">오답 노트 보관</div>
              <div className="text-lg font-bold text-[#825100] mt-1 font-mono-num">
                {wrongNotesCount}개
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2.5">
            <h3 className="text-xs font-semibold text-[#565e74]">문항별 학습 기록</h3>
            {questions.map((q, idx) => {
              const rec = answersRecord[q.id];
              return (
                <div
                  key={q.id}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-[#e2e8f0] bg-[#f8f9ff]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[#565e74]">
                      <span className="font-bold text-[#006194] font-mono-num">Q{idx + 1}</span>
                      <span>·</span>
                      <span className="truncate font-medium text-[#0b1c30]">{q.termLabel}</span>
                    </div>
                    <p className="text-xs text-[#3f4850] truncate mt-1">{q.question}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {rec ? (
                      rec.isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#006194] bg-[#cce5ff] px-2.5 py-1 rounded-full">
                          <Check className="w-3.5 h-3.5" />
                          정답
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#93000a] bg-[#ffdad6] px-2.5 py-1 rounded-full">
                          <X className="w-3.5 h-3.5" />
                          오답
                        </span>
                      )
                    ) : (
                      <span className="text-xs text-[#707881]">미풀이</span>
                    )}
                    <button
                      type="button"
                      onClick={() => onOpenTerm(q.termId)}
                      className="text-xs font-semibold text-[#006194] hover:underline px-2 py-1"
                    >
                      해설
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => {
              setShowSummary(false);
              onRestartSession();
            }}
            className="w-full min-h-[48px] rounded-xl bg-[#006194] hover:bg-[#004b73] active:scale-[0.99] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            이 퀴즈 처음부터 다시 풀기
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onGoToWrongNotes}
              className="min-h-[46px] rounded-xl bg-white border border-[#dce9ff] hover:bg-[#eff4ff] text-[#0b1c30] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#825100]" />
              오답노트 확인 ({wrongNotesCount})
            </button>
            <button
              type="button"
              onClick={() => setShowSummary(false)}
              className="min-h-[46px] rounded-xl bg-[#eff4ff] border border-[#cce5ff] hover:bg-[#dce9ff] text-[#006194] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              퀴즈 화면으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress Bar Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5eeff] text-[#006194] text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 fill-current" />
            {track.badgeLabel}
          </span>
          <div className="text-xs font-semibold text-[#3f4850] tabular-nums">
            <span className="text-[#006194] font-bold">{currentIndex + 1}</span>
            <span className="text-[#707881]"> / {totalCount} 문항</span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-[#dce9ff] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#006194] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl border border-[#dce9ff] shadow-[0_2px_10px_rgba(11,28,48,0.04)] p-5">
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <button
            type="button"
            onClick={() => onOpenTerm(currentQuestion.termId)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#006194] text-xs font-semibold transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>연계 용어: {currentQuestion.termLabel}</span>
          </button>
          <span className="text-xs font-medium text-[#565e74] bg-[#f1f5f9] px-2.5 py-1 rounded-full shrink-0">
            난이도 · {currentQuestion.difficulty}
          </span>
        </div>

        <h2 className="text-[17px] sm:text-lg font-bold text-[#0b1c30] leading-[1.55]">
          <span className="text-[#006194] mr-1.5 font-mono-num">Q{currentIndex + 1}.</span>
          {currentQuestion.question}
        </h2>

        {/* Options List */}
        <div className="mt-5 space-y-2.5" role="radiogroup" aria-label="퀴즈 선택지">
          {currentQuestion.options.map((option, idx) => {
            const isThisSelected = selectedOptionId === option.id;
            const isThisCorrect = option.id === currentQuestion.correctOptionId;

            let containerClass =
              'bg-[#f8f9ff] border border-[#e2e8f0] hover:border-[#93ccff] hover:bg-[#eff4ff]/70 text-[#0b1c30]';
            let numberClass = 'bg-[#e2e8f0] text-[#565e74]';
            let trailingTag: React.ReactNode = null;

            if (isAnswered) {
              if (isThisSelected && isThisCorrect) {
                // Correct option picked by user
                containerClass =
                  'bg-[#e5eeff]/90 border-2 border-[#006194] text-[#0b1c30] shadow-[0_2px_8px_rgba(0,97,148,0.08)]';
                numberClass = 'bg-[#006194] text-white';
                trailingTag = (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006194] shrink-0 whitespace-nowrap">
                    <CheckCircle2 className="w-4 h-4" />
                    내 선택
                  </span>
                );
              } else if (isThisSelected && !isThisCorrect) {
                // Wrong option picked by user
                containerClass =
                  'bg-[#fff5f5] border-2 border-[#ba1a1a] text-[#93000a] shadow-[0_2px_8px_rgba(186,26,26,0.08)]';
                numberClass = 'bg-[#ba1a1a] text-white';
                trailingTag = (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ba1a1a] shrink-0 whitespace-nowrap">
                    <X className="w-3.5 h-3.5" />
                    내 선택 (오답)
                  </span>
                );
              } else if (!isCorrect && isThisCorrect) {
                // Reveal correct option when user missed
                containerClass =
                  'bg-[#eff4ff] border-2 border-[#006194] text-[#0b1c30]';
                numberClass = 'bg-[#006194] text-white';
                trailingTag = (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006194] bg-white/90 px-2.5 py-0.5 rounded-full border border-[#93ccff] shrink-0 whitespace-nowrap">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    정답
                  </span>
                );
              } else {
                containerClass = 'bg-[#f8f9ff] border border-[#e2e8f0] text-[#707881] opacity-85';
                numberClass = 'bg-[#e2e8f0] text-[#707881]';
              }
            }

            return (
              <button
                key={option.id}
                type="button"
                disabled={isAnswered}
                onClick={() => onSelectOption(currentQuestion, option.id)}
                className={`w-full min-h-[52px] px-3.5 py-3 rounded-xl flex items-center justify-between gap-3 text-left transition-all duration-150 ${containerClass} ${
                  isAnswered ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 font-mono-num transition-colors ${numberClass}`}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className={`text-[14.5px] leading-snug ${
                      isThisSelected || (!isCorrect && isAnswered && isThisCorrect)
                        ? 'font-bold'
                        : 'font-medium'
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
                {trailingTag}
              </button>
            );
          })}
        </div>

        {!isAnswered && (
          <p className="text-xs text-[#565e74] mt-4 text-center">
            알맞은 보기를 선택하면 즉시 상세 해설과 오답 분석이 제공됩니다.
          </p>
        )}
      </div>

      {/* Feedback Card (appears immediately upon selection) */}
      {isAnswered && (
        <div className="bg-white rounded-2xl border border-[#dce9ff] shadow-[0_2px_10px_rgba(11,28,48,0.04)] p-5 space-y-4">
          {isCorrect ? (
            <>
              {/* Correct Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl" role="img" aria-label="축하">
                    🎉
                  </span>
                  <h3 className="text-lg font-bold text-[#0b1c30]">정답입니다!</h3>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffddb8] text-[#653e00] text-xs font-bold shrink-0 font-mono-num">
                  +100점 획득
                </span>
              </div>

              {/* Visual Margin / Concept Meter */}
              {currentQuestion.visualMeter && (
                <div className="bg-[#f8f9ff] border border-[#e5eeff] rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-[#565e74] font-medium">
                      {currentQuestion.visualMeter.title}
                    </span>
                    <span className="text-[#006194] font-bold">
                      {currentQuestion.visualMeter.statusLabel}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#e5eeff] rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-[#93ccff]"
                      style={{ width: `${currentQuestion.visualMeter.demandPercent}%` }}
                    />
                    <div
                      className="h-full bg-[#006194]"
                      style={{ width: `${currentQuestion.visualMeter.reservePercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs tabular-nums">
                    <span className="text-[#3f4850] font-medium">
                      {currentQuestion.visualMeter.leftCaption}
                    </span>
                    <span className="text-[#006194] font-bold">
                      {currentQuestion.visualMeter.rightCaption}
                    </span>
                  </div>
                </div>
              )}

              {/* Lightbulb Core Explanation */}
              <div className="flex items-start gap-2.5 text-[14.5px] leading-[1.65] text-[#0b1c30]">
                <Lightbulb className="w-4 h-4 text-[#006194] shrink-0 mt-1" />
                <p>
                  {renderHighlightedText(
                    currentQuestion.correctExplanation,
                    currentQuestion.highlightPhrase
                  )}
                </p>
              </div>

              {/* Source & Term Dictionary Link */}
              <div className="pt-3 border-t border-[#e5eeff] flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-[#565e74] min-w-0">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">출처: {currentQuestion.sourceLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenTerm(currentQuestion.termId)}
                  className="inline-flex items-center gap-1 font-bold text-[#006194] hover:underline shrink-0"
                >
                  <span>용어집 전문</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Incorrect Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <XCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-[#0b1c30] leading-snug">
                    아쉬워요! 다시 확인해 볼까요?
                  </h3>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold shrink-0">
                  복습 필요 · +0점
                </span>
              </div>

              {/* Auto-saved Wrong Note Banner */}
              <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#fff8ed] border border-[#ffddb8]">
                <div className="flex items-center gap-2 min-w-0 text-xs font-semibold text-[#653e00]">
                  <Bookmark className="w-4 h-4 text-[#825100] shrink-0" />
                  <span className="truncate">
                    '{currentQuestion.termLabel}'이(가) 오답 노트에 자동 저장되었습니다.
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#653e00] text-[11px] font-bold shrink-0">
                  자동 보관됨
                </span>
              </div>

              {/* Wrong Choice Specific Analysis */}
              <div className="rounded-xl border border-[#f2b8b5] bg-[#fff8f8] p-4 space-y-1.5">
                <div className="flex items-start gap-2 text-xs font-bold text-[#ba1a1a]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    선택한 오답 분석: 왜 '{selectedOption?.label}'이(가) 아닐까요?
                  </span>
                </div>
                <p className="text-[13.5px] leading-[1.6] text-[#3f4850] pl-6">
                  {selectedOption?.wrongReason ||
                    '선택한 항목은 해당 질문의 핵심 정의와 다른 전력 개념입니다.'}
                </p>
              </div>

              {/* Correct Answer Core Explanation */}
              <div className="rounded-xl border border-[#93ccff] bg-[#eff4ff]/80 p-4 space-y-1.5">
                <div className="flex items-start gap-2 text-xs font-bold text-[#006194]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    정답 핵심 해설: 정답은 '{correctOption?.label}'입니다!
                  </span>
                </div>
                <p className="text-[13.5px] leading-[1.6] text-[#0b1c30] pl-6">
                  {currentQuestion.correctExplanation}
                </p>
              </div>

              {/* Source & Term Dictionary Link */}
              <div className="pt-2 border-t border-[#e5eeff] flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-[#565e74] min-w-0">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">출처: {currentQuestion.sourceLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenTerm(currentQuestion.termId)}
                  className="inline-flex items-center gap-1 font-bold text-[#006194] hover:underline shrink-0"
                >
                  <span>용어사전 바로가기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Next Question Preview Card */}
      {nextQuestion && (
        <div className="bg-white rounded-2xl border border-[#dce9ff] p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#eff4ff] text-[#006194] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-[#565e74]">
                {isAnswered ? '다음 문제 준비 완료' : '다음 문제 대기 중'}
              </div>
              <div className="text-sm font-bold text-[#0b1c30] truncate">
                {currentIndex === 0 && currentQuestion.nextPreviewTitle
                  ? currentQuestion.nextPreviewTitle
                  : `Q${currentIndex + 2}. [${nextQuestion.category}] ${nextQuestion.termLabel} 개념 퀴즈`}
              </div>
            </div>
          </div>
          {isAnswered ? (
            <button
              type="button"
              onClick={onNextQuestion}
              className="p-2 rounded-lg text-[#006194] hover:bg-[#eff4ff] transition-colors shrink-0"
              aria-label="다음 문제로 이동"
            >
              <Unlock className="w-4 h-4" />
            </button>
          ) : (
            <Lock className="w-4 h-4 text-[#707881] shrink-0" />
          )}
        </div>
      )}

      {/* Bottom Action Controls */}
      {isAnswered && (
        <div className="space-y-2.5 pt-1">
          {isCorrect ? (
            <>
              <button
                type="button"
                onClick={isLastQuestion ? () => setShowSummary(true) : onNextQuestion}
                className="w-full min-h-[50px] rounded-xl bg-[#006194] hover:bg-[#004b73] active:scale-[0.99] text-white text-[15px] font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span>
                  {isLastQuestion
                    ? `결과 요약 보기 (${totalCount}/${totalCount})`
                    : `다음 문제 풀기 (${currentIndex + 1}/${totalCount})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onRetryQuestion(currentQuestion.id)}
                  className="min-h-[46px] rounded-xl bg-white border border-[#dce9ff] hover:bg-[#eff4ff] text-[#0b1c30] text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>다시 풀기</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSummary(true)}
                  className="min-h-[46px] rounded-xl bg-white border border-[#dce9ff] hover:bg-[#eff4ff] text-[#0b1c30] text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-[#006194]" />
                  <span>결과 요약 보기</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onRetryQuestion(currentQuestion.id)}
                className="w-full min-h-[50px] rounded-xl bg-[#006194] hover:bg-[#004b73] active:scale-[0.99] text-white text-[15px] font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>이 문제 다시 풀기</span>
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={onGoToWrongNotes}
                  className="min-h-[46px] rounded-xl bg-white border border-[#dce9ff] hover:bg-[#eff4ff] text-[#0b1c30] text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#825100]" />
                  <span>오답노트 확인</span>
                </button>
                <button
                  type="button"
                  onClick={isLastQuestion ? () => setShowSummary(true) : onNextQuestion}
                  className="min-h-[46px] rounded-xl bg-[#e5eeff] border border-[#cce5ff] hover:bg-[#dce9ff] text-[#006194] text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{isLastQuestion ? '해설 확인 후 요약' : '해설 확인 후 다음'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
