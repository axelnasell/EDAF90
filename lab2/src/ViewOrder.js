function ViewOrder(props) {
    if (!props.items || props.items.length === 0) {
      return "";
    }
    const totPrice = props.items.reduce((sum, item) => sum + item.getPrice(), 0);
  
    return (
      <>
        <h2>Din order</h2>
        <div className="card">
          <ul className="list-group list-group-flush">
            {props.items?.map((item) => (
              <li
                className="list-group-item d-flex justify-content-between p-3"
                key={item.uuid}
              >
                {Object.keys(item.ingredients).join(", ")}
                <span className="fw-bold text-nowrap">
                  {item.getPrice()} kr
                </span>
              </li>
            ))}
          </ul>
          <h3 className="m-3">Pris: {totPrice} kr</h3>
        </div>
      </>
    );
  }
  
  export default ViewOrder;
  