uniform sampler2D texture;
uniform float radius;
uniform vec2 snap_dimensions;
uniform vec2 subimg_dimensions;
vec2 dimensions;

float roundCorners(vec2 p, vec2 b, float r)
{
    return length(max(abs(p)-b+r,0.0))-r;
}

void main()
{
	if (subimg_dimensions.x <= subimg_dimensions.y)
	{
		dimensions.x = snap_dimensions.x * subimg_dimensions.x / subimg_dimensions.y;
		dimensions.y = snap_dimensions.y;
	}
	else
	{
		dimensions.x = snap_dimensions.x;
		dimensions.y = snap_dimensions.y * subimg_dimensions.y / subimg_dimensions.x;
	}
    vec2 halfRes = 0.5 * dimensions;
	float b = 1.0 - roundCorners(gl_TexCoord[0].xy * dimensions - halfRes, halfRes, abs(radius));
    vec4 pixel = texture2D(texture, gl_TexCoord[0].xy);
    gl_FragColor = vec4(gl_Color.xyz * pixel, smoothstep(0.0,1.0,b));
}