import React, {useRef} from 'react'

const Fog = (props) => {
  const ref = useRef()

  return (
    <>
      <fog ref={ref} attach="fog" color="lightgrey" near={20} far={300} />
    </>
  )
}

export {Fog}