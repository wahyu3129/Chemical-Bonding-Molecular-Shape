import React, { useState } from 'react';
import { Shield, Zap, Sparkles, ArrowRightLeft } from 'lucide-react';

export const RepulsionCanvas: React.FC = () => {
  const [lpLpCount, setLpLpCount] = useState(2);
  const [bpBpCount, setBpBpCount] = useState(2);
  const [showForceVectors, setShowForceVectors] = useState(true);

  // Repulsion strengths in arbitrary units
  const LP_LP_FORCE = 10;
  const LP_BP_FORCE = 7;
  const BP_BP_FORCE = 4;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Electron Domain Repulsion Strength Visualizer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Qualitative VSEPR electrostatic repulsion hierarchy in Cambridge AS/A Level Chemistry.
          </p>
        </div>

        <button
          onClick={() => setShowForceVectors(v => !v)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
            showForceVectors ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          {showForceVectors ? 'Hide Repulsion Vectors' : 'Show Repulsion Vectors'}
        </button>
      </div>

      {/* Visual Hierarchy Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* LP-LP */}
        <div className="bg-purple-950/40 border border-purple-500/30 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Lone Pair — Lone Pair
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 font-mono font-bold">
              MAXIMUM Repulsion
            </span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-full animate-pulse" />
          </div>
          <p className="text-[11px] text-purple-200/80 leading-relaxed">
            Unshared electron clouds are held closer to one nucleus, exerting intense electrostatic repulsion against adjacent lone pairs.
          </p>
        </div>

        {/* LP-BP */}
        <div className="bg-sky-950/40 border border-sky-500/30 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-sky-300 flex items-center gap-1">
              <Shield className="w-4 h-4 text-sky-400" />
              Lone Pair — Bonding Pair
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/30 text-sky-200 font-mono font-bold">
              STRONG Repulsion
            </span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2">
            <div className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full w-[70%]" />
          </div>
          <p className="text-[11px] text-sky-200/80 leading-relaxed">
            Pushes bonding pairs closer together, compressing ideal bond angles (e.g. 109.5° → 107° in NH₃).
          </p>
        </div>

        {/* BP-BP */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
              <Shield className="w-4 h-4 text-emerald-400" />
              Bonding Pair — Bonding Pair
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-mono font-bold">
              MODERATE Repulsion
            </span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[40%]" />
          </div>
          <p className="text-[11px] text-emerald-200/80 leading-relaxed">
            Electrons are shared between two atomic nuclei, spreading out charge and exerting the weakest relative repulsion.
          </p>
        </div>
      </div>

      {/* Interactive Inequality Statement */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-mono text-sm md:text-base text-amber-300 font-bold tracking-wide">
        LP — LP Repulsion &gt; LP — BP Repulsion &gt; BP — BP Repulsion
      </div>
    </div>
  );
};
