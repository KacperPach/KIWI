import { AreaComp, GameObj, HealthComp, PosComp, Vec2 } from "kaboom";
import { add, addKaboom, area, dt, health, loadSprite, pos, sprite } from "../../game.js";
import { Player } from "../player/player.js";
import { EnemyInterface } from "./enemy.js";

export class Fly implements EnemyInterface {
  target: Player;
  #animationTimer: number = 0;
  body: GameObj<AreaComp | PosComp | HealthComp>;

  constructor(target: Player, position: Vec2) { // use HealthComp
    this.target = target;
    loadSprite("fly", "../src/sprites/fly.png");
    this.body = add([pos(position), sprite("fly"), area(), health(1), "enemy"]);

    this.body.onCollide("PlayerDamagePoint", () => {   
        this.damageTarget();
     })

    this.body.onUpdate(() => {
        

        this.body.moveTo(this.target.pos, 100);
    })

    this.body.onDeath(() => {
        this.destroy();
    })
  }

  destroy() {
    this.body.destroy();
    addKaboom(this.body.pos);
  }
  
  damageSelfe(damage: number): void {
    this.destroy();
  }

  damageTarget() {
    this.target.damage(3);
    this.destroy();
  }
}
