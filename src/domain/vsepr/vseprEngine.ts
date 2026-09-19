import {
  VseprConfiguration,
  ElectronDomainGeometry,
  MolecularShape,
  CentralAtomType
} from '../../types';

/**
 * Valence electron counts for central atoms
 */
export const CENTRAL_ATOM_VALENCE: Record<string, number> = {
  'Be': 2,
  'B': 3,
  'C': 4,
  'N': 5,
  'O': 6,
  'F': 7,
  'P': 5,
  'S': 6,
  'Cl': 7,
  'Xe': 8
};

/**
 * Calculates VSEPR parameters strictly according to Cambridge AS/A Level curriculum rules.
 */
export function calculateVseprShape(
  bondingPairs: number,
  lonePairs: number,
  centralAtom: string = 'C'
): VseprConfiguration {
  const stericNumber = bondingPairs + lonePairs;
  
  // Validate basic range
  if (stericNumber < 2 || stericNumber > 6) {
    return {
      bondingPairs,
      lonePairs,
      stericNumber,
      axeNotation: `AX${bondingPairs}${lonePairs > 0 ? `E${lonePairs}` : ''}`,
      electronGeometry: 'Linear',
      molecularShape: 'Linear',
      approximateBondAngle: 'N/A',
      idealAngleNumber: 0,
      observedAngleNumber: 0,
      repulsionExplanation: 'Steric numbers below 2 or above 6 are outside standard introductory Cambridge AS/A Level VSEPR scope.',
      cambridgeNotes: 'VSEPR theory models electron domains repelling around central atoms with steric numbers 2 through 6.',
      isValid: false,
      validationError: 'This configuration is outside the current VSEPR model used by this simulator.'
    };
  }

  // Validate atom capacity
  const valence = CENTRAL_ATOM_VALENCE[centralAtom] || 4;
  // Maximum possible valence electron pair domains roughly depends on atom position (expanded octet for Period 3+)
  const isPeriod3Plus = ['P', 'S', 'Cl', 'Xe'].includes(centralAtom);
  if (stericNumber > 4 && !isPeriod3Plus && centralAtom !== 'Be' && centralAtom !== 'B') {
    // Note: C, N, O, F cannot expand octet beyond 4 electron pairs in standard AS Level
    return {
      bondingPairs,
      lonePairs,
      stericNumber,
      axeNotation: `AX${bondingPairs}${lonePairs > 0 ? `E${lonePairs}` : ''}`,
      electronGeometry: getElectronGeometry(stericNumber),
      molecularShape: 'Bent', // fallback
      approximateBondAngle: 'N/A',
      idealAngleNumber: 0,
      observedAngleNumber: 0,
      repulsionExplanation: `${centralAtom} is a Period 2 element and cannot expand its octet beyond 4 electron pairs (steric number 4).`,
      cambridgeNotes: 'Period 2 elements (C, N, O, F) lack accessible d-orbitals and cannot expand their valence shell to 5 or 6 electron pairs.',
      isValid: false,
      validationError: `${centralAtom} cannot expand its valence shell to steric number ${stericNumber}. Select P, S, Cl, or Xe for expanded octets.`
    };
  }

  const electronGeometry = getElectronGeometry(stericNumber);
  const axeNotation = `AX${bondingPairs}${lonePairs > 0 ? (lonePairs === 1 ? 'E' : `E${lonePairs}`) : ''}`;

  let molecularShape: MolecularShape = 'Linear';
  let approximateBondAngle = '180°';
  let idealAngleNumber = 180;
  let observedAngleNumber = 180;
  let repulsionExplanation = '';
  let cambridgeNotes = '';

  switch (stericNumber) {
    case 2: // Linear domain
      if (bondingPairs === 2 && lonePairs === 0) {
        molecularShape = 'Linear';
        approximateBondAngle = '180°';
        idealAngleNumber = 180;
        observedAngleNumber = 180;
        repulsionExplanation = '2 bonding regions repel equally to maximum separation (180°) across a straight line.';
        cambridgeNotes = 'Ideal linear geometry with 0 lone pairs. Example: CO₂, BeCl₂.';
      } else {
        return createInvalidConfig(bondingPairs, lonePairs, stericNumber, axeNotation);
      }
      break;

    case 3: // Trigonal Planar domain
      if (bondingPairs === 3 && lonePairs === 0) {
        molecularShape = 'Trigonal Planar';
        approximateBondAngle = '120°';
        idealAngleNumber = 120;
        observedAngleNumber = 120;
        repulsionExplanation = '3 bonding pairs repel equally in one plane at 120° separation.';
        cambridgeNotes = 'Ideal trigonal planar shape. Example: BF₃, SO₃.';
      } else if (bondingPairs === 2 && lonePairs === 1) {
        molecularShape = 'Bent';
        approximateBondAngle = 'approximately 118° (or <120°)';
        idealAngleNumber = 120;
        observedAngleNumber = 118;
        repulsionExplanation = 'The 1 lone pair repels adjacent bonding pairs more strongly than bonding pairs repel each other (LP-BP > BP-BP), compressing the bond angle slightly below 120°.';
        cambridgeNotes = 'Electron-pair geometry is Trigonal Planar, but molecular shape is Bent because lone pairs are invisible when observing atomic nuclei. Example: SO₂.';
      } else {
        return createInvalidConfig(bondingPairs, lonePairs, stericNumber, axeNotation);
      }
      break;

    case 4: // Tetrahedral domain
      if (bondingPairs === 4 && lonePairs === 0) {
        molecularShape = 'Tetrahedral';
        approximateBondAngle = '109.5°';
        idealAngleNumber = 109.5;
        observedAngleNumber = 109.5;
        repulsionExplanation = '4 bonding pairs arrange in 3D space toward the corners of a regular tetrahedron at 109.5°.';
        cambridgeNotes = 'Ideal tetrahedral shape with 4 equal bonding pair repulsions. Example: CH₄, NH₄⁺.';
      } else if (bondingPairs === 3 && lonePairs === 1) {
        molecularShape = 'Trigonal Pyramidal';
        approximateBondAngle = 'approximately 107°';
        idealAngleNumber = 109.5;
        observedAngleNumber = 107;
        repulsionExplanation = '1 lone pair exerts stronger repulsion on the 3 bonding pairs than bonding pairs exert on each other (LP-BP > BP-BP). This squeezes the H-N-H angles down from 109.5° to ~107°.';
        cambridgeNotes = 'Cambridge AS Level Key Fact: Each lone pair reduces the ideal tetrahedral angle by approximately 2.5°. Example: NH₃, H₃O⁺.';
      } else if (bondingPairs === 2 && lonePairs === 2) {
        molecularShape = 'Bent';
        approximateBondAngle = 'approximately 104.5°';
        idealAngleNumber = 109.5;
        observedAngleNumber = 104.5;
        repulsionExplanation = '2 lone pairs exert strong LP-LP and LP-BP repulsions, compressing the H-O-H bond angle down by ~5° from 109.5° to approximately 104.5°.';
        cambridgeNotes = 'Water (H₂O) has 2 lone pairs on Oxygen. Strong LP-LP > LP-BP > BP-BP repulsion creates a bent 104.5° angle.';
      } else {
        return createInvalidConfig(bondingPairs, lonePairs, stericNumber, axeNotation);
      }
      break;

    case 5: // Trigonal Bipyramidal domain
      if (bondingPairs === 5 && lonePairs === 0) {
        molecularShape = 'Trigonal Bipyramidal';
        approximateBondAngle = '90° (axial-equatorial) and 120° (equatorial-equatorial)';
        idealAngleNumber = 120;
        observedAngleNumber = 120;
        repulsionExplanation = '5 bonding pairs arrange with 3 equatorial bonds at 120° and 2 axial bonds perpendicular at 90°.';
        cambridgeNotes = 'Expanded octet with steric number 5. Example: PCl₅.';
      } else if (bondingPairs === 4 && lonePairs === 1) {
        molecularShape = 'Seesaw';
        approximateBondAngle = 'approximately 89° and 117°';
        idealAngleNumber = 120;
        observedAngleNumber = 117;
        repulsionExplanation = 'The lone pair occupies an EQUATORIAL position to minimize 90° repulsions (it encounters only two 90° interactions equatorially vs three axilally).';
        cambridgeNotes = 'In trigonal bipyramidal systems, lone pairs ALWAYS occupy equatorial positions first because equatorial sites have fewer 90° repulsions. Example: SF₄.';
      } else if (bondingPairs === 3 && lonePairs === 2) {
        molecularShape = 'T-shaped';
        approximateBondAngle = 'approximately 87.5°';
        idealAngleNumber = 90;
        observedAngleNumber = 87.5;
        repulsionExplanation = 'Both lone pairs occupy EQUATORIAL positions (120° apart), leaving 3 atoms arranged in a T-shape with compressed angles slightly below 90°.';
        cambridgeNotes = 'Equatorial lone pair placement minimizes strong 90° LP-BP repulsions. Example: ClF₃.';
      } else if (bondingPairs === 2 && lonePairs === 3) {
        molecularShape = 'Linear';
        approximateBondAngle = '180°';
        idealAngleNumber = 180;
        observedAngleNumber = 180;
        repulsionExplanation = 'All 3 lone pairs occupy the equatorial plane (120° apart), leaving the 2 bonding pairs directly opposite each other in axial positions at 180°.';
        cambridgeNotes = 'Symmetrical equatorial lone pairs cancel net repulsion, yielding a perfectly linear 180° molecular shape. Example: XeF₂.';
      } else {
        return createInvalidConfig(bondingPairs, lonePairs, stericNumber, axeNotation);
      }
      break;

    case 6: // Octahedral domain
      if (bondingPairs === 6 && lonePairs === 0) {
        molecularShape = 'Octahedral';
        approximateBondAngle = '90°';
        idealAngleNumber = 90;
        observedAngleNumber = 90;
        repulsionExplanation = '6 bonding pairs arrange symmetrically in 3D space toward the corners of an octahedron with all adjacent angles equal to 90°.';
        cambridgeNotes = 'Expanded octet with 6 identical bonding pair regions. Example: SF₆.';
      } else if (bondingPairs === 5 && lonePairs === 1) {
        molecularShape = 'Square Pyramidal';
        approximateBondAngle = 'approximately 85° - 88° (<90°)';
        idealAngleNumber = 90;
        observedAngleNumber = 88;
        repulsionExplanation = '1 lone pair on one axial vertex repels the 4 equatorial bonding pairs downward, reducing the axial-equatorial angles below 90°.';
        cambridgeNotes = 'Octahedral domain with 1 lone pair. Example: BrF₅.';
      } else if (bondingPairs === 4 && lonePairs === 2) {
        molecularShape = 'Square Planar';
        approximateBondAngle = '90°';
        idealAngleNumber = 90;
        observedAngleNumber = 90;
        repulsionExplanation = '2 lone pairs occupy TRANS (opposite axial) positions at 180° to minimize LP-LP repulsion, leaving 4 bonding pairs in a square plane at 90°.';
        cambridgeNotes = '180° LP-LP separation provides maximum stability, resulting in a planar square molecular geometry. Example: XeF₄.';
      } else {
        return createInvalidConfig(bondingPairs, lonePairs, stericNumber, axeNotation);
      }
      break;
  }

  return {
    bondingPairs,
    lonePairs,
    stericNumber,
    axeNotation,
    electronGeometry,
    molecularShape,
    approximateBondAngle,
    idealAngleNumber,
    observedAngleNumber,
    repulsionExplanation,
    cambridgeNotes,
    isValid: true
  };
}

