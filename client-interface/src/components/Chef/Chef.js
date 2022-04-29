import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MDBDataTableV5 } from 'mdbreact';

const Chef = () => {
  const [OrderListOnline, setOrderListOnline] = useState([]);
  const [OrderListOffline, setOrderListOffline] = useState([]);
  const handleUpdateOnline = async orderid => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderid })
    };
    try {
      const response = await fetch("http://localhost:5000/onl_ords_update/", requestOptions);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpdateOffline = async (tblid, dishid) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tblid, dishid })
    };
    try {
      const response = await fetch("http://localhost:5000/offl_ords_update/", requestOptions);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
  
  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetch("http://localhost:5000/pend_ords_onl");
        const jsonData = await response.json();
        console.log(jsonData);
        const uniqueorders = Array.from(new Set(jsonData.map((item) => item["orderid"])));
        console.log(uniqueorders);
        const orderdata = uniqueorders.map((orderid) => {
          const currentOrderData = jsonData.filter((item) => item["orderid"] === orderid);
          return ({
              "orderid": orderid,
              "orderdata": currentOrderData.map((area) => {
                  return ({
                    "dishid": area.dishid,
                    "quantity": area.quantity
                  });
              })
          });
      });
      console.log(orderdata);
      setOrderListOnline(orderdata);
      }
      catch (err) {
        console.log(err.message);
      }
      try{
        const response2 = await fetch("http://localhost:5000/pend_ords_offl");
        const jsonData2 = await response2.json();
        console.log(jsonData2);
        setOrderListOffline(jsonData2);

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
          <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Offline Order List</h2>
          <div className="row justify-content-center">
            <div className="col-sm-10">
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Dish ID</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OrderListOffline.map(data => (
                      <tr key={data.tableid}>
                        <td>{data.dishid}</td>
                        <td>{data.quantity}</td>
                        <td>
                          <Button onClick={handleUpdateOffline} value={[data.tableid,data.dishid]}> Start </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
        <div className="container text-center">
          <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Online Order List</h2>
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Order Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OrderListOnline.map(data => (
                      <tr key={data.orderid}>
                        <table  className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                          <thead>
                            <tr>
                              <th>
                                Dish ID
                              </th>
                              <th>
                                Quantity
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.orderdata.map(data1 => (
                              <tr key={data.orderid}>
                                <td>{data1.dishid}</td>
                              <td>{data1.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <td>
                          <Button onClick={handleUpdateOnline} value={data.orderid}> Start </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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