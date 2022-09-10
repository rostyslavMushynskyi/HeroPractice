// Hero, Warrior, Mage
// attack, buyPotion, heal, move, cast spell

class Hero {
  static count = 0;

  #hp = 0;
  position = {
    x: 0,
    y: 0,
  };

  constructor(name, xp, hp, baseLvl) {
    Hero.count++;

    this.name = name;
    this.xp = xp;
    this.#hp = hp;
    this.lvl = baseLvl;
  }

  get hp() {
    return this.#hp;
  }

  set hp(value) {
    if (value > 20 || value <= 0) {
      console.log("HP не може бути більше 20");
    } else {
      this.#hp = value;
    }
  }

  takeDamage(weapon, from) {
    this.#hp -= weapon.damage;
    console.log(
      `${from.name} атакує ${this.name} за допомогою ${weapon.name} і наносить ${weapon.damage} шкоди`
    );
    console.log(`У ${this.name} залишилось ${this.#hp} HP`);
  }

  gainXP(amount) {
    this.xp += amount;
    console.log(`${this.name} отримав ${amount} досвіду`);

    if (this.xp >= 1000) {
      this.increaseLvl();
    }
  }

  increaseLvl() {
    this.xp = 0;
    this.lvl++;
    console.log(`${this.name} отримав ${this.lvl} рівень`);
  }

  move(moveX, moveY) {
    this.position.x += moveX;
    this.position.y += moveY;
    console.log(
      `${this.name} пішов до X:${this.position.x} Y:${this.position.y}`
    );
  }
}

class Warrior extends Hero {
  constructor(name, xp, hp, baseLvl, weapon) {
    super(name, xp, hp, baseLvl);

    if (weapon instanceof Weapon) {
      this.weapon = weapon;
    } else {
      console.error("Такий тип не підтримується");
    }
  }

  attack(hero) {
    hero.takeDamage(this.weapon, this);
  }
}

class Mage extends Hero {
  constructor(name, xp, hp, baseLvl, spell) {
    super(name, xp, hp, baseLvl);

    if (spell instanceof Spell) {
      this.spell = spell;
    } else {
      console.error("Такий тип не підтримується");
    }
  }

  castSpell(hero) {
    hero.takeDamage(this.spell, this);
  }
}

class DamageDealer {
  constructor(name, damage) {
    this.name = name;
    this.damage = damage;
  }
}

class Weapon extends DamageDealer {
  static allowedTypes = ["sword", "spear", "bow"];

  constructor(name, damage, type) {
    super(name, damage);

    if (Weapon.allowedTypes.includes(type)) {
      this.type = type;
    } else {
      console.error(`Тип ${type} не існує`);
    }
  }
}

class Spell extends DamageDealer {
  static allowedElements = ["water", "fire", "wind", "earth"];

  constructor(name, damage, element) {
    super(name, damage);

    if (Spell.allowedElements.includes(element)) {
      this.element = element;
    } else {
      console.error(`Елемент ${element} не існує`);
    }
  }
}

const katana = new Weapon("Katana", 12, "sword");
const fireball = new Spell("Fireball", 16, "fire");

const vsevolod = new Warrior("Vsevolod", 500, 20, 0, katana);
vsevolod.gainXP(500);
vsevolod.move(-5, 5);

const vlad = new Mage("Vlad", 700, 15, 2, fireball);

vsevolod.attack(vlad);
vlad.castSpell(vsevolod);

vsevolod.hp = 19;
console.log(vsevolod.hp);

console.log(Hero.count);
