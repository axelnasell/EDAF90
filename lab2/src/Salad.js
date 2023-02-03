const { v4: uuidv4 } = require("uuid");


class Salad {
  static instanceCounter = 0;
  constructor(salad) {

    this.uuid = uuidv4();
    this.Ingredients = {};
    if(typeof salad === 'string') {    //om typen är string vet vi att det är ett JSON object
      const json = JSON.parse(salad);
      this.Ingredients = json.Ingredients;
      this.uuid = json.uuid;
    } else if(salad instanceof Salad) {  
      Object.assign(this.Ingredients, salad.Ingredients) 
    }
    this.id = 'salad_' + Salad.instanceCounter++;
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
}

<<<<<<< HEAD

Salad.prototype.getPrice = function getPrice() {
  return Object.values(this.Ingredients).reduce((total, current) => total + current['price'], 0);
}

export default Salad;
=======
export default Salad
>>>>>>> 093d215d8e2bc069ac2425b34007c76c28377768
