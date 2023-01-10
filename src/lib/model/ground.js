import React, {useRef, useEffect, useState} from 'react'
import { useLoader, extend } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useGLTF } from '@react-three/drei'

import * as THREE from 'three'

extend({THREE})

const Ground = (props) => {
  const ref = useRef()
  const texture = useLoader(TextureLoader, 'assets/ground.jpeg')
  const mountainScene = useGLTF("assets/models/mountains.glb")
  const [mountains, setMountains] = useState(mountainScene.scene.children[0])
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 4, 4 );

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