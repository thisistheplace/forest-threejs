import React, {useRef, useEffect} from 'react'
import { useLoader, extend } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useGLTF } from '@react-three/drei'

import * as THREE from 'three'

extend({THREE})

const Ground = (props) => {
  const ref = useRef()
  const texture = useLoader(TextureLoader, 'assets/ground.jpeg')
  const mountains = useGLTF("assets/models/mountains.glb")
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 4, 4 );

  console.log(mountains)

  useEffect(() => {
    if (!ref.current)return
    ref.current.rotateX(-Math.PI / 2)
    mountains.scene.rotateX(Math.PI / 2)
    mountains.scene.children[0].scale.multiplyScalar(1000)
  }, [])

  return (
    <mesh ref={ref} receiveShadow={true}>
      <primitive object={mountains.scene}/>
      {/* <planeGeometry args={[4000, 4000]} /> */}
      <meshStandardMaterial map={texture}/>
    </mesh>
  )
}

export {Ground}