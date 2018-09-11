import React from 'react'
import PropTypes from 'prop-types'
import AccommodationDetail from '../AccommodationDetail/AccommodationDetail'
import {Consumer} from '../../Context.js'


const AccommodationDetailContext = (props) => {

  console.log(props);

  return (
    <Consumer>
      {value => {
        return (
          <AccommodationDetail
            props={props}
            id={props.match.params}
            context={value}
            history={props.history}
            />
        )
      }}
    </Consumer>

  )
}

export default AccommodationDetailContext;
