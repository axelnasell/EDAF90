const { v4: uuidv4 } = require("uuid");


class Salad {
  static instanceCounter = 0;
  constructor(arg) {
    this.uuid = uuidv4();
    this.id = "Salad_" + Salad.instanceCounter++;

    if (arg instanceof Salad) {
      //If arg is a salad obj
      this.Ingredients = arg.Ingredients;
      return this;
    } else if (typeof arg === "string") {
      this.uuid = JSON.parse(arg).uuid;
      this.Ingredients = JSON.parse(arg).Ingredients;
      return this;
    } else {
      this.Ingredients = arg?.Ingredients || {};
      return this;
    }
  }


  add(name, properties) {
    this.Ingredients[name] = properties;
    return this;
  }
  remove(name) {
    delete this.Ingredients[name];
    return this;
  }


  count(property) {
    return Object.values(this.Ingredients).filter((item) => item[property]).length
  }

  static parseArray(str) {
    const arr = JSON.parse(str) || [];
    return arr.map((obj) =>  new Salad(obj))
  }
}

Salad.prototype.getPrice = function getPrice() {
  return Object.values(this.Ingredients).reduce((total, current) => total + current['price'], 0);
}

export default Salad;
