import { GameObj, PosComp, Vec2 } from "kaboom";
import {
  DOWN,
  LEFT,
  RED,
  RIGHT,
  UP,
  add,
  anchor,
  area,
  color,
  drawSprite,
  height,
  loadSprite,
  onKeyDown,
  outline,
  pos,
  rad2deg,
  rotate,
  scale,
  sprite,
  time,
  uvquad,
  vec2,
  width,
} from "../../game.js";
import Spine from "./components/spine.js";
import {
  PLAYER_SPEED,
  PLAYER_SPINE_LENGTH,
  POINT_SIZE,
  START_HEALTH,
} from "../../constants/player_constants.js";
import Body from "./components/body.js";
import { DEBUG } from "../../constants/game_constants.js";
import { HealthBar } from "../../screen/components/HealthBar.js";
import { Bark } from "./components/items/Bark.js";
import { ExperienceBar } from "../../screen/components/ExperienceBar.js";

export class Player {
  #player_pos: GameObj<PosComp> = add([pos(vec2(100))]);
  #spine: Spine;
  #body: Body;
  #health: number = START_HEALTH;
  #healthBar: HealthBar;
  #experience: number = 0;
  #experienceBar: ExperienceBar;

  constructor(
    startpos: Vec2 = vec2(width(), height()).scale(0.5),
    spine_length: number = PLAYER_SPINE_LENGTH,
  ) {
    loadSprite("head", 'src/sprites/player_head.png');
    loadSprite("tail", 'src/sprites/tail.png');

    const head = add([
        pos(vec2(500, 500)),
        sprite("head"),
        rotate(90),
        anchor('left'),
        area(),
        "head",
        "PlayerDamagePoint"
    ]);
    
    const tail = add([
      pos(vec2(500, 500)),
      sprite("tail"),
      rotate(90),
      anchor('left'),
      area(),
      scale(0.5),
      "tail",
    ]);

    this.#player_pos.pos = startpos;
    this.#spine = new Spine(spine_length, startpos.sub(vec2(70)));
    this.#body = new Body(this.#spine.positions, this.#player_pos.pos);

    head.onDraw(() => {
      head.pos = this.#player_pos.pos;
      head.angle = this.#spine.getNodeAt(0).pos.angle(head.pos)+180;   
    });

    tail.onDraw(() => { 
      tail.pos = this.#spine.getNodeAt(this.#spine.length-1).pos ;
      tail.angle = this.#spine.getNodeAt(this.#spine.length-2).pos.angle(tail.pos)+180 + 10* Math.sin(time() *10);
    });

    this.#spine.update(head);
    this.#body.update(this.#spine);
    this.#body.draw();
    this.#body.updateHead(this.#spine.getNodeAt(0), this.#player_pos);
    this.#body.updateTail(this.#spine.getNodeAt(this.#spine.length - 1));

    this.setupMovement();

    const ba = new Bark(head);

    this.#healthBar = new HealthBar();
    this.#experienceBar = new ExperienceBar();
  }

  get headNode() {
    return this.#player_pos;
  }

  get pos() {
    return this.#player_pos.pos;
  }

  setupMovement() {
    // temp testing only movement
    onKeyDown("a", () => {
      this.#player_pos.move(LEFT.scale(PLAYER_SPEED));
    });
    onKeyDown("w", () => {
      this.#player_pos.move(UP.scale(PLAYER_SPEED));
    });
    onKeyDown("s", () => {
      this.#player_pos.move(DOWN.scale(PLAYER_SPEED));
    });
    onKeyDown("d", () => {
      this.#player_pos.move(RIGHT.scale(PLAYER_SPEED));
    });
  }

  damage(amount: number) {
    this.#health -= amount;
    this.#healthBar.update(this.#health);
  }

  addExperience(amount: number) { 
    this.#experience += amount;
    this.#experienceBar.update(this.#experience);
  }
}
