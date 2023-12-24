
import { GameObj, PosComp } from 'kaboom';
import { add, pos, vec2, circle, color, GREEN, onUpdate } from "../../game.js"; // fix to .ts when u get smarter 🤓
import { POINT_SIZE, SPINE_SPACEING } from '../../constants/player_constants.js'
import { DEBUG } from '../../constants/game_constants.js'

// Spine logic 
export default class Spine{

    spine: Array<GameObj<PosComp>> = [];

    constructor(spineElements :number) {
        for (let i = 0; i < spineElements; i++) {
            this.spine.push(  
                add([
                pos(vec2(300-i*SPINE_SPACEING,600)),
                DEBUG?circle(POINT_SIZE):'',
                DEBUG?color(GREEN):'',
                "spineDot"
            ]))
        }
    }

    #followSpine ( toFollow:GameObj, following:GameObj ) {
        if (following.pos.dist(toFollow.pos)>SPINE_SPACEING)
          following.move(toFollow.pos.sub(following.pos).scale(2))
    }

    update ( spineHead: GameObj<PosComp> ) {
        onUpdate('spineDot', () => {
            this.#followSpine(spineHead, this.spine[0])
            for (let i = 1; i < this.spine.length; i++) {
                this.#followSpine( this.spine[i-1], this.spine[i]);
            }
        })
    }

    getNodeAt ( position: number ) {
        return this.spine[position]
    }

    getPosAt ( position: number ) {
        return this.getNodeAt(position).pos;
    }

    get length () {
        return this.spine.length
    }

    get positions () {
        return this.spine.map(elemet => elemet.pos)
    }
}
