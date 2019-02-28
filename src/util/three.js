import * as THREE from 'three'
import { colour } from './utils.js'

export default function ({
  data,
  width,
  height,
  container
}) {


  // 场景、照相机、渲染器
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(0, width, height, 0, 1, 1000)
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    precision: 'highp',
    alpha: true
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)
  camera.position.z = 5

  var color = d3.scale.category20c()

  data.nodes.forEach((node) => {
    // 先建一个几何体，然后设置材质的样式，添加到场景中
    node.geometry = new THREE.CircleBufferGeometry(5, 32)
    node.material = new THREE.MeshBasicMaterial({ color: colour(node.id) })
    node.circle = new THREE.Mesh(node.geometry, node.material)
    scene.add(node.circle)
  })

  data.links.forEach((link) => {
    link.material = new THREE.LineBasicMaterial({ color:'#fff' })
    link.geometry = new THREE.Geometry()
    link.line = new THREE.Line(link.geometry, link.material)
    scene.add(link.line)
  })

  var force = d3.layout.force()
    .nodes(data.nodes)	//设定顶点数组
    .links(data.links)	//设定边数组
    .size([width, height])	//设定作用范围
    .linkDistance(20)	//设定边的距离
    .charge(-20)	//设定顶点的电荷数
    .start()	//开启布局计算
    .on('tick',ticked)



  // 回调函数中把节点和边的坐标更新一下
  function ticked () {

    data.nodes.forEach((node) => {
      const { x, y, circle } = node
      circle.position.set(x, y, 0)
    })

    data.links.forEach((link) => {
      const { source, target, line } = link
      line.geometry.verticesNeedUpdate = true
      line.geometry.vertices[0] = new THREE.Vector3(source.x, source.y, -1)
      line.geometry.vertices[1] = new THREE.Vector3(target.x, target.y, -1)
    })

    renderer.render(scene, camera)
  }
}
