import {useState } from 'react';
import Salad from "./Salad";

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

  const changeExtra= (event) => {
    setExtra({...extra, [event.target.name]: event.target.checked});
  }

  return (
    <div className="container col-12">
    
      <form onSubmit={handleSubmit}>
      <h3>Välj Bas</h3>
      <SelectOption value = {foundation} components={foundations} onChange={(e) => setFoundation(e.target.value)}/>

      <h3>Välj Protein</h3>
      <SelectOption value = {protein} components={proteins} onChange={(e) => setProtein(e.target.value)}/>

      <h3>Välj Dressing</h3>
      <SelectOption value = {dressing} components={dressings} onChange={(e) => setDressing(e.target.value)}/>

      <h3>Extra</h3>
      <div className="row h-200 p-5 bg-light border rounded-3">
        {extras.map((component) => (
        <div key = {component} className = "col-5 p-2">
        <input
          type = "checkbox"
          onChange = {changeExtra}
          id={component}
          name={component}
          checked = {extras[component]}
        />
        <label htmlFor={component}>
          {component}
        </label>
      </div>
      ))}
    </div>

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
    className="form-select"
    value={props.value}
    onChange = {props.onChange}
  > 
  {props.components.map((component) => (
      <option key={component}>{component}</option>
  ))}
  </select>
);

export default ComposeSalad;