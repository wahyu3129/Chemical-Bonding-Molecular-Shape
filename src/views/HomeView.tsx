import React from 'react';
import {
  Atom,
  Compass,
  FileCode2,
  Trophy,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Sparkles,
  Bookmark,
  BarChart2
} from 'lucide-react';
import { NavigationDestination, StudentProgress } from '../types';
import { CAMBRIDGE_MOLECULE_DATABASE } from '../data/moleculeDatabase';
import { MoleculeCanvas } from '../components/3d/MoleculeCanvas';
import { calculate3DPositions } from '../domain/vsepr/vseprEngine';

interface HomeViewProps {
  progress: StudentProgress;
  onNavigate: (dest: NavigationDestination) => void;
  onSelectMolecule: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onNavigate,
  onSelectMolecule
}) => {
  const featuredMolecules = CAMBRIDGE_MOLECULE_DATABASE.filter(m =>
    ['ch4', 'nh3', 'h2o', 'sf4'].includes(m.id)
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 translate-y-12 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Cambridge International AS & A Level Chemistry (9701)
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Master Molecular Shapes & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">VSEPR Theory</span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Predict → Manipulate → Observe → Explain. Explore 3D electron pair repulsion, lone pair distortion, and formula conversions through an interactive chemistry laboratory.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('simulator')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Atom className="w-4 h-4" />
              Launch 3D Shape Simulator
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('learn')}
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              Explore Syllabus Modules
            </button>
          </div>
        </div>
      </div>

      {/* Shortcuts Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-400" />
          Interactive Learning Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div
            onClick={() => onNavigate('simulator')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-sky-500/40 p-5 rounded-2xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Atom className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1 group-hover:text-sky-300 transition-colors">
              Molecular Shape Simulator
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Build custom molecules, adjust bonding pairs & lone pairs, and inspect steric geometries in 3D.
            </p>
            <span className="text-xs font-semibold text-sky-400 flex items-center gap-1 group-hover:underline">
              Launch Simulator <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onNavigate('vsepr_explorer')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 p-5 rounded-2xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1 group-hover:text-purple-300 transition-colors">
              VSEPR Explorer
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Compare Electron-Domain Geometry vs Molecular Shape and see how lone pairs compress bond angles.
            </p>
            <span className="text-xs font-semibold text-purple-400 flex items-center gap-1 group-hover:underline">
              Explore VSEPR <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onNavigate('formula_explorer')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileCode2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1 group-hover:text-emerald-300 transition-colors">
              Formula Explorer
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Convert empirical, molecular, structural, and displayed formulae with instant feedback.
            </p>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:underline">
              Convert Formulae <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => onNavigate('challenge')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-100 text-base mb-1 group-hover:text-amber-300 transition-colors">
              Challenge Mode
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Predict molecular shapes, AXE notations, and bond angles before revealing solutions.
            </p>
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:underline">
              Start Challenges <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Featured Molecules Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Atom className="w-5 h-5 text-sky-400" />
            Featured Cambridge Exam Molecules
          </h2>
          <button
            onClick={() => onNavigate('molecule_3d')}
            className="text-xs font-semibold text-sky-400 hover:underline flex items-center gap-1"
          >
            View All 23 Molecules <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredMolecules.map((m) => {
            const pos3d = calculate3DPositions(m.bondingRegions, m.lonePairs, 1.4);

            return (
              <div
                key={m.id}
                onClick={() => {
                  onSelectMolecule(m.id);
                  onNavigate('molecule_3d');
                }}
                className="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-md group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-black text-sky-400 font-mono">{m.formula}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                    {m.axeNotation}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-200 mb-2 truncate">{m.name}</div>

                {/* 3D Preview Canvas */}
                <MoleculeCanvas
                  atoms={pos3d.atoms.map((a, i) => ({
                    symbol: i === 0 ? m.centralAtom : 'H',
                    x: a.x,
                    y: a.y,
                    z: a.z,
                    color: i === 0 ? '#3b82f6' : '#38bdf8',
                    radius: i === 0 ? 0.5 : 0.38,
                    isCentral: i === 0
                  }))}
                  bonds={pos3d.bonds.map(b => ({ fromIndex: b[0], toIndex: b[1], order: 1 }))}
                  lonePairPositions={pos3d.atoms.filter(a => a.isLonePair).map(a => ({ x: a.x, y: a.y, z: a.z }))}
                  showLabels={false}
                  showLonePairs={true}
                  showBondAngles={false}
                  height="h-40"
                />

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Shape: <strong className="text-emerald-400">{m.molecularShape}</strong></span>
                  <span className="font-mono text-amber-300">{m.bondAngle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mastery Progress Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-slate-100 text-base">Cambridge AS Chemistry Progress</h3>
          </div>
          <p className="text-xs text-slate-400">
            You have completed <strong>{progress.completedLessons.length}</strong> lessons and answered <strong>{progress.totalCorrectAnswers}</strong> of {progress.totalQuestionsAnswered} quiz questions correctly.
          </p>
        </div>

        <button
          onClick={() => onNavigate('progress')}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 shrink-0 transition-colors"
        >
          View Full Dashboard
        </button>
      </div>
    </div>
  );
};
