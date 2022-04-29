import React, { Fragment, useEffect, useState } from "react";

import { MDBDataTableV5 } from 'mdbreact';

const Chef = () => {
  const [OrderList, setOrderList] = useState(null);
  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetch("http://localhost:5000/pend_ords");
        const jsonData = await response.json();
        console.log(jsonData);
        setOrderList({
          columns: [
            {
              label: 'OrderID',
              field: 'OrderID'
            },
            {
              label: 'DishID',
              field: 'DishID'
            },
            {
                label: 'Quantity',
                field: 'Quantity'
            }
          ],
          rows: jsonData.map(ord_list => (
            {
              OrderID: ord_list.orderid,
              DishID: ord_list.dishid,
              Quantity: ord_list.quantity,
            }
          )),
        });

      }
      catch (err) {
        console.log(err.message);
      }
    };
    getList();    
  }, []);
  return (
    <Fragment >
      <div className="demo">
        <br />
        <div className="container text-center">
          <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Order List</h2>
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {OrderList ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={OrderList} />
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

export default Chef;