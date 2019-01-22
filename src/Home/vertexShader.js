export default `
#ifdef GL_ES
precision highp float;
#endif

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;
uniform mat4 worldView;
uniform float time;

// Normal
varying vec2 vUV;
varying vec4 vPosition;
varying vec3 vNormal;
varying vec3 vL;
varying vec3 vE;

vec3 lightPosition = vec3(0.0, 0.0, 0.0);

void main(void) {
    gl_Position = worldViewProjection * vec4(position, 1.0);
    vPosition = gl_Position;
    vec4 ecPosition = worldView * vec4(position, 1.0);
    vNormal = normal;
    vL = lightPosition - ecPosition.xyz;
    vE = vec3(0.0, 0.0, 0.0) - ecPosition.xyz;
    vUV = uv;
}
`