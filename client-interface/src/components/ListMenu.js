import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";
import { useContext } from "react";
import GlobalContext from '../providers/GlobalContext';

//import './styling.css';

const ListMenu = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [Starters_N, set_Starters_N] = useState([]);
  const [Starters_V, set_Starters_V] = useState([]);
  const [Main_Course_N, set_Main_Course_N] = useState([]);
  const [Main_Course_V, set_Main_Course_V] = useState([]);
  const [Desserts_N, set_Desserts_N] = useState([]);
  const [Desserts_V, set_Desserts_V] = useState([]);
  const [Beverages_N, set_Beverages_N] = useState([]);
  const [Beverages_V, set_Beverages_V] = useState([]);
  const getMenu = async () => {
    try {
      const response = await fetch("http://localhost:5000/view_menu");
      const jsonData = await response.json();
      set_Starters_N(jsonData.filter(menu => (menu.category === "Starters" && menu.non_veg==="Yes"))); 
      set_Starters_V(jsonData.filter(menu => (menu.category === "Starters" && menu.non_veg==="No")));
      set_Main_Course_N(jsonData.filter(menu => (menu.category === "Main Course" && menu.non_veg==="Yes")));
      set_Main_Course_V(jsonData.filter(menu => (menu.category === "Main Course" && menu.non_veg==="No")));
      set_Desserts_N(jsonData.filter(menu => (menu.category === "Desserts" && menu.non_veg==="Yes")));
      set_Desserts_V(jsonData.filter(menu => (menu.category === "Desserts" && menu.non_veg==="No")));
      set_Beverages_N(jsonData.filter(menu => (menu.category === "Beverages" && menu.non_veg==="Yes")));
      set_Beverages_V(jsonData.filter(menu => (menu.category === "Beverages" && menu.non_veg==="No")));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    let usrnme=user.Username; //need to change
    let dishid=parseInt(e.target.value);
    let quantity=1; 
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usrnme, dishid, quantity })
    };

    try{
    const response = await fetch("http://localhost:5000/insert_cart/", requestOptions);
    console.log(response);
    } catch(err){
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <Fragment >
      <div className="demo">
        <br />
        <div className="container text-center">
          <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Menu</h2>
          <div className="row justify-content-center">
            <div className="col-sm-10">
            <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Starters(Non_Veg)</h2>
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Dish ID</th>
                      <th>Dish</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Starters_N.map(data => (
                      <tr key={data.dishid}>
                        <td>{data.dishid}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>
                          <Button onClick={handleSubmit} value={data.dishid}> Add </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Starters(Veg)</h2>
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Dish ID</th>
                      <th>Dish</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Starters_V.map(data => (
                      <tr key={data.dishid}>
                        <td>{data.dishid}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>
                          <Button onClick={handleSubmit} value={data.dishid}> Add </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Main Course(Non-Veg)</h2>
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Dish ID</th>
                      <th>Dish</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Main_Course_N.map(data => (
                      <tr key={data.dishid}>
                        <td>{data.dishid}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>
                          <Button onClick={handleSubmit} value={data.dishid}> Add </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Main Course(Veg)</h2>
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Dish ID</th>
                      <th>Dish</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Main_Course_V.map(data => (
                      <tr key={data.dishid}>
                        <td>{data.dishid}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>
                          <Button onClick={handleSubmit} value={data.dishid}> Add </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Desserts(Non-Veg)</h2>
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Dish ID</th>
                      <th>Dish</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Desserts_N.map(data => (
                      <tr key={data.dishid}>
                        <td>{data.dishid}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>
                          <Button onClick={handleSubmit} value={data.dishid}> Add </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Desserts(Veg)</h2>
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Dish ID</th>
                      <th>Dish</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Desserts_V.map(data => (
                      <tr key={data.dishid}>
                        <td>{data.dishid}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>
                          <Button onClick={handleSubmit} value={data.dishid}> Add </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Beverages(Non-Veg)</h2>
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Dish ID</th>
                      <th>Dish</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Beverages_N.map(data => (
                      <tr key={data.dishid}>
                        <td>{data.dishid}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>
                          <Button onClick={handleSubmit} value={data.dishid}> Add </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Beverages(Veg)</h2>
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Dish ID</th>
                      <th>Dish</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Beverages_V.map(data => (
                      <tr key={data.dishid}>
                        <td>{data.dishid}</td>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>
                          <Button onClick={handleSubmit} value={data.dishid}> Add </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <Link to="/cart"> <button type="button"> GO to Cart </button> </Link> */}
        </div>
        <br />
      </div>
    </Fragment>
  );

};

export default ListMenu;