import { GameObj, PosComp } from "kaboom";
import { add, anchor, color, health, height, pos, rect, vec2, width, z } from "../../../game.js";
import { UpgradeButton } from "./upgradeButtoun.js";

export class UpgradeMenu {

    body: GameObj<PosComp>;
    buttons: Array<UpgradeButton> = [];

    constructor() {

        //only for horisontal 

        const posCenter = vec2(width()/2, height()/2);

        this.body = add([ 
                rect(width()*0.7, height()*0.5, {radius: 20}),
                color(100,100,100),
                z(10),
                anchor('center'),
                pos(posCenter),
                "UpgradeMenu"]);
        
        this.buttons.push(new UpgradeButton(vec2(posCenter), "BarkIcon", "/src/sprites/BarkIcon.png", () => { this.destroy()}));
        this.buttons.push(new UpgradeButton(vec2(posCenter.add(vec2(-300,0))), "BombIcon", "/src/sprites/BombIcon.png", () => {}));
        this.buttons.push(new UpgradeButton(vec2(posCenter.add(vec2(300,0))), "TailAttackIcon", "/src/sprites/TailAttackIcon.png",() => {}));

    }
    
    destroy() {
        this.body.destroy();
        this.buttons.forEach(button => {
            button.destroy();
        })
    }
}