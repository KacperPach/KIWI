import { AreaComp, GameObj, PosComp, ScaleComp, SpriteComp, Vec2 } from "kaboom";
import { BLACK, RED, add, anchor, area, color, drawRect, loadSprite, outline, pos, rect, scale, sprite, vec2, z } from "../../../game.js";

export class UpgradeButton {
    position : Vec2;
    onClick : Function;
    body : GameObj<AreaComp | ScaleComp>;

    constructor(position : Vec2, spriteName : string, spritePath : string, onClick : Function) {
        this.position = position;
        this.onClick = onClick;

        loadSprite(spriteName, spritePath);
        this.body = add([
            pos(position),
            rect(145,145, {radius: 10}), 
            scale(2),
            anchor('center'), 
            area(),
            color(44,44,44), 
        ]);
        this.body.add([
            sprite(spriteName),
            anchor('center'),
            area(),
            "button"
        ])
        this.body.onClick(() => {   
            this.onClick();
        })
        this.body.onHover(() => {
            this.body.scale = vec2(2.1);
        })
        this.body.onHoverEnd(() => {
            this.body.scale = vec2(2);
        })

    }

    destroy() {
        this.body.destroy();
    }
}