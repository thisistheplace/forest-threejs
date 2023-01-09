import React, {useRef, useEffect} from 'react'
import { useLoader, extend } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import * as THREE from 'three'

extend({THREE})

const Ground = (props) => {
  const ref = useRef()
  const texture = useLoader(TextureLoader, 'assets/ground.jpeg')
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 10, 10 );

  useEffect(() => {
    if (!ref.current)return
    console.log(ref.current)
    ref.current.rotateX(-Math.PI / 2)
  }, [])

  return (
    <mesh ref={ref}>
      <planeGeometry args={[4000, 4000]} />
      <meshStandardMaterial map={texture}/>
    </mesh>
  )
}

export {Ground}