import React, {useRef} from 'react'

const Fog = (props) => {
  const ref = useRef()

  return (
    <>
      <fog ref={ref} attach="fog" color="darkgrey" near={100} far={6000}/>
    </>
  )
}

export {Fog}