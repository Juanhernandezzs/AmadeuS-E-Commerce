import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import NavSecondary from "../navsecondary/NavSecondary";

// idea: cards de cada funcionalidad
//-stock. edicion de lo que ya esta subido
//-cargar producto, categorias
//-historial de ventas
//-administrar usuarios
//-secciones (ofertas-novedades)
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    flexDirection: "column",
    alignContent: "center",
    padding: "5%",
  },
  gridItem: {
    padding: "1%",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.dark,
  },
  text: {
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    "&:hover": {
      background: "green",
      cursor: "pointer",
    },
    height: "10vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    transition: "background 0.3s",
  },
}));

export default function AdminPanel() {
  const classes = useStyles();

  const arrayItems = [
    { name: "Stock", route: "/stock" },
    { name: "Crear Nueva Categoría", route: "/addcategory" },
    { name: "Cargar Producto", route: "/addproduct" },
    { name: "Administrar Usuarios", route: "/usermanagement" },
    { name: "Historial de Ventas", route: "/sales" },
  ];

  return (
    <Box>
      <NavSecondary />
      <Grid container className={classes.gridContainer}>
        {arrayItems.map((e) => (
          <Grid align="center" className={classes.gridItem}>
            <Link to={e.route} className={classes.link}>
              <Typography variant="h6" align="center" className={classes.text}>
                {e.name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
