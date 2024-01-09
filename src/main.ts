import { Vec2 } from 'kaboom';
import { Fly } from './entities/enemy/fly.js';
import { Bark } from './entities/player/components/items/Bark.js';
import { Player } from './entities/player/player.js';
import { add, addKaboom, area, drawCircle, loadSprite, loop, onCollide, pos, sprite, vec2 } from './game.js';


const p = new Player();

// spawn enemies in random locations based on r away from player and random angle

loop(3, () => { 
    const angle = Math.random()*2*Math.PI;
    
    const point = p.pos.add(vec2(Math.cos(angle)* 1000, Math.sin(angle)*1000));
    new Fly(p, point);
});



