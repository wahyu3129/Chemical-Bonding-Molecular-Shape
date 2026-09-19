import React, { useState } from 'react';
import { Trophy, HelpCircle, CheckCircle2, XCircle, ArrowRight, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { CHALLENGE_PROBLEMS } from '../data/curriculumData';
import { MoleculeCanvas } from '../components/3d/MoleculeCanvas';
import { calculate3DPositions } from '../domain/vsepr/vseprEngine';
import { StudentProgress } from '../types';

interface ChallengeViewProps {
  progress: StudentProgress;
  onUpdateProgress: (newProg: StudentProgress) => void;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [problemIndex, setProblemIndex] = useState(0);

  // Student inputs
  const [selectedBonds, setSelectedBonds] = useState<number | null>(null);
  const [selectedLone, setSelectedLone] = useState<number | null>(null);
  const [selectedAxe, setSelectedAxe] = useState<string>('');
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [selectedAngle, setSelectedAngle] = useState<string>('');

  // Challenge State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  const problem = CHALLENGES_LIST[problemIndex] || CHALLENGES_LIST[0];

  const handleNextProblem = () => {
    setProblemIndex(i => (i + 1) % CHALLENGES_LIST.length);
    setSelectedBonds(null);
    setSelectedLone(null);
    setSelectedAxe('');
    setSelectedShape('');
    setSelectedAngle('');
    setIsSubmitted(false);
    setHintLevel(0);
  };

  const handleCheckAnswer = () => {
    setIsSubmitted(true);

    const isCorrect = selectedShape === problem.correctShape &&
                      selectedAngle === problem.correctAngle;

    if (isCorrect) {
      onUpdateProgress({
        ...progress,
        challengeHighScore: Math.max(progress.challengeHighScore, (problemIndex + 1) * 100),
        totalCorrectAnswers: progress.totalCorrectAnswers + 1,
        totalQuestionsAnswered: progress.totalQuestionsAnswered + 1
      });
    } else {
      onUpdateProgress({
        ...progress,
        totalQuestionsAnswered: progress.totalQuestionsAnswered + 1
      });
    }
  };

  const isFullyCorrect = isSubmitted &&
                         selectedShape === problem.correctShape &&
                         selectedAngle === problem.correctAngle;

  const pos3d = calculate3DPositions(problem.bondingPairs, problem.lonePairs, 1.6);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            VSEPR Master Challenge
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-100">
            Predict the Molecular Geometry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Test your Cambridge AS/A Level knowledge by predicting bonding pairs, lone pairs, shapes, and bond angles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-center">
            <span className="text-[10px] text-slate-500 uppercase block">High Score</span>
            <span className="text-amber-400 font-bold text-sm">{progress.challengeHighScore} pts</span>
          </div>
        </div>
      </div>

      {/* Main Challenge Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Challenge Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-slate-500 font-mono">Problem {problemIndex + 1} of {CHALLENGES_LIST.length}</span>
              <h2 className="text-xl font-black text-sky-400 font-mono mt-0.5">{problem.formula} ({problem.name})</h2>
            </div>

            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold font-mono">
              Central: {problem.centralAtom}
            </span>
          </div>

          {/* Predict 1: Bonding Regions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">1. Predict Bonding Regions on {problem.centralAtom}</label>
            <div className="flex gap-2">
              {[2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  onClick={() => setSelectedBonds(num)}
                  disabled={isSubmitted}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedBonds === num
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Predict 2: Lone Pairs */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">2. Predict Lone Pairs on {problem.centralAtom}</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map(num => (
                <button
                  key={num}
                  onClick={() => setSelectedLone(num)}
                  disabled={isSubmitted}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedLone === num
                      ? 'bg-purple-500 text-slate-950'
                      : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Predict 3: Molecular Shape */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">3. Predict Molecular Shape</label>
            <select
              value={selectedShape}
              onChange={(e) => setSelectedShape(e.target.value)}
              disabled={isSubmitted}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 font-semibold focus:outline-none focus:border-sky-500"
            >
              <option value="">-- Select Molecular Shape --</option>
              {SHAPE_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Predict 4: Bond Angle */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">4. Predict Bond Angle</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ANGLE_OPTIONS.map(angle => (
                <button
                  key={angle}
                  onClick={() => setSelectedAngle(angle)}
                  disabled={isSubmitted}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedAngle === angle
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {angle}
                </button>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
            <button
              onClick={() => setHintLevel(h => Math.min(2, h + 1))}
              disabled={isSubmitted || hintLevel >= 2}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold disabled:opacity-40"
            >
              <HelpCircle className="w-4 h-4" />
              {hintLevel === 0 ? 'Need Hint 1' : hintLevel === 1 ? 'Need Hint 2' : 'All Hints Revealed'}
            </button>

            {!isSubmitted ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedShape || !selectedAngle}
                className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-all shadow-md shadow-sky-500/20"
              >
                Submit Prediction
              </button>
            ) : (
              <button
                onClick={handleNextProblem}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
              >
                <span>Next Molecule</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Hints Display */}
          {hintLevel > 0 && (
            <div className="space-y-2 pt-2 text-xs">
              {hintLevel >= 1 && (
                <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-amber-200">
                  💡 <strong>Hint 1:</strong> Central atom {problem.centralAtom} has {problem.valenceElectrons} valence electrons.
                </div>
              )}
              {hintLevel >= 2 && (
                <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl text-purple-200">
                  💡 <strong>Hint 2:</strong> {problem.hintNote}
                </div>
              )}
            </div>
          )}

          {/* Feedback Section */}
          {isSubmitted && (
            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              isFullyCorrect ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {isFullyCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Correct Prediction! +100 Points
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    Incorrect Prediction. Review solution below.
                  </>
                )}
              </div>
              <p className="leading-relaxed text-slate-300">{problem.explanation}</p>
            </div>
          )}
        </div>

        {/* Right Column: 3D Visualization */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            3D Molecular Target Reveal
          </h3>

          <MoleculeCanvas
            atoms={pos3d.atoms.map((a, i) => ({
              symbol: i === 0 ? problem.centralAtom : 'X',
              x: a.x,
              y: a.y,
              z: a.z,
              color: i === 0 ? '#3b82f6' : '#38bdf8',
              radius: i === 0 ? 0.5 : 0.38,
              isCentral: i === 0
            }))}
            bonds={pos3d.bonds.map(b => ({ fromIndex: b[0], toIndex: b[1], order: 1 }))}
            lonePairPositions={isSubmitted ? pos3d.atoms.filter(a => a.isLonePair).map(a => ({ x: a.x, y: a.y, z: a.z })) : []}
            showLabels={isSubmitted}
            showLonePairs={isSubmitted}
            showBondAngles={isSubmitted}
            approximateBondAngle={problem.correctAngle}
            height="h-80"
          />

          {isSubmitted && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-sky-400 font-bold">Official Cambridge Data:</div>
              <div className="text-slate-300">• Shape: {problem.correctShape}</div>
              <div className="text-slate-300">• Bond Angle: {problem.correctAngle}</div>
              <div className="text-slate-300">• AXE Notation: {problem.correctAxe}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SHAPE_OPTIONS = [
  'Linear',
  'Trigonal Planar',
  'Bent (V-shaped)',
  'Tetrahedral',
  'Trigonal Pyramidal',
  'Trigonal Bipyramidal',
  'Seesaw',
  'T-shaped',
  'Octahedral',
  'Square Pyramidal',
  'Square Planar'
];

const ANGLE_OPTIONS = [
  '180°',
  '120°',
  '109.5°',
  '107°',
  '104.5°',
  '90° and 120°',
  '90° and 180°',
  '&lt; 120° and &lt; 90°'
];

const CHALLENGES_LIST = [
  {
    formula: 'NH3',
    name: 'Ammonia',
    centralAtom: 'N',
    valenceElectrons: 5,
    bondingPairs: 3,
    lonePairs: 1,
    correctAxe: 'AX3E',
    correctShape: 'Trigonal Pyramidal',
    correctAngle: '107°',
    hintNote: '4 total electron pairs around N, 1 is a non-bonding lone pair.',
    explanation: 'Nitrogen has 5 valence electrons. It forms 3 bonding pairs with Hydrogen and retains 1 lone pair (AX3E). Lone pair–bonding pair repulsion reduces the tetrahedral angle from 109.5° to 107°.'
  },
  {
    formula: 'SF4',
    name: 'Sulfur Tetrafluoride',
    centralAtom: 'S',
    valenceElectrons: 6,
    bondingPairs: 4,
    lonePairs: 1,
    correctAxe: 'AX4E',
    correctShape: 'Seesaw',
    correctAngle: '&lt; 120° and &lt; 90°',
    hintNote: '5 total electron pairs (trigonal bipyramidal electron geometry). Lone pair occupies an equatorial position.',
    explanation: 'Sulfur expands its octet to hold 5 electron pairs (4 bonding, 1 lone pair - AX4E). The lone pair occupies an equatorial position to minimize 90° repulsions, producing a Seesaw shape.'
  },
  {
    formula: 'XeF4',
    name: 'Xenon Tetrafluoride',
    centralAtom: 'Xe',
    valenceElectrons: 8,
    bondingPairs: 4,
    lonePairs: 2,
    correctAxe: 'AX4E2',
    correctShape: 'Square Planar',
    correctAngle: '90° and 180°',
    hintNote: '6 total electron pairs (octahedral electron geometry). 2 lone pairs are positioned 180° opposite.',
    explanation: 'Xenon has 8 valence electrons, forming 4 bonds with Fluorine and holding 2 lone pairs (AX4E2). The 2 lone pairs sit 180° apart on axial positions to minimize LP-LP repulsion, resulting in a Square Planar geometry.'
  }
];
