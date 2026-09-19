import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CAMBRIDGE_LEARNING_MODULES } from '../data/curriculumData';
import { NavigationDestination, LearningTopic } from '../types';

interface LearnViewProps {
  onNavigate: (dest: NavigationDestination) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ onNavigate }) => {
  const [activeModuleId, setActiveModuleId] = useState(CAMBRIDGE_LEARNING_MODULES[0].id);
  const [activeTopicIdx, setActiveTopicIdx] = useState(0);

  const activeModule = CAMBRIDGE_LEARNING_MODULES.find(m => m.id === activeModuleId) || CAMBRIDGE_LEARNING_MODULES[0];
  const activeTopic = activeModule.topics[activeTopicIdx] || activeModule.topics[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* View Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          Cambridge International AS & A Level Chemistry (9701)
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-100">
          Structured Learning Modules
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
          Comprehensive curriculum notes covering Chemical Bonding, Molecular Formulae, VSEPR Theory, and 3D Molecular Shapes.
        </p>
      </div>

      {/* Main Grid: Modules Sidebar & Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module Picker List (Left) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 font-mono">
            Syllabus Modules
          </h2>

          {CAMBRIDGE_LEARNING_MODULES.map((mod) => {
            const isActive = mod.id === activeModuleId;

            return (
              <div
                key={mod.id}
                onClick={() => {
                  setActiveModuleId(mod.id);
                  setActiveTopicIdx(0);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all shadow-sm ${
                  isActive
                    ? 'bg-slate-900 border-sky-500 shadow-sky-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Module {mod.number}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-600'}`} />
                </div>
                <h3 className={`font-bold text-sm ${isActive ? 'text-slate-100' : 'text-slate-300'}`}>
                  {mod.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Module Topic Content (Right) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            {/* Topic Tabs */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-800 mb-6">
              {activeModule.topics.map((t: LearningTopic, idx: number) => (
                <button
                  key={t.title}
                  onClick={() => setActiveTopicIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTopicIdx === idx
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.title.split('.')[0]}. {t.title.split('.')[1] || t.title}
                </button>
              ))}
            </div>

            {/* Active Topic Body */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-2">
                  {activeTopic.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {activeTopic.content}
                </p>
              </div>

              {/* Key Points */}
              {activeTopic.keyPoints && activeTopic.keyPoints.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
                    Key Syllabus Requirements & Facts
                  </h3>
                  <div className="space-y-2">
                    {activeTopic.keyPoints.map((point: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Example Context */}
              {activeTopic.example && (
                <div className="p-4 bg-sky-950/40 border border-sky-500/30 rounded-xl text-xs text-sky-200">
                  <div className="font-bold text-sky-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-sky-400" />
                    Worked Example
                  </div>
                  <p className="leading-relaxed">{activeTopic.example}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-800 mt-8 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Module {activeModule.number}: Topic {activeTopicIdx + 1} of {activeModule.topics.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('simulator')}
                className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-sky-400 transition-colors shadow-md shadow-sky-500/20"
              >
                <span>Test in 3D Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
