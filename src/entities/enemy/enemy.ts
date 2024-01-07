import { AreaComp, GameObj } from "kaboom";
import { add, addKaboom, area, onCollide, rect } from "../../game.js";
import { Player } from "../player/player.js";

export interface EnemyInterface {
    target : Player;
    body: GameObj<AreaComp>;

    damageTarget(damage : number) :void; 
    damageSelfe(damage : number) :void;
    destroy() :void;
}