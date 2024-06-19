import { useEffect } from 'react'
import {
  BoxGeometry,
  MeshStandardMaterial,
  TextureLoader,
  Mesh,
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  Color
} from 'three/src/Three.js'

const TextureMapping = () => {
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load('/textures/streaky-plywood_albedo.png')
  const material = new MeshStandardMaterial({
    map: texture
  })
  const geometry = new BoxGeometry(1, 1, 1)
  const mesh = new Mesh(geometry, material)
  const scene = new Scene()
  scene.add(mesh)
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(1, 1, 2)
  camera.lookAt(0, 0, 0)
  const ambientLight = new AmbientLight(new Color('grey'), 1)
  scene.add(ambientLight)
  scene.background = new Color('white')
  const renderer = new WebGLRenderer()

  const animate = () => {
    renderer.render(scene, camera)
  }

  useEffect(() => {
    document.body.appendChild(renderer.domElement)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setAnimationLoop(animate)
  }, [])

  return <></>
}

export default TextureMapping
