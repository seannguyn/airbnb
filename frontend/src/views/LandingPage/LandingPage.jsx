import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
// import Header from "components/Header/Header.jsx";
// import Sidebar from "components/Sidebar/Sidebar.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.jsx";

// Sections for this page
// import SectionProduct from "./Sections/SectionProduct.jsx";
import SectionTeam from "./Sections/SectionTeam.jsx";
// import SectionWork from "./Sections/SectionWork.jsx";
import {Consumer} from 'Context';
// import Header from 'Component/layout/Header'
import Main from 'Component/layout/Main'
import Header from 'Component/layout/Header'
import Sidebar from 'Component/layout/Sidebar'
const dashboardRoutes = [];

class LandingPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header />
        {/* <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Portbnb"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          changeColorOnScroll={{
            height: 300,
            color: "info"
          }}
          {...rest}
        /> */}
        <Consumer>
        {value => {
          const {logged_in} = value;
          return (
            <div className={classes.root}>
              {logged_in === true ? <Main/> : 
              <div class="no_signin">
                <Parallax image={require("images/Sydney-Opera-House.jpg")} filter="dark">
                  <div className={classes.container}>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6}>
                        <h1 className={classes.title}>Welcome to Portbnb</h1>
                        <h4>
                          Portbnb is the biggest booking property system in the world
                        </h4>
                        <br />
                        <Button
                          color="danger"
                          size="lg"
                          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fas fa-play" />Watch video
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </div>
                </Parallax>
                  <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                      <SectionTeam />
                    </div>
                  </div> 
                </div>
                }    
              </div>
          )
        }}
        </Consumer>
        

        
        
        <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#"
                      className={classes.block}
                    >
                      Snake Team COMP3900
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="#"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{" "}
                <Favorite className={classes.icon} /> by{" "}
                <a href="#">Snake Team</a> for a
                better web.
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
