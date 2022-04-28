import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";

//import './styling.css';

const Dish = () => {
  const [dishid, setDishID] = useState(0);
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
      console.log(Starters_N);
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

  const handleSubmit = async (props) => {
    let usrnme='whubbocks0';
    let dishid=this.props.value;
    let quantity=1;
    try{
    const response = await fetch(`http://localhost:5000/insert_cart/${usrnme}/${dishid}/${quantity}`);
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
            <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Starters(Non-Veg)</h2>
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <div onClick={() => this.handleSubmit('value')}>
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
                          <Button> Add </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            {/* <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Starters(Veg)</h2>
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {Starters_V !== null ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={Starters_V} />
                : ''}
                </div>
              </div>
            <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Main Course(Non-Veg)</h2>
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {Main_Course_N !== null ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={Main_Course_N} />
                : ''}
                </div>
              </div>
            <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Main Course(Veg)</h2>
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {Main_Course_V !== null ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={Main_Course_V} />
                : ''}
                </div>
              </div>
            <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Desserts(Non-Veg)</h2>
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {Desserts_N !== null ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={Desserts_N} />
                : ''}
                </div>
              </div>
            <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Desserts(Veg)</h2>
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {Desserts_V !== null ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={Desserts_V} />
                : ''}
                </div>
              </div>
            <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Beverages(Non-Veg)</h2>
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {Beverages_N !== null ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={Beverages_N} />
                : ''}
                </div>
              </div>
            <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Beverages(Veg)</h2>
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {Beverages_V !== null ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={Beverages_V} />
                : ''}
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <br />
      </div>
    </Fragment>
  );

};

export default ListMenu;