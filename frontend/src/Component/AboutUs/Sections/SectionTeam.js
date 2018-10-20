import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// core components
import GridContainer from 'Component/Grid/GridContainer.js'
import GridItem from 'Component/Grid/GridItem.js'
import Card from 'Component/Card/Card.jsx'
import CardAvatar from 'Component/Card/CardAvatar.jsx'
import CardBody from 'Component/Card/CardBody.jsx'
import CardFooter from 'Component/Card/CardFooter.jsx'
import Button from 'Component/CustomButtons/Button.jsx'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

import teamStyle from 'assets/jss/material-kit-pro-react/views/aboutUsSections/teamStyle.jsx'

import Sean from 'assets/img/faces/Sean.jpg'
import Nam from 'assets/img/faces/Nam.jpg'
import Zahid from 'assets/img/faces/Zahid.jpg'
import Hieu from 'assets/img/faces/Hieu.jpg'

function SectionTeam(props) {
  const { classes } = props
  return (
    <div className={classes.team}>
      <GridContainer>
        <GridItem
          md={8}
          sm={8}
          className={classNames(
            classes.mrAuto,
            classes.mlAuto,
            classes.textCenter
          )}
        >
          <h2 className={classes.title}>We are nerd rockstars</h2>
          <h5 className={classes.description}>
            We are a team in COMP3900 at UNSW
          </h5>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem md={3} sm={3}>
          <Card profile plain>
            <CardAvatar profile plain>
              <a href="#pablo">
                <img src={Sean} alt="profile-pic" className={classes.img} />
              </a>
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Sean Nguyen</h4>
              <h6 className={classes.textMuted}>Scrum Master/Developer</h6>
              <p className={classes.cardDescription}>I love coding</p>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
              <Button href="#pablo" justIcon simple color="twitter">
                <i className="fab fa-twitter" />
              </Button>
              <Button href="#pablo" justIcon simple color="facebook">
                <i className="fab fa-facebook" />
              </Button>
              <Button href="#pablo" justIcon simple color="google">
                <i className="fab fa-google" />
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={3} sm={3}>
          <Card profile plain>
            <CardAvatar profile plain>
              <a href="#pablo">
                <img src={Nam} alt="profile-pic" className={classes.img} />
              </a>
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Nam Tran</h4>
              <h6 className={classes.textMuted}>WEB DEVELOPER</h6>
              <p className={classes.cardDescription}>
                I love listening to move
              </p>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
              <Button href="#pablo" justIcon simple color="twitter">
                <i className="fab fa-twitter" />
              </Button>
              <Button href="#pablo" justIcon simple color="dribbble">
                <i className="fab fa-dribbble" />
              </Button>
              <Button href="#pablo" justIcon simple color="linkedin">
                <i className="fab fa-linkedin-in" />
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={3} sm={3}>
          <Card profile plain>
            <CardAvatar profile plain>
              <a href="#pablo">
                <img src={Zahid} alt="profile-pic" className={classes.img} />
              </a>
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Zahid Mohammed</h4>
              <h6 className={classes.textMuted}>WEB DEVELOPER</h6>
              <p className={classes.cardDescription}>I love coding</p>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
              <Button href="#pablo" justIcon simple color="facebook">
                <i className="fab fa-facebook" />
              </Button>
              <Button href="#pablo" justIcon simple color="dribbble">
                <i className="fab fa-dribbble" />
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem md={3} sm={3}>
          <Card profile plain>
            <CardAvatar profile plain>
              <a href="#pablo">
                <img src={Hieu} alt="profile-pic" className={classes.img} />
              </a>
            </CardAvatar>
            <CardBody plain>
              <h4 className={classes.cardTitle}>Hieu Mai</h4>
              <h6 className={classes.textMuted}>WEB DEVELOPER</h6>
              <p className={classes.cardDescription}>
                I love solving problems and coding.
              </p>
            </CardBody>
            <CardFooter className={classes.justifyContent}>
              <Button href="#pablo" justIcon simple color="google">
                <i className="fab fa-google" />
              </Button>
              <Button href="#pablo" justIcon simple color="twitter">
                <i className="fab fa-twitter" />
              </Button>
              <Button href="#pablo" justIcon simple color="dribbble">
                <i className="fab fa-dribbble" />
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default withStyles(teamStyle)(SectionTeam)
