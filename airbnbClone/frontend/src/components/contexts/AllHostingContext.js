import React from 'react'
import {Consumer} from '../../Context.js'
import AllHosting from '../functions/AllHosting'


const AllHostingContext = (props) => {

  return (
    <Consumer>
      {value => {
        const {AllHostingList, HouseList} = value;
        console.log("hereee", AllHostingList);
        return (
          <div>
            <AllHosting history={props.history}
                        AllHostingList={AllHostingList}
                        HouseList={HouseList} />
          </div>
        )
      }}
    </Consumer>
  );
};

export default AllHostingContext;
