import "aframe"
import React from 'react'
import ReactDom from 'react-dom'
import 'aframe-animation-timeline-component';
import styled from 'styled-components';
import Page from  './page'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter 
} from 'react-router-dom';

const Key = styled.div`
    position: absolute;
    bottom: 20%;
    margin: 0 auto;
    font-family: 'Press Start 2P', sans-serif;
    font-size: 32px;
    left: 50%;
    transform: translateX(-50%);
    color: #FF0;
`

AFRAME.registerShader('skyGradient', {
    schema: {
    colorTop: { type: 'color', default: 'black', is: 'uniform' },
    colorBottom: { type: 'color', default: 'red', is: 'uniform' }
    },

    vertexShader: [
    'varying vec3 vWorldPosition;',

    'void main() {',

        'vec4 worldPosition = modelMatrix * vec4( position, 1.0 );',
        'vWorldPosition = worldPosition.xyz;',

        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

    '}'

    ].join('\n'),

    fragmentShader: [
    'uniform vec3 colorTop;',
    'uniform vec3 colorBottom;',

    'varying vec3 vWorldPosition;',

    'void main()',

    '{',
        'vec3 pointOnSphere = normalize(vWorldPosition.xyz);',
        'float f = 1.0;',
        'if(pointOnSphere.y > - 0.3){',

        'f = sin(pointOnSphere.y * 2.0);',

        '}',
        'gl_FragColor = vec4(mix(colorBottom,colorTop, f ), 1.0);',

    '}'
    ].join('\n')
});

function Home(props){
    let offset2 = -0.05;
    let offset1 = -0.1;
    const animationOffset = 1;

    const letterSet1 = ["t_a", "t_r", "slash", "t_v", "t_r", " ",
    "t_c", "t_l","t_u","t_b"," ",
    "t_a","t_t"];
    const letterSet2 = ["t_o", "t_r", "t_e", "t_g", "t_o", "t_n", " ", 
    "t_s", "t_t","t_a","t_t","t_e"," ",
    "t_u","t_n","t_i","t_v","t_e","t_r","t_s","t_i","t_t","t_y"];

    document.addEventListener('keydown', ()=>props.history.push('/page'))
    
    return (
        <>
            <a-scene animation-timeline="timeline: #flyin">
                <a-assets>
                    <a-asset-item id="globe" src="globe.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_o" src="O.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_r" src="R.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_e" src="E.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_g" src="G.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_n" src="N.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_s" src="S.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_t" src="T.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_a" src="A.glb" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_u" src="U.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_i" src="i.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_v" src="V.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_y" src="Y.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_a" src="A.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_c" src="C.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_l" src="L.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="t_b" src="B.gltf" crossOrigin="anonymous"></a-asset-item>
                    <a-asset-item id="slash" src="slash.glb" crossOrigin="anonymous"></a-asset-item>
                </a-assets>
                {/* scale="0.05 0.05 0.05" rotation="0 -90 0" position={`${offset1+key*0.013} 2.24 -0.1` */}
                <a-camera position="0 2.2 0"><a-cursor material="color:#FF0000" position="0 0 -0.05" raycaster="objects: #enter" scale="0.1 0.1 0.1"></a-cursor></a-camera>

                <a-timeline id="flyin">
                    <a-timeline-group>
                    {
                        letterSet1.map((element, key)=>{
                            return <a-timeline-animation key={key} select={`#ele_${key}_1`} name="entry"></a-timeline-animation>
                        })
                    }
                    </a-timeline-group>
                    <a-timeline-group>
                    {
                        letterSet2.map((element, key)=>{
                            return <a-timeline-animation key={key} select={`#ele_${key}_2`} name="entry"></a-timeline-animation>
                        })
                    }
                    </a-timeline-group>
                </a-timeline>

                <a-entity position="0.05 0 0" rotation="0 11 0">
                {
                    letterSet1.map((element, key)=>{
                        return <a-gltf-model id={`ele_${key}_1`} key={key} src={`#${element}`} scale="0.05 0.05 0.05" rotation="0 -90 0" position={`${offset1+key*0.013} -4 -1`}
                            animation__entry={`property: position; from:${offset1+key*0.013} -4 -1; to:${offset1+key*0.013} 2.24 -0.1; autoplay:false; dur:500; loop: false; elasticity: 100; easing: easeOutElastic; delay: 2000;`}
                        ></a-gltf-model>
                    })
                }

                {/* scale="0.05 0.05 0.05" rotation="0 -90 0" position={`${offset2+key*0.013} 2.21 -0.1 */}
                {
                    
                    letterSet2.map((element, key)=>{
                        return <a-gltf-model material="shader: skyGradient; colorTop: #353449; colorBottom: #BC483E; side: back" id={`ele_${key}_2`} key={key} src={`#${element}`} scale="0.05 0.05 0.05" rotation="0 -90 0" position={`${offset1+key*0.013} -4 -1`}
                        animation__entry={`property: position; from:${offset1+key*0.013} -4 -1; to:${offset1+key*0.013} 2.21 -0.1; autoplay:false; dur:500; loop: false; elasticity: 100; easing: easeOutElastic; delay: 2000;`}
                        ></a-gltf-model>
                    })
                }
                </a-entity>
                <a-gltf-model animation="property: rotation; loop: true; to: 360 0 0; dur: 50000; easing: linear" src="vr_lab_globe.glb" position="0 -1.7 -1" rotate="0 0 90" scale="1 0.5 0.5"></a-gltf-model>
                <a-entity id="sky"
                geometry="primitive: sphere; radius: 65;"
                material="shader: skyGradient; colorTop: #353449; colorBottom: #BC483E; side: back"></a-entity>
            </a-scene>
            <Key>Press any Key to Enter</Key>
        </>
    )
}

const RoutedHome = withRouter(Home)

function App(){
    return(
        <Router>
            <Route path="/page">
                <Page />
            </Route>
            <Route exact path="/">
                <RoutedHome />
            </Route>
        </Router>
    )
}

ReactDom.render(React.createElement(App), document.getElementById("app"))