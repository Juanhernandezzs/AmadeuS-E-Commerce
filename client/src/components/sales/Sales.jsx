import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Container, makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import NavSecondary from "./../navsecondary/NavSecondary";
import { headers } from "../../utils/GetHeaders";
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "3vh",
    display: "flex",
    justifyContent: "space-around",
    border: "1px solid black",
  },
  media: {
    width: "13%",
    backgroundSize: "contain",
  },

  img: {
    width: "10%",
    backgroundSize: "contain",
    backgroundColor: "grey",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
  backhome: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#16222A",
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    margin: "2vh",
    width: "12vh",
    fontSize: "80%",
  },
}));

export default function Sales() {
  const classes = useStyles();

  const responsive = "standard";

  const [orders, setOrders] = useState([]);

  const [editOrder, setEditOrder] = useState();
  //me guardo el id de rowOrder, para hacerle un put en base de datos y cambiarle el estado
  const [orderStatus, setOrderStatus] = useState();

  const getOrders = async () => {
    //me traigo las compras
    try {
      const response = await axios.get(`${REACT_APP_SERVER}/orders`, {
        headers,
      });
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  //put a la base de datos modificando status
  useEffect(() => {
    axios
      .put(`${REACT_APP_SERVER}/orders/${editOrder}`, {
        status: orderStatus === "Pending" ? "Approved" : "Pending",
      })
      .then(() => window.location.reload(true)) //actualize las orders
      .catch((err) => console.log(err)); // eslint-disable-next-line
  }, [editOrder]);

  const columns = [
    {
      name: "Editar Status",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Button
              className={classes.btn}
              onClick={() => {
                const rowOrder = orders[rowIndex];
                setEditOrder(rowOrder._id);
                setOrderStatus(rowOrder.status);
              }}
            >
              Editar Status
            </Button>
          );
        },
      },
    },
    {
      name: "Orden",
      options: {
        filter: true,
      },
    },
    {
      name: "Productos",
      options: {
        filter: true,
      },
    },
    {
      name: "Ingreso",
      options: {
        filter: false,
      },
    },
    {
      name: "Status",
      options: {
        filter: true,
      },
    },
    {
      name: "Cliente",
      options: {
        filter: true,
      },
    },
    {
      name: "Ubicacion",
      options: {
        filter: true,
        sort: false,
        empty: true,
      },
    },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive,
    resizableColumns: true,
  };

  const arr = orders.map((order) => ({
    Orden: order._id,
    Productos: order.products?.map((product) => (
      <img
        src={`${REACT_APP_SERVER}/products/images/${product.image}`}
        className={classes.media}
        alt="order"
      />
    )),
    Ingreso:
      "$ " +
      order.products?.reduce((acc, item) => {
        return (acc += item.price);
      }, 0),
    Status: order.status.toUpperCase(),
    // "Cliente": order.buyer.email,
    Ubicacion: order.shipping && order.shipping.state,
    Cliente: order.buyer && order.buyer.email,
  }));
  const data = arr;

  return (
    <>
      <NavSecondary />
      <Container style={{ marginTop: "5vh" }}>
        <MUIDataTable
          title={"Historial de Ventas"}
          data={data}
          columns={columns}
          options={options}
        />

        <Container className={classes.backhome}>
          <Link to="/" className={classes.link}>
            <Button variant="contained" className={classes.btn}>
              Home
            </Button>
          </Link>
          <Link to="/adminpanel" className={classes.link}>
            <Button variant="contained" className={classes.btn}>
              Volver
            </Button>
          </Link>
        </Container>
      </Container>
    </>
  );
}
