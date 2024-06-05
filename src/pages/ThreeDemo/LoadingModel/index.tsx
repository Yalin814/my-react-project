import { useEffect } from 'react'
import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, AmbientLight } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const LoadingModel = () => {
  const scene = new Scene()
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 1)
  const renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  const loader = new GLTFLoader()
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  const animate = () => {
    controls.update()
    renderer.render(scene, camera)
  }
  useEffect(() => {
    const ambientLight = new AmbientLight(0x404040) // soft white light
    scene.add(ambientLight)
    const directionalLight = new DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(0, 1, 1).normalize() // 设置光源位置
    scene.add(directionalLight)

    loader.load(
      '/models/test.glb',
      (gltf) => {
        console.log(gltf)
        scene.add(gltf.scene)
      },
      undefined,
      (err) => {
        console.log(err)
      }
    )
    document.body.appendChild(renderer.domElement)
    renderer.setAnimationLoop(animate)
  }, [])

  return <></>
}

export default LoadingModel
