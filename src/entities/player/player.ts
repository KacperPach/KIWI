import { GameObj, PosComp, RotateComp} from "kaboom";
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
  deg2rad,
  drawSprite,
  height,
  loadSprite,
  mousePos,
  onKeyDown,
  onMouseDown,
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
import { UpgradeMenu } from "../../screen/upgradeMenu/components/UpgradeMenu.js";
import { Bomb } from "./components/items/Bomb.js";
import { TailAttack } from "./components/items/TailAttak.js";

export class Player {
  #player_pos: GameObj<PosComp> = add([pos(vec2(100))]);
  #head: GameObj<PosComp | RotateComp>;
  #tail: GameObj<PosComp | RotateComp>;
  #spine: Spine;
  #body: Body;
  #health: number = START_HEALTH;
  #healthBar: HealthBar;
  #experience: number = 0;
  #experienceBar: ExperienceBar;
  #level: number = 1;

  constructor(
    startpos = vec2(width(), height()).scale(0.5),
    spine_length: number = PLAYER_SPINE_LENGTH,
  ) {
    loadSprite("head", 'src/sprites/player_head.png');
    loadSprite("tail", 'src/sprites/tail.png');

    this.#head = add([
        pos(vec2(500, 500)),
        sprite("head"),
        rotate(90),
        anchor('left'),
        area(),
        "head",
        "PlayerDamagePoint"
    ]);
    
    this.#tail = add([
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

    this.#head.onDraw(() => {
      this.#head.pos = this.#player_pos.pos;
      this.#head.angle = this.#spine.getNodeAt(0).pos.angle(this.#head.pos)+180;   
    });

    this.#tail.onDraw(() => { 
      this.#tail.pos = this.#spine.getNodeAt(this.#spine.length-1).pos ;
      this.#tail.angle = this.#spine.getNodeAt(this.#spine.length-2).pos.angle(this.#tail.pos)+180 + 10* Math.sin(time() *10);
    });

    this.#spine.update(this.#head);
    this.#body.update(this.#spine);
    this.#body.draw();
    this.#body.updateHead(this.#spine.getNodeAt(0), this.#player_pos);
    this.#body.updateTail(this.#spine.getNodeAt(this.#spine.length - 1));

    this.setupMovement();

    this.#healthBar = new HealthBar();
    this.#experienceBar = new ExperienceBar();
  }

  get headPos() {
    return this.#player_pos;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  get pos() {
    return this.#player_pos.pos;
  }

  setupMovement() {
    onMouseDown(() => {
      this.#player_pos.moveTo(mousePos(), 100);
    });
  }

  damage(amount: number) {
    this.#health -= amount;
    this.#healthBar.update(this.#health);
  }

  addExperience(amount: number) {
    if (this.#experience + amount > this.#level*10) {
      this.levelUp();
    } else {
      this.#experience += amount;
      this.#experienceBar.update(this.#experience);
    }
  }

  get level() {
    return this.#level;
  }

  levelUp() { 
    this.#level++;
    new UpgradeMenu(this);
    this.#experience = 0;
    this.#experienceBar.update(this.#experience);
    this.#experienceBar.updateMaxPoints(this.#level*10);
    this.#health = START_HEALTH;
    this.#healthBar.update(this.#health);
  }
}
