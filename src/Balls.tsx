import {
  Canvas,
  MeshPhongMaterialProps,
  extend,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Physics, PlaneProps, usePlane, useSphere } from "@react-three/cannon";
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing";
import { useRef, useEffect } from "react";
import {
  MathUtils,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
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
  // const texture = useTexture("/ball-9.jpg");
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
  className,
}: {
  className?: string;
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
      <Physics gravity={[0, -8, 0]} iterations={10}>
        <Pointer />
        <Clump numBalls={20} color={color} />
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
    </Canvas>
  );
};
