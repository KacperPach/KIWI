import {GameObj,PosComp,Vec2} from 'kaboom';
import {onKeyDown, onUpdate, onDraw,RED, BLACK, GREEN, LEFT, RIGHT, UP, DOWN ,rgb,drawPolygon,deg2rad, area, add, pos, polygon, circle, vec2, color, uvquad, usePostEffect, rotate, loadShader,anchor, outline, loadShaderURL} from "./game.js"; //temp fix when you have time to better understand ts compiler options better (would be nice if imporet ends in .ts)
import {DEBUG} from "./constants/game_constants.js"
import {PLAYER_SPEED, PLAYER_SPINE_LENGTH, SPINE_SPACEING, POINT_SIZE, BODY_R} from "./constants/player_constants.js"
import Spine from "./entities/player/spine.js"
import Body from './entities/player/body.js';

const player_pos:GameObj<PosComp> = add([pos(vec2(100))]); 

const spine = new Spine(PLAYER_SPINE_LENGTH);

const cir1 = add([
    pos(vec2(500,500)),
    DEBUG?uvquad(POINT_SIZE*2, POINT_SIZE*2):'',
    DEBUG?color(RED):'',
    outline(1000,RED),
    "head",
    outline(10)
])

cir1.onDraw(() => {
  cir1.pos = player_pos.pos;
})

loadShader('test',undefined,`
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
  float pixelSize = 1.; // Adjust this value to change the pixelation level

  // Manually specify the texture size
  vec2 texSize = vec2(512.0, 512.0); // Replace with your texture's width and height

  // Calculate the size of one pixel
  vec2 onePixel = pixelSize * vec2(1.0) / texSize;

  // Manually implement the rounding operation
  vec2 uvPixel = floor((uv / onePixel) + 0.5) * onePixel;

  // Sample the texture using the pixelated coordinates
  vec4 col = texture2D(tex, uvPixel);

  return col;
}`)
usePostEffect('test')

const body = new Body(spine.positions, player_pos.pos);
spine.update(cir1);
body.update(spine);
body.draw();
body.updateHead(spine.getNodeAt(0),player_pos);
body.updateTail(spine.getNodeAt(spine.length-1));


// temp testing only movement  
onKeyDown('a', () => {
  player_pos.move(LEFT.scale(PLAYER_SPEED))
})
onKeyDown('w', () => {
  player_pos.move(UP.scale(PLAYER_SPEED))
})
onKeyDown('s', () => {
  player_pos.move(DOWN.scale(PLAYER_SPEED))
})
onKeyDown('d', () => {
  player_pos.move(RIGHT.scale(PLAYER_SPEED))
})
