import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTableV5 } from 'mdbreact';
import { Button } from "react-bootstrap";
import { useContext } from "react";
import GlobalContext from '../providers/GlobalContext';
const axios = require('axios');
//import './styling.css';

const ListUserOrders = () => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext.user;
  const [RHistory, set_RHistory] = useState([]);
  const [CHistory, set_CHistory] = useState([]);
  const [OHistory, set_OHistory] = useState([]);
  const [DHistory, set_DHistory] = useState([]);
  const [Rfilter, set_Rfilter] = useState(true);
  const [Cfilter, set_Cfilter] = useState(true);
  const [Ofilter, set_Ofilter] = useState(true);
  const [Dfilter, set_Dfilter] = useState(true);

  const getHistory = async () => {
    try {
      let usrnme = user.Username;
      axios.get(`http://localhost:5000/ord_history/${usrnme}`, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          if (resp.status === 200) {
            set_RHistory(resp.data.filter(order => order.status === "Received"));
            set_CHistory(resp.data.filter(order => order.status === "Cooked"));
            set_OHistory(resp.data.filter(order => order.status === "Out for delivery"));
            set_DHistory(resp.data.filter(order => order.status === "Delivered"));
          } else {
            throw new Error();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handle_Rfilter = () => {
    set_Rfilter(!Rfilter);
  }

  const handle_Cfilter = () => {
    set_Cfilter(!Cfilter);
  }

  const handle_Ofilter = () => {
    set_Ofilter(!Ofilter);
  }

  const handle_Dfilter = () => {
    set_Dfilter(!Dfilter);
  }

  useEffect(() => {
    getHistory();
  }, [user]);

  return (
    <Fragment >
      <div className="demo">
        <br />
        <div className="container text-center">
          <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > History</h2>
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <div className="App">
                Filter Data:
                <div className="filter">
                  <input
                    type="checkbox"
                    id="Rfilter"
                    name="Rfilter"
                    value="Received"
                    checked={Rfilter}
                    onChange={handle_Rfilter}
                  />
                  Received
                </div>
                <div className="filter">
                  <input
                    type="checkbox"
                    id="Cfilter"
                    name="Cfilter"
                    value="Received"
                    checked={Cfilter}
                    onChange={handle_Cfilter}
                  />
                  Cooked
                </div>
                <div className="filter">
                  <input
                    type="checkbox"
                    id="Ofilter"
                    name="Ofilter"
                    value="Received"
                    checked={Ofilter}
                    onChange={handle_Ofilter}
                  />
                  Out for delivery
                </div>
                <div className="filter">
                  <input
                    type="checkbox"
                    id="Dfilter"
                    name="Dfilter"
                    value="Received"
                    checked={Dfilter}
                    onChange={handle_Dfilter}
                  />
                  Delivered
                </div>
              </div>
              {Rfilter ?
                <div>
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Orders Received</h2>
                  <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                    <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Time </th>
                          <th>Delivered by</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RHistory.map(data => (
                          <tr key={data.dishid}>
                            <td>{data.orderid}</td>
                            <td>{data.time}</td>
                            <td>{data.name}</td>
                            {/* <td>
                          <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                        </td>
                        <td>
                          <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                        </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div> : ''}
              {Cfilter ?
                <div>
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Orders Cooked</h2>
                  <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                    <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Time </th>
                          <th>Delivered by</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CHistory.map(data => (
                          <tr key={data.dishid}>
                            <td>{data.orderid}</td>
                            <td>{data.time}</td>
                            <td>{data.name}</td>
                            {/* <td>
                          <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                        </td>
                        <td>
                          <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                        </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div> : ''}
              {Ofilter ?
                <div>
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Orders Out for Delivery</h2>
                  <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                    <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Time </th>
                          <th>Delivered by</th>
                        </tr>
                      </thead>
                      <tbody>
                        {OHistory.map(data => (
                          <tr key={data.dishid}>
                            <td>{data.orderid}</td>
                            <td>{data.time}</td>
                            <td>{data.name}</td>
                            {/* <td>
                          <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                        </td>
                        <td>
                          <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                        </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div> : ''}
              {Dfilter ?
                <div>
                  <h2 className="h2 mb-4 font-weight-bold shadow-lg p-3 rounded textColour" > Orders Delivered</h2>
                  <div className="shadow-lg p-3 mb-5 bg-white rounded border border-dark demo2" >
                    <table className="table mt-2 text-left table-condensed table-sm table-striped table-bordered ChangeTextFont">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Time </th>
                          <th>Delivered by</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DHistory.map(data => (
                          <tr key={data.dishid}>
                            <td>{data.orderid}</td>
                            <td>{data.time}</td>
                            <td>{data.name}</td>
                            {/* <td>
                          <Button onClick={handleAdd} value={data.dishid}> Add </Button>
                        </td>
                        <td>
                          <Button onClick={handleSubtract} value={data.dishid}> Remove </Button>
                        </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div> : ''}
            </div>
          </div>
          <Link to="/menu"> <button type="button"> GO to Menu </button> </Link>
        </div>
        <br />
      </div>
    </Fragment>
  );

};

export default ListUserOrders;