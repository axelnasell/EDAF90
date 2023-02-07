import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder'


function App()
{
  const [shoppingCart, setShoppingCart] = useState([]);
  const handleSubmit = (salad) => {
  setShoppingCart([...shoppingCart, salad]);
  };


  // let extras = Object.keys(inventory).filter(name => inventory[name].extra);

  return (
    <div className="bg">
    <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
    <div className="container col-12">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Bygg din sallad</h2>
          <ComposeSalad inventory={inventory} onSubmit={handleSubmit} />
          <ViewOrder components={shoppingCart}/>
        </div>
      </div>
    </div>

    {/* <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
          {extras.map(name => <div key={name} className="col-4">{name}</div>)}
      </div>
    </div> */}

    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  </div>
  );
  }

export default App;
