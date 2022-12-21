import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

const loader = new GLTFLoader();

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

let tl = gsap.timeline()

// my cube

loader.load('GameBoy.gltf', (gltf) => {
    gltf.scene.scale.set(0.12, 0.12, 0.12)
    gltf.scene.rotation.set(1.55, 0, 3.2)
    scene.add( gltf.scene )

    // gui.add(gltf.scene.rotation, 'x').min(-10).max(10).step(0.01)
    // gui.add(gltf.scene.rotation, 'y').min(-10).max(10).step(0.01)
    // gui.add(gltf.scene.rotation, 'z').min(-10).max(10).step(0.01)

    tl.to(gltf.scene.rotation, {x:1.45, y:-0.07, z: 6.50, duration: 2.5}, "+=0.25")
    tl.to(gltf.scene.position, {x:0.6, z:-3, duration: 1.5}, "-=0.5")
    tl.to(gltf.scene.rotation, {z:6.95, duration: 1.5}, "-=1.250")
    tl.to(gltf.scene.scale, {x:0.35, y:0.35, z:0.35, duration: 1}, "-=1.75")

    gltf.scene.rotation.z = 6.95
    gltf.scene.rotation.x = 2



    let mouseX = 0
    let mouseY = 0

    let windowX = (window.innerWidth / 2)
    let windowY = (window.innerHeight / 2)

    document.addEventListener('mousemove', animGameBoy)

    function animGameBoy (e) {
        mouseX = (e.clientX - windowX) * -0.001
        gltf.scene.rotation.z += (mouseX - gltf.scene.rotation.z)
    }
})

/*
// Objects
const geometry = new THREE.BoxGeometry( 1, 1, 1);

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0x8A2BE2)

// Mesh
const box = new THREE.Mesh(geometry,material)
scene.add(box)
*/


// Lights

const pointLight = new THREE.PointLight(0xffffff, 1.15)
pointLight.position.x = 5
pointLight.position.y = -3
pointLight.position.z = -0.43
scene.add(pointLight)

// const light = gui.addFolder("light")
// light.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
// light.add(pointLight.position, 'x').min(-5).max(5).step(0.01)
// light.add(pointLight.position, 'z').min(-5).max(5).step(0.01)
// light.add(pointLight, 'intensity').min(0).max(10).step(0.01)


// const lightColor = {
//     color: 0xffffff
// }

// light.addColor(lightColor, 'color')
//     .onChange(() => {
//         pointLight.color.set(lightColor.color)
//     })

const pointLight2 = new THREE.PointLight(0xffffff, 2.81)
pointLight2.position.x = 0.23
pointLight2.position.y = 3
pointLight2.position.z = 3.8
scene.add(pointLight2)

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
camera.position.y = 0
camera.position.z = 1
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


const clock = new THREE.Clock()

const tick = () =>
{


    const elapsedTime = clock.getElapsedTime()

    // Update objects


    // box.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()