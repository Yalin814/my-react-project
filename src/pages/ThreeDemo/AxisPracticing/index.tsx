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
  MathUtils
} from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const AxisPracticing = () => {
  const scene = new Scene()
  const camera = new PerspectiveCamera()
  const renderer = new WebGLRenderer()
  const axesHelper = new AxesHelper(200)
  const ambientLight = new AmbientLight(0xffffff, 0.5)
  const orbitControls = new OrbitControls(camera, renderer.domElement)
  const cylinderGeometry = new CylinderGeometry(1, 1, 4, 32)
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load('/textures/streaky-plywood_albedo.png')
  const material = new MeshStandardMaterial({ map: texture })
  const mesh = new Mesh(cylinderGeometry, material)
  const wheelGeometry = new CylinderGeometry(0.5, 0.5, 2, 32)
  const wheel = new Mesh(wheelGeometry, new MeshStandardMaterial({ color: 0xfffff1 }))
  const wheel1 = wheel.clone()
  const wheel2 = wheel.clone()
  const wheel3 = wheel.clone()
  const tubeGeometry = new CylinderGeometry(0.15, 0.15, 2, 32, 1, true)
  const chimney = new Mesh(tubeGeometry, new MeshStandardMaterial({ color: 0xfffff1 }))
  chimney.position.set(0, 1, 2.75)
  scene.add(chimney)
  wheel.position.set(0, -1, 3.5)
  wheel.rotation.z = Math.PI / 2
  wheel1.position.set(0, -1, 2)
  wheel1.rotation.z = Math.PI / 2
  wheel2.position.set(0, -1, 0.5)
  wheel2.rotation.z = Math.PI / 2
  wheel3.position.set(0, -0.5, -1.5)
  wheel3.scale.set(2, 2, 2)
  wheel3.rotation.z = Math.PI / 2
  scene.add(wheel3)

  const plane = new Plane(new Vector3(0, MathUtils.degToRad(90), 0))
  const planeHelper = new PlaneHelper(plane, 100)

  scene.add(planeHelper)

  const boxGeometry = new BoxGeometry(3, 3, 3)
  const cube = new Mesh(boxGeometry, material)
  cube.position.set(0, 0.5, -1.5)
  scene.add(cube)
  scene.add(wheel)
  scene.add(wheel1)
  scene.add(wheel2)
  mesh.position.set(0, 0, 2)
  mesh.rotation.x = Math.PI / 2
  scene.add(mesh)
  camera.position.set(10, 10, 10)
  camera.lookAt(0, 0, 0)
  scene.add(axesHelper)
  scene.add(ambientLight)
  renderer.setSize(window.innerWidth, window.innerHeight)

  const animate = () => {
    orbitControls.update()
    renderer.render(scene, camera)
  }

  useEffect(() => {
    document.body.appendChild(renderer.domElement)
    renderer.setAnimationLoop(animate)
  }, [])

  return <></>
}

export default AxisPracticing
