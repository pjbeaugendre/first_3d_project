import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import GUI from 'lil-gui'

/**
 * Parameters
 */
const parameters = {
    color: 0x35453b,
    light1Color: 0xff01ff,
    light2Color: 0xffffff,
    light3Color: 0x35453b,
}

/**
 * Debug
 */
// const gui = new GUI()

// Texture Loader
const textureLoader = new THREE.TextureLoader()
const textTexture = textureLoader.load('/textures/matcaps/1.jpg')
const particleTexture = textureLoader.load('/textures/particles/4.png')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Particles
 */
// Geometry
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
const particlesGeometry = new THREE.BufferGeometry()
const count = 20000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 35
    colors[i] = Math.random()
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

/**
 * Mesh
 */
let text = new THREE.Mesh()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const pointLight = new THREE.PointLight(parameters.light1Color, 0.6)
pointLight.position.x = -5
pointLight.position.y = 0
pointLight.position.z = 5

// gui.addColor(parameters, 'light1Color').onChange(() => {
//     pointLight.color.set(parameters.light1Color)
// })

const pointLight2 = new THREE.PointLight(parameters.light2Color, 0.6)
pointLight2.position.x = 5
pointLight2.position.y = 0
pointLight2.position.z = 5
// gui.addColor(parameters, 'light2Color').onChange(() => {
//     pointLight2.color.set(parameters.light2Color)
// })

const pointLight3 = new THREE.PointLight(parameters.light3Color, 0.8)
pointLight3.position.x = 0
pointLight3.position.y = 0
pointLight3.position.z = -5
// gui.addColor(parameters, 'light3Color').onChange(() => {
//     pointLight3.color.set(parameters.light3Color)
// })

const helper = new THREE.PointLightHelper(pointLight3, 1)

scene.add(ambientLight, pointLight, pointLight2, pointLight3, helper)

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
    '/font/GSR.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Fullstack Developer\n     Pierre-Joseph\n      BEAUGENDRE',
            {
                font,
                size: 0.7,
                height: 0.1,
                curveSegments: 20,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        textGeometry.computeBoundingBox()
        textGeometry.center()

        // Material
        const textMaterial = new THREE.MeshStandardMaterial({map: textTexture, roughness: 0.5, metalness: 0.4})
        const formMaterialW = new THREE.MeshNormalMaterial()

        formMaterialW.wireframe = true

        // material.wireframe = false
        text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const SphereGeometry = new THREE.SphereGeometry(0.5, 26, 26)
        const coneGeometry = new THREE.IcosahedronGeometry(1, 0)

        for (let i = 0; i < 600; i++) {
            if (Math.random() <= 0.5) {
                const donut = new THREE.Mesh(donutGeometry, formMaterialW)
                donut.position.x = (Math.random() - 0.5) * 35
                donut.position.y = (Math.random() - 0.5) * 35
                donut.position.z = (Math.random() - 0.5) * 35

                donut.rotation.x = (Math.random() * Math.PI)
                donut.rotation.y = (Math.random() * Math.PI)

                const scale = Math.random() + 0.3
                donut.scale.set(scale, scale, scale)

                scene.add(donut)
            } else {
                const sphere = new THREE.Mesh(coneGeometry, formMaterialW)
                sphere.position.x = (Math.random() - 0.5) * 35
                sphere.position.y = (Math.random() - 0.5) * 35
                sphere.position.z = (Math.random() - 0.5) * 35

                sphere.rotation.x = (Math.random() * Math.PI)
                sphere.rotation.y = (Math.random() * Math.PI)

                const scale = Math.random() - 0.2
                sphere.scale.set(scale, scale, scale)

                scene.add(sphere)
            }
        }
    }
)

/**
 * Material
 */
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    // color: 0xff00aa,
    transparent: true,
    alphaMap: particleTexture,
    // alphaTest: 0.001,
    // depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 11
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxDistance = 20
controls.minDistance = 3
/*controls.minAzimuthAngle = - (Math.PI * 0.4)
controls.maxAzimuthAngle = (Math.PI * 0.4)
controls.maxPolarAngle = Math.PI * 0.9
controls.minPolarAngle = Math.PI * 0.1*/

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(parameters.color, 1)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate particles
    particles.rotation.y = - Math.sin(elapsedTime * 0.02)
    particlesGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()