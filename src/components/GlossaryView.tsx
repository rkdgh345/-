import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import {
  POWER_TERMS,
  PowerTerm,
  TERM_CATEGORIES,
  TermCategory,
} from '../data/powerTerms';

interface GlossaryViewProps {
  bookmarkedIds: string[];
  onToggleBookmark: (termId: string) => void;
  onOpenTerm: (termId: string) => void;
  onStartTermQuiz: (termId: string) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({
  bookmarkedIds,
  onToggleBookmark,
  onOpenTerm,
  onStartTermQuiz,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'전체' | TermCategory>('전체');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [expandedContextIds, setExpandedContextIds] = useState<Record<string, boolean>>({
    'reserve-margin': true,
  });

  const filteredTerms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POWER_TERMS.filter((term) => {
      if (onlyBookmarked && !bookmarkedIds.includes(term.id)) return false;
      if (selectedCategory !== '전체' && term.category !== selectedCategory) return false;
      if (!q) return true;
      const haystack = [
        term.termKr,
        term.termEn,
        term.acronym ?? '',
        term.summary,
        ...term.aliases,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, selectedCategory, onlyBookmarked, bookmarkedIds]);

  const toggleExpand = (id: string) => {
    setExpandedContextIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderHighlightedContext = (term: PowerTerm) => {
    let nodes: (string | React.ReactNode)[] = [term.newsContext];
    term.highlightPhrases.forEach((phrase, pIdx) => {
      const next: (string | React.ReactNode)[] = [];
      nodes.forEach((chunk, cIdx) => {
        if (typeof chunk !== 'string') {
          next.push(chunk);
          return;
        }
        const parts = chunk.split(phrase);
        parts.forEach((part, idx) => {
          if (part) next.push(part);
          if (idx < parts.length - 1) {
            next.push(
              <mark
                key={`${pIdx}-${cIdx}-${idx}`}
                className="bg-[#ffddb8]/90 text-[#2a1700] font-semibold px-1 py-0.5 rounded"
              >
                {phrase}
              </mark>
            );
          }
        });
      });
      nodes = next;
    });
    return nodes;
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Header Card */}
      <div className="bg-white rounded-2xl border border-[#dce9ff] p-4 space-y-3 shadow-[0_2px_10px_rgba(11,28,48,0.03)]">
        <div className="relative">
          <Search className="w-4 h-4 text-[#565e74] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="전력 용어 검색 (예: SMP, 계통섬, 양수발전)..."
            className="w-full h-11 pl-10 pr-16 rounded-xl border border-[#bfc7d2] bg-[#f8f9ff] text-sm text-[#0b1c30] placeholder:text-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194] focus:border-[#006194] transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#006194] text-xs font-semibold hover:bg-[#dce9ff] transition-colors inline-flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              지우기
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {(['전체', ...TERM_CATEGORIES] as const).map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#006194] text-white'
                      : 'bg-[#eff4ff] text-[#3f4850] hover:bg-[#dce9ff]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setOnlyBookmarked((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
              onlyBookmarked
                ? 'bg-[#fff7eb] border-[#ffddb8] text-[#825100]'
                : 'bg-white border-[#dce9ff] text-[#3f4850] hover:bg-[#f8f9ff]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-current' : ''}`} />
            <span>북마크 ({bookmarkedIds.length})</span>
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between px-1 text-xs text-[#565e74]">
        <span>
          총 <strong className="text-[#0b1c30] font-mono-num">{filteredTerms.length}</strong>개 전력 용어
        </span>
        <span>용어를 눌러 상세 해설과 연계 개념을 확인하세요</span>
      </div>

      {/* Term Cards List */}
      {filteredTerms.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#dce9ff] p-8 text-center space-y-2">
          <p className="text-sm font-bold text-[#0b1c30]">조건에 맞는 용어가 없습니다.</p>
          <p className="text-xs text-[#565e74]">
            검색어를 지우거나 다른 카테고리를 선택해 보세요.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedCategory('전체');
              setOnlyBookmarked(false);
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-[#eff4ff] text-[#006194] text-xs font-bold hover:bg-[#dce9ff] transition-colors"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTerms.map((term) => {
            const isBookmarked = bookmarkedIds.includes(term.id);
            const isExpanded = Boolean(expandedContextIds[term.id]);

            return (
              <article
                key={term.id}
                className="bg-white rounded-2xl border border-[#dce9ff] shadow-[0_1px_4px_rgba(11,28,48,0.03)] p-4 sm:p-5 space-y-3 transition-colors hover:border-[#93ccff]"
              >
                {/* Zone 1: Clean Metadata & Bookmark */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs text-[#565e74] min-w-0">
                    <span className="font-bold text-[#006194] whitespace-nowrap">
                      {term.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="whitespace-nowrap">난이도 {term.difficulty}</span>
                    {term.acronym && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-num font-semibold text-[#0b1c30] truncate">
                          {term.acronym}
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleBookmark(term.id)}
                    className={`min-w-[36px] min-h-[36px] rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                      isBookmarked
                        ? 'bg-[#fff7eb] text-[#825100]'
                        : 'text-[#707881] hover:bg-[#eff4ff] hover:text-[#006194]'
                    }`}
                    aria-label={isBookmarked ? `${term.termKr} 북마크 해제` : `${term.termKr} 북마크`}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Zone 2: Title & Plain-Language Summary */}
                <div>
                  <button
                    type="button"
                    onClick={() => onOpenTerm(term.id)}
                    className="text-left group cursor-pointer"
                  >
                    <h3 className="text-lg font-bold text-[#0b1c30] group-hover:text-[#006194] transition-colors">
                      {term.termKr}
                      <span className="ml-2 text-xs font-medium text-[#565e74]">
                        {term.termEn}
                      </span>
                    </h3>
                  </button>
                  <p className="text-[14.5px] text-[#3f4850] leading-[1.6] mt-1.5">
                    {term.summary}
                  </p>
                </div>

                {/* Zone 3: Expandable News Context Callout */}
                <div className="pt-1 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleExpand(term.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006194] hover:text-[#004b73] transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>실무·뉴스 문맥 예문 {isExpanded ? '접기' : '보기'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenTerm(term.id)}
                        className="text-xs font-semibold text-[#3f4850] hover:text-[#0b1c30] px-2 py-1 rounded-lg hover:bg-[#f1f5f9] transition-colors cursor-pointer"
                      >
                        상세 해설
                      </button>
                      <button
                        type="button"
                        onClick={() => onStartTermQuiz(term.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#006194] bg-[#eff4ff] hover:bg-[#dce9ff] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Zap className="w-3 h-3" />
                        <span>퀴즈 풀기</span>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl p-3.5 text-[13.5px] leading-[1.65] text-[#0b1c30]">
                      {renderHighlightedContext(term)}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
