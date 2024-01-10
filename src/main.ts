import { Fly } from './entities/enemy/fly.js';
import { Player } from './entities/player/player.js';
import { add, camPos, camScale, debug, drawText, height, loop, mobileCheck, onUpdate, pushScale, scale, text, vec2, width } from './game.js';
import { UpgradeMenu } from './screen/upgradeMenu/UpgradeMenu.js';


if (mobileCheck())
    camScale(vec2(0.5));

let p = new Player();
new UpgradeMenu(p); // first upgrade menu
loop(1, () => {
    if(p.health < 1) {
        p.destroy();
        p = new Player();
        new UpgradeMenu(p);
    }})
// spawn enemies in random locations based on r away from player and random angle
loop(3, () => { 
    for(let i = 0; i < 1*p.level; i++) {
    const angle = Math.random()*2*Math.PI;
      
    const point = p.pos.add(vec2(Math.cos(angle)* 1000, Math.sin(angle)*1000));
    new Fly(p, point);
    }
});