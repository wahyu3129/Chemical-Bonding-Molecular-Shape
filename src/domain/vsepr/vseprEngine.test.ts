import { calculateVseprShape } from './vseprEngine';

/**
 * Unit tests for Cambridge AS/A Level VSEPR Engine
 */
export function runVseprTests(): { passed: boolean; results: string[] } {
  const results: string[] = [];
  let allPassed = true;

  function assertEqual(testName: string, actual: any, expected: any) {
    if (actual === expected) {
      results.push(`✅ [PASS] ${testName}`);
    } else {
      allPassed = false;
      results.push(`❌ [FAIL] ${testName}: Expected "${expected}", got "${actual}"`);
    }
  }

  // 1. AX2 -> Linear
  const ax2 = calculateVseprShape(2, 0, 'Be');
  assertEqual('AX2 Molecular Shape', ax2.molecularShape, 'Linear');
  assertEqual('AX2 Steric Number', ax2.stericNumber, 2);
  assertEqual('AX2 Bond Angle', ax2.approximateBondAngle, '180°');

  // 2. AX3 -> Trigonal Planar
  const ax3 = calculateVseprShape(3, 0, 'B');
  assertEqual('AX3 Molecular Shape', ax3.molecularShape, 'Trigonal Planar');
  assertEqual('AX3 Bond Angle', ax3.approximateBondAngle, '120°');

  // 3. AX2E -> Bent
  const ax2e = calculateVseprShape(2, 1, 'S');
  assertEqual('AX2E Molecular Shape', ax2e.molecularShape, 'Bent');
  assertEqual('AX2E Electron Geometry', ax2e.electronGeometry, 'Trigonal Planar');

  // 4. AX4 -> Tetrahedral
  const ax4 = calculateVseprShape(4, 0, 'C');
  assertEqual('AX4 Molecular Shape', ax4.molecularShape, 'Tetrahedral');
  assertEqual('AX4 Bond Angle', ax4.approximateBondAngle, '109.5°');

  // 5. AX3E -> Trigonal Pyramidal
  const ax3e = calculateVseprShape(3, 1, 'N');
  assertEqual('AX3E Molecular Shape', ax3e.molecularShape, 'Trigonal Pyramidal');
  assertEqual('AX3E Bond Angle', ax3e.approximateBondAngle, 'approximately 107°');

  // 6. AX2E2 -> Bent
  const ax2e2 = calculateVseprShape(2, 2, 'O');
  assertEqual('AX2E2 Molecular Shape', ax2e2.molecularShape, 'Bent');
  assertEqual('AX2E2 Bond Angle', ax2e2.approximateBondAngle, 'approximately 104.5°');

  // 7. AX5 -> Trigonal Bipyramidal
  const ax5 = calculateVseprShape(5, 0, 'P');
  assertEqual('AX5 Molecular Shape', ax5.molecularShape, 'Trigonal Bipyramidal');
  assertEqual('AX5 Steric Number', ax5.stericNumber, 5);

  // 8. AX4E -> Seesaw
  const ax4e = calculateVseprShape(4, 1, 'S');
  assertEqual('AX4E Molecular Shape', ax4e.molecularShape, 'Seesaw');

  // 9. AX3E2 -> T-shaped
  const ax3e2 = calculateVseprShape(3, 2, 'Cl');
  assertEqual('AX3E2 Molecular Shape', ax3e2.molecularShape, 'T-shaped');

  // 10. AX2E3 -> Linear
  const ax2e3 = calculateVseprShape(2, 3, 'Xe');
  assertEqual('AX2E3 Molecular Shape', ax2e3.molecularShape, 'Linear');

  // 11. AX6 -> Octahedral
  const ax6 = calculateVseprShape(6, 0, 'S');
  assertEqual('AX6 Molecular Shape', ax6.molecularShape, 'Octahedral');

  // 12. AX5E -> Square Pyramidal
  const ax5e = calculateVseprShape(5, 1, 'Br');
  assertEqual('AX5E Molecular Shape', ax5e.molecularShape, 'Square Pyramidal');

  // 13. AX4E2 -> Square Planar
  const ax4e2 = calculateVseprShape(4, 2, 'Xe');
  assertEqual('AX4E2 Molecular Shape', ax4e2.molecularShape, 'Square Planar');

  // Invalid configuration test
  const invalid = calculateVseprShape(7, 2, 'Xe');
  assertEqual('Invalid config rejection', invalid.isValid, false);

  return { passed: allPassed, results };
}
