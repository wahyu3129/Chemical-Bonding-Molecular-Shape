import {
  LearningModule,
  FormulaRepresentation,
  FormulaConversionProblem,
  QuizQuestion,
  ChallengeProblem
} from '../types';

export const CAMBRIDGE_LEARNING_MODULES: LearningModule[] = [
  {
    id: 'module_1',
    number: 1,
    title: 'Chemical Bonding Fundamentals',
    description: 'Explore ionic, covalent, metallic, and coordinate (dative) bonding models as defined by Cambridge International AS Level Chemistry.',
    topics: [
      {
        title: '1. Covalent & Ionic Bonding',
        content: 'Covalent bonding involves electrostatic attraction between positive nuclei and shared electron pairs. Ionic bonding involves electrostatic attraction between oppositely charged ions in a 3D lattice.',
        keyPoints: [
          'Covalent bond: Electrostatic attraction between positive nuclei and shared electron pairs.',
          'Dative / Coordinate covalent bond: Formed when one atom donates both electrons to the shared pair (e.g. NH₄⁺, H₃O⁺, Al₂Cl₆).',
          'Electronegativity differences dictate polar vs non-polar covalent bonds.'
        ],
        example: 'In the ammonium ion (NH₄⁺), nitrogen donates its lone pair to a vacant 1s orbital on H⁺.'
      },
      {
        title: '2. Bonding & Non-Bonding Pairs',
        content: 'Valence electrons are divided into bonding pairs (shared between atoms in σ and π bonds) and non-bonding lone pairs localized on a single atom.',
        keyPoints: [
          'Bonding pairs reside between two nuclei.',
          'Lone pairs are held closer to one nucleus, occupying a wider volume of space.',
          'Lone pair repulsion is stronger than bonding pair repulsion.'
        ],
        example: 'Water (H₂O) has 2 bonding pairs and 2 lone pairs on Oxygen.'
      }
    ]
  },
  {
    id: 'module_2',
    number: 2,
    title: 'Molecular Formulae & Chemical Notation',
    description: 'Master empirical, molecular, structural, displayed, condensed, and skeletal formulae required for Cambridge AS/A Level calculations.',
    topics: [
      {
        title: '1. Empirical vs Molecular Formula',
        content: 'The empirical formula represents the simplest whole-number ratio of atoms in a compound. The molecular formula represents the actual number of atoms of each element in one molecule.',
        keyPoints: [
          'Empirical formula = Simplest integer atomic ratio.',
          'Molecular formula = n × (Empirical formula).',
          'n = Molar mass / Empirical formula mass.'
        ],
        example: 'Glucose has molecular formula C₆H₁₂O₆ and empirical formula CH₂O (n = 6).'
      },
      {
        title: '2. Structural & Displayed Formulae',
        content: 'Displayed formula shows ALL atoms and ALL bonds in 2D. Structural formula shows atom arrangements group by group (e.g. CH₃CH₂OH).',
        keyPoints: [
          'Displayed formula: Must draw every single bond line (including O-H and C-H).',
          'Condensed structural: Groups organic chains cleanly (e.g. CH3CH2OH).'
        ]
      }
    ]
  },
  {
    id: 'module_3',
    number: 3,
    title: 'VSEPR Theory & Repulsion Principles',
    description: 'Valence Shell Electron Pair Repulsion theory explains 3D geometries based on electrostatic repulsion between electron pairs.',
    topics: [
      {
        title: '1. VSEPR Postulates & Hierarchy',
        content: 'Electron domains arrange themselves around a central atom to minimize mutual electrostatic repulsion.',
        keyPoints: [
          'Repulsion strength hierarchy: LP–LP > LP–BP > BP–BP.',
          'Multiple bonds (double/triple) act as ONE single electron domain in geometry predictions.',
          'Lone pairs squeeze bonding angles by approximately 2.0° to 2.5° per lone pair.'
        ]
      },
      {
        title: '2. Electron Geometry vs Molecular Shape',
        content: 'Electron-Domain Geometry describes ALL electron pair domains. Molecular Shape considers ONLY atomic nuclei positions.',
        keyPoints: [
          'Electron domain geometry = All electron pairs (bonding + lone).',
          'Molecular shape = Arrangement of atomic nuclei ONLY.'
        ],
        example: 'NH₃ has Tetrahedral electron geometry, but Trigonal Pyramidal molecular shape.'
      }
    ]
  },
  {
    id: 'module_4',
    number: 4,
    title: 'Common Molecular Shapes',
    description: 'Complete reference for all 13 standard VSEPR AXE geometries, bond angles, steric numbers, and Cambridge exam examples.',
    topics: [
      {
        title: '1. Steric Number 2 (Linear)',
        content: 'AX₂: 2 bonding pairs, 0 lone pairs. Bond angle: 180°. Examples: CO₂, BeCl₂.',
        keyPoints: ['Steric number 2 = Linear geometry (180°).', 'Examples: CO₂, BeCl₂.']
      },
      {
        title: '2. Steric Number 3 (Trigonal Planar & Bent)',
        content: 'AX₃: Trigonal Planar (120°), Example: BF₃. AX₂E: Bent (~118°), Example: SO₂.',
        keyPoints: ['AX₃ = Trigonal Planar (120°).', 'AX₂E = Bent (~118°).']
      },
      {
        title: '3. Steric Number 4 (Tetrahedral, Pyramidal, Bent)',
        content: 'AX₄: Tetrahedral (109.5°), Example: CH₄. AX₃E: Trigonal Pyramidal (~107°), Example: NH₃. AX₂E₂: Bent (~104.5°), Example: H₂O.',
        keyPoints: ['AX₄ = Tetrahedral (109.5°).', 'AX₃E = Trigonal Pyramidal (~107°).', 'AX₂E₂ = Bent (~104.5°).']
      },
      {
        title: '4. Steric Number 5 (Trigonal Bipyramidal Family)',
        content: 'AX₅: Trigonal Bipyramidal (90° & 120°), Example: PCl₅. AX₄E: Seesaw (~89°, ~117°), Example: SF₄. AX₃E₂: T-shaped (~87.5°), Example: ClF₃. AX₂E₃: Linear (180°), Example: XeF₂.',
        keyPoints: ['Lone pairs occupy EQUATORIAL sites first in steric number 5 systems.']
      },
      {
        title: '5. Steric Number 6 (Octahedral Family)',
        content: 'AX₆: Octahedral (90°), Example: SF₆. AX₅E: Square Pyramidal (~88°), Example: BrF₅. AX₄E₂: Square Planar (90°), Example: XeF₄.',
        keyPoints: ['AX₆ = Octahedral (90°).', 'AX₄E₂ = Square Planar with lone pairs 180° opposite.']
      }
    ]
  }
];

