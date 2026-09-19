import React, { useState } from 'react';
import { Home, BookOpen, Atom, Trophy, MoreHorizontal, X, Compass, FileCode2, Boxes, HelpCircle, BarChart3, Settings } from 'lucide-react';
import { NavigationDestination } from '../../types';
import { NAV_ITEMS } from './NavigationRail';

interface BottomNavProps {
  currentDestination: NavigationDestination;
  onNavigate: (dest: NavigationDestination) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentDestination,
  onNavigate
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainMobileTabs: NavigationDestination[] = ['home', 'learn', 'simulator', 'challenge'];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-40 px-2 flex items-center justify-around">
        {mainMobileTabs.map((destId) => {
          const item = NAV_ITEMS.find(i => i.id === destId);
          if (!item) return null;
          const Icon = item.icon;
          const isActive = currentDestination === destId;

          return (
            <button
              key={destId}
              onClick={() => onNavigate(destId)}
              className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-all ${
                isActive ? 'text-sky-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] truncate max-w-full">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}

        <button
          onClick={() => setShowMoreMenu(true)}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-xl transition-all ${
            !mainMobileTabs.includes(currentDestination) ? 'text-sky-400 font-bold' : 'text-slate-400'
          }`}
        >
          <MoreHorizontal className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">More</span>
        </button>
      </nav>

      {/* Mobile "More" Drawer Modal */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col justify-end md:hidden">
          <div className="bg-slate-900 border-t border-slate-800 rounded-t-3xl p-6 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100">All Destinations</h3>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = currentDestination === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setShowMoreMenu(false);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold transition-all text-left ${
                      isActive
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'bg-slate-950/60 text-slate-300 border border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
