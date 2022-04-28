import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MDBDataTableV5 } from 'mdbreact';

const DeliveryManagerListPersons = async => {
  const [currentOrders, setcurrentOrders] = useState(null);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/onl_cook_ords");
        const jsonData = await response.json();
        setcurrentOrders({
          columns: [
            {
              label: 'OrderID',
              field: 'OrderID'
            },
            {
              label: 'Zip',
              field: 'Zip'
            },
            {
              label: 'Time',
              field: 'Time'
            }
          ],
          rows: jsonData.map(curr_orders => (
            {
              order_id: <Link to={`/deli_manager/${curr_orders}`}>curr_orders.OrderID</Link>,
              zip: curr_orders.Zip,
              time: curr_orders.Time,
            }
          )),
        });

      }
      catch (err) {
        console.log(err.message);
      }
    };
    getOrders();
  });
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
                  {currentOrders ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={currentOrders} />
                    : ''
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </Fragment>
  )
};

export default DeliveryManagerListPersons;