export const FORMULA_REPRESENTATIONS: FormulaRepresentation[] = [
  {
    id: 'h2o',
    name: 'Water',
    molecularFormula: 'H₂O',
    empiricalFormula: 'H₂O',
    structuralFormula: 'H–O–H',
    condensedFormula: 'H2O',
    molarMass: 18.015,
    description: 'Simplest hydrogen oxide. Empirical and molecular formulas are identical.'
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    molecularFormula: 'CO₂',
    empiricalFormula: 'CO₂',
    structuralFormula: 'O=C=O',
    condensedFormula: 'CO2',
    molarMass: 44.01,
    description: 'Linear molecule with two double C=O bonds.'
  },
  {
    id: 'ch4',
    name: 'Methane',
    molecularFormula: 'CH₄',
    empiricalFormula: 'CH₄',
    structuralFormula: 'H₄C (Tetrahedral)',
    condensedFormula: 'CH4',
    molarMass: 16.04,
    description: 'Simplest alkane.'
  },
  {
    id: 'c2h6',
    name: 'Ethane',
    molecularFormula: 'C₂H₆',
    empiricalFormula: 'CH₃',
    structuralFormula: 'H₃C–CH₃',
    condensedFormula: 'CH3CH3',
    molarMass: 30.07,
    description: 'Saturated hydrocarbon. Empirical formula ratio is 1:3.'
  },
  {
    id: 'c2h4',
    name: 'Ethene',
    molecularFormula: 'C₂H₄',
    empiricalFormula: 'CH₂',
    structuralFormula: 'H₂C=CH₂',
    condensedFormula: 'CH2CH2',
    molarMass: 28.05,
    description: 'Alkene with C=C double bond. Empirical formula ratio is 1:2.'
  },
  {
    id: 'c2h5oh',
    name: 'Ethanol',
    molecularFormula: 'C₂H₆O',
    empiricalFormula: 'C₂H₆O',
    structuralFormula: 'CH₃–CH₂–OH',
    condensedFormula: 'CH3CH2OH',
    skeletalFormula: '\\_OH',
    molarMass: 46.07,
    description: 'Primary alcohol containing a hydroxyl (-OH) functional group.'
  },
  {
    id: 'c6h12o6',
    name: 'Glucose',
    molecularFormula: 'C₆H₁₂O₆',
    empiricalFormula: 'CH₂O',
    structuralFormula: 'HOCH₂(CHOH)₄CHO',
    condensedFormula: 'C6H12O6',
    molarMass: 180.16,
    description: 'Hexose monosaccharide. Molecular formula is 6× empirical formula (CH₂O).'
  }
];

