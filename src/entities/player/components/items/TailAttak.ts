import { GameObj, PosComp, RotateComp } from "kaboom";
import { loadSprite } from "../../../../game.js";
import { SimpleAttack } from "./componets/SimpleAttack.js";

export class TailAttack extends SimpleAttack{
    constructor( anchorNode : GameObj<PosComp | RotateComp>, timerOffset : number ) {
        loadSprite("TailAttack", "src/sprites/TailAttack.png");
        super(anchorNode, timerOffset, "TailAttack", "right");
    }
}
