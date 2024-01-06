import { Rect, RectComp , GameObj} from "kaboom";
import { START_HEALTH } from "../../constants/player_constants.js";
import { RED, add, color, loadSprite, outline, pos, rect, sprite } from "../../game.js";

export class HealthBar {
    hp : GameObj<RectComp>;
    hpShadow : GameObj<RectComp>;
    constructor() {
        loadSprite('HP', '../src/sprites/HP.png')
        add([
            pos(410,7),
            sprite('HP'),
        ])

        const Background = add([
            rect(400,60, {radius:15}),
            pos(10,10),
            color(20,20,20)
        ])

        const innerBackground = add([
            rect(384,40, {radius:10}),
            pos(18,18),
            color(70,70,70)
        ])

        this.hpShadow = add([
            rect(384,40, {radius:5}),
            pos(18,18),
            color(40,40,40)
        ])

        this.hp = add([
            rect(384,40, {radius:10}),
            pos(18,18),
            color(192,17,17)
        ])
        
    }

    update(health: number) {
        const hppx = health/START_HEALTH * 384;
        this.hp.width = hppx;
        this.hpShadow.width = hppx+12;
    }
}