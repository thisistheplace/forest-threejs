import React, {useEffect, useRef, useState, createRef} from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows, Instance, Instances } from '@react-three/drei'

import { getTreeLocations } from './TreePositions'

import * as THREE from 'three'

extend({THREE})

function loadScene(url){
  return useGLTF(url).scene
}

const Trees = (props) => {
  console.log(props)
  const scene = loadScene(props.url)
  const ntrees = props.totalX * props.totalZ 
  const lookAt = new THREE.Vector3(0, 10, 0)

  useFrame((state)=>{
    state.camera.lookAt(lookAt)
  }, [])

  return (
    <Instances range={ntrees} material={scene.children[0].material} geometry={scene.children[0].geometry}>
      <group position={[0, 0, 0]}>
        {getTreeLocations(ntrees, props.totalX, props.totalZ, props.spacing).map((props, i) => (
          <Tree key={i} {...props} />
        ))}
      </group>
    </Instances>
  )
}
  
function Tree({ color = new THREE.Color(), ...props }) {
  const ref = useRef()
  const [hovered, setHover] = useState(false)

  useFrame(() => {
    ref.current.color.lerp(color.set(hovered ? 'red' : 'white'), hovered ? 1 : 0.1)
  })
  
  return (
    <group {...props}>
      <Instance ref={ref} onPointerOver={(e) => (e.stopPropagation(), setHover(true))} onPointerOut={(e) => setHover(false)} />
    </group>
  )
}

export {Trees}