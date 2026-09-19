import React, { useState } from 'react';
import {
  Atom,
  RotateCcw,
  Compass,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { calculateVseprShape, calculate3DPositions } from '../domain/vsepr/vseprEngine';
import { MoleculeCanvas } from '../components/3d/MoleculeCanvas';
import { NavigationDestination } from '../types';

interface SimulatorViewProps {
  onNavigate: (dest: NavigationDestination) => void;
}

const COMMON_CENTRAL_ATOMS = [
  { symbol: 'C', name: 'Carbon', valence: 4 },
  { symbol: 'N', name: 'Nitrogen', valence: 5 },
  { symbol: 'O', name: 'Oxygen', valence: 6 },
  { symbol: 'P', name: 'Phosphorus', valence: 5 },
  { symbol: 'S', name: 'Sulfur', valence: 6 },
  { symbol: 'Cl', name: 'Chlorine', valence: 7 },
  { symbol: 'Xe', name: 'Xenon', valence: 8 },
  { symbol: 'Be', name: 'Beryllium', valence: 2 },
  { symbol: 'B', name: 'Boron', valence: 3 }
];

export const SimulatorView: React.FC<SimulatorViewProps> = ({ onNavigate }) => {
  const [centralAtom, setCentralAtom] = useState('N');
  const [bondingPairs, setBondingPairs] = useState(3);
  const [lonePairs, setLonePairs] = useState(1);
  const [showExplanation, setShowExplanation] = useState(true);

  // 3D Toggles
  const [showLabels, setShowLabels] = useState(true);
  const [showLonePairs, setShowLonePairs] = useState(true);
  const [showBondAngles, setShowBondAngles] = useState(true);

  // VSEPR Engine Calculation
  const vsepr = calculateVseprShape(bondingPairs, lonePairs, centralAtom);
  const pos3d = calculate3DPositions(bondingPairs, lonePairs, 1.8);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <Atom className="w-4 h-4" />
            Interactive 3D VSEPR Laboratory
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-100">
            Molecular Shape Simulator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Select central atom, bonding regions, and lone pairs to observe 3D electron pair repulsion geometry.
          </p>
        </div>

        <button
          onClick={() => {
            setCentralAtom('N');
            setBondingPairs(3);
            setLonePairs(1);
          }}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Preset (NH₃)
        </button>
      </div>

      {/* Main 3-Pane Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2 pb-3 border-b border-slate-800">
            <Atom className="w-4 h-4 text-sky-400" />
            Molecular Configuration Controls
          </h2>

          {/* 1. Central Atom Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
              <span>1. Central Atom</span>
              <span className="text-[10px] text-sky-400 font-mono">
                Valence: {COMMON_CENTRAL_ATOMS.find(a => a.symbol === centralAtom)?.valence} e⁻
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {COMMON_CENTRAL_ATOMS.map((a) => (
                <button
                  key={a.symbol}
                  onClick={() => setCentralAtom(a.symbol)}
                  className={`p-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center ${
                    centralAtom === a.symbol
                      ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                      : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-sm font-black font-mono">{a.symbol}</span>
                  <span className="text-[9px] opacity-80">{a.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Bonding Regions Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>2. Bonding Regions</span>
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono">
                {bondingPairs} Regions
              </span>
            </div>
            <div className="flex items-center gap-2">
              {[2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setBondingPairs(num)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    bondingPairs === num
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Lone Pairs Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>3. Non-Bonding Lone Pairs</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                {lonePairs} Pairs
              </span>
            </div>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setLonePairs(num)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    lonePairs === num
                      ? 'bg-purple-500 text-slate-950'
                      : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Steric Number Calculation Box */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Steric Number =</span>
              <strong className="text-sky-400">{bondingPairs} + {lonePairs} = {vsepr.stericNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span>AXE Formula =</span>
              <strong className="text-purple-400">{vsepr.axeNotation}</strong>
            </div>
          </div>

          {/* Validation Error Message */}
          {!vsepr.isValid && (
            <div className="p-4 bg-amber-950/50 border border-amber-500/40 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-amber-300">Chemically Invalid Configuration</div>
                <div className="text-[11px] leading-relaxed">{vsepr.validationError}</div>
              </div>
            </div>
          )}
        </div>

        {/* Center Column: Interactive 3D Canvas */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            {/* 3D Canvas View */}
            <MoleculeCanvas
              atoms={pos3d.atoms.map((a, i) => ({
                symbol: i === 0 ? centralAtom : 'X',
                x: a.x,
                y: a.y,
                z: a.z,
                color: i === 0 ? '#3b82f6' : '#38bdf8',
                radius: i === 0 ? 0.55 : 0.4,
                isCentral: i === 0
              }))}
              bonds={pos3d.bonds.map(b => ({ fromIndex: b[0], toIndex: b[1], order: 1 }))}
              lonePairPositions={pos3d.atoms.filter(a => a.isLonePair).map(a => ({ x: a.x, y: a.y, z: a.z }))}
              showLabels={showLabels}
              showLonePairs={showLonePairs}
              showBondAngles={showBondAngles}
              approximateBondAngle={vsepr.approximateBondAngle}
              height="h-[450px]"
            />

            {/* Quick Result Summary Bar Below Canvas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-mono">AXE Notation</span>
                <div className="font-bold text-purple-400 text-sm mt-0.5">{vsepr.axeNotation}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Electron Geometry</span>
                <div className="font-bold text-blue-300 text-sm mt-0.5">{vsepr.electronGeometry}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Molecular Shape</span>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">{vsepr.molecularShape}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Bond Angle</span>
                <div className="font-bold text-amber-300 text-sm mt-0.5">{vsepr.approximateBondAngle}</div>
              </div>
            </div>
          </div>

          {/* Cambridge AS Level Explanation Accordion */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <button
              onClick={() => setShowExplanation(v => !v)}
              className="w-full flex items-center justify-between text-sm font-bold text-slate-100"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                Cambridge AS/A Level Explanation & Repulsion Analysis
              </span>
              {showExplanation ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {showExplanation && (
              <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-3">
                <p className="leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {vsepr.repulsionExplanation}
                </p>

                <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl text-purple-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-300">Exam Note: </strong>
                    {vsepr.cambridgeNotes}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
