import { Fly } from './entities/enemy/fly.js';
import { Bark } from './entities/player/components/items/Bark.js';
import { Player } from './entities/player/player.js';
import { add, addKaboom, area, loadSprite, onCollide, pos, sprite, vec2 } from './game.js';


const p = new Player();



const fly = new Fly(p, vec2(400, 400));


