import React from 'react';
import {
  Bookmark,
  BookOpen,
  ExternalLink,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { POWER_TERMS, PowerTerm } from '../data/powerTerms';

interface TermDetailModalProps {
  term: PowerTerm | null;
  isBookmarked: boolean;
  onToggleBookmark: (termId: string) => void;
  onStartTermQuiz: (termId: string) => void;
  onSelectRelatedTerm: (termId: string) => void;
  onClose: () => void;
}

export const TermDetailModal: React.FC<TermDetailModalProps> = ({
  term,
  isBookmarked,
  onToggleBookmark,
  onStartTermQuiz,
  onSelectRelatedTerm,
  onClose,
}) => {
  if (!term) return null;

  const relatedTerms = term.relatedTermIds
    .map((id) => POWER_TERMS.find((t) => t.id === id))
    .filter((t): t is PowerTerm => Boolean(t));

  const renderNewsContext = (text: string, highlights: string[]) => {
    let nodes: (string | React.ReactNode)[] = [text];
    highlights.forEach((phrase, pIdx) => {
      const nextNodes: (string | React.ReactNode)[] = [];
      nodes.forEach((chunk, cIdx) => {
        if (typeof chunk !== 'string') {
          nextNodes.push(chunk);
          return;
        }
        const parts = chunk.split(phrase);
        parts.forEach((part, partIdx) => {
          if (part) nextNodes.push(part);
          if (partIdx < parts.length - 1) {
            nextNodes.push(
              <mark
                key={`${pIdx}-${cIdx}-${partIdx}`}
                className="bg-[#ffddb8] text-[#2a1700] font-semibold px-1 py-0.5 rounded"
              >
                {phrase}
              </mark>
            );
          }
        });
      });
      nodes = nextNodes;
    });
    return nodes;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0b1c30]/45 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="term-modal-title"
    >
      <div
        className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl border border-[#dce9ff] shadow-[0_12px_32px_rgba(11,28,48,0.18)] max-h-[88vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle on mobile */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1">
          <div className="w-10 h-1 bg-[#bfc7d2] rounded-full" />
        </div>

        {/* Header */}
        <div className="px-5 pt-4 pb-3 border-b border-[#e5eeff] flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#565e74]">
              <span className="font-semibold text-[#006194]">{term.category}</span>
              <span aria-hidden="true">·</span>
              <span>난이도 {term.difficulty}</span>
              {term.acronym && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num font-semibold text-[#0b1c30]">
                    {term.acronym}
                  </span>
                </>
              )}
            </div>
            <h2 id="term-modal-title" className="text-xl font-bold text-[#0b1c30] mt-1">
              {term.termKr}
            </h2>
            <p className="text-xs text-[#565e74] font-medium mt-0.5">{term.termEn}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmark(term.id)}
              className={`min-w-[40px] min-h-[40px] rounded-xl flex items-center justify-center border transition-colors ${
                isBookmarked
                  ? 'bg-[#fff7eb] border-[#ffddb8] text-[#825100]'
                  : 'bg-[#f8f9ff] border-[#dce9ff] text-[#565e74] hover:text-[#0b1c30]'
              }`}
              aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-w-[40px] min-h-[40px] rounded-xl bg-[#f8f9ff] border border-[#dce9ff] text-[#565e74] hover:text-[#0b1c30] flex items-center justify-center transition-colors"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="bg-[#eff4ff] rounded-xl p-4 border border-[#dce9ff]">
            <div className="text-xs font-bold text-[#006194] mb-1">핵심 요약</div>
            <p className="text-[15px] font-medium text-[#0b1c30] leading-relaxed">
              {term.summary}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-bold text-[#565e74]">실무 상세 해설</div>
            <p className="text-sm text-[#3f4850] leading-[1.7]">{term.detailedExplanation}</p>
          </div>

          {term.unitOrBenchmark && (
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#f8f9ff] border border-[#e2e8f0] text-xs">
              <span className="text-[#565e74] font-medium">기준 지표 및 단위</span>
              <span className="font-mono-num font-bold text-[#006194]">
                {term.unitOrBenchmark}
              </span>
            </div>
          )}

          <div className="rounded-xl bg-[#f8f9ff] border border-[#e2e8f0] p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#825100]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>실무·뉴스 문맥 예문</span>
            </div>
            <p className="text-[13.5px] leading-[1.65] text-[#0b1c30]">
              {renderNewsContext(term.newsContext, term.highlightPhrases)}
            </p>
          </div>

          {relatedTerms.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#565e74]">함께 보면 좋은 연계 용어</div>
              <div className="flex flex-wrap gap-2">
                {relatedTerms.map((rt) => (
                  <button
                    key={rt.id}
                    type="button"
                    onClick={() => onSelectRelatedTerm(rt.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-xs font-semibold text-[#006194] transition-colors"
                  >
                    <span>{rt.termKr}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center gap-1.5 text-xs text-[#565e74]">
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>출처: {term.source}</span>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-[#e5eeff] bg-[#f8f9ff]">
          <button
            type="button"
            onClick={() => {
              onStartTermQuiz(term.id);
              onClose();
            }}
            className="w-full min-h-[46px] rounded-xl bg-[#006194] hover:bg-[#004b73] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span>이 용어로 맞춤 퀴즈 풀기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
