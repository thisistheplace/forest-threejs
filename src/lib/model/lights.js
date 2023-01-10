import React, {useRef} from 'react'

const Lights = (props) => {
  const ref = useRef()

  return (
    <group ref={ref}>
      <ambientLight intensity={0.6}/>
      <directionalLight args={['lightblue', 1]}/>
      <directionalLight args={['lightblue', 1]} position={[0, -1000, 0]}/>
    </group>
  )
}

export {Lights}