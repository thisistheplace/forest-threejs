import React, {useRef, useEffect, useState} from 'react'
import { extend } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

import * as THREE from 'three'

extend({THREE})

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
  }, [])

  return (
    // mountains is a Mesh object
    <primitive object={mountains} ref={ref} receiveShadow={true}/>
  )
}

export {Ground}

useGLTF.preload(url())