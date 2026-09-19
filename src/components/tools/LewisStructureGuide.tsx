import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, HelpCircle, ChevronRight, RefreshCw, Zap } from 'lucide-react';
import { calculateVseprShape } from '../../domain/vsepr/vseprEngine';
import { MoleculeCanvas } from '../3d/MoleculeCanvas';
import { calculate3DPositions } from '../../domain/vsepr/vseprEngine';

const EXAMPLE_STEPS_MOLECULES = [
  { formula: 'NH3', name: 'Ammonia', central: 'N', valence: 5, bonds: 3, lone: 1 },
  { formula: 'H2O', name: 'Water', central: 'O', valence: 6, bonds: 2, lone: 2 },
  { formula: 'SF4', name: 'Sulfur Tetrafluoride', central: 'S', valence: 6, bonds: 4, lone: 1 },
  { formula: 'XeF4', name: 'Xenon Tetrafluoride', central: 'Xe', valence: 8, bonds: 4, lone: 2 }
];

export const LewisStructureGuide: React.FC = () => {
  const [selectedMolIdx, setSelectedMolIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const activeMol = EXAMPLE_STEPS_MOLECULES[selectedMolIdx];
  const vseprConfig = calculateVseprShape(activeMol.bonds, activeMol.lone, activeMol.central);
  const pos3d = calculate3DPositions(activeMol.bonds, activeMol.lone);

  const TOTAL_STEPS = 7;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep(s => s + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
            Guided Step-by-Step VSEPR Workflow
          </span>
          <h2 className="text-xl font-bold text-slate-100 mt-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-sky-400" />
            From Lewis Structure to 3D Molecular Geometry
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Master the exact 7-step Cambridge examination procedure for predicting shapes and bond angles.
          </p>
        </div>

        {/* Molecule Selector */}
        <div className="flex items-center gap-2">
          {EXAMPLE_STEPS_MOLECULES.map((m, idx) => (
            <button
              key={m.formula}
              onClick={() => {
                setSelectedMolIdx(idx);
                setCurrentStep(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedMolIdx === idx
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {m.formula}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Step {currentStep} of {TOTAL_STEPS}</span>
          <span className="font-semibold text-sky-400">{Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-blue-600 h-full transition-all duration-300"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Step Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 bg-slate-950/60 p-6 rounded-xl border border-slate-800">
          {currentStep === 1 && (
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold mb-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">1</span>
                Count Valence Electrons
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Locate the central atom <strong>{activeMol.central}</strong> in the Periodic Table.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 border border-slate-800">
                • Central Atom ({activeMol.central}): {activeMol.valence} valence electrons<br />
                • Total valence pool available for bonding and lone pairs.
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold mb-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">2</span>
                Identify Bonding Pairs around {activeMol.central}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Form single covalent σ-bonds between the central atom and terminal atoms.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 border border-slate-800">
                • Bonding Regions = <strong>{activeMol.bonds}</strong><br />
                • Each bond consumes shared electron pairs from the central atom.
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold mb-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">3</span>
                Calculate Non-Bonding Lone Pairs
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Subtract bonding electrons from valence electrons to find remaining lone pairs on {activeMol.central}.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 border border-slate-800">
                • Remaining non-bonding electrons = {activeMol.valence - activeMol.bonds}<br />
                • Lone Pairs = <strong>{activeMol.lone}</strong> lone pair(s)
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold mb-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">4</span>
                Determine Steric Number & AXE Notation
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Steric Number = Bonding Regions + Lone Pairs.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 border border-slate-800">
                • Steric Number = {activeMol.bonds} + {activeMol.lone} = <strong>{vseprConfig.stericNumber}</strong><br />
                • AXE Notation = <strong>{vseprConfig.axeNotation}</strong>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold mb-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">5</span>
                Identify Electron-Domain Geometry
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Arrangement of ALL electron pairs (bonding + lone) to minimize repulsion.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-emerald-300 border border-emerald-500/30">
                • Electron-Domain Geometry = <strong>{vseprConfig.electronGeometry}</strong>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div>
              <div className="flex items-center gap-2 text-sky-400 text-sm font-bold mb-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">6</span>
                Determine Molecular Shape (Ignore Lone Pairs!)
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Molecular shape describes ONLY the positions of atomic nuclei.
              </p>
              <div className="p-3 bg-purple-950/60 rounded-lg text-xs font-mono text-purple-200 border border-purple-500/30">
                • Molecular Shape = <strong>{vseprConfig.molecularShape}</strong><br />
                • Note: Lone pairs are not atoms, so they are not included in the molecular shape name!
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-2">
                <CheckCircle2 className="w-5 h-5" />
                Predict Bond Angles & Cambridge Explanation
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Account for LP-BP repulsion compressing ideal angles.
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-amber-300 border border-amber-500/30 space-y-2">
                <div>• Predicted Bond Angle: <strong>{vseprConfig.approximateBondAngle}</strong></div>
                <div className="text-[11px] text-slate-300 normal-case">{vseprConfig.repulsionExplanation}</div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1"
              title="Reset Guide"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep === TOTAL_STEPS}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-sky-500 text-slate-950 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 shadow-md shadow-sky-500/20"
            >
              <span>{currentStep === TOTAL_STEPS ? 'Complete' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3D Visualizer Sync */}
        <div className="lg:col-span-5">
          <MoleculeCanvas
            atoms={pos3d.atoms.map((a, i) => ({
              symbol: i === 0 ? activeMol.central : 'H',
              x: a.x,
              y: a.y,
              z: a.z,
              color: i === 0 ? '#3b82f6' : '#ffffff',
              radius: i === 0 ? 0.52 : 0.38,
              isCentral: i === 0
            }))}
            bonds={pos3d.bonds.map(b => ({ fromIndex: b[0], toIndex: b[1], order: 1 }))}
            lonePairPositions={pos3d.atoms.filter(a => a.isLonePair).map(a => ({ x: a.x, y: a.y, z: a.z }))}
            showLabels={true}
            showLonePairs={currentStep >= 3}
            showBondAngles={currentStep >= 7}
            approximateBondAngle={vseprConfig.approximateBondAngle}
            height="h-72"
          />
        </div>
      </div>
    </div>
  );
};
