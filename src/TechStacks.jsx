import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
    BallCollider,
    Physics,
    RigidBody,
    CylinderCollider,
} from "@react-three/rapier";

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

function SphereGeo({
    vec = new THREE.Vector3(),
    scale,
    r = THREE.MathUtils.randFloatSpread,
    material,
    isActive,
}) {
    const api = useRef(null);

    useFrame((_state, delta) => {
        if (!isActive) return;
        delta = Math.min(0.1, delta);
        const impulse = vec
            .copy(api.current.translation())
            .normalize()
            .multiply(
                new THREE.Vector3(
                    -50 * delta * scale,
                    -150 * delta * scale,
                    -50 * delta * scale
                )
            );

        if (api.current) {
            api.current.applyImpulse(impulse, true);
        }
    });

    return (
        <RigidBody
            linearDamping={0.75}
            angularDamping={0.15}
            friction={0.2}
            position={[r(20), r(20) - 25, r(20) - 10]}
            ref={api}
            colliders={false}
        >
            <BallCollider args={[scale]} />
            <CylinderCollider
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0, 1.2 * scale]}
                args={[0.15 * scale, 0.275 * scale]}
            />
            <mesh
                castShadow
                receiveShadow
                scale={scale}
                geometry={sphereGeometry}
                material={material}
                rotation={[0.3, 1, 1]}
            />
        </RigidBody>
    );
}

function Pointer({ vec = new THREE.Vector3(), isActive }) {
    const ref = useRef(null);

    useFrame(({ pointer, viewport }) => {
        if (!isActive) return;
        const targetVec = vec.lerp(
            new THREE.Vector3(
                (pointer.x * viewport.width) / 2,
                (pointer.y * viewport.height) / 2,
                0
            ),
            0.2
        );
        if (ref.current) {
            ref.current.setNextKinematicTranslation(targetVec);
        }
    });

    return (
        <RigidBody
            position={[100, 100, 100]}
            type="kinematicPosition"
            colliders={false}
            ref={ref}
        >
            <BallCollider args={[2]} />
        </RigidBody>
    );
}

export default function TechStack({
    imageUrls,
    count = 30,
    environmentFile = "/models/char_enviorment.hdr"
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [textures, setTextures] = useState([]);

    useEffect(() => {
        if (!imageUrls || imageUrls.length === 0) return;
        const loader = new THREE.TextureLoader();
        Promise.all(imageUrls.map((url) => loader.loadAsync(url)))
            .then((loadedTextures) => {
                setTextures(loadedTextures);
            })
            .catch((err) => console.error("Error loading textures:", err));
    }, [imageUrls]);

    const spheres = useMemo(
        () =>
            [...Array(count)].map(() => ({
                scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
            })),
        [count]
    );

    const materials = useMemo(() => {
        if (textures.length === 0) return [];
        return textures.map(
            (texture) =>
                new THREE.MeshPhysicalMaterial({
                    map: texture,
                    emissive: "#ffffff",
                    emissiveMap: texture,
                    emissiveIntensity: 0.3,
                    metalness: 0.5,
                    roughness: 1,
                    clearcoat: 0.1,
                })
        );
    }, [textures]);

    return (
        <div
            className="techstack-container"
            style={{ width: "100%", height: "100%", position: "relative" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 1,
                width: "100%",
                textAlign: "center"
            }}>
                <h1 style={{
                    fontSize: "clamp(2rem, 8vw, 6rem)",
                    fontWeight: "900",
                    color: "rgba(255, 255, 255, 1)",
                    textTransform: "uppercase",
                    letterSpacing: "5px",
                    margin: 0
                }}>
                    Skills
                </h1>
            </div>

            <Canvas
                shadows
                gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
                camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
                onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
                style={{ width: "100%", height: "100%", pointerEvents: isHovered ? "auto" : "none", position: "relative", zIndex: 2 }}
            >
                <ambientLight intensity={1} />
                <spotLight
                    position={[20, 20, 25]}
                    penumbra={1}
                    angle={0.2}
                    color="white"
                    castShadow
                    shadow-mapSize={[512, 512]}
                />
                <directionalLight position={[0, 5, -4]} intensity={2} />

                {materials.length > 0 && (
                    <Physics gravity={[0, 0, 0]}>
                        <Pointer isActive={isHovered} />
                        {spheres.map((props, i) => (
                            <SphereGeo
                                key={i}
                                {...props}
                                material={materials[i % materials.length]}
                                isActive={isHovered}
                            />
                        ))}
                    </Physics>
                )}

                {environmentFile && (
                    <Environment
                        files={environmentFile}
                        environmentIntensity={0.5}
                        environmentRotation={[0, 4, 2]}
                    />
                )}

                <EffectComposer enableNormalPass={false}>
                    <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
