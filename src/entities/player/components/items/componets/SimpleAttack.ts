import { AnchorComp, AreaComp, GameObj, PolygonComp, PosComp, RotateComp, SpriteComp, Vec2 , HealthComp, OpacityComp, ScaleComp, Anchor, EventController} from "kaboom";
import { add, area, follow, loadSprite, onUpdate, polygon, pos, rotate, sprite, vec2 , anchor, deg2rad, wave, time, opacity, tween, dt, easings, scale} from "../../../../../game.js";
import { AttackInterface } from "./AttackInterface.js";

export class SimpleAttack implements AttackInterface{
  body : GameObj<AreaComp | PosComp | SpriteComp | RotateComp | AnchorComp | OpacityComp | ScaleComp>;
  barkDistance : number = 100;
  timerOffset : number = 0;
  AnimationTimer : number = 0;
  event : EventController | null = null;

  constructor( anchorNode : GameObj<PosComp | RotateComp>, timerOffset : number , spriteName : string, anchorPos : Anchor) {
    this.timerOffset = timerOffset;
    this.body = add([pos(0), anchor(anchorPos), sprite(spriteName), scale(), rotate(0), opacity(1), area({scale: 1.2}),"playerAttack"]);
    this.animate(anchorNode)
    this.event = this.body.onUpdate(() => {
        if(this.AnimationTimer > 3+this.timerOffset) {
            this.animate(anchorNode);
            this.AnimationTimer = 0+this.timerOffset;
        }
        this.body.pos = anchorNode.pos.add(vec2(Math.cos(deg2rad(anchorNode.angle))*this.barkDistance, Math.sin(deg2rad(anchorNode.angle ))*this.barkDistance));
        this.body.rotateTo(anchorNode.angle + 49);  
        this.AnimationTimer += dt();
    })

    this.body.onCollide("enemy", (enemy) => {
        if(this.body.opacity > 0.1)
            enemy.hurt(1);
    })
  }

  animate(anchorNode : GameObj<PosComp | RotateComp>): void {
    tween(0.3,1.3,0.7, (v) => {
        this.body.scale = vec2(v);
    },easings.easeInOutExpo)
    tween(90,150, 0.7, (v) => { 
        this.barkDistance = v;
    }, easings.easeInOutExpo)
    tween(0,1,0.25, (v) => {
        this.body.opacity = v;
    }, easings.easeInExpo).then(() => {
        tween(1,0,1, (v) => {
            this.body.opacity = v;
        })
    });

  }
  destroy(): void {
    this.body.destroy();
    if(this.event != null)
        this.event.cancel();
  }
}