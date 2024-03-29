import { AreaComp, GameObj, HealthComp, PosComp, Vec2 } from "kaboom";
import { add, addKaboom, area, color, dt, health, loadSprite, pos, sprite } from "../../game.js";
import { Player } from "../player/player.js";
import { EnemyInterface } from "./enemy.js";

export class Fly implements EnemyInterface {
  target: Player;
  animationTimer: number = 0;
  body: GameObj<AreaComp | PosComp | HealthComp>;

  constructor(target: Player, position: Vec2) { // use HealthComp
    this.target = target;
    loadSprite("fly", "src/sprites/fly.png");
    this.body = add([pos(position), sprite("fly"), area(), health(1), "enemy"]);

    this.body.onCollide("PlayerDamagePoint", () => {   
        this.damageTarget();
     })

    this.body.onUpdate(() => {
        this.body.moveTo(this.target.pos, 70 + 10* target.level);
    })

    this.body.onDeath(() => {
        this.destroy();
        this.target.addExperience(1);
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
    this.target.damage(1);
    this.destroy();
  }
}
