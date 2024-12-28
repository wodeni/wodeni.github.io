import {
  Canvas,
  MeshPhongMaterialProps,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Physics, PlaneProps, usePlane, useSphere } from "@react-three/cannon";
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing";
import { useRef, useEffect, useState, useMemo } from "react";
import {
  MathUtils,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";

const rfs = MathUtils.randFloatSpread;

type OurPlaneProps = Pick<MeshPhongMaterialProps, "color"> &
  Pick<PlaneProps, "position" | "rotation">;

function Plane({ color, ...props }: OurPlaneProps) {
  const [ref] = usePlane(() => ({ ...props }), useRef<THREE.Mesh>(null));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshPhongMaterial
        color={color}
        opacity={0}
        transparent
        shininess={0.0}
      />
    </mesh>
  );
}

function Room() {
  return (
    <>
      <Plane position={[-5, 0, 20]} rotation={[0, Math.PI / 2, Math.PI]} />
      <Plane position={[5, 0, 20]} rotation={[0, -Math.PI / 2, -Math.PI]} />
      <Plane position={[0, 0, 5]} rotation={[0, Math.PI, 0]} />
      <Plane // bottom
        position={[0, -5, 20]}
        rotation={[Math.PI / 2, Math.PI, 0]}
      />
      {/* <Plane // top
        color={"#0ff"}
        position={[0, 10, 20]}
        rotation={[Math.PI / 2 - 0.15, Math.PI, 0]}
      /> */}
    </>
  );
}

function Clump({
  mat = new Matrix4(),
  vec = new Vector3(),
  numBalls,
  color,
}: {
  numBalls: number;
  color: string;
  mat?: THREE.Matrix4;
  vec?: THREE.Vector3;
}) {
  const sphereGeometry = new SphereGeometry(1, 50, 50);
  const baubleMaterial = new MeshStandardMaterial({
    color,
    roughness: 0,
    envMapIntensity: 1,
  });
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(10), rfs(10), rfs(10)],
  }));
  useFrame((state) => {
    for (let i = 0; i < numBalls; i++) {
      // Get current whereabouts of the instanced sphere
      (ref.current! as any).getMatrixAt(i, mat);
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api
        .at(i)
        .applyForce(
          vec
            .setFromMatrixPosition(mat)
            .normalize()
            .multiplyScalar(-40)
            .toArray(),
          [0, 0, 0]
        );
    }
  });
  return (
    <instancedMesh
      receiveShadow
      ref={ref as any}
      args={[undefined, undefined, numBalls]}
      geometry={sphereGeometry}
      material={baubleMaterial}
      // material-map={texture}
    />
  );
}

// function Rack({
//   mat = new Matrix4(),
//   vec = new Vector3(),
//   color,
// }: {
//   color: string;
//   mat?: Matrix4;
//   vec?: Vector3;
// }) {
//   const sphereGeometry = new SphereGeometry(1, 50, 50);
//   const objectBallMaterial = new MeshStandardMaterial({
//     color: "#999",
//     roughness: 0,
//   });
//   const nineBallMaterial = new MeshStandardMaterial({
//     color,
//     roughness: 0,
//   });

//   const [ref, api] = useSphere(() => ({
//     args: [1],
//     mass: 1,
//     angularDamping: 0.1,
//     linearDamping: 0.65,
//     position: [rfs(10), rfs(10), rfs(10)],
//   }));

//   // Precompute the diamond-shaped rack positions
//   const d = 2;
//   const h = (Math.sqrt(3) * d) / 2;
//   const diamondPositions = [
//     [0, 2 * h, 0],
//     [-d / 2, h, 0],
//     [d / 2, h, 0],
//     [d, 0, 0],
//     [-d, 0, 0],
//     [-d / 2, -h, 0],
//     [d / 2, -h, 0],
//     [0, -2 * h, 0],
//   ];

//   // Initialize ball positions
//   useFrame(() => {
//     diamondPositions.forEach((pos, i) => {
//       api.at(i).position.set(pos[0], pos[1], pos[2]);
//     });
//   });

//   return (
//     <>
//       <instancedMesh
//         receiveShadow
//         ref={ref as any}
//         args={[undefined, undefined, 8]}
//         geometry={sphereGeometry}
//         material={objectBallMaterial}
//       />
//       <instancedMesh
//         receiveShadow
//         args={[undefined, undefined, 1]}
//         geometry={sphereGeometry}
//         material={nineBallMaterial}
//       />
//     </>
//   );
// }

