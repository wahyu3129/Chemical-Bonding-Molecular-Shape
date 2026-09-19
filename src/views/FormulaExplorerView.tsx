import React, { useState } from 'react';
import { FileCode2, ArrowRight, CheckCircle2, XCircle, RefreshCw, HelpCircle, Sparkles, Calculator } from 'lucide-react';
import { FORMULA_REPRESENTATIONS, FORMULA_CONVERSION_PROBLEMS } from '../data/curriculumData';

export const FormulaExplorerView: React.FC = () => {
  const [selectedRepId, setSelectedRepId] = useState(FORMULA_REPRESENTATIONS[0].id);

  // Conversion calculator state
  const [activeProblemIdx, setActiveProblemIdx] = useState(0);
  const [studentInput, setStudentInput] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const activeRep = FORMULA_REPRESENTATIONS.find(r => r.id === selectedRepId) || FORMULA_REPRESENTATIONS[0];
  const activeProb = FORMULA_CONVERSION_PROBLEMS[activeProblemIdx];

  const handleCheckAnswer = () => {
    if (!studentInput.trim()) return;
    setHasSubmitted(true);
  };

  const isCorrect = studentInput.trim().toUpperCase() === activeProb.correctAnswer.toUpperCase();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* View Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <FileCode2 className="w-4 h-4" />
          Cambridge AS Level Chemistry Notation
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-100">
          Molecular Formula Explorer & Converter
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Master empirical, molecular, structural, displayed, condensed, and skeletal formulae required for Cambridge AS/A Level Chemistry calculations.
        </p>
      </div>

      {/* Section 1: Representations Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            1. Formula Representations Explorer
          </h2>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {FORMULA_REPRESENTATIONS.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRepId(r.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all font-mono shrink-0 ${
                  selectedRepId === r.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {r.molecularFormula} ({r.name})
              </button>
            ))}
          </div>
        </div>

        {/* Display Grid of Representations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Molecular Formula</span>
            <div className="text-xl font-black text-emerald-400 font-mono mt-1">{activeRep.molecularFormula}</div>
            <p className="text-[11px] text-slate-400 mt-2">Actual number of atoms of each element in one molecule.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Empirical Formula</span>
            <div className="text-xl font-black text-sky-400 font-mono mt-1">{activeRep.empiricalFormula}</div>
            <p className="text-[11px] text-slate-400 mt-2">Simplest whole-number ratio of atoms present in compound.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Structural Formula</span>
            <div className="text-base font-bold text-purple-300 font-mono mt-1">{activeRep.structuralFormula}</div>
            <p className="text-[11px] text-slate-400 mt-2">Shows atom arrangement group by group without drawing all bonds.</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Condensed Structural</span>
            <div className="text-base font-bold text-amber-300 font-mono mt-1">{activeRep.condensedFormula}</div>
            <p className="text-[11px] text-slate-400 mt-2">Compact text notation suitable for organic reactions.</p>
          </div>

          {activeRep.skeletalFormula && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Skeletal Formula</span>
              <div className="text-base font-bold text-teal-300 font-mono mt-1">{activeRep.skeletalFormula}</div>
              <p className="text-[11px] text-slate-400 mt-2">Simplified organic line representation omitting C-H bonds.</p>
            </div>
          )}

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">Molar Mass</span>
            <div className="text-lg font-bold text-slate-200 font-mono mt-1">{activeRep.molarMass} g/mol</div>
            <p className="text-[11px] text-slate-400 mt-2">{activeRep.description}</p>
          </div>
        </div>
      </div>

      {/* Section 2: Interactive "Convert Formula" Activity */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-400" />
              2. Interactive Formula Converter Activity
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Practice calculating empirical and molecular formulas from composition data with step-by-step explanations.
            </p>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300">
            Problem {activeProblemIdx + 1} of {FORMULA_CONVERSION_PROBLEMS.length}
          </span>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="text-sm text-slate-200">
            Compound: <strong className="text-sky-400">{activeProb.compoundName}</strong> | Given Molecular Formula: <strong className="font-mono text-emerald-400">{activeProb.molecularFormula}</strong>
          </div>

          <div className="text-sm font-semibold text-slate-100">
            Task: Calculate the <span className="text-purple-300 uppercase">Empirical Formula</span> for this compound.
          </div>

          {/* Input field */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={studentInput}
              onChange={(e) => {
                setStudentInput(e.target.value);
                setHasSubmitted(false);
              }}
              placeholder="e.g. CH2O, NO2, C2H5..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-sky-500"
            />

            <button
              onClick={handleCheckAnswer}
              disabled={!studentInput.trim()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20"
            >
              Submit Answer
            </button>
          </div>

          {/* Hint & Navigation Buttons */}
          <div className="flex items-center justify-between text-xs pt-2">
            <button
              onClick={() => setShowHint(h => !h)}
              className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <HelpCircle className="w-4 h-4" />
              {showHint ? 'Hide Hint' : 'Show Calculation Hint'}
            </button>

            <button
              onClick={() => {
                setActiveProblemIdx(i => (i + 1) % FORMULA_CONVERSION_PROBLEMS.length);
                setStudentInput('');
                setHasSubmitted(false);
                setShowHint(false);
              }}
              className="text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              Next Problem <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Hint Message Box */}
          {showHint && (
            <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-lg text-xs text-amber-200">
              💡 {activeProb.hint}
            </div>
          )}

          {/* Feedback & Step Explanation */}
          {hasSubmitted && (
            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              isCorrect ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Correct! Great job.
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    Not quite. Correct Answer: <span className="font-mono text-white">{activeProb.correctAnswer}</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed text-slate-300">{activeProb.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
