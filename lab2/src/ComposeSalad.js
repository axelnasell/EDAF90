import { useState } from 'react';



function ComposeSalad(props) {
  let extras = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const [foundation, setFoundation] = useState('Pasta'); 
  const [extra, setExtra] = useState({Bacon: true, Fetaost: true}); 
  let inventory = props.inventory;

  return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <form>
        <h2>Välj bas</h2>
        <select 
        value = {foundation}
        onChange = {((e) => setFoundation(e.target.value))}
        />
          <option value="" disabled hidden>Välj en bas</option>
          <Component props = {props}/>
        </form>
      </div>
    </div>
  );

}
export default ComposeSalad;

function Component(props) {
  {Object.keys(props.inventory).filter((key) => props.inventory[key]['foundation'])
  .map((key) => (<option value={key}> {key}, {props.inventory[key].price}kr</option>))}
}