function Rack({
  mat = new Matrix4(),
  vec = new Vector3(),
  color,
}: {
  color: string;
  mat?: Matrix4;
  vec?: Vector3;
}) {
  const sphereGeometry = new SphereGeometry(1, 50, 50);
  const objectBallMaterial = new MeshStandardMaterial({
    color: "#999",
    roughness: 0,
  });
  const nineBallMaterial = new MeshStandardMaterial({
    color,
    roughness: 0,
  });

  // --------------------------------------------------------------------
  // 1) The diamond positions for the 8 "object" balls
  //    The 9-ball (center) is simply at [0, 0, 0].
  // --------------------------------------------------------------------
  const d = 2;
  const h = (Math.sqrt(3) * d) / 2;
  const diamondPositions = [
    [0, 2 * h, 0],
    [-d / 2, h, 0],
    [d / 2, h, 0],
    [d, 0, 0],
    [-d, 0, 0],
    [-d / 2, -h, 0],
    [d / 2, -h, 0],
    [0, -2 * h, 0],
  ];
  const NUM_BALLS = diamondPositions.length; // 8

  // --------------------------------------------------------------------
  // 2) We want random initial positions that do NOT overlap
  //    with the 9-ball at [0,0,0].
  //    Each ball has radius 1, so let's keep them at least 2 units away.
  // --------------------------------------------------------------------
  const minDistanceFromCenter = 2; // or 2.1 if you want a tiny gap
  const randomFromSpace = (range: number) => Math.random() * range - range / 2;

  function getRandomPositionNonOverlapping(
    minDist: number,
    range: number
  ): [number, number, number] {
    let x, y, z, dist;
    do {
      x = randomFromSpace(range);
      y = randomFromSpace(range);
      z = randomFromSpace(range);
      dist = Math.sqrt(x * x + y * y + z * z);
    } while (dist < minDist);
    return [x, y, z];
  }

  const initialPositions = useMemo(() => {
    return Array.from({ length: NUM_BALLS }, () =>
      getRandomPositionNonOverlapping(minDistanceFromCenter, 10)
    );
  }, [NUM_BALLS]);

  // --------------------------------------------------------------------
  // 3) Create the physics bodies:
  //    - 8 object balls, each starting from the random positions
  //    - 1 "center" 9-ball at [0,0,0]
  // --------------------------------------------------------------------
  const [objectRef, objectApi] = useSphere((index) => ({
    args: [1],
    mass: 0,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: initialPositions[index],
    type: "Dynamic",
  }));

  // The 9-ball is simply placed at the center from the start,
  // with no "fly in" animation.
  const [nineRef] = useSphere(() => ({
    args: [1],
    mass: 0, // or 1 if you still want it to be a physics body
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [0, 0, 0],
    type: "Static", // or "Dynamic" if you want it to move
  }));

  // --------------------------------------------------------------------
  // 4) Animate the 8 object balls flying into the diamond shape,
  //    using a simple lerp from their random initial positions.
  // --------------------------------------------------------------------
  const [flyInProgress, setFlyInProgress] = useState(0);

  useFrame((_, delta) => {
    setFlyInProgress((prev) => Math.min(1, prev + delta + flyInProgress * 0.1));
    diamondPositions.forEach((targetPos, i) => {
      const [ix, iy, iz] = initialPositions[i];
      const [tx, ty, tz] = targetPos;
      const t = flyInProgress;
      const x = ix + (tx - ix) * t;
      const y = iy + (ty - iy) * t;
      const z = iz + (tz - iz) * t;
      objectApi.at(i).position.set(x, y, z);
    });
  });

  return (
    <>
      {/* 8 object balls */}
      <instancedMesh
        receiveShadow
        ref={objectRef as any}
        args={[undefined, undefined, NUM_BALLS]}
        geometry={sphereGeometry}
        material={objectBallMaterial}
      />
      {/* 9-ball at the center */}
      <instancedMesh
        receiveShadow
        ref={nineRef as any}
        args={[undefined, undefined, 1]}
        geometry={sphereGeometry}
        material={nineBallMaterial}
      />
    </>
  );
}

function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [, api] = useSphere(() => ({
    type: "Kinematic",
    args: [3],
    position: [0, 0, 0],
  }));
  return useFrame((state) =>
    api.position.set(
      -(state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      3
    )
  );
}
const PointLightRectangle = ({
  intensity,
  color,
  distance,
  width,
  height,
}: {
  intensity: number;
  color: string;
  distance: number;
  width: number;
  height: number;
}) => {
  const positions = [];
  const numLightsPerSide = 10;

  // Generate positions for the lights
  for (let i = 0; i < numLightsPerSide; i++) {
    positions.push([
      -width / 2 + (width / (numLightsPerSide - 1)) * i,
      distance,
      height / 2,
    ]); // Top side
    positions.push([
      -width / 2 + (width / (numLightsPerSide - 1)) * i,
      distance,
      -height / 2,
    ]); // Bottom side
    positions.push([
      width / 2,
      distance,
      -height / 2 + (height / (numLightsPerSide - 1)) * i,
    ]); // Right side
    positions.push([
      -width / 2,
      distance,
      -height / 2 + (height / (numLightsPerSide - 1)) * i,
    ]); // Left side
  }

  return (
    <>
      {positions.map((position, index) => (
        <pointLight
          key={index}
          position={position as unknown as THREE.Vector3}
          intensity={intensity}
          color={color}
        />
      ))}
    </>
  );
};

export default ({
  color,
  mode,
  className,
}: {
  className?: string;
  mode: "pool" | "clump";
  color: string;
}) => {
  return (
    <Canvas
      className={className}
      shadows
      gl={{ antialias: true }}
      camera={{ position: [0, 0, -34], fov: 20, near: 1, far: 1000 }}
    >
      {/* <color attach="background" args={["#fff"]} /> */}
      <Physics gravity={[0, 0, 0]} iterations={10}>
        {mode === "clump" && <Clump numBalls={20} color={color} />}
        {/* {mode === "clump" && <Pointer />} */}
        <Pointer />
        {mode === "pool" && <Rack color={color} />}
        {/* <Room /> */}
      </Physics>
      <ambientLight intensity={1} />
      <PointLightRectangle
        intensity={0.05}
        color="#ffffff"
        distance={100}
        height={200}
        width={100}
      />

      <EffectComposer disableNormalPass multisampling={0}>
        <N8AO
          color="black"
          aoRadius={2}
          intensity={1}
          aoSamples={6}
          denoiseSamples={4}
        />
        <SMAA />
      </EffectComposer>
      {mode === "pool" && <OrbitControls />}
    </Canvas>
  );
};
