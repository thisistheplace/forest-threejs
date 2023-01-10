import React, {useEffect, useRef, useState, createRef} from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
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

  
  const get = useThree((state) => state.get)
  const ray = new THREE.Raycaster()
  const move = new THREE.Vector3()
  const up = new THREE.Vector3(0, 1, 0).normalize()
  const down = new THREE.Vector3(0, -1, 0).normalize()

  const lookAt = new THREE.Vector3(0, 10, 0)

  const temp = new THREE.Object3D()

  const ntrees = totalX * totalZ
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

    // Get state
    const state = get()

    // Set positions
    for (let x = 0; x < totalX; x++) {
      for (let z = 0; z < totalZ; z++) {
        temp.position.set(
          (Math.random() < 0.5 ? -1 : 1) * Math.random() * x * spacing - offset.x,
          0,
          (Math.random() < 0.5 ? -1 : 1) * Math.random() * z * spacing - offset.z,
        )

        // ray.set(temp.position, down)
        // var intersects = ray.intersectObject( state.scene.children[0], false )
        // if (intersects.length > 0){
        //   temp.position.set(
        //     intersects[0].point.x,
        //     intersects[0].point.y,
        //     intersects[0].point.z
        //   )
        // } else {
        //   ray.set(temp.position, up)
        //   intersects = ray.intersectObject( state.scene.children[0], false )
        //   if (intersects.length > 0){
        //     temp.position.set(
        //       intersects[0].point.x,
        //       intersects[0].point.y,
        //       intersects[0].point.z
        //     )
        //   }
        // }

        temp.rotation.set(0, Math.random(), 0)
        var randomScale = (Math.random() < 0.5 ? -1 : 1) * Math.random() / 2 + 1
        temp.scale.set(randomScale, randomScale, randomScale)
        temp.updateMatrix()
        meshRef.current.setMatrixAt(count, temp.matrix)
        console.log("initial", temp.position)
        count++
      }
    }
    count = 0
    console.log("done useeffect")
  
    // Update the instance
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [props])

  useFrame((state, delta)=>{
    console.log("render")
    state.camera.lookAt(lookAt)
    // Move trees
    if (count < ntrees){
      for (let i=0; i<ntrees; i++){
        meshRef.current.getMatrixAt(count, temp.matrix)
        temp.updateMatrix()
        console.log("moved", temp.position)

        ray.set(temp.position, down)
        var intersects = ray.intersectObject( state.scene.children[0], false )
        if (intersects.length > 0){
          temp.position.set(
            intersects[0].point.x,
            intersects[0].point.y,
            intersects[0].point.z
          )
        } else {
          ray.set(temp.position, up)
          intersects = ray.intersectObject( state.scene.children[0], false )
          if (intersects.length > 0){
            temp.position.set(
              intersects[0].point.x,
              intersects[0].point.y,
              intersects[0].point.z
            )
          }
        }
        
        temp.updateMatrix()
        meshRef.current.setMatrixAt(count, temp.matrix.clone())
        
        count++
      }
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <instancedMesh ref={meshRef} args={[null, null, ntrees]} geometry={geom} material={mat} castShadow={true}/>
    </group>
  )
}

export {Trees}
