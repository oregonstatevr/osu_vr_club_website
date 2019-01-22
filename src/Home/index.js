import React from 'react'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

export default class Home extends React.Component {
    componentDidMount(){
        var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
        var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

        /******* Add the create scene function ******/
        var createScene = function () {

            // Create the scene space
            var scene = new BABYLON.Scene(engine);

            // Add a camera to the scene and attach it to the canvas
            var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,7), scene);
            //camera.attachControl(canvas, true);

            // Add lights to the scene
            var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
            var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

            scene.clearColor = new BABYLON.Color3(0.220, 0.68, 0.5);

            // Add and manipulate meshes in the scene
            //var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:2}, scene);

            let t0 = 0;


            BABYLON.Effect.ShadersStore["customVertexShader"] = vertexShader

            BABYLON.Effect.ShadersStore["customFragmentShader"] = fragmentShader

            var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
                vertexElement: "custom",
                fragmentElement: "custom",
            },
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "time", "projection"]
            });
            shaderMaterial.setVector2("center", new BABYLON.Vector2(0.0,0.7));
            scene.registerBeforeRender(()=>{
                t0+=scene.getAnimationRatio()*0.1;
                shaderMaterial.setFloat('time', t0);
            });

            //sphere.material = shaderMaterial;

            BABYLON.SceneLoader.Append("", "VR_Club.obj", scene, function (scene) {
                // Create a default arc rotate camera and light.S
                //scene.createDefaultCameraOrLight(true, true, true);
                //scene.rotate(BABYLON.Axis.Y, -Math.PI/2, BABYLON.Space.world);
                for (var index = 0; index < scene.meshes.length; index++) {
                        var mesh = scene.meshes[index];
                        mesh.material = shaderMaterial;
                }
                // The default camera looks at the back of the asset.
                // Rotate the camera by 180 degrees to the front of the asset.
                //scene.activeCamera.alpha += Math.PI;
            });


            return scene;
        };
        /******* End of the create scene function ******/    

        var scene = createScene(); //Call the createScene function

        // Register a render loop to repeatedly render the scene
        const startDT = Math.floor(new Date().getTime());
        engine.runRenderLoop(function () {
                scene.render();
        });

        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () { 
                console.log("Resizing")
                engine.resize();
        });
    }
    render(){
        return(
            <canvas id="renderCanvas" width={window.innerWidth} height={window.innerHeight} touch-action="none"></canvas>
        )
    }
}