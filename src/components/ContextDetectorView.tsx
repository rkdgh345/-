import React, { useMemo, useState } from 'react';
import { ArrowRight, FileText, Sparkles, Zap } from 'lucide-react';
import { NEWS_SAMPLES, POWER_TERMS, PowerTerm } from '../data/powerTerms';

interface ContextDetectorViewProps {
  onOpenTerm: (termId: string) => void;
  onStartCustomQuiz: (termIds: string[], title: string) => void;
}

export const ContextDetectorView: React.FC<ContextDetectorViewProps> = ({
  onOpenTerm,
  onStartCustomQuiz,
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>(NEWS_SAMPLES[0].id);
  const [inputText, setInputText] = useState<string>(NEWS_SAMPLES[0].body);

  const detectedTerms = useMemo(() => {
    const normalized = inputText.toLowerCase();
    const matched: PowerTerm[] = [];

    POWER_TERMS.forEach((term) => {
      const hit = term.aliases.some((alias) => normalized.includes(alias.toLowerCase()));
      if (hit) matched.push(term);
    });

    return matched;
  }, [inputText]);

  const handleSelectSample = (sampleId: string) => {
    const found = NEWS_SAMPLES.find((s) => s.id === sampleId);
    if (!found) return;
    setSelectedSampleId(sampleId);
    setInputText(found.body);
  };

  // Highlight detected aliases inline in preview
  const renderedAnalyzedText = useMemo(() => {
    if (!inputText.trim()) return null;

    // Build alias -> term map sorted by longest alias first
    const pairs: { alias: string; term: PowerTerm }[] = [];
    detectedTerms.forEach((term) => {
      term.aliases.forEach((alias) => {
        if (alias.length >= 2) {
          pairs.push({ alias, term });
        }
      });
    });
    pairs.sort((a, b) => b.alias.length - a.alias.length);

    if (pairs.length === 0) return <span>{inputText}</span>;

    const escaped = pairs.map((p) => p.alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
    const chunks = inputText.split(regex);

    return chunks.map((chunk, i) => {
      const match = pairs.find((p) => p.alias.toLowerCase() === chunk.toLowerCase());
      if (!match) return <React.Fragment key={i}>{chunk}</React.Fragment>;
      return (
        <button
          key={i}
          type="button"
          onClick={() => onOpenTerm(match.term.id)}
          className="inline mx-0.5 px-1.5 py-0.5 rounded bg-[#ffddb8] hover:bg-[#ffb95f]/60 text-[#2a1700] font-bold underline decoration-[#825100]/40 underline-offset-2 transition-colors cursor-pointer"
        >
          {chunk}
        </button>
      );
    });
  }, [inputText, detectedTerms, onOpenTerm]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-[#dce9ff] p-5 space-y-4 shadow-[0_2px_10px_rgba(11,28,48,0.03)]">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#006194]">
            <Sparkles className="w-4 h-4" />
            <span>뉴스·보고서 문맥 용어 검출기</span>
          </div>
          <h2 className="text-lg font-bold text-[#0b1c30] mt-1">
            기사나 실무 문서를 붙여넣고 맞춤 퀴즈를 만드세요
          </h2>
          <p className="text-xs text-[#3f4850] mt-1">
            텍스트 속 전력 전문 용어를 자동 검출해 뜻을 풀어주고, 검출된 용어만으로 퀴즈를 구성합니다.
          </p>
        </div>

        {/* Preset News Sample Buttons */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-[#565e74]">예시 에너지 브리핑 선택</div>
          <div className="grid sm:grid-cols-3 gap-2">
            {NEWS_SAMPLES.map((sample) => {
              const active = selectedSampleId === sample.id && inputText === sample.body;
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectSample(sample.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#eff4ff] border-[#006194] text-[#0b1c30]'
                      : 'bg-[#f8f9ff] border-[#e2e8f0] text-[#3f4850] hover:border-[#93ccff]'
                  }`}
                >
                  <div className="text-[11px] font-semibold text-[#006194]">
                    {sample.source} · {sample.date}
                  </div>
                  <div className="text-xs font-bold text-[#0b1c30] line-clamp-2 mt-1 leading-snug">
                    {sample.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Input Area */}
        <div className="space-y-1.5">
          <label htmlFor="context-input" className="block text-xs font-semibold text-[#565e74]">
            분석할 원문 텍스트
          </label>
          <textarea
            id="context-input"
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="전력 뉴스 기사, 보고서 문장 등을 자유롭게 입력하거나 붙여넣으세요..."
            className="w-full p-3.5 rounded-xl border border-[#bfc7d2] bg-[#f8f9ff] text-sm text-[#0b1c30] leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#006194] focus:border-[#006194]"
          />
        </div>

        {/* Analyzed Highlight Result */}
        <div className="rounded-xl bg-[#eff4ff]/70 border border-[#dce9ff] p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006194]">
              <FileText className="w-3.5 h-3.5" />
              검출 하이라이트 미리보기 (단어 클릭 시 해설)
            </span>
            <span className="text-xs font-bold text-[#0b1c30] font-mono-num">
              {detectedTerms.length}개 용어 검출
            </span>
          </div>
          <p className="text-[14px] leading-[1.75] text-[#0b1c30]">{renderedAnalyzedText}</p>
        </div>
      </div>

      {/* Detected Terms Summary & Launch Quiz */}
      {detectedTerms.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#dce9ff] p-5 space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-[#0b1c30]">
              검출된 전력 용어 ({detectedTerms.length})
            </h3>
            <span className="text-xs text-[#565e74]">카드를 누르면 상세 해설이 열립니다</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-2.5">
            {detectedTerms.map((term) => (
              <button
                key={term.id}
                type="button"
                onClick={() => onOpenTerm(term.id)}
                className="p-3.5 rounded-xl border border-[#e2e8f0] bg-[#f8f9ff] hover:border-[#006194] hover:bg-[#eff4ff]/60 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[#0b1c30]">{term.termKr}</span>
                  <span className="text-[11px] font-semibold text-[#006194]">
                    {term.acronym || term.category}
                  </span>
                </div>
                <p className="text-xs text-[#3f4850] line-clamp-2 mt-1 leading-relaxed">
                  {term.summary}
                </p>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              onStartCustomQuiz(
                detectedTerms.map((t) => t.id),
                '검출 용어 기반 맞춤 퀴즈'
              )
            }
            className="w-full min-h-[48px] rounded-xl bg-[#006194] hover:bg-[#004b73] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>검출된 {detectedTerms.length}개 용어로 맞춤 퀴즈 시작</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
