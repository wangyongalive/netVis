<template>
  <!-- 作为Three.js渲染器输出元素 -->
  <div id="WebGL-output" ref="WebGL">
  </div>
</template>

<script>
  import * as THREE from 'three';
  import data from '../../../static/mock/node.json';
  import {colour} from '@/util/utils';
  import TrackballControls from 'three-trackballcontrols';
  import link from '../../../static/mock/link.json';
  import DragControls from 'three-dragcontrols';

  export default {
    name: "webglLayered",
    data() {
      return {
        camera: '',
        scene: '',
        renderer: '',
        id: '',
        fov: 45,
        near: 0.1,
        far: 1000
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let self = this;
        let width = this.$refs.WebGL.offsetWidth;
        let height = this.$refs.WebGL.offsetHeight;
        this.scene = new THREE.Scene();      //创建场景
        this.camera = new THREE.PerspectiveCamera(this.fov, width / height, this.near, this.far);   //创建摄像机
        this.camera.position.x = 100;
        this.camera.position.y = 100;
        this.camera.position.z = 100;
        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.WebGLRenderer();                    //创建一个WebGL渲染器并设置其大小
        this.renderer.setClearColor(new THREE.Color(0x303030));
        this.renderer.setSize(width, height);

        // var axes = new THREE.AxisHelper(200);               //创建三轴表示
        // this.scene.add(axes);

        let controls = new TrackballControls(this.camera);
        controls.rotateSpeed = 2.5;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

        let dragObjects = [];
        let nodeLevels = new Set();
        // 节点
        data.forEach(node => {
          node.geometry = new THREE.SphereGeometry(1, 10, 10);
          node.material = new THREE.MeshBasicMaterial({color: colour(node.level)});
          node.circle = new THREE.Mesh(node.geometry, node.material);
          node.circle.data = node; // 数据绑定
          self.scene.add(node.circle)
          dragObjects.push(node.circle);
          node.circle.position.set(node.x / 10, node.y / 10, node.level * 10);
          nodeLevels.add(node.level);
        })
        // 边
        link.forEach((link) => {
          link.material = new THREE.LineBasicMaterial({color: 0xAAAAAA})
          link.geometry = new THREE.Geometry()
          link.line = new THREE.Line(link.geometry, link.material)
          link.line.geometry.verticesNeedUpdate = true
          link.line.geometry.vertices[0] = new THREE.Vector3(link.source.x / 10, link.source.y / 10, link.source.level * 10)
          link.line.geometry.vertices[1] = new THREE.Vector3(link.target.x / 10, link.target.y / 10, link.target.level * 10)
          self.scene.add(link.line)
        })

        Array.from(nodeLevels).forEach((level) => {
          let planeGeometry = new THREE.PlaneGeometry(90, 90, 10, 10);
          let planeMaterial = new THREE.MeshBasicMaterial({color: colour(level)});
          let plane = new THREE.Mesh(planeGeometry, planeMaterial);
          plane.position.x = 45;
          plane.position.y = 45;
          plane.position.z = level * 10;
          plane.visible = false;
          plane.data = level;
          plane.name = `level_${plane.position.z}`;
          this.scene.add(plane);
        })


        //添加一个提示框
        let tooltip = d3.select("#WebGL-output")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0.0);


        const dragControls = new DragControls(dragObjects, self.camera, self.renderer.domElement);
        dragControls.addEventListener('hoveron', function (event) {
          self.scene.getObjectByName(`level_${event.object.position.z}`).visible = true;
          let res = ''
          res += `<span style="display:inline-block;margin-left:55px;border-radius:10px;width:10px;height:10px;background-color:${colour(event.object.data.level)};"></span><br>`
          for (let i in event.object.data) {
            if (['id', 'level','degree'].includes(i))
              res += `-  ${i} : ${event.object.data[i]}<br/>`;
          }
          tooltip.html(res)
            .style("left", window.event.offsetX + "px")
            .style("top", window.event.offsetY + 20 + "px")
            .style("opacity", 1.0);
        });
        dragControls.addEventListener('hoveroff', function (event) {
          self.scene.getObjectByName(`level_${event.object.position.z}`).visible = false;
          tooltip.style("opacity", 0.0);
        });


        this.id = setInterval(render, 33);

        function render() {
          controls.update();
          self.renderer.render(self.scene, self.camera);
        }

        document.getElementById("WebGL-output").appendChild(self.renderer.domElement);
      }

    }
  }
</script>

<style scoped lang="less">
  @import "webglLayered.less";
</style>
