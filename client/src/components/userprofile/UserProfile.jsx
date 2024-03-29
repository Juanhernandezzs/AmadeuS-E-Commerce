import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavSecondary from "../navsecondary/NavSecondary";
import {
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CreateIcon from "@material-ui/icons/Create";
import HistoryIcon from "@material-ui/icons/History";
import { useSelector } from "react-redux";
import axios from "axios";
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    width: "13vw",
    height: "13vw",
    margin: "3vh",
    borderRadius: "6.5vw",
    backgroundSize: "contain",
  },
  icon: {
    color: "grey",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  container: {
    boxShadow: "0 10px 40px 0px rgba(0,117,49,0.3)",
    display: "flex",
    justifyContent: "space-between",
    width: "70%",
    height: "100%",
    borderRadius: "10px",
    padding: "2vh",
    marginTop: "5vh",
    marginBottom: "5vh",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

function UserProfile() {
  const userRedux = useSelector(({ app }) => app.user);
  const classes = useStyles();
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
      {userDb && (
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <NavSecondary />
          <Container className={classes.container}>
            <div style={{ display: "flex" }}>
              <img
                className={classes.media}
                src={userDb.picture}
                alt="profile pic"
              />
              <CardContent>
                <Typography variant="h5" component="h1">
                  Nombre: {userDb.name}
                </Typography>
                <Typography component="h1" className={classes.price}>
                  Email: {userDb.email}
                </Typography>
              </CardContent>
            </div>
            <div style={{ display: "flex" }}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button component={Link} to="/favorites">
                  <ListItemIcon>
                    <FavoriteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Favoritos" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/shoppinghistory"
                  className={classes.link}
                >
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Historial de compras" />
                </ListItem>
                <ListItem button component={Link} to="edituserinfo">
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Editar cuenta" />
                </ListItem>
              </List>
            </div>
          </Container>
        </Grid>
      )}
    </>
  );
}

export default UserProfile;
