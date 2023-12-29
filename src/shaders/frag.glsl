vec4 frag(vec3 pos, vec2 uv, vec4 color, sampler2D tex) {
    float pixelSize = 0.05; // Adjust this value to change the pixelation level

    // Manually specify the texture size
    vec2 texSize = vec2(512.0, 512.0); // Replace with your texture's width and height

    // Calculate the size of one pixel
    vec2 onePixel = pixelSize * vec2(1.0) / texSize;

    // Manually implement the rounding operation
    vec2 uvPixel = floor((uv / onePixel) + 0.5) * onePixel;

    // Sample the texture using the pixelated coordinates
    vec4 col = texture2D(tex, uvPixel);

    return col;
}