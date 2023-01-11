import React, {useRef, useEffect, useState} from 'react'
import { extend } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import * as THREE from 'three'
extend({THREE})

// Higher performance raycasting...
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'
// Add the extension functions
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree
THREE.Mesh.prototype.raycast = acceleratedRaycast

const url = () => {return "assets/models/mountains.glb"}

const Ground = (props) => {
  const ref = useRef()
  const mountainScene = useGLTF(url())
  const [mountains, setMountains] = useState(mountainScene.scene.children[2])

  useEffect(() => {
    if (!ref.current)return
    ref.current.rotateX(-Math.PI / 2)
    mountains.rotateX(Math.PI / 2)
    mountains.scale.multiplyScalar(1000)
    mountains.material.side = THREE.DoubleSide
    mountains.updateMatrixWorld()
    // Call this to help with BVH raycasting
    mountains.geometry.computeBoundsTree()
  }, [])

  return (
    // mountains is a Mesh object
    <primitive object={mountains} ref={ref} receiveShadow={true} castShadown={true}/>
  )
}

export {Ground}

useGLTF.preload(url())