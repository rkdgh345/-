import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  Gauge,
  Layers,
  Zap,
} from 'lucide-react';
import { QUIZ_TRACKS, QuizTrack } from '../data/powerTerms';

interface CompanionSidebarProps {
  activeTrackId: string;
  onSelectTrack: (track: QuizTrack) => void;
  totalScore: number;
  solvedCount: number;
  bookmarkedCount: number;
  wrongNotesCount: number;
  onOpenWrongNotes: () => void;
}

export const CompanionSidebar: React.FC<CompanionSidebarProps> = ({
  activeTrackId,
  onSelectTrack,
  totalScore,
  solvedCount,
  bookmarkedCount,
  wrongNotesCount,
  onOpenWrongNotes,
}) => {
  // Interactive Reserve Margin Simulator state
  const [supplyGw, setSupplyGw] = useState(106);
  const [demandGw, setDemandGw] = useState(90);
  const [heroError, setHeroError] = useState(false);

  const reserveGw = Math.max(0, supplyGw - demandGw);
  const reservePercent = demandGw > 0 ? ((supplyGw - demandGw) / demandGw) * 100 : 0;

  const getAlertStage = (pct: number, gw: number) => {
    if (pct >= 10) {
      return {
        label: '안정 (권장선 10% 이상)',
        tone: 'text-[#006194] bg-[#e5eeff]',
        barColor: 'bg-[#006194]',
      };
    }
    if (gw >= 4.5) {
      return {
        label: '준비 단계 (예비력 5.5GW 미만 주의)',
        tone: 'text-[#825100] bg-[#ffddb8]',
        barColor: 'bg-[#d97706]',
      };
    }
    if (gw >= 2.5) {
      return {
        label: '경보 · 관심/주의 단계',
        tone: 'text-[#93000a] bg-[#ffdad6]',
        barColor: 'bg-[#ba1a1a]',
      };
    }
    return {
      label: '경보 · 경계/심각 (DR·긴급절전 필요)',
      tone: 'text-[#93000a] bg-[#ffdad6]',
      barColor: 'bg-[#ba1a1a]',
    };
  };

  const status = getAlertStage(reservePercent, reserveGw);
  const demandBarPct = Math.min(100, Math.round((demandGw / supplyGw) * 100));

  return (
    <aside className="space-y-4">
      {/* Substation Learning Center Hero Card */}
      <div className="bg-white rounded-2xl border border-[#dce9ff] overflow-hidden shadow-[0_2px_10px_rgba(11,28,48,0.04)]">
        <div className="relative h-36 bg-[#0b1c30] overflow-hidden">
          {!heroError ? (
            <img
              src="/src/assets/images/grid_substation_hero_1794967907498.jpg"
              alt="스마트 전력계통 변전소 및 송전망"
              referrerPolicy="no-referrer"
              onError={() => setHeroError(true)}
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0b1c30] via-[#004b73] to-[#007bb9] flex items-center justify-center">
              <Zap className="w-10 h-10 text-[#93ccff]" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30]/85 via-[#0b1c30]/25 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="text-[11px] font-medium text-[#cce5ff]">
              전력·에너지 실무 입문 커리큘럼
            </div>
            <div className="text-base font-bold leading-snug">
              오늘의 계통 학습 현황
            </div>
          </div>
        </div>

        <div className="p-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#f8f9ff] rounded-xl p-2.5 border border-[#e5eeff]">
            <div className="text-[11px] text-[#565e74]">누적 점수</div>
            <div className="text-base font-bold text-[#006194] font-mono-num mt-0.5">
              {totalScore}
            </div>
          </div>
          <div className="bg-[#f8f9ff] rounded-xl p-2.5 border border-[#e5eeff]">
            <div className="text-[11px] text-[#565e74]">풀이 문항</div>
            <div className="text-base font-bold text-[#0b1c30] font-mono-num mt-0.5">
              {solvedCount}
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenWrongNotes}
            className="bg-[#fff8ed] hover:bg-[#ffddb8]/50 rounded-xl p-2.5 border border-[#ffddb8] transition-colors cursor-pointer"
          >
            <div className="text-[11px] text-[#825100]">오답 · 북마크</div>
            <div className="text-base font-bold text-[#825100] font-mono-num mt-0.5">
              {wrongNotesCount} · {bookmarkedCount}
            </div>
          </button>
        </div>
      </div>

      {/* Quiz Track Selector */}
      <div className="bg-white rounded-2xl border border-[#dce9ff] p-4 space-y-3 shadow-[0_2px_10px_rgba(11,28,48,0.03)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm font-bold text-[#0b1c30]">
            <Layers className="w-4 h-4 text-[#006194]" />
            <span>학습 퀴즈 트랙 선택</span>
          </div>
          <span className="text-xs text-[#565e74]">{QUIZ_TRACKS.length}개 과정</span>
        </div>

        <div className="space-y-2">
          {QUIZ_TRACKS.map((track) => {
            const isActive = activeTrackId === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onSelectTrack(track)}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#eff4ff] border-[#006194] shadow-[0_2px_8px_rgba(0,97,148,0.08)]'
                    : 'bg-[#f8f9ff] border-[#e2e8f0] hover:border-[#93ccff]'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    {isActive && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#006194] shrink-0" />
                    )}
                    <span className="text-xs font-bold text-[#0b1c30] truncate">
                      {track.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#565e74] truncate mt-0.5">
                    {track.subtitle}
                  </p>
                </div>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#006194] shrink-0 font-mono-num">
                  {track.questionIds.length}문항
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Reserve Margin Simulator */}
      <div className="bg-white rounded-2xl border border-[#dce9ff] p-4 space-y-3.5 shadow-[0_2px_10px_rgba(11,28,48,0.03)]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-sm font-bold text-[#0b1c30]">
            <Gauge className="w-4 h-4 text-[#006194]" />
            <span>공급예비율 체감 시뮬레이터</span>
          </div>
          <Activity className="w-4 h-4 text-[#565e74]" />
        </div>

        <div className="bg-[#f8f9ff] rounded-xl border border-[#e5eeff] p-3.5 space-y-2.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs text-[#565e74]">실시간 계산 예비율</span>
            <span className="text-xl font-bold text-[#0b1c30] font-mono-num">
              {reservePercent.toFixed(1)}%
              <span className="text-xs font-medium text-[#565e74] ml-1">
                ({reserveGw.toFixed(1)}GW 여유)
              </span>
            </span>
          </div>

          <div className="w-full h-2.5 bg-[#e5eeff] rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#93ccff] transition-all duration-150"
              style={{ width: `${demandBarPct}%` }}
            />
            <div
              className={`h-full transition-all duration-150 ${status.barColor}`}
              style={{ width: `${100 - demandBarPct}%` }}
            />
          </div>

          <div className={`px-2.5 py-1.5 rounded-lg text-xs font-bold text-center ${status.tone}`}>
            {status.label}
          </div>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="space-y-1">
            <div className="flex justify-between font-medium text-[#3f4850]">
              <label htmlFor="supply-slider">총 공급능력 (GW)</label>
              <span className="font-mono-num font-bold text-[#0b1c30]">{supplyGw} GW</span>
            </div>
            <input
              id="supply-slider"
              type="range"
              min={85}
              max={120}
              value={supplyGw}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSupplyGw(val);
                if (demandGw > val) setDemandGw(val);
              }}
              className="w-full accent-[#006194] cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-medium text-[#3f4850]">
              <label htmlFor="demand-slider">현재 전력수요 (GW)</label>
              <span className="font-mono-num font-bold text-[#0b1c30]">{demandGw} GW</span>
            </div>
            <input
              id="demand-slider"
              type="range"
              min={65}
              max={supplyGw}
              value={demandGw}
              onChange={(e) => setDemandGw(Number(e.target.value))}
              className="w-full accent-[#006194] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
