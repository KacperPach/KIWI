import { Player } from './entities/player/player.js';
import { add, addKaboom, area, loadSprite, onCollide, pos, sprite } from './game.js';

const p = new Player();

loadSprite("fly", "../src/sprites/fly.png");
add([
    pos(800,800),
    sprite("fly"),
    area(),
    "enemy"
])

onCollide("bodyDot", "enemy", (a) => {
    console.log("test");
    
     addKaboom(a.pos);
});