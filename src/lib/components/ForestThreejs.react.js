import PropTypes from 'prop-types';

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {Loader, OrbitControls} from '@react-three/drei'

import {Fog} from "../model/fog"
import {Lights} from "../model/lights"
import {Trees} from "../model/trees"

const Model = (props) => {
    return (
        <>
            <Trees {...props}/>
            <Lights {...props}/>
            <Fog {...props}/>
        </>
    )
}

function ForestThreejs(props) {
    return (
        <div id={props.id} style={{"height":"100%", "width":"100%"}}>
            <Canvas shadows style={{'background':'lightblue'}} camera={{position: [20, 50, 200], fov:10, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 1000}}>
                <OrbitControls/>
                <Suspense fallback={null}>
                    <Model {...props}/>
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    )
}

ForestThreejs.defaultProps = {
};

ForestThreejs.propTypes = {
    id: PropTypes.string.isRequired
};

export default ForestThreejs;