export const FORMULA_CONVERSION_PROBLEMS: FormulaConversionProblem[] = [
  {
    id: 'p1',
    compoundName: 'Glucose',
    molecularFormula: 'C6H12O6',
    givenType: 'molecular',
    targetType: 'empirical',
    correctAnswer: 'CH2O',
    molarMass: 180.16,
    empiricalMass: 30.03,
    hint: 'Divide the subscript numbers (6, 12, 6) by their greatest common divisor (6).',
    explanation: 'C₆H₁₂O₆ divided by 6 gives a simplest whole-number ratio of C:1, H:2, O:1 → CH₂O.'
  },
  {
    id: 'p2',
    compoundName: 'Dinitrogen Tetroxide',
    molecularFormula: 'N2O4',
    givenType: 'molecular',
    targetType: 'empirical',
    correctAnswer: 'NO2',
    molarMass: 92.01,
    empiricalMass: 46.01,
    hint: 'Divide subscripts 2 and 4 by 2.',
    explanation: 'N₂O₄ divided by 2 gives N:1, O:2 → NO₂.'
  },
  {
    id: 'p3',
    compoundName: 'Butane',
    molecularFormula: 'C4H10',
    givenType: 'molecular',
    targetType: 'empirical',
    correctAnswer: 'C2H5',
    molarMass: 58.12,
    empiricalMass: 29.06,
    hint: 'Divide 4 and 10 by their GCD, which is 2.',
    explanation: 'C₄H₁₀ divided by 2 gives C:2, H:5 → C₂H₅.'
  },
  {
    id: 'p4',
    compoundName: 'Benzene',
    molecularFormula: 'C6H6',
    givenType: 'molecular',
    targetType: 'empirical',
    correctAnswer: 'CH',
    molarMass: 78.11,
    empiricalMass: 13.02,
    hint: 'The ratio 6:6 simplifies to 1:1.',
    explanation: 'C₆H₆ simplifies to a 1:1 carbon-to-hydrogen ratio → CH.'
  }
];

