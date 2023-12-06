import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Grid, Box, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    justifyContent: "space-around",
    color: theme.palette.primary.contrastText,
    backgroundColor: "rgb(0, 23, 20)",
    paddingTop: "10vh",
    paddingBottom: "5vh",
  },
  footerText: {
    maxWidth: "600px",
    margin: "2.5em auto 0",
    // paddingTop: "2em",
    fontSize: "0.8em",
    lineHeight: "2",
    color: "grey",
    position: "relative",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer style={{ width: "100%", height: "30vh" }}>
      <Box
        className={classes.footer}
        // px={{ xs: 3, sm: 10 }}
        // py={{ xs: 5, sm: 10 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>
                <Typography variant="body2" color="white" component="p">
                  Acerca de
                </Typography>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    ¿Cómo llego?
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    Métodos de pago
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    Métodos de envío
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    Cambios y devoluciones
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    Sobre nosotros
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    Ayuda
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>
                <Typography variant="body2" color="white" component="p">
                  Contacto
                </Typography>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    WhatsApp
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    Email
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    Dirección
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>
                <Typography variant="body2" color="white" component="p">
                  Redes Sociales
                </Typography>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    Facebook
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography variant="body2" color="white" component="p">
                    Instagram
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Typography className={classes.footerText}>
              {/* AmadeuS &reg; {new Date().getFullYear()} */}© Amadeus - Este
              es un proyecto de programación ficticio. Todos los derechos
              reservados. Todas las marcas comerciales y marcas registradas son
              propiedad de sus respectivos dueños.
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
