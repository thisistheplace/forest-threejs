import React, {useEffect, useRef, useState, createRef} from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows } from '@react-three/drei'

import * as THREE from 'three'

extend({THREE})

function loadScene(url){
  return useGLTF(url).scene
}

const Trees = (props) => {
  const ref = useRef()
  const meshRef = createRef()
  const [geom, setGeom] = useState(new THREE.BufferGeometry())
  const [mat, setMat] = useState(new THREE.MeshBasicMaterial())
  const [spacing, setSpacing] = useState(props.spacing)
  const [totalX, setTotalX] = useState(props.totalX)
  const [totalZ, setTotalZ] = useState(props.totalZ)
  const [url, setUrl] = useState(props.url)

  const lookAt = new THREE.Vector3(0, 10, 0)

  const temp = new THREE.Object3D()

  const total = totalX * totalZ
  var count = 0
  const [offset, setOffset] = useState(new THREE.Vector3(0, 0, 0))  
  
  useEffect(() => {
    const scene = loadScene(url)
    setGeom(scene.children[0].geometry)
    setMat(scene.children[0].material)

    setOffset(new THREE.Vector3(
      spacing * totalX / 2.,
      spacing * totalZ / 2.,
    ))

    // Set positions
    for (let x = 0; x < totalX; x++) {
      for (let z = 0; z < totalZ; z++) {
        temp.position.set(
          (Math.random() < 0.5 ? -1 : 1) * Math.random() * x * spacing - offset.x,
          0,
          (Math.random() < 0.5 ? -1 : 1) * Math.random() * z * spacing - offset.z,
        )
        temp.rotation.set(0, Math.random(), 0)
        var randomScale = (Math.random() < 0.5 ? -1 : 1) * Math.random() / 2 + 1
        temp.scale.set(randomScale, randomScale, randomScale)
        temp.updateMatrix()
        meshRef.current.setMatrixAt(count, temp.matrix)
        count++
      }
    }
  
    // Update the instance
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [props])

  useFrame((state, delta)=>{
    state.camera.lookAt(lookAt)
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <instancedMesh ref={meshRef} args={[null, null, total]} geometry={geom} material={mat} castShadow={true}/>
    </group>
  )
}

export {Trees}
