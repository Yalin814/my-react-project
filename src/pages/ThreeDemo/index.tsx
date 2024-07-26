import { useEffect } from 'react'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  Line
} from 'three'
import './index.less'
import { Outlet } from 'react-router-dom'

const ThreeDemo = () => {
  const scene = new Scene()
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500)
  const renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 'blue' })
  const cube = new Mesh(geometry, material)
  scene.add(cube)
  camera.position.set(0, 0, 60)
  camera.lookAt(0, 0, 0)

  //line
  const lineMaterial = new LineBasicMaterial({ color: 'green' })
  const points = []
  points.push(new Vector3(-10, 0, 0))
  points.push(new Vector3(0, 10, 0))
  points.push(new Vector3(10, 0, 0))
  const lineGeometry = new BufferGeometry().setFromPoints(points)
  const line = new Line(lineGeometry, lineMaterial)
  scene.add(line)

  const animate = () => {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
  }

  useEffect(() => {
    // document.body.appendChild(renderer.domElement)
    // renderer.setAnimationLoop(animate)
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}

export default ThreeDemo
