import {useState } from 'react';
import Salad from "./Salad";
import { useNavigate, NavLink } from "react-router-dom";

function ComposeSalad(props) {
  let foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  let proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  let dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);

  const [foundation, setFoundation] = useState(); 
  const [extra, setExtra] = useState({}); 
  const [protein, setProtein] = useState(); 
  const [dressing, setDressing] = useState(); 
  const navigate = useNavigate()

  function handleSubmit (event) {
    event.preventDefault();
    event.target.classList.add("was-validated");
    if(event.target.checkValidity()) { 
      const salad = new Salad();
      salad.add(foundation, props.inventory[foundation]);
      salad.add(protein, props.inventory[protein]);
      Object.keys(extra).map((v) => 
      <>
      {(extra[v]) && salad.add(v, props.inventory[v])}
      </>
      );  
      
      salad.add(dressing, props.inventory[dressing]);
      props.onSubmit(salad);
  
      setFoundation(foundations[0]);
      setDressing(dressings[0]);
      setProtein(proteins[0]);
      setExtra({});
  
      navigate("/View-Order")
    } else {
      console.log("invalild") 
    }
  }

  const changeExtra= (event) => {
    setExtra({...extra, [event.target.name]: event.target.checked});
    event.target.parentElement.classList.add("was-validated");
  }

  return (
    <div className="container col-12">
    
    <h2>Bygg din sallad</h2> 

      <form onSubmit={handleSubmit} noValidate>
      <h3>Välj Bas</h3>
      <SelectOption value = {foundation} components={foundations} onChange={(e) => hasChanged(e, setFoundation)
        }/>

      <h3>Välj Protein</h3>
      <SelectOption value = {protein} components={proteins} onChange={(e) => hasChanged(e, setProtein)
        }/>

      <h3>Välj Dressing</h3>
      <SelectOption value = {dressing} components={dressings} onChange={(e) => hasChanged(e, setDressing)
        }/>

      <h3>Extra</h3>
      <div className="row h-200 p-5 bg-light border rounded-3">
        {extras.map((component) => (
        <div key = {component} className = "col-5 p-2">
        <input
          type = "checkbox"
          onChange = {changeExtra}
          id={component}
          name={component}
          checked = {extra[component] || false}
        />
        <label htmlFor={component}>
          {component}
        </label>
        <NavLink className="nav-link" to={"View-Ingredient/" + component}>
          info
        </NavLink>
        </div>
        ))}
      </div>
      <div>
      <input
        type="submit"
        value="submit"
      />
      <div className='invalid-feedback'>
          Du har gjort fel glytt
      </div>
      </div>
      </form>
    </div>
  );
};

const SelectOption = (props) => (
  <div>
  <select
    className="form-select"
    value= {props.value || ''}
    onChange = {props.onChange}
    required
  >
  <option value=''>Välj en komponent</option>
  {props.components.map((component) => (
      <option key={component}>{component}</option>
  ))}
  </select>
    <div className='invalid-feedback'>
      Kan inte lämnas tom
    </div>
  </div>
);

function hasChanged (e, f) {
    f(e.target.value);
    e.target.parentElement.classList.add("was-validated");
}

export default ComposeSalad;