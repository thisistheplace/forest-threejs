import PropTypes from 'prop-types';

import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {Loader, OrbitControls} from '@react-three/drei'
import LoadingBar from 'react-top-loading-bar'

import {Fog} from "../model/fog"
import {Lights} from "../model/lights"
import {Forest} from "../model/forest"
import { Ground } from '../model/ground'
import { TreeStats } from '../model/stats'

const Model = (props) => {
    return (
        <>
            <Ground/>
            <Forest {...props}/>
            <Lights {...props}/>
            <Fog {...props}/>
        </>
    )
}

function ForestThreejs(props) {
    return (
        <div id={props.id} style={{"height":"100%", "width":"100%"}}>
            <Canvas shadows style={{'background':'lightblue'}} camera={{position: [1000, 500, -1000], fov:50, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 10000}}>
                <OrbitControls/>
                <TreeStats {...props}/>
                {/* <axesHelper scale={1000}/> */}
                <Suspense fallback={null}>
                    <Model {...props}/>
                </Suspense>
            </Canvas>
            <Loader />
            <LoadingBar color='#f11946' />
        </div>
    )
}

ForestThreejs.defaultProps = {
    totalX: 100,
    totalZ: 100,
    spacing: 50,
    stats: true
};

ForestThreejs.propTypes = {
    id: PropTypes.string.isRequired,
    totalX: PropTypes.number,
    totalZ: PropTypes.number,
    spacing: PropTypes.number,
    stats: PropTypes.bool
};

export default ForestThreejs;