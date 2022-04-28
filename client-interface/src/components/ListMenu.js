import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';

//import './styling.css';

const ListMenu = () => {
  const [Starters_N, set_Starters_N] = useState(null);
  const [Starters_V, set_Starters_V] = useState(null);
  const [Main_Course_N, set_Main_Course_N] = useState(null);
  const [Main_Course_V, set_Main_Course_V] = useState(null);
  const [Desserts_N, set_Desserts_N] = useState(null);
  const [Desserts_V, set_Desserts_V] = useState(null);
  const [Beverages_N, set_Beverages_N] = useState(null);
  const [Beverages_V, set_Beverages_V] = useState(null);
  const getMenu = async () => {
    try {
      const response = await fetch("http://localhost:5000/view_menu");
      const jsonData = await response.json();
      console.log(jsonData);
      set_Starters_N({
        columns: [
          {
            label: 'Dish ID',
            field: 'dishid',
          },
          {
            label: 'Dish',
            field: 'name',
          },
          {
            label: 'Price',
            field: 'price',
          },
        ],
        rows: jsonData.filter(menu => (menu.category === "Starters" && menu.non_veg==="Yes")).map(menu => (
          {
            dishid: menu.dishid,
            name: menu.name,
            price: menu.price,
          }
        )),
      });
      set_Starters_V({
        columns: [
          {
            label: 'Dish ID',
            field: 'dishid',
          },
          {
            label: 'Dish',
            field: 'name',
          },
          {
            label: 'Price',
            field: 'price',
          },
        ],
        rows: jsonData.filter(menu => (menu.category === "Starters" && menu.non_veg==="No")).map(menu => (
          {
            dishid: menu.dishid,
            name: menu.name,
            price: menu.price,
          }
        )),
      });
      set_Main_Course_N({
        columns: [
          {
            label: 'Dish ID',
            field: 'dishid',
          },
          {
            label: 'Dish',
            field: 'name',
          },
          {
            label: 'Price',
            field: 'price',
          },
        ],
        rows: jsonData.filter(menu => (menu.category === "Main Course" && menu.non_veg==="Yes")).map(menu => (
          {
            dishid: menu.dishid,
            name: menu.name,
            price: menu.price,
          }
        )),
      });
      set_Main_Course_V({
        columns: [
          {
            label: 'Dish ID',
            field: 'dishid',
          },
          {
            label: 'Dish',
            field: 'name',
          },
          {
            label: 'Price',
            field: 'price',
          },
        ],
        rows: jsonData.filter(menu => (menu.category === "Main Course" && menu.non_veg==="No")).map(menu => (
          {
            dishid: menu.dishid,
            name: menu.name,
            price: menu.price,
          }
        )),
      });
      set_Desserts_N({
        columns: [
          {
            label: 'Dish ID',
            field: 'dishid',
          },
          {
            label: 'Dish',
            field: 'name',
          },
          {
            label: 'Price',
            field: 'price',
          },
        ],
        rows: jsonData.filter(menu => (menu.category === "Desserts" && menu.non_veg==="Yes")).map(menu => (
          {
            dishid: menu.dishid,
            name: menu.name,
            price: menu.price,
          }
        )),
      });
      set_Desserts_V({
        columns: [
          {
            label: 'Dish ID',
            field: 'dishid',
          },
          {
            label: 'Dish',
            field: 'name',
          },
          {
            label: 'Price',
            field: 'price',
          },
        ],
        rows: jsonData.filter(menu => (menu.category === "Desserts" && menu.non_veg==="No")).map(menu => (
          {
            dishid: menu.dishid,
            name: menu.name,
            price: menu.price,
          }
        )),
      });
      set_Beverages_N({
        columns: [
          {
            label: 'Dish ID',
            field: 'dishid',
          },
          {
            label: 'Dish',
            field: 'name',
          },
          {
            label: 'Price',
            field: 'price',
          },
        ],
        rows: jsonData.filter(menu => (menu.category === "Beverages" && menu.non_veg==="Yes")).map(menu => (
          {
            dishid: menu.dishid,
            name: menu.name,
            price: menu.price,
          }
        )),
      });
      set_Beverages_V({
        columns: [
          {
            label: 'Dish ID',
            field: 'dishid',
          },
          {
            label: 'Dish',
            field: 'name',
          },
          {
            label: 'Price',
            field: 'price',
          },
        ],
        rows: jsonData.filter(menu => (menu.category === "Beverages" && menu.non_veg==="No")).map(menu => (
          {
            dishid: menu.dishid,
            name: menu.name,
            price: menu.price,
          }
        )),
      });
    } catch (err) {
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
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {Starters_N !== null ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={Starters_N} />
                    : ''}
                </div>
              </div>
            <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Starters(Veg)</h2>
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
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </Fragment>
  );

};

export default ListMenu;