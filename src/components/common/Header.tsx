import React from 'react';
import { Atom, GraduationCap, Moon, Sun, ShieldCheck } from 'lucide-react';
import { AppSettings } from '../../types';

interface HeaderProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onOpenTeacherView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  onOpenTeacherView
}) => {
  const toggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
    onUpdateSettings({ ...settings, theme: nextTheme });
  };

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
          <Atom className="w-6 h-6 animate-spin-slow" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-black tracking-tight text-slate-100">
              ChemBond<span className="text-sky-400">3D</span>
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold uppercase tracking-wider hidden sm:inline-block">
              Cambridge AS & A Level
            </span>
          </div>
          <p className="text-[11px] text-slate-400 hidden md:block">
            Molecular Shapes, VSEPR Theory & Formulae Simulator
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onOpenTeacherView}
          className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          title="Open Teacher View & Syllabus Alignment"
        >
          <GraduationCap className="w-4 h-4 text-purple-400" />
          <span className="hidden sm:inline">Teacher View</span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          title="Toggle Theme"
        >
          {settings.theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
        </button>
      </div>
    </header>
  );
};
