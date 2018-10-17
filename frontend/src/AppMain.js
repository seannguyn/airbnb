import React from "react"
import { Consumer } from "./Context"
import { withStyles } from "@material-ui/core/styles"

import Header from "./Component/layout/Header"

import { SnackbarProvider } from "notistack"
import Sidebar from "./Component/layout/Sidebar"
import Main from "./Component/layout/Main"


const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: "relative",
    display: "flex",
    width: "100%"
  }
});

class AppMain extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <SnackbarProvider
        maxSnack={4}
        autoHideDuration={1500}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}>

        <Consumer>
          {value => {
            const { logged_in } = value;
            return (
              <div className={classes.root}>
                <Header />
                {logged_in === true ? <Sidebar /> : null}
                <Main />
              </div>
            )
          }}
        </Consumer>
      </SnackbarProvider>
    )
  }
}

export default withStyles(styles, { withTheme: true })(AppMain)
