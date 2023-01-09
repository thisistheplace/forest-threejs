import React, {useRef} from 'react'

const Fog = (props) => {
  const ref = useRef()

  return (
    <>
      <fog ref={ref} attach="fog" color="#024a5e" near={10} far={300}/>
    </>
  )
}

export {Fog}