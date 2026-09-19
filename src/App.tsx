import React, { useState, useEffect } from 'react';
import { NavigationDestination, StudentProgress, AppSettings } from './types';
import { storageService } from './services/storage';

// Layout Components
import { Header } from './components/common/Header';
import { NavigationRail } from './components/common/NavigationRail';
import { BottomNav } from './components/common/BottomNav';
import { TeacherViewModal } from './components/tools/TeacherViewModal';

// Views
import { HomeView } from './views/HomeView';
import { LearnView } from './views/LearnView';
import { SimulatorView } from './views/SimulatorView';
import { VseprExplorerView } from './views/VseprExplorerView';
import { FormulaExplorerView } from './views/FormulaExplorerView';
import { MoleculeViewer3DView } from './views/MoleculeViewer3DView';
import { ChallengeView } from './views/ChallengeView';
import { QuizView } from './views/QuizView';
import { ProgressView } from './views/ProgressView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [currentDestination, setCurrentDestination] = useState<NavigationDestination>('home');
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('ch4');
  const [isTeacherViewOpen, setIsTeacherViewOpen] = useState(false);

  // Persistence State
  const [progress, setProgress] = useState<StudentProgress>(storageService.loadProgress());
  const [settings, setSettings] = useState<AppSettings>(storageService.loadSettings());

  // Save changes to localStorage
  useEffect(() => {
    storageService.saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    storageService.saveSettings(settings);
    // Sync dark / light theme class on HTML element
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const handleResetProgress = () => {
    const resetProg = storageService.resetProgress();
    setProgress(resetProg);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased bg-slate-950 text-slate-100 ${settings.theme}`}>
      {/* Top Header */}
      <Header
        settings={settings}
        onUpdateSettings={setSettings}
        onOpenTeacherView={() => setIsTeacherViewOpen(true)}
      />

      {/* Main Body Shell: Navigation Sidebar + Content View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop / Tablet Navigation Rail */}
        <NavigationRail
          currentDestination={currentDestination}
          onNavigate={setCurrentDestination}
        />

        {/* Dynamic View Display Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 md:pb-12">
          {currentDestination === 'home' && (
            <HomeView
              progress={progress}
              onNavigate={setCurrentDestination}
              onSelectMolecule={setSelectedMoleculeId}
            />
          )}

          {currentDestination === 'learn' && (
            <LearnView
              onNavigate={setCurrentDestination}
            />
          )}

          {currentDestination === 'simulator' && (
            <SimulatorView
              onNavigate={setCurrentDestination}
            />
          )}

          {currentDestination === 'vsepr_explorer' && (
            <VseprExplorerView />
          )}

          {currentDestination === 'formula_explorer' && (
            <FormulaExplorerView />
          )}

          {currentDestination === 'molecule_3d' && (
            <MoleculeViewer3DView
              progress={progress}
              onUpdateProgress={setProgress}
              selectedMoleculeId={selectedMoleculeId}
            />
          )}

          {currentDestination === 'challenge' && (
            <ChallengeView
              progress={progress}
              onUpdateProgress={setProgress}
            />
          )}

          {currentDestination === 'quiz' && (
            <QuizView
              progress={progress}
              onUpdateProgress={setProgress}
            />
          )}

          {currentDestination === 'progress' && (
            <ProgressView
              progress={progress}
              onUpdateProgress={setProgress}
              onNavigate={setCurrentDestination}
            />
          )}

          {currentDestination === 'settings' && (
            <SettingsView
              settings={settings}
              onUpdateSettings={setSettings}
              onOpenTeacherView={() => setIsTeacherViewOpen(true)}
              onResetProgress={handleResetProgress}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentDestination={currentDestination}
        onNavigate={setCurrentDestination}
      />

      {/* Teacher View & Syllabus Alignment Modal */}
      <TeacherViewModal
        isOpen={isTeacherViewOpen}
        onClose={() => setIsTeacherViewOpen(false)}
      />
    </div>
  );
}
