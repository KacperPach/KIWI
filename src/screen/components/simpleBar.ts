import { Rect, RectComp , GameObj, Vec2, ColorComp} from "kaboom";
import { START_HEALTH } from "../../constants/player_constants.js";
import { RED, add, color, loadSprite, outline, pos, rect, sprite } from "../../game.js";

export class SimpleBar {
    hp : GameObj<RectComp>;
    hpShadow : GameObj<RectComp>;
    width: number;
    MaxHP: number;
    constructor(startPositon: Vec2, width: number, spriteName: string, spritePath: string, maxPoints: number, barColor : ColorComp ) {
        this.width = width;
        this.MaxHP = maxPoints;
        loadSprite(spriteName, spritePath)
        
        add([
            pos(this.width+10,startPositon.y-3),
            sprite(spriteName),
        ])

        const Background = add([
            rect(this.width,60, {radius:15}),
            pos(startPositon),
            color(20,20,20)
        ])

        const innerBackground = add([
            rect(this.width-16,40, {radius:10}),
            pos(startPositon.add(8,8)),
            color(70,70,70)
        ])

        this.hpShadow = add([
            rect(this.width-16,40, {radius:5}),
            pos(startPositon.add(8,8)),
            color(40,40,40)
        ])

        this.hp = add([
            rect(this.width-16,40, {radius:10}),
            pos(startPositon.add(8,8)),
            barColor
        ])
        
    }

    update(currentSataus: number) {
        const hppx = currentSataus/this.MaxHP * this.width-16;
        this.hp.width = hppx;
        this.hpShadow.width = hppx+12;
    }
}