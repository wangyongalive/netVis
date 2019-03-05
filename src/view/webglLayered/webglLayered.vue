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
        data.forEach(node => {
          node.geometry = new THREE.SphereGeometry(1, 5, 5);
          node.material = new THREE.MeshBasicMaterial({color: colour(node.level)})
          node.circle = new THREE.Mesh(node.geometry, node.material)
          self.scene.add(node.circle)
          dragObjects.push(node.circle);
          node.circle.position.set(node.x / 10, node.y / 10, node.level * 10)
        })

        link.forEach((link) => {
          link.material = new THREE.LineBasicMaterial({color: 0xAAAAAA})
          link.geometry = new THREE.Geometry()
          link.line = new THREE.Line(link.geometry, link.material)
          link.line.geometry.verticesNeedUpdate = true
          link.line.geometry.vertices[0] = new THREE.Vector3(link.source.x / 10, link.source.y / 10, link.source.level * 10)
          link.line.geometry.vertices[1] = new THREE.Vector3(link.target.x / 10, link.target.y / 10, link.target.level * 10)
          self.scene.add(link.line)
        })


        // let onDrag = false;
        const dragControls = new DragControls(dragObjects, self.camera, self.renderer.domElement);
        dragControls.addEventListener('hoveron', function (event) {
          console.log('222');
          // controls.enabled = false;
        });
        dragControls.addEventListener('hoveroff', function (event) {
          console.log('222');
          // controls.enabled = true;
        });
        dragControls.addEventListener('dragstart', function (event) {
          console.log('222');
          // event.object.data.pbody.type = CANNON.Body.KINEMATIC;
          // event.object.data.pbody.updateMassProperties();
          // onDrag = true;
        });
        dragControls.addEventListener('drag', function (event) {
          console.log('222');
          // event.object.data.pbody.position.copy(event.object.position);
        });
        dragControls.addEventListener('dragend', function (event) {
          console.log('222');
          // event.object.data.pbody.type = CANNON.Body.DYNAMIC;
          // event.object.data.pbody.updateMassProperties();
          // onDrag = false;
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

<style scoped>
  #WebGL-output {
    width: 100%;
    height: 100%;
  }
</style>
