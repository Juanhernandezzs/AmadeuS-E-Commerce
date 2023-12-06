import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  welcome: {
    color: theme.palette.primary.light,
  },
}));

export default function OnlyLogin() {
  const classes = useStyles();
  const { isAuthenticated, loginWithPopup } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <MenuItem className={classes.welcome} onClick={loginWithPopup}>
          Ingresá
        </MenuItem>
      )}
    </div>
  );
}
