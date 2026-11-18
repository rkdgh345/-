import React from 'react';
import {
  AlertCircle,
  Bookmark,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { POWER_TERMS, WrongNoteEntry } from '../data/powerTerms';

interface WrongNotesViewProps {
  wrongNotes: WrongNoteEntry[];
  onRetryTermQuiz: (termId: string) => void;
  onMarkReviewed: (termId: string) => void;
  onOpenTerm: (termId: string) => void;
  onGoToQuiz: () => void;
}

export const WrongNotesView: React.FC<WrongNotesViewProps> = ({
  wrongNotes,
  onRetryTermQuiz,
  onMarkReviewed,
  onOpenTerm,
  onGoToQuiz,
}) => {
  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-[#dce9ff] p-5 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#825100]">
            <Bookmark className="w-4 h-4 fill-current" />
            <span>자동 오답 보관함</span>
          </div>
          <h2 className="text-lg font-bold text-[#0b1c30] mt-1">
            오답 노트 ({wrongNotes.length}건)
          </h2>
          <p className="text-xs text-[#3f4850] mt-1">
            퀴즈에서 틀린 용어가 자동으로 저장됩니다. 헷갈린 이유를 점검하고 다시 풀어보세요.
          </p>
        </div>
        {wrongNotes.length > 0 && (
          <button
            type="button"
            onClick={onGoToQuiz}
            className="px-3.5 py-2 rounded-xl bg-[#eff4ff] text-[#006194] text-xs font-bold hover:bg-[#dce9ff] transition-colors shrink-0"
          >
            퀴즈로 돌아가기
          </button>
        )}
      </div>

      {/* Empty State */}
      {wrongNotes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#dce9ff] p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#006194] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#0b1c30]">
            현재 보관된 오답 노트가 없습니다
          </h3>
          <p className="text-xs text-[#565e74] max-w-sm mx-auto leading-relaxed">
            퀴즈 학습 중 틀린 문제가 생기면 선택한 오답 분석과 함께 이곳에 자동으로 기록됩니다.
          </p>
          <button
            type="button"
            onClick={onGoToQuiz}
            className="mt-2 px-5 py-2.5 rounded-xl bg-[#006194] hover:bg-[#004b73] text-white text-sm font-semibold transition-colors"
          >
            퀴즈 학습 시작하기
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {wrongNotes.map((entry) => {
            const term = POWER_TERMS.find((t) => t.id === entry.termId);
            if (!term) return null;

            return (
              <div
                key={entry.termId}
                className="bg-white rounded-2xl border border-[#dce9ff] shadow-[0_1px_4px_rgba(11,28,48,0.03)] p-5 space-y-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#565e74]">
                      <span className="font-bold text-[#006194]">{term.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>저장일 {entry.savedAt}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0b1c30] mt-1">
                      {term.termKr}
                      <span className="ml-2 text-xs font-medium text-[#565e74]">
                        {term.termEn}
                      </span>
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-[11px] font-bold shrink-0">
                    복습 필요
                  </span>
                </div>

                {/* What user selected wrong */}
                <div className="rounded-xl bg-[#fff8f8] border border-[#f2b8b5] p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#ba1a1a]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>당시 오답 선택: {entry.selectedOptionLabel}</span>
                  </div>
                  <p className="text-xs text-[#3f4850] leading-relaxed pl-5">
                    {entry.wrongReason}
                  </p>
                </div>

                {/* Correct summary */}
                <div className="rounded-xl bg-[#eff4ff] border border-[#cce5ff] p-3.5 space-y-1">
                  <div className="text-xs font-bold text-[#006194]">정답 개념 요약</div>
                  <p className="text-[13.5px] text-[#0b1c30] leading-relaxed">{term.summary}</p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onOpenTerm(term.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006194] hover:underline px-1 py-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>용어사전 전체 보기</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onMarkReviewed(term.id)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-[#dce9ff] bg-white hover:bg-[#f8f9ff] text-xs font-semibold text-[#3f4850] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>복습 완료</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRetryTermQuiz(term.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#006194] hover:bg-[#004b73] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>다시 풀기</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
