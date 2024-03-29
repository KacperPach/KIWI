import { GameObj, PosComp, RectComp, RotateComp, ScaleComp } from "kaboom";
import { add, anchor, color, fixed, health, height, loadSprite, mobileCheck, onUpdate, opacity, pos, rect, rotate, scale, sprite, text, time, vec2, wave, width, z } from "../../game.js";
import { UpgradeButton } from "./components/upgradeButtoun.js";
import { Player } from "../../entities/player/player.js";
import { Bark } from "../../entities/player/components/items/Bark.js";
import { Bomb } from "../../entities/player/components/items/Bomb.js";
import { TailAttack } from "../../entities/player/components/items/TailAttak.js";

export class UpgradeMenu {

    body: GameObj<PosComp | RectComp>;
    text: GameObj<PosComp | RotateComp | ScaleComp>;
    buttons: Array<UpgradeButton> = [];

    constructor( player : Player) {

        //only for horisontal 
        
        const MOBILE_OFFSET = mobileCheck() ? 100 : 0;
        const posCenter = vec2(width()/2, height()/2 + MOBILE_OFFSET );

        this.body = add([ 
                rect(width(), 350 + MOBILE_OFFSET ),
                color(70,70,70),
                z(10),
                anchor('center'),
                pos(posCenter),
                fixed(),
                "UpgradeMenu"]);
 
        loadSprite("chooseText", "src/sprites/choose.png");

        const MAX_TEXT_SCALE = mobileCheck() ? 1.1 : 2.1;

        this.text = add([ sprite("chooseText"), z(15), scale(MAX_TEXT_SCALE), fixed(), rotate(0), anchor("center"), pos(this.body.pos.add(vec2(0, -200)))]);
        this.text.onDraw(() => {
            this.text.rotateTo(wave(-10, 10, time()*2));
            this.text.scale = vec2(wave(MAX_TEXT_SCALE-.2, MAX_TEXT_SCALE, time()*3));
        });
        wave(-30,30, time())

        const MOBILE_BUTTON_OFFSET = mobileCheck() ? vec2(0,150) : vec2(300,0);

        this.buttons.push(new UpgradeButton(vec2(posCenter), "BarkIcon", "src/sprites/BarkIcon.png", () => { this.destroy(); player.addItems(new Bark(player.head, player.level*0.1))}));
        this.buttons.push(new UpgradeButton(vec2(posCenter.sub(MOBILE_BUTTON_OFFSET)), "BombIcon", "src/sprites/BombIcon.png", () => {this.destroy(); player.addItems(new Bomb(player.tail, player.level*0.1))}));
        this.buttons.push(new UpgradeButton(vec2(posCenter.add(MOBILE_BUTTON_OFFSET)), "TailAttackIcon", "src/sprites/TailAttackIcon.png",() => {this.destroy(); player.addItems(new TailAttack(player.tail, player.level*0.1))}));
        
    }
    
    destroy() {
        this.body.destroy();
        this.text.destroy();
        this.buttons.forEach(button => {
            button.destroy();
        })
    }
}