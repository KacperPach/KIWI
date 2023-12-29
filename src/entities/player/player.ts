import { GameObj, PosComp, Vec2 } from "kaboom";
import {
  DOWN,
  LEFT,
  RED,
  RIGHT,
  UP,
  add,
  color,
  onKeyDown,
  outline,
  pos,
  uvquad,
  vec2,
} from "../../game.js";
import Spine from "./components/spine.js";
import {
  PLAYER_SPEED,
  PLAYER_SPINE_LENGTH,
  POINT_SIZE,
} from "../../constants/player_constants.js";
import Body from "./components/body.js";
import { DEBUG } from "../../constants/game_constants.js";

export class Player {
  #player_pos: GameObj<PosComp> = add([pos(vec2(100))]);
  #spine: Spine;
  #body: Body;

  constructor(
    startpos: Vec2 = vec2(100),
    spine_length: number = PLAYER_SPINE_LENGTH
  ) {
    this.#player_pos.pos = startpos;
    this.#spine = new Spine(spine_length);
    this.#body = new Body(this.#spine.positions, this.#player_pos.pos);

    const cir1 = add([
      pos(vec2(500, 500)),
      DEBUG ? uvquad(POINT_SIZE * 2, POINT_SIZE * 2) : "",
      DEBUG ? color(RED) : "",
      outline(1000, RED),
      "head",
      outline(10),
    ]);

    cir1.onDraw(() => {
      cir1.pos = this.#player_pos.pos;
    });

    this.#spine.update(cir1);
    this.#body.update(this.#spine);
    this.#body.draw();
    this.#body.updateHead(this.#spine.getNodeAt(0), this.#player_pos);
    this.#body.updateTail(this.#spine.getNodeAt(this.#spine.length - 1));

    this.setupMovement();
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
}
