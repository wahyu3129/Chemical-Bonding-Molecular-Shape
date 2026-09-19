import React from 'react';
import {
  Home,
  BookOpen,
  Atom,
  Compass,
  FileCode2,
  Boxes,
  Trophy,
  HelpCircle,
  BarChart3,
  Settings
} from 'lucide-react';
import { NavigationDestination } from '../../types';

interface NavigationRailProps {
  currentDestination: NavigationDestination;
  onNavigate: (dest: NavigationDestination) => void;
}

export const NAV_ITEMS: { id: NavigationDestination; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'simulator', label: 'Shape Simulator', icon: Atom },
  { id: 'vsepr_explorer', label: 'VSEPR Explorer', icon: Compass },
  { id: 'formula_explorer', label: 'Formula Explorer', icon: FileCode2 },
  { id: 'molecule_3d', label: '3D Molecule Viewer', icon: Boxes },
  { id: 'challenge', label: 'Challenge Mode', icon: Trophy },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export const NavigationRail: React.FC<NavigationRailProps> = ({
  currentDestination,
  onNavigate
}) => {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0 hidden md:flex">
      <nav className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
          Main Destinations
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentDestination === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-slate-800">
        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="font-bold text-slate-200">Cambridge AS Level 9701</div>
          <div className="text-[10px] text-slate-500">Chemical Bonding & VSEPR</div>
        </div>
      </div>
    </aside>
  );
};
