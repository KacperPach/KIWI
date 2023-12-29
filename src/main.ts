import {GameObj,PosComp,Vec2} from 'kaboom';
import {onKeyDown, onUpdate, onDraw,RED, BLACK, GREEN, LEFT, RIGHT, UP, DOWN ,rgb,drawPolygon,deg2rad, area, add, pos, polygon, circle, vec2, color, uvquad, usePostEffect, rotate, loadShader,anchor, outline} from "./game.js"; //temp fix when you have time to better understand ts compiler options better (would be nice if imporet ends in .ts)
import {DEBUG} from "./constants/game_constants.js"
import {PLAYER_SPEED, PLAYER_SPINE_LENGTH, SPINE_SPACEING, POINT_SIZE, BODY_R} from "./constants/player_constants.js"
import Spine from "./entities/player/components/spine.js"
import Body from './entities/player/components/body.js';
import { Player } from './entities/player/player.js';

const p = new Player();
