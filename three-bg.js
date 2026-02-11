import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const canvas = document.getElementById("bg");
if(!canvas) throw new Error("Missing #bg canvas");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 40;

const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const geo = new THREE.BufferGeometry();
const count = 1600;
const pos = new Float32Array(count*3);
for(let i=0;i<count*3;i++){
  pos[i] = (Math.random()-0.5)*160;
}
geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

const mat = new THREE.PointsMaterial({ size: 0.28 });
const pts = new THREE.Points(geo, mat);
scene.add(pts);

function animate(){
  pts.rotation.y += 0.00085;
  pts.rotation.x += 0.00025;
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
