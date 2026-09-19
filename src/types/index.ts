/**
 * Types & Domain Models for Cambridge AS/A Level Chemical Bonding & VSEPR Simulator
 */

export type NavigationDestination = 
  | 'home'
  | 'learn'
  | 'simulator'
  | 'vsepr_explorer'
  | 'formula_explorer'
  | 'molecule_3d'
  | 'challenge'
  | 'quiz'
  | 'progress'
  | 'settings';

export type CentralAtomType = 'C' | 'N' | 'O' | 'F' | 'P' | 'S' | 'Cl' | 'Xe' | 'Be' | 'B';

export type ElectronDomainGeometry = 
  | 'Linear'
  | 'Trigonal Planar'
  | 'Tetrahedral'
  | 'Trigonal Bipyramidal'
  | 'Octahedral';

export type MolecularShape = 
  | 'Linear'
  | 'Trigonal Planar'
  | 'Bent'
  | 'Tetrahedral'
  | 'Trigonal Pyramidal'
  | 'Trigonal Bipyramidal'
  | 'Seesaw'
  | 'T-shaped'
  | 'Octahedral'
  | 'Square Pyramidal'
  | 'Square Planar';

export interface LearningTopic {
  title: string;
  content: string;
  keyPoints?: string[];
  example?: string;
}

export interface LearningModule {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: LearningTopic[];
}

export interface VseprConfiguration {
  bondingPairs: number;
  lonePairs: number;
  stericNumber: number;
  axeNotation: string;
  electronGeometry: ElectronDomainGeometry;
  molecularShape: MolecularShape;
  approximateBondAngle: string;
  idealAngleNumber: number;
  observedAngleNumber: number;
  repulsionExplanation: string;
  cambridgeNotes: string;
  isValid: boolean;
  validationError?: string;
}

export interface AtomPosition {
  symbol: string;
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number;
  isCentral?: boolean;
}

export interface BondData {
  fromIndex: number;
  toIndex: number;
  order: 1 | 2 | 3;
}

export interface LonePairPosition {
  x: number;
  y: number;
  z: number;
  label?: string;
}

export interface MoleculeData {
  id: string;
  formula: string;
  name: string;
  centralAtom: string;
  bondingRegions: number;
  lonePairs: number;
  axeNotation: string;
  electronGeometry: ElectronDomainGeometry;
  molecularShape: MolecularShape;
  bondAngle: string;
  explanation: string;
  difficulty: 'Foundation' | 'Standard AS' | 'Challenging AS/A Level';
  isIon?: boolean;
  charge?: number;
  atoms: AtomPosition[];
  bonds: BondData[];
  lonePairPositions?: LonePairPosition[];
  exampleContext: string;
}

export interface FormulaRepresentation {
  id: string;
  name: string;
  molecularFormula: string;
  empiricalFormula: string;
  displayedFormulaSvg?: string;
  structuralFormula: string;
  condensedFormula: string;
  skeletalFormula?: string;
  molarMass: number;
  description: string;
}

export interface FormulaConversionProblem {
  id: string;
  compoundName: string;
  molecularFormula: string;
  givenType: 'molecular' | 'empirical';
  targetType: 'molecular' | 'empirical';
  correctAnswer: string;
  molarMass?: number;
  empiricalMass?: number;
  hint: string;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionType: 'multiple_choice' | 'multiple_response' | 'short_answer' | 'structure_id';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  misconceptionAlert?: string;
  difficulty: 'Foundation' | 'Standard AS' | 'Challenging AS/A Level';
  topic: 'VSEPR' | 'Molecular shape' | 'Molecular geometry' | 'Bond angles' | 'Lone pairs' | 'AXE notation' | 'Formula types' | 'Bonding Types';
}

export interface ChallengeProblem {
  id: string;
  moleculeName: string;
  formula: string;
  centralAtom: string;
  bondingPairs: number;
  lonePairs: number;
  axeNotation: string;
  electronGeometry: ElectronDomainGeometry;
  molecularShape: MolecularShape;
  bondAngle: string;
  hints: string[];
}

export interface StudentProgress {
  topicMastery: Record<string, number>; // Topic -> percentage (0-100)
  completedLessons: string[];
  quizAttemptsCount: number;
  quizScores?: Record<string, number>;
  totalCorrectAnswers: number;
  totalQuestionsAnswered: number;
  exploredMolecules: string[];
  savedMolecules: string[];
  challengeHighScore: number;
  challengeHighScores: Record<string, number>;
  misconceptionsLogged: string[];
  misconceptionsEncountered?: string[];
  lastAccessedTime: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  reducedMotion: boolean;
  showLabelsDefault: boolean;
  showLonePairsDefault: boolean;
  showBondAnglesDefault: boolean;
  autoRotateMolecule: boolean;
  autoRotate3d?: boolean;
  showLonePairsByDefault?: boolean;
  fontSize: 'small' | 'medium' | 'large';
}
