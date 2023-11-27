import * as THREE from "three";
import {
  Canvas,
  MeshPhongMaterialProps,
  extend,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { Physics, PlaneProps, usePlane, useSphere } from "@react-three/cannon";
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing";
import { useRef } from "react";

const rfs = THREE.MathUtils.randFloatSpread;

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
      <Plane
        color={"#f00"}
        position={[-5, 0, 20]}
        rotation={[0, Math.PI / 2, Math.PI]}
      />
      <Plane
        color={"#00f"}
        position={[5, 0, 20]}
        rotation={[0, -Math.PI / 2, -Math.PI]}
      />
      <Plane color={"#0f0"} position={[0, 0, 5]} rotation={[0, Math.PI, 0]} />
      <Plane // bottom
        color={"#ff0"}
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
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  numBalls,
  color,
}: {
  numBalls: number;
  color: string;
  mat?: THREE.Matrix4;
  vec?: THREE.Vector3;
}) {
  const sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
  const baubleMaterial = new THREE.MeshStandardMaterial({
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
    // position: [0, 0, 0],
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
      ref={ref as any}
      castShadow
      receiveShadow
      args={[undefined, undefined, numBalls]}
      geometry={sphereGeometry}
      material={baubleMaterial}
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
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      3
    )
  );
}

export default ({ color }: { color: string }) => {
  return (
    <Canvas
      style={{
        width: 180,
        height: 180,
      }}
      shadows
      gl={{ antialias: true }}
      camera={{ position: [0, 0, -34], fov: 20, near: 1, far: 1000 }}
    >
      {/* <Stats />
      <OrbitControls
        enablePan={true}
        minPolarAngle={1.5}
        maxPolarAngle={1.5}
        minDistance={0.5}
        maxDistance={200}
        enableZoom={true}
      />
      <rectAreaLight
        intensity={10.0}
        position={[0, 30, 0]}
        width={10}
        height={50}
        castShadow
        color={"#fff"}
      /> */}

      <ambientLight intensity={1.0} />
      {/* <color attach="background" args={["#fff"]} /> */}
      {/* <spotLight
        intensity={0.5}
        angle={90.0}
        penumbra={1}
        position={[0, 20, -50]}
        castShadow
        shadow-mapSize={[512, 512]}
      /> */}
      <Physics gravity={[0, -8, 0]} iterations={10}>
        {/* <Pointer /> */}
        <Clump numBalls={15} color={color} />
        <Room />
      </Physics>
      <Environment files={new URL("/adamsbridge.hdr", import.meta.url).href} />
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
