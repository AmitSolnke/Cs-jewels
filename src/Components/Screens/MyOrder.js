import { styled } from "@mui/material/styles";
import { Drawer } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";
import web from "../../images/Group265.png";
import { myOrders } from "../../services/profile";
import { useEffect, useState } from "react";
import { formatDate } from "../../utilities/date";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: '100%',
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: '100%',
    boxSizing: "border-box",
  },
}));

export default function MyOrder() {
  const [data, setData] = useState([])

  const getData = async () => {
    const result = await myOrders()
    console.log(result.data.data);
    setData(result.data.data)
  }

  useEffect(() => {
    getData()
  }, [])
  return (
      <div className="p-3 myorder-container p-3 col-12 col-md-7 col-lg-8">
        <h5>MY ORDERS</h5>
        <div className="orders-wrapper">
          {data.map((order, key) => (
            <div className="p-4" key={key.toString()}>
              <div className="d-flex p-3" style={{ backgroundColor: "rgb(254 251 255)" }}>
                <div className="col-6">
                  <p>
                    <b>Order Id :#{order.order_id} </b>
                    <br></br>
                    <small>
                      Place on 27 oct 2023 <b>Total cost ₹ :{order.total_amount} </b>
                    </small>
                  </p>
                </div>
                <div className="col-6 text-end">
                  <div>
                    <button className="status-btn">{order.order_status}</button>
                    <br></br>
                    {order.expected_delivery_date != null ?
                      (<small className="delivery-desc">
                        Expected delivered {formatDate(order.expected_delivery_date)}
                      </small>)
                      : ''}
                  </div>
                </div>
              </div>

              <TableContainer component={Paper}>
                <Table className="table-wrapper" aria-label="caption table">
                  <TableBody>
                    {order.order_details.map((product, key) => (
                      <TableRow key={key.toString()}>
                        <TableCell component="th" scope="row">
                          <div className="d-flex">
                            <div>
                              <img width={60} height={60} src={web} />
                            </div>
                            <div className="ms-3">
                              <div>
                                <b> {product.product_name}</b>
                              </div>
                              <div>{product.data}</div>
                              <div>Quantity: {product.quantity}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          ₹ {product.Rs}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
          {data.length <= 0 ? 
            (
              <div className="p-4">
                <div className="d-flex p-3 no-data-wrapper" style={{ backgroundColor: "rgb(254 251 255)" }}>
                  <p>No order found</p>
                </div>
              </div>
            ) : ''}
        </div>
      </div>
  );
}
