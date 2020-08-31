import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { logout } from "../API";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoginAlertOpen, setIsLoginAlertOpen] = React.useState(false);

  React.useEffect(() => {
    if (history.action === "PUSH") {
      setIsLoginAlertOpen(true);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    const jsonResponse = await logout();
    if (jsonResponse.status === 200) {
      history.push("/");
    }
  };

  const loginAlert = () => {
    const vertical = "bottom";
    const horizontal = "right";
    return isLoginAlertOpen ? (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={isLoginAlertOpen}
          onClose={(e) => setIsLoginAlertOpen(false)}
          message="You are now logged in"
          key={vertical + horizontal}
        />
      </div>
    ) : null;
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {loginAlert()}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Dashboard
          </Typography>

          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Check Health
          </Button>
          <TextField
            fullWidth
            disabled
            id="outlined-basic"
            label="Health level"
            variant="outlined"
          />
        </div>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}
