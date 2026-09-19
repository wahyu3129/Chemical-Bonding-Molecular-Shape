import React from 'react';
import { Settings as SettingsIcon, Sun, Moon, GraduationCap, ShieldAlert, RotateCcw } from 'lucide-react';
import { AppSettings, StudentProgress } from '../types';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onOpenTeacherView: () => void;
  onResetProgress: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onOpenTeacherView,
  onResetProgress
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          <SettingsIcon className="w-4 h-4" />
          Preferences & Configuration
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-100">
          Application Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize themes, 3D graphics rendering preferences, and curriculum settings.
        </p>
      </div>

      {/* Settings Options */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        {/* Theme Settings */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Color Theme</h3>
            <p className="text-xs text-slate-400">Switch between Dark and Light mode themes.</p>
          </div>

          <button
            onClick={() => onUpdateSettings({ ...settings, theme: settings.theme === 'dark' ? 'light' : 'dark' })}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
          >
            {settings.theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
            <span className="capitalize">{settings.theme} Mode</span>
          </button>
        </div>

        {/* 3D Auto Rotate */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-100">3D Molecule Auto-Rotation</h3>
            <p className="text-xs text-slate-400">Automatically rotate 3D canvas molecules slowly.</p>
          </div>

          <input
            type="checkbox"
            checked={settings.autoRotate3d}
            onChange={(e) => onUpdateSettings({ ...settings, autoRotate3d: e.target.checked })}
            className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-sky-500 focus:ring-sky-500"
          />
        </div>

        {/* Default Show Lone Pairs */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Show Lone Pair Clouds by Default</h3>
            <p className="text-xs text-slate-400">Display translucent electron domain lobes in 3D views.</p>
          </div>

          <input
            type="checkbox"
            checked={settings.showLonePairsByDefault}
            onChange={(e) => onUpdateSettings({ ...settings, showLonePairsByDefault: e.target.checked })}
            className="w-5 h-5 rounded bg-slate-950 border-slate-800 text-purple-500 focus:ring-purple-500"
          />
        </div>

        {/* Teacher View Trigger */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Teacher View & Curriculum Objectives</h3>
            <p className="text-xs text-slate-400">Open teacher panel for Cambridge syllabus mapping and question bank.</p>
          </div>

          <button
            onClick={onOpenTeacherView}
            className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <GraduationCap className="w-4 h-4 text-purple-400" />
            Open Teacher View
          </button>
        </div>

        {/* Reset Progress */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-rose-400">Reset All Data</h3>
            <p className="text-xs text-slate-400">Clear saved progress, quiz scores, and preferences.</p>
          </div>

          <button
            onClick={onResetProgress}
            className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};
