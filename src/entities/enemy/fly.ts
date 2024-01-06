import { AreaComp, GameObj, PosComp, Vec2 } from "kaboom";
import { add, addKaboom, area, loadSprite, pos, sprite } from "../../game.js";
import { Player } from "../player/player.js";
import { EnemyInterface } from "./enemy.js";

export class Fly implements EnemyInterface {
  target: Player;
  body: GameObj<AreaComp | PosComp>;

  constructor(target: Player, position: Vec2) {
    this.target = target;
    loadSprite("fly", "../src/sprites/fly.png");
    this.body = add([pos(position), sprite("fly"), area(), "enemy"]);
    this.body.onCollide("PlayerDamagePoint", () => {   
        this.damage();
     })
    this.body.onUpdate(() => {
        this.body.moveTo(this.target.pos, 100);
    })
  }

  destroy() {
    this.body.destroy();
    addKaboom(this.body.pos);
  }

  damage() {
    this.target.damage(3);
    this.destroy();
  }
}
