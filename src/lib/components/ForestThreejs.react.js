import PropTypes from 'prop-types';

import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {Loader, OrbitControls, Stats} from '@react-three/drei'

import {Fog} from "../model/fog"
import {Lights} from "../model/lights"
import {Forest} from "../model/forest"
import { Ground } from '../model/ground';

const Model = (props) => {
    return (
        <>
            <Ground/>
            <Forest {...props}/>
            <Lights {...props}/>
            {/* <Fog {...props}/> */}
        </>
    )
}

function ForestThreejs(props) {
    return (
        <div id={props.id} style={{"height":"100%", "width":"100%"}}>
            <Canvas shadows style={{'background':'lightblue'}} camera={{position: [75, 30, 75], fov:50, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 10000}}>
                <OrbitControls/>
                <Stats showPanel={0} className="stats" {...props} />
                <Suspense fallback={null}>
                    <Model {...props}/>
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    )
}

ForestThreejs.defaultProps = {
    totalX: 2,
    totalZ: 1,
    spacing: 30
};

ForestThreejs.propTypes = {
    id: PropTypes.string.isRequired,
    totalX: PropTypes.number,
    totalZ: PropTypes.number,
    spacing: PropTypes.number
};

export default ForestThreejs;