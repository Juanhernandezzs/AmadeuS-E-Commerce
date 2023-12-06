import React, { useContext, useEffect } from "react";
import {
  Typography,
  Divider,
  CircularProgress,
  Container,
} from "@material-ui/core";
import { CardMedia, Box, Grid, Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils";
import { UserContext } from "../shoppingcart/UserContext";
import { useDispatch, useSelector } from "react-redux";
import addToCart from "../../redux/actions/addToCart";
import getDetails from "../../redux/actions/getDetails";
import Review from "../review/Review";
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
  media: {
    width: "100%",
    // paddingTop: "70%", // 16:9
    height: "100%",
    // marginTop: "5vh",
    backgroundSize: "contain",
    "&:hover": {
      backgroundSize: "larger",
    },
  },
  container: {
    marginTop: "5vh",
    marginBottom: "5vh",
  },
  // price: {
  //   width: "80vh",
  //   marginTop: "5vh",
  // },
  mp: {
    maxWidth: "8vh",
    marginRight: "4vh",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    // width: "20vh",
    height: "7vh",
    fontSize: "2vh",
    marginRight: "4vh",
  },
  disp: {
    color: theme.palette.primary.dark,
  },
  containerMain: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  gridContainer: {
    width: "80%",
    margin: "5vh",
    backgroundColor: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    borderRadius: "5px",
  },
  itemContainer: {
    margin: "5vh",
    display: "flex",
    justifyContent: "space-between",
  },
  gridImage: {
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    borderRadius: "5px",
  },
  buttonContainer: {
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    marginTop: "10vh",
    marginBottom: "2vh",
    display: "flex",
    justifyContent: "center",
    padding: "2vh",
    alignItems: "center",
  },
}));

export default function ProductDetail() {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, success, loading } = useSelector(({ app }) => app.detail);
  const { shoppingCart, setShoppingCart } = useContext(UserContext);
  const { cartQuantity } = shoppingCart;

  const cartState = useSelector((state) => state.cart.cart);

  const handleAdd = (e) => {
    setShoppingCart((value) => ({
      ...value,
      cartQuantity: cartQuantity + 1,
    }));
    dispatch(addToCart(id));
  };

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  return (
    <Container maxWidth="false" className={classes.containerMain}>
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      {!loading && success && (
        <Grid container className={classes.gridContainer}>
          <Grid container className={classes.itemContainer}>
            <Grid item xs={5} className={classes.gridImage}>
              <CardMedia
                className={classes.media}
                image={`${REACT_APP_SERVER}/products/images/${data.image}`}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography
                component="h1"
                variant="h4"
                className={classes.container}
              >
                {data.name}
                <Divider variant="middle" light />
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                className={classes.container}
              >
                ${numberWithCommas(data.price)}
                <Divider variant="fullwidth" />
              </Typography>
              <Typography
                component="p"
                variant="body2"
                className={classes.container}
                style={{ maxWidth: "80%" }}
              >
                {data.description}
              </Typography>
              <Grid className={classes.buttonContainer}>
                <Box>
                  {" "}
                  <img
                    src={"https://img.icons8.com/color/480/mercado-pago.png"}
                    className={classes.mp}
                    alt="mercadopago"
                  />
                </Box>

                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={handleAdd}
                  disabled={
                    data.stock <= 0 ||
                    cartState?.find((e) => e._id === id)?.quantity ===
                      data.stock
                  }
                  endIcon={<ShoppingCartIcon />}
                >
                  Agregar
                </Button>
                {data.stock >= 1 ? (
                  <Link to={`/order/${id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" className={classes.button}>
                      Comprar
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="contained"
                    disabled
                    className={classes.button}
                  >
                    Comprar
                  </Button>
                )}
              </Grid>
              <Box className={classes.box}>
                {data.stock === 0 ? (
                  <Typography
                    variant="body2"
                    color="error"
                    component="h3"
                    className={classes.container}
                  >
                    Sin stock
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    component="h2"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "green",
                    }}
                  >
                    Hay unidades disponibles!
                  </Typography>
                )}
              </Box>
              {/* <Typography
                variant="body2"
                component="h3"
                className={classes.container}
              >
                {data.brand}
              </Typography> */}
            </Grid>
          </Grid>
          <Review product={data} />
        </Grid>
      )}
    </Container>
  );
}
