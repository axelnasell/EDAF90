function postOrder() {
    fetch('http://localhost:8080/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify("order")
  })
  .then(response => {
    console.log(response)
  })
  .then(data => {
    console.log(data)
  })
} 

function ViewOrder(props) {

    const orders = {}
    if (!props.components || props.components.length === 0) {
      return "";
    }
    const totPrice = props.components.reduce((sum, item) => sum + item.getPrice(), 0);
  
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
                {orders = Object.keys(item.Ingredients).join(", ")}
              </li>
            ))}
          </ul>
          <h3 className="m-3">Total Price: {totPrice} kr</h3>
          <button onClick={postOrder()}>Click me</button>
        </div>
      </>
    );
  }
  
  export default ViewOrder;
  