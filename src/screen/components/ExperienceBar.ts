import { color, vec2 } from "../../game.js";
import { SimpleBar } from "./simpleBar.js";

export class ExperienceBar extends SimpleBar {
    constructor() {
        super(vec2(10, 80), 400, "experienceBar", '../src/sprites/XP.png', 20, color(25,25,172));
        this.update(0);
    }
}