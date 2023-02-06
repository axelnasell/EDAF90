import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder'


function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const handleSubmit = (salad) => {
  console.log(salad)
    setShoppingCart([...shoppingCart, salad]);
  console.log(shoppingCart)
  };  

  return (
    <div className="container py-5">
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

    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  </div>
  );
  }

export default App;
