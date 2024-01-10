import { START_HEALTH } from "../../constants/player_constants.js";
import { color, vec2 } from "../../game.js";
import { SimpleBar } from "./components/simpleBar.js";

export class HealthBar extends SimpleBar{
    constructor() {
        super(vec2(10,10), 400, "healthBar", 'src/sprites/HP.png', START_HEALTH, color(192,17,17));
    }

}
