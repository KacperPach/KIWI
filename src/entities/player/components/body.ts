import { EventController, GameObj, PosComp, Vec2 } from "kaboom";
import { BLACK, RED, add, area, circle, color, deg2rad, drawCircle, drawPolygon, onDraw, onUpdate, opacity, pos, rgb, vec2 } from "../../../game.js";
import { BODY_R, POINT_SIZE } from "../../../constants/player_constants.js";
import { DEBUG } from "../../../constants/game_constants.js";
import Spine from "./spine.js";

// Body logic 
export default class Body {
    bodyPointsR: Array<GameObj<PosComp>> = [];
    bodyPointsL: Array<GameObj<PosComp>> = [];
    bodyHeadPoints: Array<GameObj<PosComp>> = [];
    bodyTailPoints: Array<GameObj<PosComp>> = [];
    drawEvent: EventController | null = null;

    constructor(spineElemetPositions: Array<Vec2>, head : Vec2) { // temp probably not creating it right
        this.bodyPointsR = this.#createFirstBodyPoints(spineElemetPositions);
        this.bodyPointsL = this.#createFirstBodyPoints(spineElemetPositions);
        this.bodyHeadPoints = this.#createHalfCirclePoints(this.bodyPointsL[0].pos,head);
        this.bodyTailPoints = this.#createHalfCirclePoints(this.bodyPointsL[0].pos, spineElemetPositions[spineElemetPositions.length-1])
    }

    /**
     * @deprecated does not set points at correct spots should be re-writen at some point.
     * (for now okay since the points are updated immideitly)
     * 
     *  */ 
    #createFirstBodyPoints(spineElemetPositions: Array<Vec2>) {
        const bodyPoints : Array<GameObj<PosComp>> = new Array();
        const angle = 0.5;

        for (let i = 0; i < spineElemetPositions.length-1; i++) {
            bodyPoints.push(
                add([
                    pos(vec2(spineElemetPositions[i].x + Math.cos(angle)*BODY_R, spineElemetPositions[i].y + Math.sin(angle)*BODY_R)),
                    circle(POINT_SIZE),
                    opacity(0.0),
                    area(),
                    "bodyDot",
                    "PlayerDamagePoint"
            ]));
        }

        return bodyPoints;
    }

    #createHalfCirclePoints(lastSpineNode:Vec2, headPos: Vec2) {
        const bodyPoints : Array<GameObj<PosComp>> = new Array();
        const resolution = 20;
        const startingAngle = lastSpineNode.angle(headPos);
        
        for (let i = startingAngle; i < startingAngle+180; i+=resolution) {
            bodyPoints.push(
                add([ 
                    pos(headPos.x + Math.cos(i)*BODY_R,
                        headPos.y + Math.sin(i)*BODY_R),
                    circle(POINT_SIZE),
                    opacity(0.0),
                    area(),
                    ])
                )
        }
        return bodyPoints;
    }

    updateHead(lastSpineNode: GameObj<PosComp>, head: GameObj<PosComp>) {
        onUpdate('head', () => {
            const resolution = 20;
            const startingAngle = lastSpineNode.pos.angle(head.pos);
    
            for (let i = 0; i <  this.bodyHeadPoints.length; i++) {
                this.bodyHeadPoints[i].pos = vec2(head.pos.x + Math.cos(deg2rad(startingAngle+i*resolution+90))*BODY_R, head.pos.y + Math.sin(deg2rad(startingAngle+i*resolution+90))*BODY_R);
            }
        })
    }

    updateTail( lastSpineNode: GameObj<PosComp>) {
        onUpdate('head', () => {
            const resolution = 20;
            const startingAngle = this.bodyPointsL[this.bodyPointsL.length-1].pos.angle(lastSpineNode.pos);
    
            for (let i = 0; i <  this.bodyTailPoints.length; i++) {
                this.bodyTailPoints[i].pos = vec2(lastSpineNode.pos.x + Math.cos(deg2rad(startingAngle+i*resolution+170))*BODY_R, lastSpineNode.pos.y + Math.sin(deg2rad(startingAngle+i*resolution+170))*BODY_R);
            }
        })
    }

    update(spine: Spine) {
        onUpdate('head', () => {
            for (let i = 1; i < spine.length; i++) {
              // body follow spine || middle part 
              let angleToPreviousPoint : number = deg2rad(spine.getPosAt(i-1).angle(spine.getPosAt(i))+90);
              let angleToPreviousPointL = angleToPreviousPoint + deg2rad(180);
              this.bodyPointsR[i-1].pos = vec2(spine.getPosAt(i-1).x + Math.cos(angleToPreviousPoint)*BODY_R,spine.getPosAt(i-1).y + Math.sin(angleToPreviousPoint)*BODY_R)
              this.bodyPointsL[i-1].pos = vec2(spine.getPosAt(i-1).x + Math.cos(angleToPreviousPointL)*BODY_R,spine.getPosAt(i-1).y + Math.sin(angleToPreviousPointL)*BODY_R)
            }
        })
    }

    draw() {
        // test polygon  
        this.drawEvent = onDraw(() => {
            //temp ind belongs to on add not ondraw 
            // extremly bad triangulation needs to be fixed at some point 
            const ind = [];
            const size = this.bodyPointsR.length * 2 + this.bodyHeadPoints.length*2;
            // ind body 
            for (let i = 0; i < size/2; i++) {
                ind.push(i,1+i,size-i-1,  
                        size-2-i,1+i,size-i-1,
                        i,1+i,size-i-1,
                        size-2-i,1+i,size-i-1)  
            }
            
            drawPolygon({
                pts: this.bodyPointsL.map(e=> e.pos).concat(this.bodyTailPoints.map(e=> e.pos).reverse()).concat(this.bodyPointsR.map(e=> e.pos).reverse()).concat(this.bodyHeadPoints.map(e=> e.pos).reverse()),
                indices: ind,
                color: rgb(102, 44, 10),
                //outline: {color: BLACK, width: 10, join: 'round'}
            })
        })
    }
    
    destroy() {
        this.bodyPointsR.forEach(element => {
            element.destroy();
        });
        this.bodyPointsL.forEach(element => {
            element.destroy();
        });
        this.bodyHeadPoints.forEach(element => {
            element.destroy();
        });
        this.bodyTailPoints.forEach(element => {
            element.destroy();
        });
        if(this.drawEvent != null)
            this.drawEvent.cancel();
        onUpdate('playerAttack', () => {})
    }
}
