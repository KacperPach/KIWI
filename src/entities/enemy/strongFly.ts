import { AreaComp, ColorComp, GameObj, PosComp, Vec2 } from "kaboom";
import { Player } from "../player/player.js";
import { Fly } from "./fly.js";
import { add, color, time, vec2 } from "../../game.js";

export class StrongFly extends Fly {
  constructor(target: Player, position: Vec2) {
    super(target, position);
    this.body.heal(1);
  }
}