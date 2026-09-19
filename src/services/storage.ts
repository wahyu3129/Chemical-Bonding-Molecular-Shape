import { StudentProgress, AppSettings } from '../types';

const STORAGE_KEY_PROGRESS = 'cambridge_chem_progress_v1';
const STORAGE_KEY_SETTINGS = 'cambridge_chem_settings_v1';

const DEFAULT_PROGRESS: StudentProgress = {
  topicMastery: {
    'Chemical Bonding': 40,
    'Molecular Formulae': 60,
    'VSEPR Theory': 50,
    'Common Molecular Shapes': 30,
    'Bond Angles': 40
  },
  completedLessons: ['module_1_t1', 'module_1_t2'],
  quizAttemptsCount: 0,
  quizScores: {},
  totalCorrectAnswers: 5,
  totalQuestionsAnswered: 6,
  exploredMolecules: ['ch4', 'nh3', 'h2o'],
  savedMolecules: ['nh3', 'sf4'],
  challengeHighScore: 300,
  challengeHighScores: {},
  misconceptionsLogged: [],
  lastAccessedTime: Date.now()
};

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  reducedMotion: false,
  showLabelsDefault: true,
  showLonePairsDefault: true,
  showBondAnglesDefault: true,
  autoRotateMolecule: true,
  autoRotate3d: true,
  showLonePairsByDefault: true,
  fontSize: 'medium'
};

export function getStoredProgress(): StudentProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load student progress:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: StudentProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save student progress:', e);
  }
}

export function getStoredSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load app settings:', e);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save app settings:', e);
  }
}

export const storageService = {
  loadProgress: getStoredProgress,
  saveProgress,
  resetProgress: (): StudentProgress => {
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
    return DEFAULT_PROGRESS;
  },
  loadSettings: getStoredSettings,
  saveSettings
};