export const CAMBRIDGE_QUIZ_BANK: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Why does ammonia (NH₃) have a bond angle of approximately 107°, whereas methane (CH₄) has a bond angle of 109.5°?',
    questionType: 'multiple_choice',
    options: [
      'Nitrogen is lighter than carbon.',
      'NH₃ has 1 lone pair, and LP–BP repulsion is stronger than BP–BP repulsion, compressing the bond angle.',
      'NH₃ is trigonal planar.',
      'The N–H bond is longer than the C–H bond.'
    ],
    correctAnswer: 'NH₃ has 1 lone pair, and LP–BP repulsion is stronger than BP–BP repulsion, compressing the bond angle.',
    explanation: 'Nitrogen in NH₃ has 3 bonding pairs and 1 lone pair. Lone pair electron clouds are closer to the central nitrogen nucleus, exerting stronger electrostatic repulsion (LP-BP > BP-BP) which squeezes H-N-H angles down from 109.5° to ~107°.',
    misconceptionAlert: 'Common Misconception: Thinking lone pairs do not affect bond angles. In reality, lone pairs exert stronger repulsion than bonding pairs!',
    difficulty: 'Standard AS',
    topic: 'VSEPR'
  },
  {
    id: 'q2',
    question: 'What is the molecular shape of Sulfur Hexafluoride (SF₆)?',
    questionType: 'multiple_choice',
    options: ['Tetrahedral', 'Trigonal Bipyramidal', 'Octahedral', 'Square Planar'],
    correctAnswer: 'Octahedral',
    explanation: 'Sulfur in SF₆ has 6 bonding pairs and 0 lone pairs (steric number 6). The 6 fluorine atoms position at 90° angles at the vertices of a regular octahedron.',
    difficulty: 'Standard AS',
    topic: 'Molecular shape'
  },
  {
    id: 'q3',
    question: 'Which statement correctly distinguishes Electron-Domain Geometry from Molecular Shape for Water (H₂O)?',
    questionType: 'multiple_choice',
    options: [
      'Both are Bent.',
      'Both are Tetrahedral.',
      'Electron-Domain Geometry is Tetrahedral, but Molecular Shape is Bent.',
      'Electron-Domain Geometry is Bent, but Molecular Shape is Tetrahedral.'
    ],
    correctAnswer: 'Electron-Domain Geometry is Tetrahedral, but Molecular Shape is Bent.',
    explanation: 'H₂O has 4 electron domains (2 bonding pairs + 2 lone pairs) arranged tetrahedrally. However, molecular shape considers ONLY atomic nuclei positions (O and two H atoms), which form a Bent shape at ~104.5°.',
    misconceptionAlert: 'Key Cambridge Exam Rule: Never confuse electron geometry with molecular shape. Molecular shape ignores lone pairs when naming the geometry of atomic nuclei!',
    difficulty: 'Standard AS',
    topic: 'Molecular geometry'
  },
  {
    id: 'q4',
    question: 'What is the AXE notation and molecular shape for Xenon Tetrafluoride (XeF₄)?',
    questionType: 'multiple_choice',
    options: [
      'AX₄, Tetrahedral',
      'AX₄E, Seesaw',
      'AX₄E₂, Square Planar',
      'AX₅, Square Pyramidal'
    ],
    correctAnswer: 'AX₄E₂, Square Planar',
    explanation: 'Xenon (Group 18) has 8 valence electrons. In XeF₄, 4 electrons form Xe-F bonds, leaving 4 non-bonding electrons = 2 lone pairs. AX₄E₂ yields an Octahedral electron domain with 2 TRANS lone pairs, resulting in a Square Planar molecular shape.',
    difficulty: 'Challenging AS/A Level',
    topic: 'AXE notation'
  },
  {
    id: 'q5',
    question: 'Why do lone pairs in Trigonal Bipyramidal structures (e.g. SF₄, ClF₃, XeF₂) always occupy EQUATORIAL positions first?',
    questionType: 'multiple_choice',
    options: [
      'Equatorial positions have shorter bond lengths.',
      'Equatorial sites experience fewer 90° repulsions (only two at 90°) compared to axial sites (three at 90°).',
      'Axial positions are occupied by hydrogen atoms.',
      'Equatorial positions are lower in electronegativity.'
    ],
    correctAnswer: 'Equatorial sites experience fewer 90° repulsions (only two at 90°) compared to axial sites (three at 90°).',
    explanation: 'In trigonal bipyramidal geometry, an axial position encounters THREE 90° repulsions, whereas an equatorial position encounters only TWO 90° repulsions. Placing bulky lone pairs equatorially minimizes high-energy 90° LP repulsions.',
    difficulty: 'Challenging AS/A Level',
    topic: 'VSEPR'
  },
  {
    id: 'q6',
    question: 'What is the bond angle in Carbon Dioxide (CO₂)?',
    questionType: 'multiple_choice',
    options: ['109.5°', '120°', '180°', '104.5°'],
    correctAnswer: '180°',
    explanation: 'In CO₂, the central carbon forms two double C=O bonds. Each double bond acts as one region of electron density. 2 regions repel to maximum separation at 180° (Linear).',
    difficulty: 'Foundation',
    topic: 'Bond angles'
  },
  {
    id: 'q7',
    question: 'A compound has an empirical formula of CH₂O and a molar mass of 180.16 g/mol. What is its molecular formula?',
    questionType: 'multiple_choice',
    options: ['CH₂O', 'C₂H₄O₂', 'C₃H₆O₃', 'C₆H₁₂O₆'],
    correctAnswer: 'C₆H₁₂O₆',
    explanation: 'Empirical mass of CH₂O = 12.01 + 2(1.008) + 16.00 = 30.03 g/mol. Multiplier n = 180.16 / 30.03 = 6. Molecular formula = (CH₂O) × 6 = C₆H₁₂O₆.',
    difficulty: 'Standard AS',
    topic: 'Formula types'
  },
  {
    id: 'q8',
    question: 'In the Ammonium ion (NH₄⁺), what type of bond is formed when an H⁺ ion attaches to NH₃?',
    questionType: 'multiple_choice',
    options: ['Ionic bond', 'Coordinate (Dative Covalent) bond', 'Metallic bond', 'Hydrogen bond'],
    correctAnswer: 'Coordinate (Dative Covalent) bond',
    explanation: 'The nitrogen in NH₃ donates both electrons from its lone pair to the vacant 1s orbital of H⁺, forming a coordinate (dative covalent) bond. Once formed, it is indistinguishable from the other 3 N-H bonds.',
    difficulty: 'Standard AS',
    topic: 'Bonding Types'
  }
];

