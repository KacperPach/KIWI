import kaboom, { GameObj, PosComp } from 'kaboom';

const DEBUG = true;
const PLAYER_SPEED = 100;
const PLAYER_SPINE_LENGTH = 10
const SPINE_SPACEING = 100
const SPINE_SPEED = 100;
const POINT_SIZE = 30;

const k = kaboom();
// CONSTANTS
const {RED, BLACK, GREEN, LEFT, RIGHT, UP, DOWN} = k;
// GLOBAL METHODS 
const {onKeyDown, onUpdate, drawLine, drawRect, onDraw} = k
const {add, pos, circle, vec2, color,opacity, rotate,rect,anchor, follow, outline} = k

const spine: Array<GameObj<PosComp>> = [];
for (let i = 0; i < PLAYER_SPINE_LENGTH; i++) {
  spine.push(  
    add([
    pos(vec2(10,10)),
    DEBUG?circle(POINT_SIZE):'',
    DEBUG?color(GREEN):'',
    "spineDot"
  ]))
}

const cir1 = add([
    pos(vec2(100,100)),
    DEBUG?circle(POINT_SIZE):'',
    DEBUG?color(GREEN):'',
    "head"
])


function followSpine (toFollow:GameObj, following:GameObj) {
  if (following.pos.dist(toFollow.pos)>SPINE_SPACEING)
    following.move(toFollow.pos.sub(following.pos).scale(2))
}

onDraw(() => { 
})

onUpdate('spineDot', () => {
  followSpine(cir1, spine[0])
  for (let i = 1; i < spine.length; i++) {
    followSpine(spine[i-1],spine[i]);
  }
})

onKeyDown('a', () => {
  cir1.move(LEFT.scale(PLAYER_SPEED))
})
onKeyDown('w', () => {
  cir1.move(UP.scale(PLAYER_SPEED))
})
onKeyDown('s', () => {
  cir1.move(DOWN.scale(PLAYER_SPEED))
})
onKeyDown('d', () => {
  cir1.move(RIGHT.scale(PLAYER_SPEED))
})
