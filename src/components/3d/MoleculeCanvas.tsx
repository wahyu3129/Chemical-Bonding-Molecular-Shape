import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Eye, EyeOff, Tag, Compass, Play, Pause } from 'lucide-react';
import { AtomPosition, BondData, LonePairPosition } from '../../types';

interface MoleculeCanvasProps {
  atoms: AtomPosition[];
  bonds: BondData[];
  lonePairPositions?: LonePairPosition[];
  showLabels?: boolean;
  showLonePairs?: boolean;
  showBondAngles?: boolean;
  showElectronDomains?: boolean;
  approximateBondAngle?: string;
  autoRotate?: boolean;
  className?: string;
  height?: string;
}

export const MoleculeCanvas: React.FC<MoleculeCanvasProps> = ({
  atoms,
  bonds,
  lonePairPositions = [],
  showLabels = true,
  showLonePairs = true,
  showBondAngles = true,
  showElectronDomains = true,
  approximateBondAngle,
  autoRotate = true,
  className = '',
  height = 'h-96'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(autoRotate);
  const [labelsVisible, setLabelsVisible] = useState(showLabels);
  const [lonePairsVisible, setLonePairsVisible] = useState(showLonePairs);
  const [bondAnglesVisible, setBondAnglesVisible] = useState(showBondAngles);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const moleGroupRef = useRef<THREE.Group | null>(null);

  // Interaction refs
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Sync state props when parent changes them
  useEffect(() => { setLabelsVisible(showLabels); }, [showLabels]);
  useEffect(() => { setLonePairsVisible(showLonePairs); }, [showLonePairs]);
  useEffect(() => { setBondAnglesVisible(showBondAngles); }, [showBondAngles]);

  // Setup Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, heightPx);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.5);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Group for Molecule
    const moleGroup = new THREE.Group();
    scene.add(moleGroup);
    moleGroupRef.current = moleGroup;

    // Mouse & Touch interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !moleGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      moleGroupRef.current.rotation.y += deltaX * 0.01;
      moleGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z += e.deltaY * 0.005;
      cameraRef.current.position.z = Math.max(3, Math.min(15, cameraRef.current.position.z));
    };

    // Touch events for mobile/tablet
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !moleGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      moleGroupRef.current.rotation.y += deltaX * 0.01;
      moleGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('wheel', handleWheel, { passive: false });
    domElem.addEventListener('touchstart', handleTouchStart);
    domElem.addEventListener('touchmove', handleTouchMove);
    domElem.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (moleGroupRef.current && isRotating && !isDraggingRef.current) {
        moleGroupRef.current.rotation.y += 0.006;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('wheel', handleWheel);
      domElem.removeEventListener('touchstart', handleTouchStart);
      domElem.removeEventListener('touchmove', handleTouchMove);
      domElem.removeEventListener('touchend', handleTouchEnd);
      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }
    };
  }, [isRotating]);

  // Keyboard controls (R = reset, L = toggle labels, E = toggle lone pairs, B = toggle bond angles)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 'r' || e.key === 'R') {
        resetView();
      } else if (e.key === 'l' || e.key === 'L') {
        setLabelsVisible(v => !v);
      } else if (e.key === 'e' || e.key === 'E') {
        setLonePairsVisible(v => !v);
      } else if (e.key === 'b' || e.key === 'B') {
        setBondAnglesVisible(v => !v);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsRotating(v => !v);
      } else if (e.key === 'ArrowLeft') {
        if (moleGroupRef.current) moleGroupRef.current.rotation.y -= 0.1;
      } else if (e.key === 'ArrowRight') {
        if (moleGroupRef.current) moleGroupRef.current.rotation.y += 0.1;
      } else if (e.key === 'ArrowUp') {
        if (moleGroupRef.current) moleGroupRef.current.rotation.x -= 0.1;
      } else if (e.key === 'ArrowDown') {
        if (moleGroupRef.current) moleGroupRef.current.rotation.x += 0.1;
      } else if (e.key === '+' || e.key === '=') {
        if (cameraRef.current) cameraRef.current.position.z = Math.max(3, cameraRef.current.position.z - 0.5);
      } else if (e.key === '-' || e.key === '_') {
        if (cameraRef.current) cameraRef.current.position.z = Math.min(15, cameraRef.current.position.z + 0.5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update molecule 3D meshes whenever atoms/bonds/lonePairs change
  useEffect(() => {
    const group = moleGroupRef.current;
    if (!group) return;

    // Clear existing objects
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
    }

    // 1. Build Atoms
    atoms.forEach((atom) => {
      const radius = atom.radius || (atom.isCentral ? 0.55 : 0.42);
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const color = atom.color || (atom.isCentral ? 0x3b82f6 : 0x38bdf8);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.2,
        metalness: 0.3
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(atom.x, atom.y, atom.z);
      group.add(sphere);
    });

    // 2. Build Bonds
    bonds.forEach((bond) => {
      const p1 = atoms[bond.fromIndex];
      const p2 = atoms[bond.toIndex];
      if (!p1 || !p2) return;

      const pos1 = new THREE.Vector3(p1.x, p1.y, p1.z);
      const pos2 = new THREE.Vector3(p2.x, p2.y, p2.z);
      const distance = pos1.distanceTo(pos2);
      const midPoint = new THREE.Vector3().addVectors(pos1, pos2).multiplyScalar(0.5);

      const numCylinders = bond.order || 1;
      const offsets = numCylinders === 1 ? [0] : numCylinders === 2 ? [-0.08, 0.08] : [-0.12, 0, 0.12];

      offsets.forEach((off) => {
        const cylinderGeo = new THREE.CylinderGeometry(0.08, 0.08, distance, 16);
        const cylinderMat = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          roughness: 0.4,
          metalness: 0.1
        });
        const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);

        cylinder.position.copy(midPoint);
        if (numCylinders > 1) {
          cylinder.position.x += off;
        }

        // Orient cylinder towards target
        const direction = new THREE.Vector3().subVectors(pos2, pos1).normalize();
        const orientation = new THREE.Matrix4();
        orientation.lookAt(pos1, pos2, new THREE.Vector3(0, 1, 0));
        cylinder.quaternion.setFromRotationMatrix(orientation);
        cylinder.rotateX(Math.PI / 2);

        group.add(cylinder);
      });
    });

    // 3. Build Lone Pair Lobes (Electron Clouds)
    if (lonePairsVisible && lonePairPositions) {
      lonePairPositions.forEach((lp) => {
        const lpGroup = new THREE.Group();

        // Teardrop / Ellipsoid Lobe for Electron Density
        const lobeGeo = new THREE.SphereGeometry(0.5, 32, 32);
        lobeGeo.scale(0.8, 1.4, 0.8); // elongate like an orbital lobe

        const lobeMat = new THREE.MeshPhongMaterial({
          color: 0xc084fc, // soft translucent purple
          transparent: true,
          opacity: 0.55,
          shininess: 90
        });

        const lobeMesh = new THREE.Mesh(lobeGeo, lobeMat);
        lobeMesh.position.set(lp.x, lp.y, lp.z);

        // Point lobe outward from central atom (0,0,0)
        const dir = new THREE.Vector3(lp.x, lp.y, lp.z).normalize();
        lobeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

        lpGroup.add(lobeMesh);

        // Add 2 small sphere dots representing paired electrons
        const dotGeo = new THREE.SphereGeometry(0.09, 16, 16);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

        const dot1 = new THREE.Mesh(dotGeo, dotMat);
        const dot2 = new THREE.Mesh(dotGeo, dotMat);

        dot1.position.set(lp.x * 0.95 + 0.12, lp.y * 0.95, lp.z * 0.95 + 0.1);
        dot2.position.set(lp.x * 0.95 - 0.12, lp.y * 0.95, lp.z * 0.95 - 0.1);

        lpGroup.add(dot1);
        lpGroup.add(dot2);

        group.add(lpGroup);
      });
    }

  }, [atoms, bonds, lonePairPositions, lonePairsVisible]);

  const resetView = () => {
    if (moleGroupRef.current) {
      moleGroupRef.current.rotation.set(0, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 7.5);
    }
  };

  return (
    <div className={`relative w-full ${height} bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner group ${className}`}>
      {/* Three.js WebGL Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Badge Overlay */}
      {approximateBondAngle && bondAnglesVisible && (
        <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-sky-300 font-mono flex items-center gap-1.5 shadow-lg">
          <Compass className="w-4 h-4 text-sky-400" />
          <span>Bond Angle: <strong>{approximateBondAngle}</strong></span>
        </div>
      )}

      {/* Atomic Labels Overlay */}
      {labelsVisible && (
        <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 flex items-center gap-2 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
            Central ({atoms[0]?.symbol})
          </span>
          {atoms.length > 1 && (
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span>
              Terminal ({atoms[1]?.symbol})
            </span>
          )}
          {lonePairPositions && lonePairPositions.length > 0 && lonePairsVisible && (
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block"></span>
              Lone Pair
            </span>
          )}
        </div>
      )}

      {/* Bottom Control Toolbar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 shadow-xl flex items-center gap-2 text-xs text-slate-200">
        <button
          onClick={resetView}
          className="p-1.5 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white"
          title="Reset View (R)"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-slate-700 mx-1" />

        <button
          onClick={() => setIsRotating(v => !v)}
          className={`p-1.5 rounded-full transition-colors ${isRotating ? 'bg-sky-500/20 text-sky-400' : 'hover:bg-slate-700 text-slate-300'}`}
          title="Toggle Auto Rotate (Space)"
        >
          {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setLabelsVisible(v => !v)}
          className={`p-1.5 rounded-full transition-colors ${labelsVisible ? 'bg-sky-500/20 text-sky-400' : 'hover:bg-slate-700 text-slate-400'}`}
          title="Toggle Atom Labels (L)"
        >
          <Tag className="w-4 h-4" />
        </button>

        <button
          onClick={() => setLonePairsVisible(v => !v)}
          className={`p-1.5 rounded-full transition-colors ${lonePairsVisible ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-slate-700 text-slate-400'}`}
          title="Toggle Lone Pairs (E)"
        >
          {lonePairsVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setBondAnglesVisible(v => !v)}
          className={`p-1.5 rounded-full transition-colors ${bondAnglesVisible ? 'bg-emerald-500/20 text-emerald-400' : 'hover:bg-slate-700 text-slate-400'}`}
          title="Toggle Bond Angles (B)"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Keyboard Shortcuts Helper Hint */}
      <div className="absolute bottom-2 right-4 text-[10px] text-slate-500 hidden md:block font-mono">
        Drag to rotate • Scroll to zoom • R: Reset • L: Labels • E: Lone Pairs • B: Angles
      </div>
    </div>
  );
};
