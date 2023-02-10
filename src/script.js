import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'
import { Material } from 'three'

/**
 * Parameters
 */
const parameters = {
    color: 0x35453b,
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + 10})
    }
}

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const matcapTexture = textureLoader.load('/textures/matcaps/5.png')
const matcapSphereTexture = textureLoader.load('/textures/matcaps/8.png')
const matcap3Texture = textureLoader.load('/textures/matcaps/3.png')
// textureLoader.load('https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg' , function(texture)
//             {
//              scene.background = texture;  
//             });

// const environmentMapTexture = cubeTextureLoader.load([
//     '/textures/environmentMaps/0/px.png',
//     '/textures/environmentMaps/0/nx.png',
//     '/textures/environmentMaps/0/py.png',
//     '/textures/environmentMaps/0/ny.png',
//     '/textures/environmentMaps/0/pz.png',
//     '/textures/environmentMaps/0/nz.png',
// ])

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
            'Web Developer\nPierre-Joseph\nBEAUGENDRE',
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
        const materialSphere = new THREE.MeshMatcapMaterial({matcap: matcapSphereTexture})

        formMaterial.wireframe = true
        // textMaterial.metalness = 1
        // textMaterial.roughness = 0.1
        // textMaterial.envMap = environmentMapTexture

        // material.wireframe = false
        text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const SphereGeometry = new THREE.SphereGeometry(0.5, 26, 26)

        for (let i = 0; i < 400; i++) {
            if (Math.random() <= 0.5) {
                console.log('torus')
                const donut = new THREE.Mesh(donutGeometry, formMaterial)
                donut.position.x = (Math.random() - 0.5) * 20
                donut.position.y = (Math.random() - 0.5) * 20
                donut.position.z = (Math.random() - 0.5) * 20

                donut.rotation.x = (Math.random() * Math.PI)
                donut.rotation.y = (Math.random() * Math.PI)

                const scale = Math.random()
                donut.scale.set(scale, scale, scale)

                scene.add(donut)
            } else {
                console.log('sphere')
                const sphere = new THREE.Mesh(SphereGeometry, formMaterial)
                sphere.position.x = (Math.random() - 0.5) * 20
                sphere.position.y = (Math.random() - 0.5) * 20
                sphere.position.z = (Math.random() - 0.5) * 20

                const scale = Math.random()
                sphere.scale.set(scale, scale, scale)

                scene.add(sphere)
            }
        }
    }
)
console.log(fontLoader)

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

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
camera.position.x = -2
camera.position.y = 1
camera.position.z = 6
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minAzimuthAngle = - (Math.PI * 0.4)
controls.maxAzimuthAngle = (Math.PI * 0.4)
controls.maxDistance = 9
controls.minDistance = 3.5
controls.maxPolarAngle = Math.PI * 0.9
controls.minPolarAngle = Math.PI * 0.1

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

    // Text animation
    //text.rotation.x = Math.sin(elapsedTime * 0.1)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

/**
 * GUI
 */
gui.addColor(parameters, 'color').onChange(() => {
    renderer.setClearColor(parameters.color)
})