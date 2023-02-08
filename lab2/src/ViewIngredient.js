import { useParams } from "react-router-dom";
import inventory from "./inventory.ES6";

function ViewIngredient(props) {
    const {component} = useParams()

    return (
        <div className="card">
            <h2>{component}</h2> 
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between p-3">
                Price: {Object.values(inventory[component])}kr
            </li>
            {Object.keys(inventory[component]).map((prop) => (
            <>
                {(prop !== "price" && prop !== "extra") && (
                <li
                className="list-group-item d-flex justify-content-between p-3">
                {prop}
              </li>)}
              </>
            ))}
          </ul>
        </div>
    );
}
export default ViewIngredient;