"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3, Group, Object3D } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

function asObjAccessor<T, R>(fn: (t: T) => R): (obj: object) => R {
  return fn as unknown as (obj: object) => R;
}

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<Object3D | null>(null);
  const groupRef = useRef<Group | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const ringsIntervalRef = useRef<number | null>(null);

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      const g = new ThreeGlobe() as unknown as Object3D;
      globeRef.current = g;
      groupRef.current.add(g);
      setIsInitialized(true);
    }
    return () => {
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    const globeAny = globeRef.current as unknown as {
      globeMaterial: () => {
        color: Color;
        emissive: Color;
        emissiveIntensity: number;
        shininess: number;
      };
    };

    const globeMaterial = globeAny.globeMaterial();
    globeMaterial.color = new Color(defaultProps.globeColor);
    globeMaterial.emissive = new Color(defaultProps.emissive);
    globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity ?? 0.1;
    globeMaterial.shininess = defaultProps.shininess ?? 0.9;
  }, [
    isInitialized,
    defaultProps.globeColor,
    defaultProps.emissive,
    defaultProps.emissiveIntensity,
    defaultProps.shininess,
  ]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const mobile = typeof window !== "undefined" && window.innerWidth < 768;
    const maxArcs = mobile ? Math.min(50, data.length) : Math.min(300, data.length);
    const arcs = data.slice(0, maxArcs);

    const points: Array<{ size: number; order: number; color: string; lat: number; lng: number }> = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: defaultProps.pointSize,
        order: arc.order,
        color: arc.color,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) => a.findIndex((v2) => v2.lat === v.lat && v2.lng === v.lng) === i
    );

    const globeAny = globeRef.current as unknown as ThreeGlobe & Object3D;

    globeAny
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(Boolean(defaultProps.showAtmosphere))
      .atmosphereColor(defaultProps.atmosphereColor)
      .atmosphereAltitude(defaultProps.atmosphereAltitude)
      .hexPolygonColor(() => defaultProps.polygonColor);

    globeAny
      .arcsData(arcs)
      .arcStartLat(asObjAccessor<Position, number>((d) => d.startLat))
      .arcStartLng(asObjAccessor<Position, number>((d) => d.startLng))
      .arcEndLat(asObjAccessor<Position, number>((d) => d.endLat))
      .arcEndLng(asObjAccessor<Position, number>((d) => d.endLng))
      .arcColor(asObjAccessor<Position, string>((e) => e.color))
      .arcAltitude(asObjAccessor<Position, number>((e) => e.arcAlt))
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaultProps.arcLength)
      .arcDashInitialGap(asObjAccessor<Position, number>((e) => e.order))
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaultProps.arcTime);

    globeAny
      .pointsData(filteredPoints)
      .pointColor(asObjAccessor<{ color: string }, string>((e) => e.color))
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    globeAny
      .ringsData([])
      .ringColor(() => defaultProps.polygonColor)
      .ringMaxRadius(defaultProps.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((defaultProps.arcTime * defaultProps.arcLength) / Math.max(1, defaultProps.rings));
  }, [
    isInitialized,
    data,
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    // clear previous interval
    if (ringsIntervalRef.current !== null) {
      window.clearInterval(ringsIntervalRef.current);
      ringsIntervalRef.current = null;
    }

    const intervalId = window.setInterval(() => {
      if (!globeRef.current) return;

      const newNumbersOfRings = genRandomNumbers(0, data.length, Math.floor((data.length * 2) / 5));
      const ringsData = data
        .filter((_d, i) => newNumbersOfRings.includes(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        }));

      const globeAny = globeRef.current as unknown as ThreeGlobe & Object3D;
      globeAny.ringsData(ringsData);
    }, 3000);

    ringsIntervalRef.current = intervalId;

    return () => {
      if (ringsIntervalRef.current !== null) {
        window.clearInterval(ringsIntervalRef.current);
        ringsIntervalRef.current = null;
      }
    };
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  const dprCap: [number, number] = [1, 1.5];

  return (
    <Canvas
      scene={scene}
      camera={new PerspectiveCamera(50, aspect, 180, 1800)}
      dpr={dprCap}
      gl={{ antialias: false }}
    >
      <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
      <directionalLight color={globeConfig.directionalLeftLight} position={new Vector3(-400, 100, 400)} />
      <directionalLight color={globeConfig.directionalTopLight} position={new Vector3(-200, 500, 200)} />
      <pointLight color={globeConfig.pointLight} position={new Vector3(-200, 500, 200)} intensity={0.8} />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={1}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const expanded = hex.replace(shorthandRegex, function (_m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expanded);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number): number[] {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}
