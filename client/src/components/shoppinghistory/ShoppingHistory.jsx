import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CardMedia,
  makeStyles,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@material-ui/core";
import { numberWithCommas } from "../../utils";
import NavSecondary from "./../navsecondary/NavSecondary";
import { useSelector } from "react-redux";
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
    width: "10%",
    height: "10vh",
    margin: "0vh",
    backgroundSize: "contain",
  },
  tableCell: {
    padding: "1vw",
  },
  img: {
    backgroundSize: "contain",
  },
}));

export default function ShoppingHistory() {
  const classes = useStyles();
  const userRedux = useSelector((state) => state.app.user);

  const [userDb, setUserDb] = useState();

  const getUserById = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_SERVER}/users/${userRedux._id}`
      );
      setUserDb(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserById(userRedux?._id); // eslint-disable-next-line
  }, [userRedux]);

  return (
    <>
      <NavSecondary />
      <Grid
        container
        sm={12}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "-10vh",
        }}
      >
        <Typography
          component="h1"
          style={{ fontSize: "3vh", marginBottom: "5vh" }}
        >
          Historial de compras
        </Typography>
        <Table
          style={{
            width: "80%",
            margin: "auto",
            border: "2px solid black",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}> Productos </TableCell>
              <TableCell className={classes.tableCell}>
                {" "}
                Total Compra{" "}
              </TableCell>
              <TableCell className={classes.tableCell}> Estado </TableCell>
              <TableCell className={classes.tableCell}> Ubicacion </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDb &&
              userDb.orders.map((order) => (
                <TableRow>
                  <TableCell className={classes.tableCell}>
                    {order.products &&
                      order.products.map((product) => (
                        <CardMedia
                          image={product.image}
                          className={classes.img}
                        />
                        // <CardMedia >
                        //   {" "}
                        //   <img
                        //     src={product.image}
                        //     className={classes.img}
                        //     alt="order"
                        //   />
                        // </CardMedia>
                        /* <Typography>
                            ${numberWithCommas(product.price)}
                          </Typography> */
                      ))}
                  </TableCell>

                  <TableCell>
                    {" "}
                    $
                    {numberWithCommas(
                      order.products.reduce((acc, item) => {
                        return (acc += item.price);
                      }, 0)
                    )}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {order.status === "approved" &&
                      order.status.toUpperCase()}{" "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
}