function getElectronGeometry(stericNumber: number): ElectronDomainGeometry {
  switch (stericNumber) {
    case 2: return 'Linear';
    case 3: return 'Trigonal Planar';
    case 4: return 'Tetrahedral';
    case 5: return 'Trigonal Bipyramidal';
    case 6: return 'Octahedral';
    default: return 'Tetrahedral';
  }
}

function createInvalidConfig(bp: number, lp: number, sn: number, axe: string): VseprConfiguration {
  return {
    bondingPairs: bp,
    lonePairs: lp,
    stericNumber: sn,
    axeNotation: axe,
    electronGeometry: getElectronGeometry(sn),
    molecularShape: 'Linear',
    approximateBondAngle: 'N/A',
    idealAngleNumber: 0,
    observedAngleNumber: 0,
    repulsionExplanation: `The combination of ${bp} bonding pairs and ${lp} lone pairs is outside standard VSEPR rules.`,
    cambridgeNotes: 'VSEPR configurations are defined for specific combinations of bonding and lone pairs.',
    isValid: false,
    validationError: 'This configuration is outside the current VSEPR model used by this simulator.'
  };
}

/**
 * Calculates 3D Cartesian coordinates (X, Y, Z) for atoms and lone pair clouds in normalized units.
 */
export function calculate3DPositions(
  bondingPairs: number,
  lonePairs: number,
  scale: number = 1.8
): { atoms: { x: number; y: number; z: number; isLonePair?: boolean; label?: string }[]; bonds: [number, number][] } {
  const stericNumber = bondingPairs + lonePairs;
  const positions: { x: number; y: number; z: number; isLonePair?: boolean; label?: string }[] = [];
  const bonds: [number, number][] = [];

  // Central atom is always index 0 at origin (0, 0, 0)
  positions.push({ x: 0, y: 0, z: 0 });

  let domainVectors: { x: number; y: number; z: number }[] = [];

  switch (stericNumber) {
    case 2: // Linear (along X-axis)
      domainVectors = [
        { x: 1, y: 0, z: 0 },
        { x: -1, y: 0, z: 0 }
      ];
      break;

    case 3: // Trigonal Planar (in XY plane)
      domainVectors = [
        { x: 0, y: 1, z: 0 },
        { x: Math.cos(Math.PI / 6), y: -Math.sin(Math.PI / 6), z: 0 },
        { x: -Math.cos(Math.PI / 6), y: -Math.sin(Math.PI / 6), z: 0 }
      ];
      break;

    case 4: // Tetrahedral
      {
        const a = 1 / Math.sqrt(3);
        domainVectors = [
          { x: a, y: a, z: a },
          { x: a, y: -a, z: -a },
          { x: -a, y: a, z: -a },
          { x: -a, y: -a, z: a }
        ];
      }
      break;

    case 5: // Trigonal Bipyramidal
      // 2 Axial (+Z, -Z), 3 Equatorial (in XY plane)
      domainVectors = [
        { x: 0, y: 0, z: 1 },  // Axial 1
        { x: 0, y: 0, z: -1 }, // Axial 2
        { x: 1, y: 0, z: 0 },  // Equatorial 1
        { x: Math.cos(2 * Math.PI / 3), y: Math.sin(2 * Math.PI / 3), z: 0 }, // Equatorial 2
        { x: Math.cos(4 * Math.PI / 3), y: Math.sin(4 * Math.PI / 3), z: 0 }  // Equatorial 3
      ];

      // Re-order so Lone Pairs occupy Equatorial positions first!
      if (lonePairs === 1) {
        // 1 LP -> Equatorial 3
        domainVectors = [
          domainVectors[0], domainVectors[1], domainVectors[2], domainVectors[3], // 4 BPs
          domainVectors[4] // 1 LP
        ];
      } else if (lonePairs === 2) {
        // 2 LP -> Equatorial 2, Equatorial 3
        domainVectors = [
          domainVectors[0], domainVectors[1], domainVectors[2], // 3 BPs
          domainVectors[3], domainVectors[4] // 2 LPs
        ];
      } else if (lonePairs === 3) {
        // 3 LP -> Equatorial 1, Equatorial 2, Equatorial 3
        domainVectors = [
          domainVectors[0], domainVectors[1], // 2 Axial BPs
          domainVectors[2], domainVectors[3], domainVectors[4] // 3 Equatorial LPs
        ];
      }
      break;

    case 6: // Octahedral
      domainVectors = [
        { x: 1, y: 0, z: 0 },
        { x: -1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 0, y: -1, z: 0 },
        { x: 0, y: 0, z: 1 },
        { x: 0, y: 0, z: -1 }
      ];

      if (lonePairs === 2) {
        // Square Planar: LPs must be TRANS (+Z, -Z)
        domainVectors = [
          { x: 1, y: 0, z: 0 },
          { x: -1, y: 0, z: 0 },
          { x: 0, y: 1, z: 0 },
          { x: 0, y: -1, z: 0 }, // 4 BPs in XY plane
          { x: 0, y: 0, z: 1 },  // LP 1 (+Z)
          { x: 0, y: 0, z: -1 }  // LP 2 (-Z)
        ];
      }
      break;

    default:
      domainVectors = [];
  }

  // Populate positions: bonding pairs first, then lone pairs
  for (let i = 0; i < domainVectors.length; i++) {
    const isLp = i >= bondingPairs;
    const dist = isLp ? scale * 0.85 : scale;
    const vec = domainVectors[i];
    
    positions.push({
      x: vec.x * dist,
      y: vec.y * dist,
      z: vec.z * dist,
      isLonePair: isLp,
      label: isLp ? 'Lone Pair' : `Atom ${i + 1}`
    });

    if (!isLp) {
      bonds.push([0, i + 1]);
    }
  }

  return { atoms: positions, bonds };
}
