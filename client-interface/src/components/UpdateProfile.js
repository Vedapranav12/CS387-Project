import React, { Fragment, ReactFragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";
import { useContext } from "react";
import GlobalContext from '../providers/GlobalContext';

const UpdateProfile = () => {
    const globalContext = useContext(GlobalContext);
    const user = globalContext.user;
    const [Name, setName] = useState("haii");
    const [Address, setAddress] = useState("haii");
    const [Zip, setZip] = useState("haii");
    const [Contact, setContact] = useState("haii");

    const getUserDetails = async () => {
        try {
            const usrnme=user.Username;
            console.log(usrnme);
            // const usrnme = 'whubbocks0'; //need to change
            const response = await fetch(`http://localhost:5000/get_user_details/${usrnme}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setName(jsonData.name);
            setAddress(jsonData.address);
            setZip(jsonData.zip);
            setContact(jsonData.contact);
          } catch (err) {
            console.error(err.message);
          }
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    // // setIsPending(true);
    // fetch('http://localhost:5000/venues/add', {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ venue_name, city_name, country_name, capacity })
    // }).then(res => {
    //   console.log(res);
    // })
    // // setIsPending(false);
    // setvenue_name("");
    // setcity_name("");
    // setcountry_name("");
    // setcapacity("");
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return(
    <Fragment>
      <div className="demo centerMy">
        <div className="container text-center">
          <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour">Delivery Information</h2>
          <div className="card shadow-lg p-3 mb-5 bg-white rounded demo2 ChangeTextFont">
            <form onSubmit={handleSubmit}>

              <div className="row justify-content-center">
              <div className="form-group text-left  col-sm-5">
                  <label>Name
                    <input className="form-control"
                      type="text"
                      name="Name"
                      value={Name}
                      onChange={e => setName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-group text-left  col-sm-5">
                  <label>Address
                    <input className="form-control"
                      type="text"
                      name="Address"
                      value={Address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-group text-left  col-sm-5">
                  <label>Zip code
                    <input className="form-control"
                      type="text"
                      name="Zip"
                      value={Zip}
                      onChange={e => setZip(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-group text-left  col-sm-5">
                  <label>Contact Number
                    <input className="form-control"
                      type="text"
                      name="Contact Number"
                      value={Contact}
                      onChange={e => setContact(e.target.value)}
                    />
                  </label>
                </div>
                {/* <div className="col-sm-6">
                  {!IsPending && <button className="btn btn-primary btn-lg btn-block" disabled={!venue_name.trim() || !city_name.trim() || !country_name.trim() || capacity <= 0} >Submit</button>}
                  {IsPending && <button className="btn btn-primary btn-lg btn-block" disabled>Submitting...</button>}
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;