import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';

//import './styling.css';

const ListMenu = () => {
  const [dataTable, setDataTable] = useState(null);
  const getMenu = async () => {
    try {
      const response = await fetch("http://localhost:5000/view_menu");
      const jsonData = await response.json();
      console.log(jsonData);
      dataTable({
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
          {
            label: 'Non Veg',
            field: 'non_veg',
          },
        ],
        rows: jsonData.filter(menu => menu.category === "Desserts").map(menu => (
          {
            dishid: menu.dishid,
            name: menu.name,
            price: menu.price,
            non_veg: menu.non_veg,
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
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {dataTable !== null ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={dataTable} />
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