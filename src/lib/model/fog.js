import React, {useRef} from 'react'

const Fog = (props) => {
  const ref = useRef()

  return (
    <>
      <fog ref={ref} attach="fog" color="lightblue" near={100} far={4000}/>
    </>
  )
}

export {Fog}