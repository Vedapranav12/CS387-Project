import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MDBDataTableV5 } from 'mdbreact';

const DeliveryManagerListPersons = () => {
  const navigate = useNavigate();
  const params = useParams();
  const pincode = params.pincode;
  const [listPersons, setlistPersons] = useState(null);
  useEffect(() => {
    const getDeliveryPersons = async pincode => {
      try {
        const response = await fetch(`http://localhost:5000/del_ppl/${pincode}`);
        const jsonData = await response.json();
        console.log(jsonData);
        setlistPersons({
          columns: [
            {
              label: 'Name',
              field: 'Name'
            },
            {
              label: 'Contact',
              field: 'Contact'
            }
          ],
          rows: jsonData.map(list_persons => (
            {
              Name:list_persons.name,
              Contact: list_persons.contact,
            }
          )),
        });

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
          <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Delivery persons for current order</h2>
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                <div className="table p-3 text-left table-condensed table-sm table-striped ChangeTextFont">
                  {listPersons ? <MDBDataTableV5 hover entriesOptions={[5, 10, 25]} entries={10} searching={false} pagesAmount={4} borderless data={listPersons} />
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