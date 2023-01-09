import React, {useRef} from 'react'

const Fog = (props) => {
  const ref = useRef()

  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={[1, 1, 1]}/>
      <meshLambertMaterial color={0xffffff}/>
    </mesh>
  )
}

export {Fog}