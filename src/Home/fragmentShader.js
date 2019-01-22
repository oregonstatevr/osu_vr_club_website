export default `
#ifdef GL_ES
        precision mediump float;
    #endif

    varying vec2 vUV;
    varying vec4 vPosition;
    varying vec3 vNormal;
    varying vec3 vL;
    varying vec3 vE;

    //uniform sampler2D textureSampler;
    uniform vec2 center;
    uniform float time;

    // float dot(vec3 a, vec3 b){
    //     return (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
    // }

    
    void main(void) {
        float delay = 20.0;
        float radius = 0.0;
        float uTime = time;
        if(uTime>delay){
            uTime = uTime - delay;
            radius = 8.0*sin(uTime*0.03);
        }
        float x2 = ((center.x - vPosition.x)*(center.x - vPosition.x)) / (radius*radius);
        float y2 = ((center.y - vPosition.y)*(center.y - vPosition.y)) / (radius*radius);
        float uKa = 0.1;
        float uKd = 0.9;
        float uKs = 0.9;
        float shineness = 10.0;
        vec3 avL = vL;
        vec3 color = vec3(1.0, 1.0, 1.0);
        vec3 objectColor = vec3(1.0, 0.0, 0.0);
        if(x2 + y2 <= 1.0) {
            vec3 Normal = normalize(vNormal);
            vec3 Light = normalize(avL);
            vec3 Eye = normalize(vE);

            vec3 ambient = uKa * color;
            float d = max(dot(Normal, Light), 0.0);
            vec3 diffuse = uKd * d * color;

            float s = 0.0;
            if(dot(Normal, Light) > 0.0){
                vec3 ref = normalize(reflect(-Light, Normal));
                s = pow(max(dot(Eye, ref), 0.0), shineness);
            }
            vec3 specular = uKs * s * color;
            gl_FragColor = vec4(ambient+diffuse+specular+objectColor, 1.0);
        } else {
            gl_FragColor = vec4(objectColor, 1.0);
        }   
    }
`