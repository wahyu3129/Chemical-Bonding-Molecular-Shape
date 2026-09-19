import React from 'react';
import { BarChart3, Trophy, CheckCircle2, Bookmark, Award, RotateCcw } from 'lucide-react';
import { StudentProgress, NavigationDestination } from '../types';
import { CAMBRIDGE_MOLECULE_DATABASE } from '../data/moleculeDatabase';

interface ProgressViewProps {
  progress: StudentProgress;
  onUpdateProgress: (newProg: StudentProgress) => void;
  onNavigate: (dest: NavigationDestination) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onUpdateProgress,
  onNavigate
}) => {
  const accuracy = progress.totalQuestionsAnswered > 0
    ? Math.round((progress.totalCorrectAnswers / progress.totalQuestionsAnswered) * 100)
    : 0;

  const savedMols = CAMBRIDGE_MOLECULE_DATABASE.filter(m => progress.savedMolecules.includes(m.id));

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all your learning progress and challenge scores?')) {
      onUpdateProgress({
        topicMastery: {
          'Chemical Bonding': 0,
          'Molecular Formulae': 0,
          'VSEPR Theory': 0,
          'Common Molecular Shapes': 0,
          'Bond Angles': 0
        },
        completedLessons: [],
        quizAttemptsCount: 0,
        quizScores: {},
        totalCorrectAnswers: 0,
        totalQuestionsAnswered: 0,
        exploredMolecules: [],
        savedMolecules: [],
        challengeHighScore: 0,
        challengeHighScores: {},
        misconceptionsLogged: [],
        lastAccessedTime: Date.now()
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            Cambridge AS Level Mastery Analytics
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-100">
            Student Progress Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track quiz accuracy, challenge scores, completed lessons, and bookmarked molecules.
          </p>
        </div>

        <button
          onClick={handleResetProgress}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Progress
        </button>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono">Quiz Accuracy</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">{accuracy}%</div>
          <p className="text-[11px] text-slate-500 mt-1">{progress.totalCorrectAnswers} of {progress.totalQuestionsAnswered} answered correctly</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono">Challenge High Score</span>
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">{progress.challengeHighScore}</div>
          <p className="text-[11px] text-slate-500 mt-1">VSEPR shape prediction points</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono">Completed Lessons</span>
            <Award className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-sky-400 font-mono">{progress.completedLessons.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Modules completed in syllabus</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono">Saved Molecules</span>
            <Bookmark className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400 font-mono">{savedMoleculesCount(progress)}</div>
          <p className="text-[11px] text-slate-500 mt-1">Bookmarked for revision</p>
        </div>
      </div>

      {/* Saved Molecules Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-purple-400" />
          Bookmarked Cambridge Molecules ({savedMols.length})
        </h2>

        {savedMols.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            No molecules bookmarked yet. Click the bookmark icon in the 3D Viewer to save molecules for quick revision!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {savedMols.map(m => (
              <div
                key={m.id}
                onClick={() => onNavigate('molecule_3d')}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 cursor-pointer hover:border-purple-500/40 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-sky-400 font-mono text-sm">{m.formula}</div>
                  <div className="text-xs text-slate-300">{m.name}</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">{m.molecularShape} ({m.bondAngle})</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-purple-300">
                  {m.axeNotation}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function savedMoleculesCount(prog: StudentProgress): number {
  return prog.savedMolecules ? prog.savedMolecules.length : 0;
}
