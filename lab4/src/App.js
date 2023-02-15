import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder'
import ViewIngredient from './ViewIngredient'
import {Routes, Route, NavLink} from 'react-router-dom'; 
//import { useEffect } from 'react';


function App()
{
  const[allFetched, setAllFetched] = useState(false)
  const[inventory, setInventory] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const handleSubmit = (salad) => {
  setShoppingCart([...shoppingCart, salad]);
  };
  if(!allFetched) {
    Promise.all([
      fetchAllIngredients('extras'),
      fetchAllIngredients('foundations'),
      fetchAllIngredients('proteins'),
      fetchAllIngredients('dressings')
    ])
    .then(setAllFetched(true))
  }
  // useEffect(() => {
  // })

  async function fetchIngredient(type, ingredient) {
    return await safeFetchJson('http://localhost:8080/' + type + '/' + ingredient)
      .then(data => {
        setInventory((oldInventory) => ({...oldInventory, [ingredient]:data}))
      })
        
  }

  async function fetchAllIngredients(ingredient) {  
    return await safeFetchJson('http://localhost:8080/' + ingredient)
      .then(data => {
        data.map(component => {
          return fetchIngredient(ingredient, component)
        })
      })
  }

  // async function fetchAllProperties(ingredients) {
  //   return await fetchAllIngredients(ingredients).prototype.map(component => {
  //       return fetchIngredient(ingredients, component);
  //   })
  // }

  async function safeFetchJson(url) {
    return fetch(url)
      .then(response => {
      if(!response.ok) {
        console.log('Error with fetch')
        throw new Error({url} + 'returned status' + response.status);
      }
      return response.json();
      });
    }
    

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
    
  function PageContent(props) { 
    return (
    <div className="container col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <Routes>
        <Route path='*' element={<h2>404 page not found</h2>}></Route>
        <Route path='/' element={<h2>Hej och välkommen till vår fantastiska hemsida</h2>}></Route>
        <Route path='Compose-Salad' element={
        <ComposeSalad inventory={inventory} onSubmit={handleSubmit} />
        }></Route>
        <Route path='View-Order' element={<ViewOrder components={shoppingCart}/>}></Route>
        <Route path='Compose-Salad/View-Ingredient/:component' element={<ViewIngredient inventory={inventory}/>}></Route>
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
