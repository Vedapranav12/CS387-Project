import React, { Fragment, useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact';
import GlobalContext from '../../providers/GlobalContext';

//import './styling.css';

const DeliveryAgent = () => {
    const globalContext = useContext(GlobalContext);
    const user = globalContext.user;
    const delid = 0;
    console.log(user.Username);
    const [listOrders, setlistOrders] = useState(null);
  const getList = async () => {
    try {
      const response = await fetch(`http://localhost:5000/order_for_delivery/${user.Username}`);
      const jsonData = await response.json();
      console.log("hi");
      console.log(jsonData);
      setlistOrders({
          columns: [
              {
                  label: 'OrderID',
                  field: 'OrderID'
              },
              {
                  label: 'Name',
                  field: 'Name'
              },
              {
                  label: 'Quantity',
                  field: 'Quantity'
              },
              {
                  label: 'Address',
                  field: 'Address'
              }
          ],
          rows: jsonData.map(list_orders => (
            {
                OrderID: list_orders.orderid,
                Name: list_orders.name,
                Quantity: list_orders.quantity,
                Address: list_orders.address,
            }
          )),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getList();
  }, [user]);

  return (
    <Fragment >
        {user.Username!=='' ?
      <div className="demo">
        
        <div className="container text-center">
          <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Current Orders</h2>
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {listOrders ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={listOrders} />
                    : ''
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>:''}
    </Fragment>
  );

};

export default DeliveryAgent;