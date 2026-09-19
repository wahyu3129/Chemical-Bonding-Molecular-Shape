import React, { useState } from 'react';
import { Compass, Plus, Minus, ArrowRight, ArrowRightLeft, Sparkles } from 'lucide-react';
import { calculateVseprShape, calculate3DPositions } from '../domain/vsepr/vseprEngine';
import { MoleculeCanvas } from '../components/3d/MoleculeCanvas';
import { RepulsionCanvas } from '../components/3d/RepulsionCanvas';

export const VseprExplorerView: React.FC = () => {
  const [bondingPairs, setBondingPairs] = useState(3);
  const [lonePairs, setLonePairs] = useState(1);
  const [centralAtom, setCentralAtom] = useState('N');

  const vsepr = calculateVseprShape(bondingPairs, lonePairs, centralAtom);
  const pos3d = calculate3DPositions(bondingPairs, lonePairs, 1.8);

  const incrementBP = () => setBondingPairs(b => Math.min(6, b + 1));
  const decrementBP = () => setBondingPairs(b => Math.max(2, b - 1));

  const incrementLP = () => setLonePairs(l => Math.min(3, l + 1));
  const decrementLP = () => setLonePairs(l => Math.max(0, l - 1));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          Distinction Explorer
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-100">
          VSEPR Geometry & Repulsion Explorer
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Observe the essential Cambridge AS Level distinction between Electron-Domain Geometry (all domains) and Molecular Shape (positions of atomic nuclei).
        </p>
      </div>

      {/* Control Panel Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Central Atom */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">Central Atom</label>
          <div className="flex items-center gap-2">
            {['C', 'N', 'O', 'S', 'P', 'Xe'].map((atom) => (
              <button
                key={atom}
                onClick={() => setCentralAtom(atom)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                  centralAtom === atom
                    ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                    : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {atom}
              </button>
            ))}
          </div>
        </div>

        {/* Bonding Regions Stepper */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">Bonding Regions</label>
          <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800">
            <button
              onClick={decrementBP}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-sky-400 text-base">{bondingPairs}</span>
            <button
              onClick={incrementBP}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lone Pairs Stepper */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300">Lone Pairs</label>
          <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800">
            <button
              onClick={decrementLP}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-purple-400 text-base">{lonePairs}</span>
            <button
              onClick={incrementLP}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Electron Domain Geometry Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-sky-400 uppercase font-mono">Includes Lone Pairs</span>
              <h3 className="text-lg font-bold text-slate-100">Electron-Domain Geometry</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold text-xs">
              {vsepr.electronGeometry}
            </span>
          </div>

          <MoleculeCanvas
            atoms={pos3d.atoms.map((a, i) => ({
              symbol: i === 0 ? centralAtom : 'X',
              x: a.x,
              y: a.y,
              z: a.z,
              color: i === 0 ? '#3b82f6' : '#38bdf8',
              radius: i === 0 ? 0.5 : 0.38,
              isCentral: i === 0
            }))}
            bonds={pos3d.bonds.map(b => ({ fromIndex: b[0], toIndex: b[1], order: 1 }))}
            lonePairPositions={pos3d.atoms.filter(a => a.isLonePair).map(a => ({ x: a.x, y: a.y, z: a.z }))}
            showLabels={true}
            showLonePairs={true}
            showBondAngles={false}
            height="h-72"
          />

          <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            Considers all {vsepr.stericNumber} regions of electron density (bonding + lone pairs) repelling to maximum 3D separation around {centralAtom}.
          </p>
        </div>

        {/* Molecular Shape Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono">Atomic Nuclei Only</span>
              <h3 className="text-lg font-bold text-slate-100">Molecular Shape</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs">
              {vsepr.molecularShape}
            </span>
          </div>

          <MoleculeCanvas
            atoms={pos3d.atoms.map((a, i) => ({
              symbol: i === 0 ? centralAtom : 'X',
              x: a.x,
              y: a.y,
              z: a.z,
              color: i === 0 ? '#3b82f6' : '#38bdf8',
              radius: i === 0 ? 0.5 : 0.38,
              isCentral: i === 0
            }))}
            bonds={pos3d.bonds.map(b => ({ fromIndex: b[0], toIndex: b[1], order: 1 }))}
            lonePairPositions={[]} // Hidden lone pair lobes to isolate atomic nuclei!
            showLabels={true}
            showLonePairs={false}
            showBondAngles={true}
            approximateBondAngle={vsepr.approximateBondAngle}
            height="h-72"
          />

          <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            Names the arrangement formed strictly by the atomic nuclei positions. Lone pairs are invisible in structural analysis but distort bond angles to {vsepr.approximateBondAngle}.
          </p>
        </div>
      </div>

      {/* Electrostatic Repulsion Hierarchy Component */}
      <RepulsionCanvas />
    </div>
  );
};
