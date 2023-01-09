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
  const [offset, setOffset] = useState(new THREE.Vector3(0, 0, 0))  
  const [spacing, setSpacing] = useState(props.spacing)
  const [totalX, setTotalX] = useState(props.totalX)
  const [totalZ, setTotalZ] = useState(props.totalZ)
  const [url, setUrl] = useState(props.url)
  const ntrees = props.totalX * props.totalZ 

  const lookAt = new THREE.Vector3(0, 10, 0)
  
  useEffect(() => {
    const scene = loadScene(url)

    const newGeom = new THREE.InstancedBufferGeometry()
    newGeom.copy(scene.children[0].geometry)
    newGeom.instanceCount = ntrees

    setOffset(new THREE.Vector3(
      spacing * totalX / 2.,
      spacing * totalZ / 2.,
    ))

    // Setup unit vectors to use
    const unitGround = new THREE.Vector3(1, 0, 0).normalize()
    const unitTree = new THREE.Vector3(0, 0, 0)
    const rot = new THREE.Quaternion()
    const quaternions = new Float32Array(ntrees * 4)
    const offsets = new Float32Array(ntrees * 3)

    // Set positions
    var count = 0
    for (let x = 0; x < totalX; x++) {
      for (let z = 0; z < totalZ; z++) {
        // Offsets
        offset[count * 3] = (Math.random() < 0.5 ? -1 : 1) * Math.random() * x * spacing - offset.x
        offset[count * 3 + 1] = 0
        offset[count * 3 + 2] = (Math.random() < 0.5 ? -1 : 1) * Math.random() * z * spacing - offset.z

        // Rotations
        // get unit vector of tree orientation
        unitTree.set(Math.random() * Math.PI * 2, 0, Math.random() * Math.PI * 2)
        // calculate from vertical y vector
        rot.setFromUnitVectors(unitGround, unitTree.normalize())
        rot.normalize()
        // store in rotation matrix
        quaternions[count * 4] = rot.x
        quaternions[count * 4 + 1] = rot.y
        quaternions[count * 4 + 2] = rot.z
        quaternions[count * 4 + 3] = rot.w

        count++
      }
    }

    console.log(quaternions)

    // Set offsets
    newGeom.setAttribute('offset', new THREE.InstancedBufferAttribute( offsets, 3 ) )

    // Set rotations
    newGeom.setAttribute('quaternion', new THREE.InstancedBufferAttribute( quaternions, 4 ) )

    setGeom(newGeom)
    setMat(scene.children[0].material)

    // Update the instance
    meshRef.current.instanceMatrix.needsUpdate = true

    console.log(meshRef.current)
  }, [props])

  useFrame((state, delta)=>{
    state.camera.lookAt(lookAt)
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <instancedMesh ref={meshRef} args={[null, null, ntrees]} geometry={geom} material={mat} castShadow={true}/>
    </group>
  )
}

export {Trees}