import React, {useRef} from 'react'

const Fog = (props) => {
  const ref = useRef()

  return (
    <>
      <fog ref={ref} args={['lightblue', 1, 2]}/>
    </>
  )
}

export {Fog}