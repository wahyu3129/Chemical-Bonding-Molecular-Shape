import { MoleculeData } from '../types';

export const CAMBRIDGE_MOLECULE_DATABASE: MoleculeData[] = [
  {
    id: 'h2',
    formula: 'H₂',
    name: 'Hydrogen Gas',
    centralAtom: 'H',
    bondingRegions: 1,
    lonePairs: 0,
    axeNotation: 'AX',
    electronGeometry: 'Linear',
    molecularShape: 'Linear',
    bondAngle: '180°',
    explanation: 'Simple diatomic covalent molecule. Single σ-bond between two 1s hydrogen atomic orbitals.',
    difficulty: 'Foundation',
    exampleContext: 'Diatomic element in Cambridge AS Level Unit 3.',
    atoms: [
      { symbol: 'H', x: -0.9, y: 0, z: 0, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: 0.9, y: 0, z: 0, color: '#ffffff', radius: 0.35 }
    ],
    bonds: [{ fromIndex: 0, toIndex: 1, order: 1 }]
  },
  {
    id: 'cl2',
    formula: 'Cl₂',
    name: 'Chlorine Gas',
    centralAtom: 'Cl',
    bondingRegions: 1,
    lonePairs: 3,
    axeNotation: 'AXE3',
    electronGeometry: 'Tetrahedral',
    molecularShape: 'Linear',
    bondAngle: '180°',
    explanation: 'Diatomic halogenous molecule with 1 shared covalent bonding pair and 3 lone pairs on each chlorine atom.',
    difficulty: 'Foundation',
    exampleContext: 'Group 17 Halogens bonding.',
    atoms: [
      { symbol: 'Cl', x: -1.2, y: 0, z: 0, color: '#22c55e', radius: 0.55 },
      { symbol: 'Cl', x: 1.2, y: 0, z: 0, color: '#22c55e', radius: 0.55 }
    ],
    bonds: [{ fromIndex: 0, toIndex: 1, order: 1 }]
  },
  {
    id: 'hcl',
    formula: 'HCl',
    name: 'Hydrogen Chloride',
    centralAtom: 'Cl',
    bondingRegions: 1,
    lonePairs: 3,
    axeNotation: 'AXE3',
    electronGeometry: 'Tetrahedral',
    molecularShape: 'Linear',
    bondAngle: '180°',
    explanation: 'Polar covalent diatomic molecule. Chlorine is significantly more electronegative than Hydrogen, creating a permanent dipole.',
    difficulty: 'Foundation',
    exampleContext: 'Hydrogen halide polar covalent bonding.',
    atoms: [
      { symbol: 'Cl', x: -0.6, y: 0, z: 0, color: '#22c55e', radius: 0.55 },
      { symbol: 'H', x: 1.1, y: 0, z: 0, color: '#ffffff', radius: 0.35 }
    ],
    bonds: [{ fromIndex: 0, toIndex: 1, order: 1 }]
  },
  {
    id: 'becl2',
    formula: 'BeCl₂',
    name: 'Beryllium Chloride',
    centralAtom: 'Be',
    bondingRegions: 2,
    lonePairs: 0,
    axeNotation: 'AX2',
    electronGeometry: 'Linear',
    molecularShape: 'Linear',
    bondAngle: '180°',
    explanation: 'Beryllium has 2 valence electrons and forms an electron-deficient linear molecule with 0 lone pairs on Be.',
    difficulty: 'Foundation',
    exampleContext: 'Classic electron-deficient linear molecule in Cambridge AS Level.',
    atoms: [
      { symbol: 'Be', x: 0, y: 0, z: 0, color: '#94a3b8', radius: 0.45, isCentral: true },
      { symbol: 'Cl', x: -1.8, y: 0, z: 0, color: '#22c55e', radius: 0.55 },
      { symbol: 'Cl', x: 1.8, y: 0, z: 0, color: '#22c55e', radius: 0.55 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 }
    ]
  },
  {
    id: 'bf3',
    formula: 'BF₃',
    name: 'Boron Trifluoride',
    centralAtom: 'B',
    bondingRegions: 3,
    lonePairs: 0,
    axeNotation: 'AX3',
    electronGeometry: 'Trigonal Planar',
    molecularShape: 'Trigonal Planar',
    bondAngle: '120°',
    explanation: 'Boron has 3 valence electrons, forming an electron-deficient trigonal planar molecule with 120° bond angles.',
    difficulty: 'Foundation',
    exampleContext: 'Trigonal planar electron deficiency & Lewis acid acceptor.',
    atoms: [
      { symbol: 'B', x: 0, y: 0, z: 0, color: '#f97316', radius: 0.48, isCentral: true },
      { symbol: 'F', x: 0, y: 1.7, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: 1.47, y: -0.85, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: -1.47, y: -0.85, z: 0, color: '#38bdf8', radius: 0.42 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 }
    ]
  },
  {
    id: 'ch4',
    formula: 'CH₄',
    name: 'Methane',
    centralAtom: 'C',
    bondingRegions: 4,
    lonePairs: 0,
    axeNotation: 'AX4',
    electronGeometry: 'Tetrahedral',
    molecularShape: 'Tetrahedral',
    bondAngle: '109.5°',
    explanation: 'Carbon has 4 valence electrons forming 4 single C-H σ-bonds. Equal repulsion produces a regular 109.5° tetrahedron.',
    difficulty: 'Foundation',
    exampleContext: 'Benchmark tetrahedral alkane structure in Cambridge Organic & Inverted bonding.',
    atoms: [
      { symbol: 'C', x: 0, y: 0, z: 0, color: '#334155', radius: 0.5, isCentral: true },
      { symbol: 'H', x: 1.0, y: 1.0, z: 1.0, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: 1.0, y: -1.0, z: -1.0, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: -1.0, y: 1.0, z: -1.0, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: -1.0, y: -1.0, z: 1.0, color: '#ffffff', radius: 0.35 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 },
      { fromIndex: 0, toIndex: 4, order: 1 }
    ]
  },
  {
    id: 'nh3',
    formula: 'NH₃',
    name: 'Ammonia',
    centralAtom: 'N',
    bondingRegions: 3,
    lonePairs: 1,
    axeNotation: 'AX3E',
    electronGeometry: 'Tetrahedral',
    molecularShape: 'Trigonal Pyramidal',
    bondAngle: 'approximately 107°',
    explanation: 'Nitrogen has 5 valence electrons (3 N-H bonding pairs + 1 lone pair). The LP-BP repulsion compresses H-N-H angles to 107°.',
    difficulty: 'Standard AS',
    exampleContext: 'Classic Cambridge exam question contrasting CH₄ (109.5°), NH₃ (107°), and H₂O (104.5°).',
    atoms: [
      { symbol: 'N', x: 0, y: 0.2, z: 0, color: '#3b82f6', radius: 0.5, isCentral: true },
      { symbol: 'H', x: 1.1, y: -0.4, z: 0.6, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: -1.1, y: -0.4, z: 0.6, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: 0, y: -0.4, z: -1.2, color: '#ffffff', radius: 0.35 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 }
    ],
    lonePairPositions: [{ x: 0, y: 1.2, z: 0 }]
  },
  {
    id: 'h2o',
    formula: 'H₂O',
    name: 'Water',
    centralAtom: 'O',
    bondingRegions: 2,
    lonePairs: 2,
    axeNotation: 'AX2E2',
    electronGeometry: 'Tetrahedral',
    molecularShape: 'Bent',
    bondAngle: 'approximately 104.5°',
    explanation: 'Oxygen has 6 valence electrons (2 O-H bonding pairs + 2 lone pairs). Strong LP-LP > LP-BP repulsion squeezes the angle to 104.5°.',
    difficulty: 'Standard AS',
    exampleContext: 'Benchmark bent molecule with 2 lone pairs.',
    atoms: [
      { symbol: 'O', x: 0, y: 0.3, z: 0, color: '#ef4444', radius: 0.48, isCentral: true },
      { symbol: 'H', x: 1.1, y: -0.5, z: 0, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: -1.1, y: -0.5, z: 0, color: '#ffffff', radius: 0.35 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 }
    ],
    lonePairPositions: [
      { x: 0, y: 0.9, z: 1.0 },
      { x: 0, y: 0.9, z: -1.0 }
    ]
  },
  {
    id: 'co2',
    formula: 'CO₂',
    name: 'Carbon Dioxide',
    centralAtom: 'C',
    bondingRegions: 2,
    lonePairs: 0,
    axeNotation: 'AX2',
    electronGeometry: 'Linear',
    molecularShape: 'Linear',
    bondAngle: '180°',
    explanation: 'Carbon forms two C=O double bonds (2 double-bond regions of electron density, 0 lone pairs on carbon). Max separation is 180°.',
    difficulty: 'Standard AS',
    exampleContext: 'Important example showing multiple bonds treated as single regions of electron density in VSEPR.',
    atoms: [
      { symbol: 'C', x: 0, y: 0, z: 0, color: '#334155', radius: 0.5, isCentral: true },
      { symbol: 'O', x: -1.7, y: 0, z: 0, color: '#ef4444', radius: 0.46 },
      { symbol: 'O', x: 1.7, y: 0, z: 0, color: '#ef4444', radius: 0.46 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 2 },
      { fromIndex: 0, toIndex: 2, order: 2 }
    ]
  },
  {
    id: 'so2',
    formula: 'SO₂',
    name: 'Sulfur Dioxide',
    centralAtom: 'S',
    bondingRegions: 2,
    lonePairs: 1,
    axeNotation: 'AX2E',
    electronGeometry: 'Trigonal Planar',
    molecularShape: 'Bent',
    bondAngle: 'approximately 118°',
    explanation: 'Sulfur has 6 valence electrons (2 S=O double-bond regions + 1 lone pair on S). The 1 lone pair compresses O-S-O angle to ~118°.',
    difficulty: 'Standard AS',
    exampleContext: 'Bent shape originating from a Trigonal Planar electron domain.',
    atoms: [
      { symbol: 'S', x: 0, y: 0.3, z: 0, color: '#eab308', radius: 0.52, isCentral: true },
      { symbol: 'O', x: -1.4, y: -0.6, z: 0, color: '#ef4444', radius: 0.45 },
      { symbol: 'O', x: 1.4, y: -0.6, z: 0, color: '#ef4444', radius: 0.45 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 2 },
      { fromIndex: 0, toIndex: 2, order: 2 }
    ],
    lonePairPositions: [{ x: 0, y: 1.3, z: 0 }]
  },
  {
    id: 'so3',
    formula: 'SO₃',
    name: 'Sulfur Trioxide',
    centralAtom: 'S',
    bondingRegions: 3,
    lonePairs: 0,
    axeNotation: 'AX3',
    electronGeometry: 'Trigonal Planar',
    molecularShape: 'Trigonal Planar',
    bondAngle: '120°',
    explanation: 'Sulfur has 3 S=O double bond regions and 0 lone pairs. Symmetrical 120° trigonal planar structure.',
    difficulty: 'Standard AS',
    exampleContext: 'Trigonal planar hypervalent sulfur molecule.',
    atoms: [
      { symbol: 'S', x: 0, y: 0, z: 0, color: '#eab308', radius: 0.52, isCentral: true },
      { symbol: 'O', x: 0, y: 1.6, z: 0, color: '#ef4444', radius: 0.45 },
      { symbol: 'O', x: 1.38, y: -0.8, z: 0, color: '#ef4444', radius: 0.45 },
      { symbol: 'O', x: -1.38, y: -0.8, z: 0, color: '#ef4444', radius: 0.45 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 2 },
      { fromIndex: 0, toIndex: 2, order: 2 },
      { fromIndex: 0, toIndex: 3, order: 2 }
    ]
  },
  {
    id: 'pcl5',
    formula: 'PCl₅',
    name: 'Phosphorus Pentachloride',
    centralAtom: 'P',
    bondingRegions: 5,
    lonePairs: 0,
    axeNotation: 'AX5',
    electronGeometry: 'Trigonal Bipyramidal',
    molecularShape: 'Trigonal Bipyramidal',
    bondAngle: '90° and 120°',
    explanation: 'Phosphorus expands its octet to accommodate 5 P-Cl bonding pairs. 3 equatorial bonds at 120°, 2 axial bonds perpendicular at 90°.',
    difficulty: 'Challenging AS/A Level',
    exampleContext: 'Expanded octet with steric number 5.',
    atoms: [
      { symbol: 'P', x: 0, y: 0, z: 0, color: '#f97316', radius: 0.52, isCentral: true },
      { symbol: 'Cl', x: 0, y: 0, z: 1.8, color: '#22c55e', radius: 0.52 },  // Axial
      { symbol: 'Cl', x: 0, y: 0, z: -1.8, color: '#22c55e', radius: 0.52 }, // Axial
      { symbol: 'Cl', x: 1.6, y: 0, z: 0, color: '#22c55e', radius: 0.52 },   // Eq 1
      { symbol: 'Cl', x: -0.8, y: 1.38, z: 0, color: '#22c55e', radius: 0.52 }, // Eq 2
      { symbol: 'Cl', x: -0.8, y: -1.38, z: 0, color: '#22c55e', radius: 0.52 } // Eq 3
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 },
      { fromIndex: 0, toIndex: 4, order: 1 },
      { fromIndex: 0, toIndex: 5, order: 1 }
    ]
  },
  {
    id: 'sf4',
    formula: 'SF₄',
    name: 'Sulfur Tetrafluoride',
    centralAtom: 'S',
    bondingRegions: 4,
    lonePairs: 1,
    axeNotation: 'AX4E',
    electronGeometry: 'Trigonal Bipyramidal',
    molecularShape: 'Seesaw',
    bondAngle: 'approximately 89° and 117°',
    explanation: 'Sulfur has 6 valence electrons (4 S-F bonds + 1 lone pair). The lone pair MUST occupy an EQUATORIAL position to minimize 90° repulsions.',
    difficulty: 'Challenging AS/A Level',
    exampleContext: 'Equatorial lone pair rule in steric number 5.',
    atoms: [
      { symbol: 'S', x: 0, y: 0, z: 0, color: '#eab308', radius: 0.52, isCentral: true },
      { symbol: 'F', x: 0, y: 0, z: 1.7, color: '#38bdf8', radius: 0.42 },  // Axial
      { symbol: 'F', x: 0, y: 0, z: -1.7, color: '#38bdf8', radius: 0.42 }, // Axial
      { symbol: 'F', x: 1.5, y: -0.4, z: 0, color: '#38bdf8', radius: 0.42 },  // Eq 1
      { symbol: 'F', x: -1.5, y: -0.4, z: 0, color: '#38bdf8', radius: 0.42 }  // Eq 2
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 },
      { fromIndex: 0, toIndex: 4, order: 1 }
    ],
    lonePairPositions: [{ x: 0, y: 1.5, z: 0 }]
  },
  {
    id: 'clf3',
    formula: 'ClF₃',
    name: 'Chlorine Trifluoride',
    centralAtom: 'Cl',
    bondingRegions: 3,
    lonePairs: 2,
    axeNotation: 'AX3E2',
    electronGeometry: 'Trigonal Bipyramidal',
    molecularShape: 'T-shaped',
    bondAngle: 'approximately 87.5°',
    explanation: 'Chlorine has 7 valence electrons (3 Cl-F bonds + 2 lone pairs). Both lone pairs occupy equatorial sites, giving a T-shaped molecular structure.',
    difficulty: 'Challenging AS/A Level',
    exampleContext: 'T-shaped molecule with 2 equatorial lone pairs.',
    atoms: [
      { symbol: 'Cl', x: 0, y: 0, z: 0, color: '#22c55e', radius: 0.52, isCentral: true },
      { symbol: 'F', x: 0, y: 0, z: 1.7, color: '#38bdf8', radius: 0.42 },  // Axial
      { symbol: 'F', x: 0, y: 0, z: -1.7, color: '#38bdf8', radius: 0.42 }, // Axial
      { symbol: 'F', x: 1.6, y: 0, z: 0, color: '#38bdf8', radius: 0.42 }   // Eq 1
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 }
    ],
    lonePairPositions: [
      { x: -1.0, y: 1.0, z: 0 },
      { x: -1.0, y: -1.0, z: 0 }
    ]
  },
  {
    id: 'xef2',
    formula: 'XeF₂',
    name: 'Xenon Difluoride',
    centralAtom: 'Xe',
    bondingRegions: 2,
    lonePairs: 3,
    axeNotation: 'AX2E3',
    electronGeometry: 'Trigonal Bipyramidal',
    molecularShape: 'Linear',
    bondAngle: '180°',
    explanation: 'Xenon has 8 valence electrons (2 Xe-F bonds + 3 lone pairs). All 3 lone pairs occupy the equatorial plane (120° apart), resulting in a linear 180° molecule.',
    difficulty: 'Challenging AS/A Level',
    exampleContext: 'Steric number 5 linear molecule with 3 equatorial lone pairs.',
    atoms: [
      { symbol: 'Xe', x: 0, y: 0, z: 0, color: '#a855f7', radius: 0.55, isCentral: true },
      { symbol: 'F', x: 0, y: 0, z: 1.8, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: 0, y: 0, z: -1.8, color: '#38bdf8', radius: 0.42 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 }
    ],
    lonePairPositions: [
      { x: 1.5, y: 0, z: 0 },
      { x: -0.75, y: 1.3, z: 0 },
      { x: -0.75, y: -1.3, z: 0 }
    ]
  },
  {
    id: 'sf6',
    formula: 'SF₆',
    name: 'Sulfur Hexafluoride',
    centralAtom: 'S',
    bondingRegions: 6,
    lonePairs: 0,
    axeNotation: 'AX6',
    electronGeometry: 'Octahedral',
    molecularShape: 'Octahedral',
    bondAngle: '90°',
    explanation: 'Sulfur forms 6 S-F bonding pairs with 0 lone pairs. Symmetrical octahedral 3D structure with all 90° bond angles.',
    difficulty: 'Challenging AS/A Level',
    exampleContext: 'Expanded octet with steric number 6.',
    atoms: [
      { symbol: 'S', x: 0, y: 0, z: 0, color: '#eab308', radius: 0.52, isCentral: true },
      { symbol: 'F', x: 1.7, y: 0, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: -1.7, y: 0, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: 0, y: 1.7, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: 0, y: -1.7, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: 0, y: 0, z: 1.7, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: 0, y: 0, z: -1.7, color: '#38bdf8', radius: 0.42 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 },
      { fromIndex: 0, toIndex: 4, order: 1 },
      { fromIndex: 0, toIndex: 5, order: 1 },
      { fromIndex: 0, toIndex: 6, order: 1 }
    ]
  },
  {
    id: 'brf5',
    formula: 'BrF₅',
    name: 'Bromine Pentafluoride',
    centralAtom: 'Br',
    bondingRegions: 5,
    lonePairs: 1,
    axeNotation: 'AX5E',
    electronGeometry: 'Octahedral',
    molecularShape: 'Square Pyramidal',
    bondAngle: 'approximately 85° - 88°',
    explanation: 'Bromine has 7 valence electrons (5 Br-F bonds + 1 lone pair). The 1 axial lone pair repels the 4 equatorial fluorines downward, making angles <90°.',
    difficulty: 'Challenging AS/A Level',
    exampleContext: 'Octahedral electron geometry with 1 axial lone pair.',
    atoms: [
      { symbol: 'Br', x: 0, y: -0.2, z: 0, color: '#9a3412', radius: 0.55, isCentral: true },
      { symbol: 'F', x: 0, y: 1.5, z: 0, color: '#38bdf8', radius: 0.42 }, // Apex
      { symbol: 'F', x: 1.4, y: -0.5, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: -1.4, y: -0.5, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: 0, y: -0.5, z: 1.4, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: 0, y: -0.5, z: -1.4, color: '#38bdf8', radius: 0.42 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 },
      { fromIndex: 0, toIndex: 4, order: 1 },
      { fromIndex: 0, toIndex: 5, order: 1 }
    ],
    lonePairPositions: [{ x: 0, y: -1.5, z: 0 }]
  },
  {
    id: 'xef4',
    formula: 'XeF₄',
    name: 'Xenon Tetrafluoride',
    centralAtom: 'Xe',
    bondingRegions: 4,
    lonePairs: 2,
    axeNotation: 'AX4E2',
    electronGeometry: 'Octahedral',
    molecularShape: 'Square Planar',
    bondAngle: '90°',
    explanation: 'Xenon has 8 valence electrons (4 Xe-F bonds + 2 lone pairs). The 2 lone pairs position opposite each other (180° TRANS) to minimize LP-LP repulsion, producing a square planar molecule.',
    difficulty: 'Challenging AS/A Level',
    exampleContext: 'Trans lone pair arrangement yielding square planar geometry.',
    atoms: [
      { symbol: 'Xe', x: 0, y: 0, z: 0, color: '#a855f7', radius: 0.55, isCentral: true },
      { symbol: 'F', x: 1.6, y: 0, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: -1.6, y: 0, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: 0, y: 1.6, z: 0, color: '#38bdf8', radius: 0.42 },
      { symbol: 'F', x: 0, y: -1.6, z: 0, color: '#38bdf8', radius: 0.42 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 },
      { fromIndex: 0, toIndex: 4, order: 1 }
    ],
    lonePairPositions: [
      { x: 0, y: 0, z: 1.5 },
      { x: 0, y: 0, z: -1.5 }
    ]
  },
  {
    id: 'nh4_plus',
    formula: 'NH₄⁺',
    name: 'Ammonium Ion',
    centralAtom: 'N',
    bondingRegions: 4,
    lonePairs: 0,
    axeNotation: 'AX4',
    electronGeometry: 'Tetrahedral',
    molecularShape: 'Tetrahedral',
    bondAngle: '109.5°',
    isIon: true,
    charge: 1,
    explanation: 'Formed when NH₃ accepts an H⁺ ion via a coordinate (dative covalent) bond. 4 equal bonding pairs, 0 lone pairs. Regular 109.5° tetrahedral ion.',
    difficulty: 'Standard AS',
    exampleContext: 'Dative covalent bonding example in Cambridge AS Chemistry.',
    atoms: [
      { symbol: 'N', x: 0, y: 0, z: 0, color: '#3b82f6', radius: 0.5, isCentral: true },
      { symbol: 'H', x: 1.0, y: 1.0, z: 1.0, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: 1.0, y: -1.0, z: -1.0, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: -1.0, y: 1.0, z: -1.0, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: -1.0, y: -1.0, z: 1.0, color: '#ffffff', radius: 0.35 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 },
      { fromIndex: 0, toIndex: 4, order: 1 }
    ]
  },
  {
    id: 'h3o_plus',
    formula: 'H₃O⁺',
    name: 'Hydronium Ion',
    centralAtom: 'O',
    bondingRegions: 3,
    lonePairs: 1,
    axeNotation: 'AX3E',
    electronGeometry: 'Tetrahedral',
    molecularShape: 'Trigonal Pyramidal',
    bondAngle: 'approximately 107°',
    isIon: true,
    charge: 1,
    explanation: 'Water plus H⁺ ion forming 1 dative covalent bond. Oxygen retains 1 lone pair, creating a trigonal pyramidal 107° ion identical in shape to NH₃.',
    difficulty: 'Standard AS',
    exampleContext: 'Dative covalent polyatomic ion.',
    atoms: [
      { symbol: 'O', x: 0, y: 0.2, z: 0, color: '#ef4444', radius: 0.48, isCentral: true },
      { symbol: 'H', x: 1.1, y: -0.4, z: 0.6, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: -1.1, y: -0.4, z: 0.6, color: '#ffffff', radius: 0.35 },
      { symbol: 'H', x: 0, y: -0.4, z: -1.2, color: '#ffffff', radius: 0.35 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 }
    ],
    lonePairPositions: [{ x: 0, y: 1.2, z: 0 }]
  },
  {
    id: 'no3_minus',
    formula: 'NO₃⁻',
    name: 'Nitrate Ion',
    centralAtom: 'N',
    bondingRegions: 3,
    lonePairs: 0,
    axeNotation: 'AX3',
    electronGeometry: 'Trigonal Planar',
    molecularShape: 'Trigonal Planar',
    bondAngle: '120°',
    isIon: true,
    charge: -1,
    explanation: 'Nitrogen forms 3 bonding regions with oxygens (delocalized π-bonding system across 3 oxygens, 0 lone pairs on N). Symmetrical 120° trigonal planar ion.',
    difficulty: 'Standard AS',
    exampleContext: 'Resonance and delocalized bonding ion.',
    atoms: [
      { symbol: 'N', x: 0, y: 0, z: 0, color: '#3b82f6', radius: 0.5, isCentral: true },
      { symbol: 'O', x: 0, y: 1.6, z: 0, color: '#ef4444', radius: 0.45 },
      { symbol: 'O', x: 1.38, y: -0.8, z: 0, color: '#ef4444', radius: 0.45 },
      { symbol: 'O', x: -1.38, y: -0.8, z: 0, color: '#ef4444', radius: 0.45 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 }
    ]
  },
  {
    id: 'so4_2minus',
    formula: 'SO₄²⁻',
    name: 'Sulfate Ion',
    centralAtom: 'S',
    bondingRegions: 4,
    lonePairs: 0,
    axeNotation: 'AX4',
    electronGeometry: 'Tetrahedral',
    molecularShape: 'Tetrahedral',
    bondAngle: '109.5°',
    isIon: true,
    charge: -2,
    explanation: 'Sulfur forms 4 bonding regions with oxygens, 0 lone pairs on S. Regular 109.5° tetrahedral polyatomic ion.',
    difficulty: 'Standard AS',
    exampleContext: 'Polyatomic anion with tetrahedral shape.',
    atoms: [
      { symbol: 'S', x: 0, y: 0, z: 0, color: '#eab308', radius: 0.52, isCentral: true },
      { symbol: 'O', x: 1.1, y: 1.1, z: 1.1, color: '#ef4444', radius: 0.45 },
      { symbol: 'O', x: 1.1, y: -1.1, z: -1.1, color: '#ef4444', radius: 0.45 },
      { symbol: 'O', x: -1.1, y: 1.1, z: -1.1, color: '#ef4444', radius: 0.45 },
      { symbol: 'O', x: -1.1, y: -1.1, z: 1.1, color: '#ef4444', radius: 0.45 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 },
      { fromIndex: 0, toIndex: 4, order: 1 }
    ]
  },
  {
    id: 'co3_2minus',
    formula: 'CO₃²⁻',
    name: 'Carbonate Ion',
    centralAtom: 'C',
    bondingRegions: 3,
    lonePairs: 0,
    axeNotation: 'AX3',
    electronGeometry: 'Trigonal Planar',
    molecularShape: 'Trigonal Planar',
    bondAngle: '120°',
    isIon: true,
    charge: -2,
    explanation: 'Carbon forms 3 bonding regions with 3 oxygens (resonance hybrid with equal C-O bond lengths). Symmetrical 120° trigonal planar anion.',
    difficulty: 'Standard AS',
    exampleContext: 'Resonance hybrid anion.',
    atoms: [
      { symbol: 'C', x: 0, y: 0, z: 0, color: '#334155', radius: 0.5, isCentral: true },
      { symbol: 'O', x: 0, y: 1.6, z: 0, color: '#ef4444', radius: 0.45 },
      { symbol: 'O', x: 1.38, y: -0.8, z: 0, color: '#ef4444', radius: 0.45 },
      { symbol: 'O', x: -1.38, y: -0.8, z: 0, color: '#ef4444', radius: 0.45 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1 },
      { fromIndex: 0, toIndex: 2, order: 1 },
      { fromIndex: 0, toIndex: 3, order: 1 }
    ]
  }
];
