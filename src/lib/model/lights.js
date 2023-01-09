import React, {useRef} from 'react'

const Lights = (props) => {
  const ref = useRef()

  return (
    <group ref={ref}>
      <ambientLight/>
      <directionalLight args={['lightblue', 1]}/>
    </group>
  )
}

export {Lights}