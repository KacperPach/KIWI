import { GameObj, PosComp, RectComp, RotateComp, ScaleComp } from "kaboom";
import { add, anchor, color, health, height, loadSprite, onUpdate, pos, rect, rotate, scale, sprite, text, time, vec2, wave, width, z } from "../../../game.js";
import { UpgradeButton } from "./upgradeButtoun.js";
import { Player } from "../../../entities/player/player.js";
import { Bark } from "../../../entities/player/components/items/Bark.js";
import { Bomb } from "../../../entities/player/components/items/Bomb.js";
import { TailAttack } from "../../../entities/player/components/items/TailAttak.js";

export class UpgradeMenu {

    body: GameObj<PosComp | RectComp>;
    text: GameObj<PosComp | RotateComp | ScaleComp>;
    buttons: Array<UpgradeButton> = [];

    constructor( player : Player) {

        //only for horisontal 

        const posCenter = vec2(width()/2, height()/2);

        this.body = add([ 
                rect(width()*0.7, height()*0.5, {radius: 20}),
                color(70,70,70),
                z(10),
                anchor('center'),
                pos(posCenter),
                "UpgradeMenu"]);

        loadSprite("chooseText", "/src/sprites/choose.png");
        this.text = add([ sprite("chooseText"), z(15), scale(2), rotate(0), anchor("center"), pos(this.body.pos.add(vec2(0, -this.body.height/2 + 60)))]);
        this.text.onDraw(() => {
            this.text.rotateTo(wave(-10, 10, time()*2));
            this.text.scale = vec2(wave(1.9, 2.1, time()*3));
        });
        wave(-30,30, time())

        this.buttons.push(new UpgradeButton(vec2(posCenter), "BarkIcon", "/src/sprites/BarkIcon.png", () => { this.destroy(); player.addItems(new Bark(player.head, player.level*0.1))}));
        this.buttons.push(new UpgradeButton(vec2(posCenter.add(vec2(-300,0))), "BombIcon", "/src/sprites/BombIcon.png", () => {this.destroy(); player.addItems(new Bomb(player.tail, player.level*0.1))}));
        this.buttons.push(new UpgradeButton(vec2(posCenter.add(vec2(300,0))), "TailAttackIcon", "/src/sprites/TailAttackIcon.png",() => {this.destroy(); player.addItems(new TailAttack(player.tail, player.level*0.1))}));
        
    }
    
    destroy() {
        this.body.destroy();
        this.text.destroy();
        this.buttons.forEach(button => {
            button.destroy();
        })
    }
}