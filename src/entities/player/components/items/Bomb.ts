import {  GameObj, PosComp,  ScaleComp } from "kaboom";
import Shape from "kaboom"
import { GREEN, RED, add, anchor, area, circle, color, easings, loadSprite, loop, opacity, pos, rect, scale, sprite, time, tween, vec2, wait, wave } from "../../../../game.js";

const BOMB_RESET_TIME = 5;
const BOMB_DAMAGE = 5;

export class Bomb {
    timerOffset : number = 0;
    constructor( anchorNode : GameObj<PosComp>, timerOffset : number ) {
        loadSprite("bomb", "src/sprites/bomb.png");
        this.timerOffset = timerOffset;
        
        wait(BOMB_RESET_TIME, () => {
        loop(BOMB_RESET_TIME+timerOffset, () => { 
            const bomb = add([pos(anchorNode.pos), anchor("center"), scale(0.8), sprite("bomb")])
            this.animate(bomb);
        })})
    }

    animate( bomb : GameObj<PosComp | ScaleComp> ) {
        bomb.onUpdate(() => {
            bomb.scale = vec2(wave(0.7,.9, time()+this.timerOffset));
        })
        wait(BOMB_RESET_TIME, () => {
            bomb.destroy();
            this.explode(bomb);
        })
    }

    explode(bomb : GameObj<PosComp>) { 
        // Area only supports rect and polygon 😡😡😡 (rect for now)
        let cir = add([pos(bomb.pos), area(), anchor("center"), circle(200), color(GREEN), opacity(0.6), "playerAttack"]);
        bomb.destroy();
        
        cir.onCollide("enemy", (enemy) => {
            enemy.hurt(BOMB_DAMAGE);
        })

        tween(0,200,0.1,(r) => {
            cir.radius = r;
        }, easings.easeOutExpo)
        .then(() => {
            tween(200,0,0.2,(r) => {
                cir.radius = r;
            }, easings.easeInExpo).then(() => {
                cir.destroy();
            })
        })
    }
}