export const CHALLENGE_PROBLEMS: ChallengeProblem[] = [
  {
    id: 'ch_nh3',
    moleculeName: 'Ammonia',
    formula: 'NH3',
    centralAtom: 'N',
    bondingPairs: 3,
    lonePairs: 1,
    axeNotation: 'AX3E',
    electronGeometry: 'Tetrahedral',
    molecularShape: 'Trigonal Pyramidal',
    bondAngle: '107°',
    hints: [
      'Hint 1: Draw the Lewis structure. Nitrogen has 5 valence electrons and needs 3 more to complete an octet.',
      'Hint 2: Nitrogen forms 3 single bonds with Hydrogen, leaving 2 non-bonding electrons (1 lone pair).',
      'Hint 3: Steric number = 3 + 1 = 4 (Tetrahedral electron domain). Ignore the lone pair when naming atomic nuclei arrangement!'
    ]
  },
  {
    id: 'ch_sf4',
    moleculeName: 'Sulfur Tetrafluoride',
    formula: 'SF4',
    centralAtom: 'S',
    bondingPairs: 4,
    lonePairs: 1,
    axeNotation: 'AX4E',
    electronGeometry: 'Trigonal Bipyramidal',
    molecularShape: 'Seesaw',
    bondAngle: '117° and 89°',
    hints: [
      'Hint 1: Sulfur has 6 valence electrons in Group 16.',
      'Hint 2: S forms 4 bonds with Fluorine, leaving 2 valence electrons (1 lone pair). Total electron domains = 5.',
      'Hint 3: For steric number 5, place the 1 lone pair in an EQUATORIAL position to minimize 90° repulsions!'
    ]
  },
  {
    id: 'ch_xef4',
    moleculeName: 'Xenon Tetrafluoride',
    formula: 'XeF4',
    centralAtom: 'Xe',
    bondingPairs: 4,
    lonePairs: 2,
    axeNotation: 'AX4E2',
    electronGeometry: 'Octahedral',
    molecularShape: 'Square Planar',
    bondAngle: '90°',
    hints: [
      'Hint 1: Xenon is a noble gas with 8 valence electrons.',
      'Hint 2: 4 electrons form bonds with F, leaving 4 electrons = 2 lone pairs.',
      'Hint 3: Steric number = 6 (Octahedral domain). To minimize LP-LP repulsion, place the 2 lone pairs 180° apart (TRANS)!'
    ]
  },
  {
    id: 'ch_bf3',
    moleculeName: 'Boron Trifluoride',
    formula: 'BF3',
    centralAtom: 'B',
    bondingPairs: 3,
    lonePairs: 0,
    axeNotation: 'AX3',
    electronGeometry: 'Trigonal Planar',
    molecularShape: 'Trigonal Planar',
    bondAngle: '120°',
    hints: [
      'Hint 1: Boron is in Group 13 and has 3 valence electrons.',
      'Hint 2: Boron forms 3 single bonds and has 0 lone pairs remaining (electron deficient).',
      'Hint 3: 3 bonding domains spread out evenly in one plane.'
    ]
  }
];

export const CAMBRIDGE_CHALLENGE_PROBLEMS = CHALLENGE_PROBLEMS;
