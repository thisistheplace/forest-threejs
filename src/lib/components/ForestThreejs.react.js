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
            <Forest {...props}/>
            <Lights {...props}/>
            <Fog {...props}/>
            <Ground/>
        </>
    )
}

function ForestThreejs(props) {
    return (
        <div id={props.id} style={{"height":"100%", "width":"100%"}}>
            <Canvas shadows style={{'background':'lightblue'}} camera={{position: [75, 30, 75], fov:50, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 2000}}>
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
    totalX: 100,
    totalZ: 100,
    spacing: 40
};

ForestThreejs.propTypes = {
    id: PropTypes.string.isRequired,
    totalX: PropTypes.number,
    totalZ: PropTypes.number,
    spacing: PropTypes.number
};

export default ForestThreejs;