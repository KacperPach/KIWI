import { Fly } from './entities/enemy/fly.js';
import { Player } from './entities/player/player.js';
import { debug, loop, vec2 } from './game.js';
import { UpgradeMenu } from './screen/upgradeMenu/components/UpgradeMenu.js';

const p = new Player();
new UpgradeMenu();
// spawn enemies in random locations based on r away from player and random angle
loop(3, () => { 
    const angle = Math.random()*2*Math.PI;
    
    const point = p.pos.add(vec2(Math.cos(angle)* 1000, Math.sin(angle)*1000));
    new Fly(p, point);
});





