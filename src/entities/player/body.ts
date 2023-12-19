import { GameObj, PosComp, Vec2 } from "kaboom";
import { BLACK, RED, add, circle, color, deg2rad, drawCircle, drawPolygon, onDraw, onUpdate, pos, rgb, vec2 } from "../../game.js";
import { BODY_R, POINT_SIZE } from "../../constants/player_constants.js";
import { DEBUG } from "../../constants/game_constants.js";
import Spine from "./spine.js";

// Body logic 
export default class Body {
    bodyPointsR: Array<GameObj<PosComp>> = [];
    bodyPointsL: Array<GameObj<PosComp>> = [];
    bodyHeadPoints: Array<GameObj<PosComp>> = [];
    bodyTailPoints: Array<GameObj<PosComp>> = [];

    constructor(spineElemetPositions: Array<Vec2>, head : Vec2) { // temp probably not creating it right
        this.bodyPointsR = this.#createFirstBodyPoints(spineElemetPositions);
        this.bodyPointsL = this.#createFirstBodyPoints(spineElemetPositions);
        this.bodyHeadPoints = this.#createHeadPoints(spineElemetPositions[0],head);
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
                    DEBUG?circle(POINT_SIZE):'',
                    DEBUG?color(RED):'',
                    "bodyDot"
            ]));
        }

        return bodyPoints;
    }

    #createHeadPoints(lastSpineNode:Vec2, headPos: Vec2) {
        const bodyPoints : Array<GameObj<PosComp>> = new Array();
        const resolution = 20;
        const startingAngle = lastSpineNode.angle(headPos);
        
        for (let i = startingAngle; i < startingAngle+180; i+=resolution) {
            bodyPoints.push(
                add([ 
                    pos(headPos.x + Math.cos(i)*BODY_R,
                        headPos.y + Math.sin(i)*BODY_R),
                    DEBUG?circle(5):'',
                    DEBUG?color(RED):''
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
        onDraw(() => {
            //temp ind belongs to on add not ondraw
            const ind = [];
            const size = this.bodyPointsR.length * 2;
            // ind body 
            for (let i = 0; i < size/2; i++) {
                ind.push(i,1+i,size-i-1,  
                        size-2-i,1+i,size-i-1,
                        i,1+i,size-i-1,
                        size-2-i,1+i,size-i-1)  
            }
            //ind head 
            ind.push(size-1, size+this.bodyHeadPoints.length-1,0)
            for (let i = 0; i < this.bodyHeadPoints.length; i++) {
                ind.push(size-1, size+this.bodyHeadPoints.length-1-i,size+this.bodyHeadPoints.length-2-i)
            }
            
            drawPolygon({
                pts: this.bodyPointsL.map(e=> e.pos).concat(this.bodyPointsR.map(e=> e.pos).reverse()).concat(this.bodyHeadPoints.map(e=> e.pos).reverse()),
                indices: ind,
                color: rgb(102, 44, 10),
                outline: {color: BLACK, width: 10, join: 'round'}
            })
        })
    }
}