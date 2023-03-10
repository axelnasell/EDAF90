'use strict';
/**
 * Reflection question 1
 * Eftersom att 0 alltid är lika med false i js så kommer ett attribut i inventory med värde 0 att vara false och därför behöver
 * vi inte specifikt uttrycka att t.ex lactose är false
 */

const imported = require("./inventory.js");
const { v4: uuidv4 } = require('uuid');


console.log('inventory: ' + imported.inventory['Sallad']);

console.log('Object.keys():')
let names = Object.keys(imported.inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n\nfor ... in:')
for (const name in imported.inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * En for loop kommer inte gå igenom non-enumerable object, sort() är en inherited funktion och är därför non-enumerable och däför
 * kommer det inte gås igenom i en for-loop
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  return Object.keys(inv).filter((key) => inv[key][prop])
  .map((key) => `<option value= "${key}"> ${key}, ${inv[key].price}kr</option>`)
  .reduce((res, curr) => `${res}\n${curr}`, '');
}

console.log(makeOptions(imported.inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
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


Salad.prototype.getPrice = function getPrice() {
  return Object.values(this.Ingredients).reduce((total, current) => total + current['price'], 0);
}

class GourmetSalad extends Salad {

  constructor(salad) {
    super(salad);
  }

  add(name, properties, size) { //make copy of properties and modify to add size property, 
    const propertiesWithSize = {...properties}
    if(this.Ingredients[name]) {
      propertiesWithSize['size'] = this.Ingredients[name].size + (size || 1)
    } else {
      propertiesWithSize['size'] = size || 1
    }
    return super.add(name, propertiesWithSize);
  }

  getPrice() {
    return Object.values(this.Ingredients).reduce((total, current) => total + (current['price']) * (current['size']), 0);
  }
}

let myCaesarSalad = new Salad()
  .add('Sallad', imported.inventory['Sallad'])
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'])
  .add('Bacon', imported.inventory['Bacon'])
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'])
  .add('Ceasardressing', imported.inventory['Ceasardressing'])
  .add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
 myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
//En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
//En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
//En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

// Klasser är representerad som funktioner och inherited properties är representerad av prototype
// Alla objekt har en prototype, man kan skapa en kedja av prototypes genom att skriva Object.prototype.prototype etc. 
// Sista prototype av kedjan är null

console.log('\n--- Assignment 4 ---------------------------------------')

const objectCopy = new Salad(myCaesarSalad);
const json = JSON.stringify(myCaesarSalad);
const jsonCopy = new Salad(json);
console.log('myCesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('copy from object\n' + JSON.stringify(objectCopy));
console.log('copy from json\n' + JSON.stringify(jsonCopy));
//myCaesarSalad.add('Gurka', imported.inventory['Gurka']);
objectCopy.add('Gurka', imported.inventory['Gurka']);
jsonCopy.add('Gurka', imported.inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('med gurka kostar den ' + objectCopy.getPrice() + ' kr');
console.log('json copy kostar ' + jsonCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

let myGourmetSalad = new GourmetSalad()
  .add('Sallad', imported.inventory['Sallad'], 0.5)
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
  .add('Bacon', imported.inventory['Bacon'], 0.5)
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'], 2)
  .add('Ceasardressing', imported.inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);
console.log('Min ceasarsallad har uuid: ' + myCaesarSalad.uuid)

/**
 * Reflection question 4
 * Static properties are stored in the constructors function's prototype object
 */
/**
 * Reflection question 5
 * Ja, Object.defineProperty;
 */
/**
 * Reflection question 6
 * Yes, but not the constructor - use for example #privateField
 */

