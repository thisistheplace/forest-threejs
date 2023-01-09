import React, {useEffect, useRef, useState} from 'react'
import { useGLTF } from '@react-three/drei'

import {Trees} from './trees'

const TREE_MODELS = {
  "beech": "/assets/models/beech.gltf",
  "lime": "/assets/models/lime.gltf"
  // "spruce": "/assets/models/spruce.gltf"
}

function preload(){
  for (const [key, value] of Object.entries(TREE_MODELS)) {
    useGLTF.preload(value)
  }
}

const Forest = (props) => {
  const ref = useRef()
  const [urls, setUrls] = useState([])

  useEffect(()=>{
    if (!ref.current) return
    var newTrees = []
    for (const [key, value] of Object.entries(TREE_MODELS)) {
      newTrees.push(value)
    }
    setUrls(newTrees)
  }, [])

  return (
    <group ref={ref}>
      {urls.map((x, i) =>
        <Trees key={i} {...props} url={x} />
      )}
    </group>
  )
}

export {Forest}

preload()