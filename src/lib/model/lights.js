import React, {useRef} from 'react'

const Lights = (props) => {
  const ref = useRef()

  return (
    <group ref={ref}>
      <ambientLight/>
    </group>
  )
}

export {Lights}