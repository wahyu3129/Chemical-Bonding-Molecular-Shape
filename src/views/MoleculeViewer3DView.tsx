import React, { useState } from 'react';
import { Boxes, Search, Bookmark, BookmarkCheck, Sparkles, Filter, Info, ArrowRight } from 'lucide-react';
import { CAMBRIDGE_MOLECULE_DATABASE } from '../data/moleculeDatabase';
import { MoleculeCanvas } from '../components/3d/MoleculeCanvas';
import { StudentProgress } from '../types';

interface MoleculeViewer3DViewProps {
  progress: StudentProgress;
  onUpdateProgress: (newProg: StudentProgress) => void;
  selectedMoleculeId?: string;
}

export const MoleculeViewer3DView: React.FC<MoleculeViewer3DViewProps> = ({
  progress,
  onUpdateProgress,
  selectedMoleculeId
}) => {
  const [activeMolId, setActiveMolId] = useState(selectedMoleculeId || CAMBRIDGE_MOLECULE_DATABASE[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');

  const activeMolecule = CAMBRIDGE_MOLECULE_DATABASE.find(m => m.id === activeMolId) || CAMBRIDGE_MOLECULE_DATABASE[0];

  const filteredMolecules = CAMBRIDGE_MOLECULE_DATABASE.filter(m => {
    const matchesSearch = m.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = difficultyFilter === 'All' || m.difficulty === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const isBookmarked = progress.savedMolecules.includes(activeMolecule.id);

  const toggleBookmark = () => {
    const updated = isBookmarked
      ? progress.savedMolecules.filter(id => id !== activeMolecule.id)
      : [...progress.savedMolecules, activeMolecule.id];

    onUpdateProgress({ ...progress, savedMolecules: updated });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <Boxes className="w-4 h-4" />
            Cambridge Examination Molecule Bank
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-100">
            3D Molecule & Ion Viewer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore 23+ essential Cambridge AS/A Level molecules and polyatomic ions with real 3D atomic coordinates.
          </p>
        </div>

        <button
          onClick={toggleBookmark}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
            isBookmarked
              ? 'bg-amber-500 text-slate-950 shadow-amber-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
          }`}
        >
          {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          <span>{isBookmarked ? 'Bookmarked in Saved List' : 'Bookmark Molecule'}</span>
        </button>
      </div>

      {/* Main Grid: Sidebar List & 3D Viewer Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Molecule Selector List (Left Column) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4 max-h-[750px] flex flex-col">
          {/* Search & Filter Controls */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search H2O, NH3, SF6..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
              {['All', 'Foundation', 'Standard AS', 'Challenging AS/A Level'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficultyFilter(d)}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-all ${
                    difficultyFilter === d
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Molecule List Scroll Area */}
          <div className="overflow-y-auto space-y-2 flex-1 pr-1">
            {filteredMolecules.map((m) => {
              const isActive = m.id === activeMolId;

              return (
                <div
                  key={m.id}
                  onClick={() => setActiveMolId(m.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-950/60 border-sky-500 text-slate-100 shadow-md shadow-sky-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sky-400 text-sm">{m.formula}</span>
                      {m.isIon && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Ion ({m.charge && m.charge > 0 ? `+${m.charge}` : m.charge})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-300">{m.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {m.molecularShape} • <span className="font-mono">{m.bondAngle}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-300">
                    {m.axeNotation}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3D Display & Details Pane (Right Column) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-sky-400 font-mono">{activeMolecule.formula}</h2>
                <span className="text-sm font-semibold text-slate-300">({activeMolecule.name})</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{activeMolecule.exampleContext}</p>
            </div>

            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold font-mono">
              {activeMolecule.difficulty}
            </span>
          </div>

          {/* 3D Canvas */}
          <MoleculeCanvas
            atoms={activeMolecule.atoms}
            bonds={activeMolecule.bonds}
            lonePairPositions={activeMolecule.lonePairPositions}
            showLabels={true}
            showLonePairs={true}
            showBondAngles={true}
            approximateBondAngle={activeMolecule.bondAngle}
            height="h-[420px]"
          />

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Central Atom</span>
              <div className="font-bold text-sky-300 text-sm mt-0.5">{activeMolecule.centralAtom}</div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">AXE Notation</span>
              <div className="font-bold text-purple-400 text-sm mt-0.5">{activeMolecule.axeNotation}</div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Electron Geometry</span>
              <div className="font-bold text-blue-300 text-sm mt-0.5">{activeMolecule.electronGeometry}</div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Molecular Shape</span>
              <div className="font-bold text-emerald-400 text-sm mt-0.5">{activeMolecule.molecularShape}</div>
            </div>
          </div>

          {/* Cambridge Explanation Box */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Cambridge AS Level Chemistry Explanation
            </div>
            <p className="leading-relaxed text-slate-300">{activeMolecule.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
