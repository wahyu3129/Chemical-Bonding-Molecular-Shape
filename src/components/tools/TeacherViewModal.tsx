import React, { useState } from 'react';
import { X, GraduationCap, BookOpen, CheckCircle, HelpCircle, Layers, FileText } from 'lucide-react';
import { CAMBRIDGE_MOLECULE_DATABASE } from '../../data/moleculeDatabase';
import { CAMBRIDGE_QUIZ_BANK } from '../../data/curriculumData';

interface TeacherViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherViewModal: React.FC<TeacherViewModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'objectives' | 'molecules' | 'questions' | 'activities'>('objectives');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Teacher View & Curriculum Alignment</h2>
              <p className="text-xs text-slate-400">Cambridge International AS & A Level Chemistry Syllabus (9701)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/50 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('objectives')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'objectives'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Learning Objectives
          </button>
          <button
            onClick={() => setActiveTab('molecules')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'molecules'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            Molecules Bank ({CAMBRIDGE_MOLECULE_DATABASE.length})
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'questions'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Exam Question Bank
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`py-3 px-4 border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'activities'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Classroom Activities
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'objectives' && (
            <div className="space-y-4 text-sm text-slate-300">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase">Must Know</span>
                <h4 className="font-semibold text-slate-100 mt-2">Core Definitions & Facts</h4>
                <ul className="list-disc list-inside mt-2 text-xs text-slate-400 space-y-1">
                  <li>Define covalent bonding as electrostatic attraction between shared electrons and positive nuclei.</li>
                  <li>State the relative repulsion strengths: LP-LP &gt; LP-BP &gt; BP-BP.</li>
                  <li>Identify standard bond angles: 180° (Linear), 120° (Trigonal Planar), 109.5° (Tetrahedral), 90° (Octahedral).</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">Understand</span>
                <h4 className="font-semibold text-slate-100 mt-2">Conceptual Explanations</h4>
                <ul className="list-disc list-inside mt-2 text-xs text-slate-400 space-y-1">
                  <li>Understand why lone pairs occupy greater volume and squeeze bonding pairs closer together (~2.5° drop per LP).</li>
                  <li>Distinguish between Electron-Domain Geometry and Molecular Shape.</li>
                  <li>Explain expanded octet capability in Period 3+ elements (P, S, Cl, Xe) using vacant d-orbitals.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase">Apply & Explain</span>
                <h4 className="font-semibold text-slate-100 mt-2">Application & Cambridge Exam Skills</h4>
                <ul className="list-disc list-inside mt-2 text-xs text-slate-400 space-y-1">
                  <li>Determine the 3D molecular shape and predict bond angles for specified molecules and ions (e.g. NH₃, H₂O, SF₄, XeF₄, NH₄⁺, NO₃⁻).</li>
                  <li>Construct displayed, structural, and empirical formulae from experimental composition data.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'molecules' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {CAMBRIDGE_MOLECULE_DATABASE.map(m => (
                <div key={m.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sky-400 text-sm">{m.formula}</span> ({m.name})
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      AXE: <span className="font-mono text-purple-300">{m.axeNotation}</span> • Shape: <span className="text-emerald-300">{m.molecularShape}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                    {m.bondAngle}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-4">
              {CAMBRIDGE_QUIZ_BANK.map((q, i) => (
                <div key={q.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sky-400">Question {i + 1} ({q.difficulty})</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{q.topic}</span>
                  </div>
                  <p className="text-slate-200 font-medium mb-3">{q.question}</p>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-emerald-300 font-mono">
                    ✓ Correct Answer: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}
                  </div>
                  <p className="text-slate-400 mt-2 leading-relaxed">{q.explanation}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <h4 className="font-bold text-sky-300 text-sm mb-1">Activity 1: The VSEPR Predictor Race</h4>
                <p className="text-slate-400 leading-relaxed">
                  Divide students into pairs. Provide a set of 5 molecules (e.g. BF₃, NH₃, SF₄, XeF₄, H₃O⁺). Have students use the Simulator to build each molecule, observe electron domains, and write full Cambridge exam explanations for why bond angles differ from ideal geometry.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <h4 className="font-bold text-purple-300 text-sm mb-1">Activity 2: Misconception Debunking Session</h4>
                <p className="text-slate-400 leading-relaxed">
                  Project Challenge Mode on screen. Present common misconceptions (e.g., &quot;CO₂ is bent because oxygen has lone pairs&quot;). Ask students to identify why the statement is false using central atom electron domain principles.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between text-xs text-slate-400">
          <span>Cambridge International AS & A Level Chemistry (9701) Curriculum Support</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
