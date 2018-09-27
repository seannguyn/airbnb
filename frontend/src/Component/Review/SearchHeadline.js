import React from 'react'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

class SearchHeadline extends React.Component {
  render () {
    return(
      <div key="search">
        <Divider style={{margin:'20px'}}/>
        <div className="row">
          <div className="col-6">
            {this.props.guest} guests has mentioned “{this.props.searchKey}”
          </div>
          <div className="col-6">
            <Button onClick={this.props.resetSearch} color="primary">Back to All reviews</Button>
          </div>

          </div>
      </div>
    )
  }
}

export default SearchHeadline;
