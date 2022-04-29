import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";

const DeliveryManagerListPersons = () => {
  const navigate = useNavigate();
  const params = useParams();
  const pincode = params.pincode;
  const orderid = params.orderid;
  const [listPersons, setlistPersons] = useState([]);
  const handleUpdate = async (delid, orderid) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ delid, orderid })
    };
    try {
      const response = await fetch("http://localhost:5000/assign_delperson/", requestOptions);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    const getDeliveryPersons = async pincode => {
      try {
        const response = await fetch(`http://localhost:5000/del_ppl/${pincode}`);
        const jsonData = await response.json();
        console.log(jsonData);
        setlistPersons(jsonData);

      }
      catch (err) {
        console.log(err.message);
      }
    };
    getDeliveryPersons(pincode);  
  }, []);
  return (
    <Fragment >
      <div className="demo">
        <br />
        <div>
            <li>
                <Link to="/deli_manager">Order List</Link>
            </li>
            <li>
                <Link to="/deli_manager/all_persons">Manage Delivery persons</Link>
            </li>
        </div>
        <div className="container text-center">
          <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Delivery Person List</h2>
          <div className="row justify-content-center">
            <div className="col-sm-10">
            <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
              <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listPersons.map(data => (
                      <tr key={data.username}>
                        <td>{data.name}</td>
                        <td>{data.contact}</td>
                        <td>
                          <Button onClick={handleUpdate} value={[data.username, orderid]}> Start </Button>
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

export default DeliveryManagerListPersons;