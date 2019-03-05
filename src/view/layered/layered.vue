<template>
  <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
  <div id="container"></div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import echarts from 'echarts';
  import 'echarts-gl';
  // import data from '../../../static/mock/table.json';
  import data from '../../../static/mock/node.json';
  import * as THREE from 'three'

  export default {
    name: "layered",
    mounted() {
      this.init();
      // this.drawLine();
    },
    methods: {
      init() {
        // 基于准备好的dom，初始化echarts实例
        let self = this;
        var myChart = echarts.init(document.getElementById('container'));
        myChart.setOption({
          tooltip: {
            formatter: function (datas) {
              let res = ''
              res += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${datas.color};"></span><br>`
              for (let i in datas.data) {
                if (['id', 'level'].includes(i))
                  res += `-  ${i} : ${datas.data[i]}<br>`;
              }
              return res;
            }
          },
          // 需要注意的是我们不能跟 grid 一样省略 grid3D
          grid3D: {
            viewControl: {
              // 使用正交投影。
              projection: 'orthographic'
            },
            // width: '50%',
            // show: false
          },
          xAxis3D: {
            type: 'value'
          },
          yAxis3D: {
            type: 'value'
          },
          zAxis3D: {
            type: 'value'
          },
          visualMap: { // 将第4个维度用颜色编码
            type: 'continuous',
            min: 1,
            max: 7,
            text:
              ['顶层', '底层'],
            calculable: true,
            dimension: 'level',
            textStyle: {
              color: '#fff'
            },
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090'],
              symbolSize: [1, 7]
            }
          },
          dataset: {
            source: data
          },
          series: [
            {
              type: 'scatter3D',
              symbolSize: 8,
              dimensions: ['x', 'y', 'level'],
              encode: {
                x: 'x',
                y: 'y',
                z: 'level'
              }
            }
          ]
        })
        myChart.on('click', function (params) {
          let showItems = self.$store.state.nodesLinks.nodes.filter((item) => item.level === params.data.level ? true : false);
          let showIds = showItems.map((item) => item.id);
          let param = qs.stringify({
            data: JSON.stringify(showIds)
          })
          axios.post('/get/division', param).then((response) => {
            // this.nodes = response.data.nodes
            // this.links = response.data.links
            // this.renderChart()
          })
        })

      },
      drawLine() {
        // 场景
// create a scene, that will hold all our elements such as objects, cameras and lights.
       var scene = new THREE.Scene();

// 摄像机
// create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// 渲染器对象
// create a render and set the size
        var renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0)); // 1.设置场景色
        renderer.setSize(window.innerWidth, window.innerHeight); // 2.设置场景的大小
        renderer.shadowMapEnabled = true; // 3.告诉渲染器需要渲染阴影，除此之外还要说明哪个物体投影 哪个物体接收投影

// 平面
// 基础材质不会对光源有任何反应
// create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1); // 1.定义平面的大小
        var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}); // 2.设置外观 比如：颜色和透明度 需要改变材质
        var plane = new THREE.Mesh(planeGeometry, planeMaterial); // 3.添加到网格对象中
        plane.receiveShadow = true; // 接收阴影


// 4.设置平面的位置
// rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI; // 旋转90度
        plane.position.x = 15; // 定义x位置
        plane.position.y = 10; // 定义y位置
        plane.position.z = 10; // 定义z位置

// add the plane to the scene
        scene.add(plane); // 5.添加平面到场景中


// 方块
// create a cube
        var cubeGeometry = new THREE.BoxGeometry(14, 14, 14); // 1.大小
        var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}); // 2.设置外观
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial); // 3.添加到网格对象中
        cube.castShadow = true;

// 4.设置方块的位置
// position the cube
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 1;

// add the cube to the scene
        scene.add(cube); // 5.添加方块到场景中

// 球体
        var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// position the sphere
        sphere.position.x = 5;
        sphere.position.y = 5;
        sphere.position.z = 1;
        sphere.castShadow = true;

// add the sphere to the scene
        scene.add(sphere);

// 摄像机将决定哪些东西会被渲染到场景中
// position and point the camera to the center of the scene
        camera.position.x = 30; // 设置相机的x位置
        camera.position.y = 40;
        camera.position.z = 1;
        camera.lookAt(scene.position); // 使相机指向场景的中心 默认状态下指向(0,0,0)

// 添加光源
// ambientLight是基础光源，该光源的颜色会叠加到场景中现有的物体中
// add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);

// 添加光源
// add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40, 60, -10); // 定义光源位置
        spotLight.castShadow = true; // 定义产生阴影的光源，并不是所有的光源都能够产生阴影
        scene.add(spotLight); // 添加到场景

        // add the output of the renderer to the html element
        document.getElementById("container").appendChild(renderer.domElement);
      }
    },
    beforeRouteLeave(to, from, next) {
      document.title = to.meta.title
      from.meta.keepAlive = true
      next();
    }
  }
</script>

<style scoped>
  #container {
    width: 100%;
    height: 100%;
  }
</style>
