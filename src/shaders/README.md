# Shaders (`src/shaders/`)

Place raw GLSL strings or `.glsl` imports (with a Vite plugin) here. Typical flow:

1. Author vertex/fragment pairs for R3F `shaderMaterial` or `meshPhysicalMaterial` extensions.
2. Keep uniforms typed in the adjacent React scene file (`src/scenes/`).
3. Version-control performance notes (mobile caps, `#define` toggles) beside the shader.

This repo ships without shader files to keep the bootstrap lean—drop assets here
