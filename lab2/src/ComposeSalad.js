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

  function handleSubmit (event) {
    event.preventDefault();
    const salad = new Salad();
    salad.add(foundation, props.inventory[foundation]);
    salad.add(protein, props.inventory[protein]);
    Object.keys(extra).map((v) => salad.add(v, props.inventory[v]));
    salad.add(dressing, props.inventory[dressing]);
    props.onSubmit(salad);
    console.log(foundation)
  }

  return (
    <div className="container col-12">
    
      <form onSubmit={handleSubmit}>

      <SelectOption value = {foundation} components={foundations} onChange={(e) => setFoundation(e.target.value)}/>

      <SelectOption value = {protein} components={proteins} onChange={(e) => setProtein(e.target.value)}/>

      <SelectOption value = {extra} components={extras} onChange={(e) => setExtra(e.target.value)}/>

      <SelectOption value = {dressing} components={dressings} onChange={(e) => setDressing(e.target.value)}/>

      <input
        type="submit"
        value="submit"
      />
      </form>
    </div>
  );
};

 


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