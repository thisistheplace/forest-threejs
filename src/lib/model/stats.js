import React, {useRef, useEffect, useState} from 'react'
import {Stats} from '@react-three/drei'

const TreeStats = (props) => {
  const node = useRef(document.createElement('div'))
  const [show, setShow] = useState(props.stats)

  useEffect(() => {
    node.current.id = 'performanceStats'
    document.body.appendChild(node.current)
    return () => document.body.removeChild(node.current)
  }, [])
  
  return (
    <>
      { show ? <Stats parent={parent} showPanel={0} className="stats" {...props} /> : null }
    </>
  )
}

export {TreeStats}