import { Component, useState } from 'react';
import Salad from "./Salad.js"

function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);

  const [foundation, setFoundation] = useState('Pasta'); 
  const [extra, setExtra] = useState({Bacon: true, Fetaost: true}); 
  const [protein, setProtein] = useState("Kycklingfilé"); 
  const [dressing, setDressing] = useState("Pesto"); 


  return (
    <div className="container col-12">
    
      <form onSubmit={this.handleSubmit}>

      {/* <SelectOption value = {foundation} components={foundations} onChange={foundationChange()}/> */}

      {/* <SelectOption value = {protein} components={proteins} onChange={proteinChange()}/> */}

      {/* <SelectOption value = {extra} components={extras} onChange={extrasChange()}/> */}

      {/* <SelectOption value = {dressing} components={dressings} onChange={dressingChange()}/> */}

      </form>

    </div>
  );
}

//  handleSubmit (event) {
//   const salad = new Salad();
//   salad.add(foundation);
//   salad.add(protein);
//   extra.map((v) => salad.add(v));
//   salad.add(dressing);
// }

// foundationChange () {

// }

// proteinChange() {

// }

// extrasChange() {

// }

// dressingChange() {

// }

const SelectOption = (props) => (
  <select
    value={props.value}
    onChange = {props.onChange}
    className = ""
  > 
  {props.components.map((component) => (
      <option key={component}>{component}</option>
  ))}
  </select>
);

export default ComposeSalad;