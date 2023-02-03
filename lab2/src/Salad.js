class Salad {
  static instanceCounter = 0;
  constructor(salad) {

    this.Ingredients = {};
    if(typeof salad === 'string') {    //om typen är string vet vi att det är ett JSON object
      const json = JSON.parse(salad);
      this.Ingredients = json.Ingredients;
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

export default Salad