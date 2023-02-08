import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder'
import { BrowserRouter ,Routes, Route, NavLink } from 'react-router-dom'; 


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
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item"></li>
        <li>
          <NavLink className="nav-link" to="/">
          Home
          </NavLink>
        </li>
        <NavLink className="nav-link" to="Compose-Salad">
        Komponera en sallad
        </NavLink>
        <li>
          <NavLink className="nav-link" to="View-Order">
            Din Beställning
          </NavLink>
        </li>
      </ul>
      </div>
    );}
    
  function PageContent(props) { return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <Routes>
        <Route path='/' element={<h2>Hej och välkommen till vår fantastiska hemsida</h2>}></Route>
        <Route path='Compose-Salad' element={
         <div>
          <h2>Bygg din sallad</h2> 
        <ComposeSalad inventory={inventory} onSubmit={handleSubmit} />
        </div>
        }></Route>
        <Route path='View-Order' element={<ViewOrder components={shoppingCart}/>}></Route>
        <Route path='*' element={<h2>404 page not found</h2>}></Route>
       </Routes>
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
