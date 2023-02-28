import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Parameters
 */
const parameters = {
    color: 0x35453b,
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */

/**
 * Mesh
 */
let text = new THREE.Mesh()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 1
pointLight.position.y = 4
pointLight.position.z = 6
scene.add(ambientLight, pointLight)

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
    '/font/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Fullstack Developer\n     Pierre-Joseph\n    BEAUGENDRE',
            {
                font,
                size: 0.5,
                height: 0.2,
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
        const textMaterial = new THREE.MeshNormalMaterial()
        const formMaterial = new THREE.MeshNormalMaterial()
        const formMaterialW = new THREE.MeshNormalMaterial()

        formMaterialW.wireframe = true

        // material.wireframe = false
        text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const SphereGeometry = new THREE.SphereGeometry(0.5, 26, 26)
        const coneGeometry = new THREE.IcosahedronGeometry(1, 0)

        for (let i = 0; i < 650; i++) {
            if (Math.random() <= 0.5) {
                const donut = new THREE.Mesh(donutGeometry, formMaterialW)
                donut.position.x = (Math.random() - 0.5) * 30
                donut.position.y = (Math.random() - 0.5) * 30
                donut.position.z = (Math.random() - 0.5) * 30

                donut.rotation.x = (Math.random() * Math.PI)
                donut.rotation.y = (Math.random() * Math.PI)

                const scale = Math.random() + 0.3
                donut.scale.set(scale, scale, scale)

                scene.add(donut)
            } else {
                const sphere = new THREE.Mesh(coneGeometry, formMaterialW)
                sphere.position.x = (Math.random() - 0.5) * 30
                sphere.position.y = (Math.random() - 0.5) * 30
                sphere.position.z = (Math.random() - 0.5) * 30

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
camera.position.z = 9
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxDistance = 11
controls.minDistance = 5
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()