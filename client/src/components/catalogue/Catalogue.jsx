import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Container,
  Button,
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ProductCard from "../productcard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import getAllProducts, {
  sortByName,
  sortByPrice,
  filterByCategory,
} from "../../redux/actions/getAllProducts";
import { getAllCategories } from "../../redux/actions/getAllCategories";
import { getByName } from "../../redux/actions/getByName";
import { UserContext } from "../shoppingcart/UserContext";
import { linkUserCart } from "../../redux/actions/linkUserCart";
import { itemsDbToCart } from "../../redux/actions/itemsDbToCart";
import { getAllFavorites } from "../../redux/actions/favorites";
import ClearIcon from "@material-ui/icons/Clear";
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  label: {
    fontSize: "12px",
  },
  gridContainer: {
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
    },
  },
  gridFilter: {
    margin: "auto",
    marginTop: "0vh",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      width: "100vh",
    },
  },
  root: {
    "& > * + *": {
      marginTop: theme.spacing(0),
    },
  },
  clearButton: {
    marginTop: "2vh",
  },
}));

export default function Catalogue() {
  const { shoppingCart, setShoppingCart } = useContext(UserContext);
  const { cartQuantity } = shoppingCart;
  const { data, loading, success } = useSelector(
    ({ app }) => app.productsLoaded
  );
  const categories = useSelector(({ app }) => app.categoriesLoaded);
  const search = useSelector(({ app }) => app.searchBar);
  const user = useSelector((state) => state.app.user);
  const cartState = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(itemsDbToCart(user.cart));
      dispatch(getAllFavorites(user._id));
    } // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    const alStorage = JSON.stringify(cartState);
    if (!user) {
      window.localStorage.setItem("cartItems", alStorage);
    } else {
      const { cart } = JSON.parse(alStorage);
      const userCart = {
        user,
        cart,
      };
      window.localStorage.removeItem("cartItems");
      if (userCart) dispatch(linkUserCart(userCart));
    }
    setShoppingCart((prev) => ({
      ...prev,
      cartQuantity: cartState.cart.reduce((acc, elem) => {
        return (acc = acc + elem.quantity);
      }, 0),
    })); // eslint-disable-next-line
  }, [cartQuantity, cartState]);

  useEffect(() => {
    if (!search || search.length === 0) {
      dispatch(getAllProducts());
    }
    dispatch(getAllCategories()); // eslint-disable-next-line
  }, [dispatch]);

  // Controlador de los select's
  const [select, setSelect] = useState({
    name: "",
    price: "",
    filter: "",
  });

  // Control del paginado
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const indexLastProduct = page * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const currentProducts = data.slice(indexFirstProduct, indexLastProduct);
  const classes = useStyles();

  function handleSortName(e) {
    dispatch(sortByName(e.target.value));
    setSelect({
      ...select,
      name: e.target.value,
    });
    setPage(1);
  }

  function handleSortPrice(e) {
    dispatch(sortByPrice(e.target.value));
    setSelect({
      ...select,
      price: e.target.value,
    });
    setPage(1);
  }

  function handleFilterCategory(e) {
    setSelect({
      ...select,
      filter: e.target.value,
    });
    setPage(1);
  }

  function handleChange(event, value) {
    setPage(value);
  }

  useEffect(() => {
    dispatch(filterByCategory(select.filter)); // eslint-disable-next-line
  }, [select.filter]);

  useEffect(() => {
    if (!search || search.length === 0) {
      dispatch(getAllProducts());
    } else {
      dispatch(getByName(search));
      setPage(1);
    }
    dispatch(getAllCategories());
    setShoppingCart((prev) => ({
      ...prev,
      cartQuantity: JSON.parse(localStorage.getItem("cant")),
    })); // eslint-disable-next-line
  }, [dispatch, search]);

  const clearFilters = () => {
    setSelect({});
    dispatch(getAllProducts());
  };

  const setProducts = (e) => {
    setProductsPerPage(e.target.value);
  };

  return (
    <Container style={{ marginTop: "2vh", overflow: "hidden" }}>
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      {!loading && success && (
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            xs={9}
            sm={12}
            className={classes.gridFilter}
          >
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label}>Categoria</InputLabel>
              <Select
                value={select.filter}
                onChange={(e) => handleFilterCategory(e)}
              >
                <MenuItem value="All">Todos</MenuItem>
                {categories?.map((category, index) => (
                  <MenuItem key={index} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label}>Nombre</InputLabel>
              <Select value={select.name} onChange={(e) => handleSortName(e)}>
                <MenuItem value="A - Z">A - Z</MenuItem>
                <MenuItem value="Z - A">Z - A</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label}>Precio</InputLabel>
              <Select value={select.price} onChange={(e) => handleSortPrice(e)}>
                <MenuItem value="Lower to Higher">Menor a Mayor</MenuItem>
                <MenuItem value="Higher to Lower">Mayor a Menor</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel className={classes.label}>Mostrar:</InputLabel>
                <Select
                  value={productsPerPage}
                  onChange={(e) => setProducts(e)}
                >
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                </Select>
              </FormControl>

            <FormControl className={classes.clearButton}>
              <Button onClick={clearFilters}>
                <ClearIcon />
              </Button>
            </FormControl>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            className={classes.gridContainer}
            sm={12}
          >
            {currentProducts?.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  image={`${REACT_APP_SERVER}/products/images/${product.image}`}
                  price={product.price}
                  stock={product.stock}
                />
              );
            })}
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            className={classes.root}
          >
            <Pagination
              count={Math.ceil(data.length / productsPerPage)}
              page={page}
              onChange={handleChange}
              variant="outlined"
              shape="rounded"
              color="primary"
              style={{ marginBottom: "2vw ", marginTop: "1vw" }}
            />
          </Grid>
        </>
      )}
    </Container>
  );
}
