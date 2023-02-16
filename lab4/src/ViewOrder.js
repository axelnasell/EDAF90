import { useEffect, useState } from 'react';

function ViewOrder(props) {

    const[responseOk, setResponseOk] = useState(false)
    if(responseOk) {
      return (<h2>Tack för din beställning</h2>)
    }
    if (!props.components || props.components.length === 0) {
      return "";
    }
    const totPrice = props.components.reduce((sum, item) => sum + item.getPrice(), 0);

    function postOrder() {
      const order = props.components?.map((item) =>  (Object.keys(item.Ingredients)))
      props.clearCart()
      try {
      fetch('http://localhost:8080/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
    .then(async response => {
      const rep = await response.json()
      if (response.ok) {
        setResponseOk(true);
      }
    })
  } 
  catch {}
    } 
  
    return (
      <>
        <h2>Beställning</h2>
        <div className="card">

          <ul className="list-group list-group-flush">
            {props.components?.map((item) => (
              <li
                className="list-group-item d-flex justify-content-between p-3"
                key={item.uuid}
              >
                {Object.keys(item.Ingredients).join(", ")}
                <span className="fw-bold text-nowrap">
                  {item.getPrice()} kr 
                </span>
              </li>
            ))}
          </ul>
          <h3 className="m-3">Total Price: {totPrice} kr</h3>
          <button onClick={postOrder}>Click me</button>
        </div>
      </>
    );
  }
  
  export default ViewOrder;
  