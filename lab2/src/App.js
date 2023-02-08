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

  function Header() { return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
  )}
    
   function NavBar(props) { return (
    <ul className="nav nav-tabs">
      <li className="nav-item"></li>
      {/* <NavLink className="nav-link" to="/compose-salad">
      Komponera en sallad
      </NavLink> */}
    </ul>
    );}
    
  function PageContent(props) { return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Bygg din sallad</h2>
        <ComposeSalad inventory={inventory} onSubmit={handleSubmit} />
        <ViewOrder components={shoppingCart}/>
      </div>
    </div>
  )}

  function Footer(props) { return(
    <footer className="pt-3 mt-4 text-muted border-top">
     EDAF90 - webprogrammering
    </footer>
  )  }


  // let extras = Object.keys(inventory).filter(name => inventory[name].extra);

  return (
    <div className="bg">
      <div className="container py-4">
      <Header />
      <NavBar /> 
      <PageContent />
      <Footer />
      </div>
    </div>
  );
  }

export default App;
