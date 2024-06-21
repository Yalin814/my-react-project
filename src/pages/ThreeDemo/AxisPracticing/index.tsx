import { useEffect } from 'react'
import {
  AmbientLight,
  AxesHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BoxGeometry,
  CylinderGeometry,
  Mesh,
  TextureLoader,
  MeshStandardMaterial,
  PlaneHelper,
  Plane,
  Vector3,
  Group,
  HemisphereLight,
  MathUtils
} from 'three'
import { OrbitControls, Sky } from 'three/examples/jsm/Addons.js'
import { Body, World } from 'cannon'

const AxisPracticing = () => {
  const scene = new Scene()
  const camera = new PerspectiveCamera()
  const renderer = new WebGLRenderer()
  const axesHelper = new AxesHelper(200)
  const ambientLight = new AmbientLight(0xffffff, 0.5)
  const hemisphereLight = new HemisphereLight(0xffffff, 0.5)
  hemisphereLight.position.set(0, 100, 0)
  scene.add(hemisphereLight)
  const orbitControls = new OrbitControls(camera, renderer.domElement)
  const cylinderGeometry = new CylinderGeometry(1, 1, 4, 32)
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load('/textures/streaky-plywood_albedo.png')
  const grassTexture = textureLoader.load('/textures/wispy-grass-meadow_albedo.png')
  const material = new MeshStandardMaterial({ map: texture })
  const grassMaterial = new MeshStandardMaterial({ map: grassTexture })
  const grassGeometry = new BoxGeometry(100, 100, 0.01)
  const grassMesh = new Mesh(grassGeometry, grassMaterial)
  grassMesh.rotation.x = Math.PI / 2
  grassMesh.position.set(0, -2, 0)
  scene.add(grassMesh)

  const mesh = new Mesh(cylinderGeometry, material)
  const wheelGeometry = new CylinderGeometry(0.5, 0.5, 2, 32)
  const wheel = new Mesh(wheelGeometry, new MeshStandardMaterial({ color: 0xfffff1 }))
  const wheel1 = wheel.clone()
  const wheel2 = wheel.clone()
  const wheel3 = wheel.clone()
  const tubeGeometry = new CylinderGeometry(0.15, 0.15, 2, 32, 1, true)
  const chimney = new Mesh(tubeGeometry, new MeshStandardMaterial({ color: 0xfffff1 }))
  chimney.position.set(0, 1, 2.75)

  wheel.position.set(0, -1, 3.5)
  wheel.rotation.z = Math.PI / 2
  wheel1.position.set(0, -1, 2)
  wheel1.rotation.z = Math.PI / 2
  wheel2.position.set(0, -1, 0.5)
  wheel2.rotation.z = Math.PI / 2
  wheel3.position.set(0, -0.5, -1.5)
  wheel3.scale.set(2, 2, 2)
  wheel3.rotation.z = Math.PI / 2

  const plane = new Plane(new Vector3(0, 1, 0), 30)
  const planeHelper = new PlaneHelper(plane, 100)

  // scene.add(planeHelper)
  const sky = new Sky()
  sky.scale.setScalar(450000)
  const phi = MathUtils.degToRad(90)
  const theta = MathUtils.degToRad(120)
  const sunPosition = new Vector3().setFromSphericalCoords(1, phi, -theta)

  sky.material.uniforms.sunPosition.value = sunPosition
  scene.add(sky)

  const boxGeometry = new BoxGeometry(3, 3, 3)
  const cube = new Mesh(boxGeometry, material)
  cube.position.set(0, 0.5, -1.5)

  mesh.position.set(0, 0, 2)
  mesh.rotation.x = Math.PI / 2
  const group = new Group()
  group.add(wheel)
  group.add(wheel1)
  group.add(wheel2)
  group.add(wheel3)
  group.add(chimney)
  group.add(mesh)
  group.add(cube)
  scene.add(group)
  group.scale.set(1.4, 1.4, 1.4)

  camera.position.set(60, 40, 60)
  camera.lookAt(0, 0, 0)
  scene.add(axesHelper)
  scene.add(ambientLight)
  // scene.background = new Color('white')
  const barrierGroup = new Group()

  renderer.setSize(window.innerWidth, window.innerHeight)

  const world = new World()
  const train = new Body()

  const setupBarriers = () => {
    for (let i = 0; i < 20; i++) {
      const barrier = cube.clone()
      barrier.position.set(MathUtils.randFloatSpread(100), 0, MathUtils.randFloatSpread(100))
      barrier.scale.set(0.5, 1, 0.5)
      barrierGroup.add(barrier)
    }
    scene.add(barrierGroup)
  }

  const animate = () => {
    orbitControls.update()
    renderer.render(scene, camera)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const v1 = new Vector3()
    const v2 = new Vector3()
    mesh.getWorldPosition(v1)
    cube.getWorldPosition(v2)
    const theta = Math.atan((v1.x - v2.x) / (v1.z - v2.z))
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        // 控制车辆向前移动
        group.position.x += 0.1 * Math.sin(theta)
        group.position.z += 0.1 * Math.cos(theta)
        break
      case 'ArrowDown':
      case 's':
        // 控制车辆向后移动
        group.position.x -= 0.1 * Math.sin(theta)
        group.position.z -= 0.1 * Math.cos(theta)
        break
      case 'ArrowLeft':
      case 'a':
        // 控制车辆向左转向
        group.rotation.y += 0.05
        break
      case 'ArrowRight':
      case 'd':
        // 控制车辆向右转向
        group.rotation.y -= 0.05
        break
      default:
        // 其他按键不做处理
        break
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    // console.log(e.key)
  }

  useEffect(() => {
    setupBarriers()
    document.body.appendChild(renderer.domElement)
    renderer.setAnimationLoop(animate)
    addEventListener('keydown', handleKeyDown)
    addEventListener('keyup', handleKeyUp)
    return () => {
      removeEventListener('keydown', handleKeyDown)
      removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return <></>
}

export default AxisPracticing
