import React from 'react';
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "Component/Grid/GridContainer.js";
import GridItem from "Component/Grid/GridItem.js";
import Parallax from "Component/Parallax/Parallax.js";
// sections for this page
import SectionDescription from "Component/AboutUs/Sections/SectionDescription.js";
import SectionTeam from "Component/AboutUs/Sections/SectionTeam.js";

import aboutUsStyle from "assets/jss/material-kit-pro-react/views/aboutUsStyle.jsx";
class AboutUs extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  render(){
    const { classes } = this.props;
    return (
      <div>
        <Parallax image={require("assets/img/bg9.jpg")} filter="dark" small>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem
                md={8}
                sm={8}
                className={classNames(
                  classes.mlAuto,
                  classes.mrAuto,
                  classes.textCenter
                )}
              >
                <h1 className={classes.title}>About Us</h1>
                <h4>
                  Meet the amazing team behind this project and find out more
                  about how we work.
                </h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <SectionDescription />
            <SectionTeam />
          </div>
        </div>
      </div>
    );
  } 
}



export default withStyles(aboutUsStyle)(AboutUs);