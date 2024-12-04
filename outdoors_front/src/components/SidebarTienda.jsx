import {

    Form,
  } from "react-bootstrap";
  
  const SidebarTienda = () => {
    return (
      <div className="bg-white text-dark vh-100 m-3">
      
  
        <ul>
          <h2> Filtros</h2>
          <li style={{marginTop: "2rem"}}>
            <ul>
              <h4> Categorías</h4>
              <li>
                <Form.Check type="checkbox" id="carpas" label="Carpas" />{" "}
              </li>
              <li>
                <Form.Check type="checkbox" id="mochilas" label="Mochilas" />{" "}
              </li>
              <li>
                <Form.Check
                  type="checkbox"
                  id="sacos"
                  label="Sacos & Colchonetas"
                />
              </li>
              <li>
                <Form.Check type="checkbox" id="accesorios" label="Accesorios" />
              </li>
            </ul>
          </li>
  
          <li style={{marginTop: "2rem"}}>
            <ul>
              <h4>Marcas</h4>
              <li>
                <Form.Check type="checkbox" id="carpas" label="Doite" />
              </li>
              <li>
                <Form.Check type="checkbox" id="mochilas" label="Kano" />
              </li>
              <li>
                <Form.Check type="checkbox" id="sacos" label="Lippi" />
              </li>
              <li>
                <Form.Check type="checkbox" id="accesorios" label="Thermarest" />
              </li>
            </ul>
          </li>
  
          <li style={{marginTop: "2rem"}}>
          <ul>
          <h4>Descuentos</h4>
          <li>
            <Form.Check type="checkbox" id="carpas" label="20% dcto y más" />
          </li>
          <li>
            <Form.Check type="checkbox" id="mochilas" label="30% dcto y más" />
          </li>
          <li>
            <Form.Check type="checkbox" id="sacos" label="40% dcto y más" />
          </li>
          <li>
            <Form.Check type="checkbox" id="accesorios" label="50% dcto y más" />
          </li>
        </ul>
          </li>
  
          <li style={{marginTop: "2rem", fontSize: "13px"}}>
          <ul>
          <h4>Precio</h4>
          <li>
            <Form.Check type="checkbox" id="carpas" label="$10.000 - $50.000" />
          </li>
          <li>
            <Form.Check type="checkbox" id="mochilas" label="$60.000 - $120.000" />
          </li>
          <li>
            <Form.Check type="checkbox" id="sacos" label="$130.000 - $220.000" />
          </li>
          <li>
            <Form.Check type="checkbox" id="accesorios" label="$230.000 - $320.000" />
          </li>
        </ul>
          </li>
        </ul>
  
  
  
      </div>
    );
  };
  
  export default SidebarTienda;
  