
import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/build/OrbitControls.js'
import { TransformControls } from '/build/TransformControls.js';
import { GLTFLoader } from '/build/GLTFLoader.js'
import { STLLoader } from '/build/STLLoader.js'
import { OBJLoader } from '/build/OBJLoader.js'
import Stats from '/build/stats.module.js';
import { TWEEN } from '/build/tween.module.min.js';


var container;
var camera, scene, renderer, controls, spotLight, stats, axesHelper;

var defaultColor = new THREE.Color("rgb(169,169,169)");

var raycaster;
var mouse = new THREE.Vector2();

var controlsTransform;


init();
animate();

function init() {


    container = document.createElement('div');
    document.body.appendChild(container);

    stats = new Stats();
    container.appendChild(stats.dom);

    //create scene
    scene = new THREE.Scene();
    var sceneColor = new THREE.Color("rgb(228, 233, 239)");
    scene.background = sceneColor;

    // create and position camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(50, 50, 50)
    scene.add(camera)

    // axes helper
    axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);
    axesHelper.visible = false

    var light = new THREE.AmbientLight(0xFFFFFF, .5); // soft white light
    scene.add(light);

    //light added to camera
    spotLight = new THREE.SpotLight(0xFFFFFF, .5)
    spotLight.castShadow = true;
    spotLight.position.set(-2, -2, 0)
    camera.add(spotLight)

   
    var editMaterial = new THREE.MeshPhysicalMaterial({
        color: defaultColor, reflectivity: 0, metalness: .0, roughness: 0, transparent: true, flatShading: true, vertexColors: THREE.FaceColors, side: THREE.DoubleSide
    })
    var geometry = new THREE.BoxGeometry(40, 40, 40);
    var cube = new THREE.Mesh(geometry, editMaterial);
    scene.add(cube);
    
    

    

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = false
    controls.autoRotateSpeed = 4.0

    controlsTransform = new TransformControls(camera, renderer.domElement);

    controlsTransform.addEventListener('change', render);
    controlsTransform.addEventListener('dragging-changed', function (event) {

        controls.enabled = !event.value;

    });

    scene.add(controlsTransform)


    window.addEventListener('resize', onWindowResize, false);
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    console.log(scene)
}

function cameraTween(newPosition) {
    var tween1 = new TWEEN.Tween(camera.position)
        .to({
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z
        }, 2000)
        .start()
        .onComplete(function () {
            // controls.autoRotate = true
        });
}

function animate() {
    stats.begin();
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update()
    render();
    stats.end();
}

function render() {
    
    renderer.render(scene, camera);
}



//viewer code

$("#upperArch").click(() => {
    if (scene.getObjectByName("lowerSetup00").visible) {
        scene.getObjectByName("lowerSetup00").visible = false
    } else {
        scene.getObjectByName("lowerSetup00").visible = true
    }
})
$("#lowerArch").click(() => {
    if (scene.getObjectByName("upperSetup00").visible) {
        scene.getObjectByName("upperSetup00").visible = false
    } else {
        scene.getObjectByName("upperSetup00").visible = true
    }
})
var TopView = document.getElementById("TopView")
TopView.addEventListener("click", () => {
    // camera.position.set(0, 100, 0)
    // controls.target.set(0, 0, 0)
    cameraTween(new THREE.Vector3(0, 100, 0))
})

var BottomView = document.getElementById("BottomView")
BottomView.addEventListener("click", () => {
    // camera.position.set(0, -100, 0)
    controls.target.set(0, 0, 0)
    cameraTween(new THREE.Vector3(0, -100, 0))
})

var BackView = document.getElementById("BackView")
BackView.addEventListener("click", () => {
    camera.position.set(0, 0, -100)
    controls.target.set(0, 0, 0)
})

var FrontView = document.getElementById("FrontView")
FrontView.addEventListener("click", () => {
    camera.position.set(0, 0, 100)
    controls.target.set(0, 0, 0)
})

var RightView = document.getElementById("RightView")
RightView.addEventListener("click", () => {
    camera.position.set(100, 0, 0)
    controls.target.set(0, 0, 0)
})

var LeftView = document.getElementById("LeftView")
LeftView.addEventListener("click", () => {
    camera.position.set(-100, 0, 0)
    controls.target.set(0, 0, 0)
})

var IsoView = document.getElementById("IsoView")
IsoView.addEventListener("click", () => {
    camera.position.set(50, 50, 50)
    controls.target.set(0, 0, 0)
})

$("#axisControl").click(() => {
    if (axesHelper.visible) {
        axesHelper.visible = false
    } else {
        axesHelper.visible = true
    }
})





