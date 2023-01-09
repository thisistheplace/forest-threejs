import React, {useEffect, useRef, useState} from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows } from '@react-three/drei'

import * as THREE from 'three'

extend({THREE})

const TREE_MODELS = {
  "beech": "/assets/models/beech.gltf",
  "lime": "/assets/models/lime.gltf",
  "spruce": "/assets/models/spruce.gltf"
}

function preload(){
  for (const [key, value] of Object.entries(TREE_MODELS)) {
    useGLTF.preload(value)
  }
}

function loadScene(){
  var newScene = new THREE.Group()
  for (const [key, value] of Object.entries(TREE_MODELS)) {
    newScene.add(useGLTF(value).scene)
  }
  console.log(newScene)
  return newScene
}

const Trees = (props) => {
  const ref = useRef()
  const [scene, setScene] = useState(loadScene())
  const lookAt = new THREE.Vector3(0, 10, 0)

  useFrame((state, delta)=>{
    state.camera.lookAt(lookAt)

  }, [])

  return (
    <group ref={ref} dispose={null}>
        <primitive object={scene} />
        <ContactShadows scale={10} blur={5} far={10} frames={1}/>
    </group>
  )
}

export {Trees}

preload()