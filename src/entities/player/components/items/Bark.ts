import { AnchorComp, AreaComp, GameObj, PolygonComp, PosComp, RotateComp, SpriteComp, Vec2 , HealthComp, OpacityComp, ScaleComp} from "kaboom";
import { add, area, follow, loadSprite, onUpdate, polygon, pos, rotate, sprite, vec2 , anchor, deg2rad, wave, time, opacity, tween, dt, easings, scale} from "../../../../game.js";
import { SimpleAttack } from "./componets/SimpleAttack.js";

export class Bark extends SimpleAttack{
  constructor( anchorNode : GameObj<PosComp | RotateComp>, timerOffset : number) {
    loadSprite("bark", "src/sprites/bark.png");
    super(anchorNode, timerOffset, "bark", "botleft");
  }
}