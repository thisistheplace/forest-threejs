import React, {useEffect, useRef, useState, createRef} from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Water } from 'three/examples/jsm/objects/Water'
// import { TextureLoader, PlaneBufferGeometry, RepeatWrapping, AmbientLight } from 'three'

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

extend({THREE, Water})

const url = () => {return "assets/models/mountains.glb"}

const Ocean = (props) => {

  const ref = useRef()
  const mountainScene = useGLTF(url())
  const [seaPlane, setSeaPlane] = useState(mountainScene.scene.children[0].geometry)
  const [options, setOptions] = useState({})

  useEffect(() => {
    if (!ref.current || !props.sunRef.current) {return}
    ref.current.material.uniforms.sunDirection.value.copy( props.sunRef.current.position ).normalize()
    seaPlane.scale(1000, 1000, 1000)
    seaPlane.translate(-1000, -50, -1000)
    const waterOptions = {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load( '/assets/img/waternormals.jpg', function ( texture ) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      } ),
      alpha: 0.9,
      sunDirection: props.sunRef.current.position.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false
    }
    setOptions(waterOptions)
  }, [])
    
  useFrame((state, delta) => {
      ref.current.material.uniforms.time.value += delta / 5
  })

  return (
    <water ref={ref} args={[seaPlane, options]} />
  )
}

export {Ocean}