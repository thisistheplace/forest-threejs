import React, {useRef, useState} from 'react'

const Trees = (props) => {
  const ref = useRef()

  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={[1, 1, 1]}/>
      <meshLambertMaterial color={0xffffff}/>
    </mesh>
  )
}

export {Trees}