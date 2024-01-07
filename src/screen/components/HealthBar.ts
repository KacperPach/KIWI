import { START_HEALTH } from "../../constants/player_constants.js";
import { vec2 } from "../../game.js";
import { SimpleBar } from "./simpleBar.js";

export class HealthBar extends SimpleBar{
    constructor() {
        super(vec2(10,10), 400, "healthBar", '../src/sprites/HP.png', START_HEALTH);
    }
}