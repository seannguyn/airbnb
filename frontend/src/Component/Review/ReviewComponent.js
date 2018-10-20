import React from 'react'
import TextField from '@material-ui/core/TextField'
import Paginate from './Paginate'
import ReviewRow from './ReviewRow'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import SearchHeadline from './SearchHeadline'
import uuid from 'uuid'
import like from '../../assets/img/icons/like.png'
import like_empty from '../../assets/img/icons/like_empty.png'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

class ReviewComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      perPage: 5,
      totalPage: Math.round(
        parseInt(props.review.length, 10) / parseInt(5, 10) + 0.5
      ),
      filteredReview: [],
      filtering: false,
      searchKey: '',
      searchKeyFixed: '',
      rating: this.averageRating(props.review)
    }
  }

  averageRating(review) {
    if (review.length === 0) return 0
    let total = 0
    for (var i = 0; i < review.length; i++) {
      total += review[i].star
    }
    return parseFloat(total / review.length)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSearch(e) {
    e.preventDefault()
    const { searchKey } = this.state
    const { review } = this.props

    var filteredReview = []

    for (var i = 0; i < review.length; i++) {
      const normalizeReview = review[i].review.toLowerCase()
      if (normalizeReview.includes(searchKey.toLowerCase())) {
        filteredReview.push(review[i])
      }
    }
    this.setState({
      filtering: true,
      filteredReview: filteredReview,
      currentPage: 1,
      totalPage: Math.round(
        parseInt(filteredReview.length, 10) / parseInt(5, 10) + 0.5
      ),
      searchKeyFixed: this.state.searchKey
    })
  }

  resetSearch() {
    this.setState({
      filtering: false,
      filteredReview: [],
      currentPage: 1,
      totalPage: Math.round(
        parseInt(this.props.review.length, 10) / parseInt(5, 10) + 0.5
      ),
      searchKeyFixed: ''
    })
  }

  firstPage() {
    this.setState({ currentPage: 1 })
  }

  nextPage() {
    const { currentPage, totalPage } = this.state
    if (currentPage < totalPage) {
      this.setState({ currentPage: currentPage + 1 })
    }
  }

  prevPage() {
    const { currentPage } = this.state
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 })
    }
  }

  lastPage() {
    const { totalPage } = this.state
    this.setState({ currentPage: totalPage })
  }

  render() {
    const { classes } = this.props
    const { currentPage, perPage } = this.state
    let Rating = require('react-rating')

    // const totalPage = Math.round(parseInt(this.props.review.length, 10) /  parseInt(perPage, 10)+0.5)
    var review = []
    if (this.state.filtering === false) {
      const indexOfLast = currentPage * perPage
      const indexOfFirst = indexOfLast - perPage
      const currentReview = this.props.review.slice(indexOfFirst, indexOfLast)

      review = currentReview.map(r => {
        return (
          <div
            key={uuid.v4()}
            style={{ marginTop: '10px', marginBottom: '10px' }}
          >
            <ReviewRow review={r} />
            <Divider />
            <Divider />
          </div>
        )
      })
    } else {
      var searchHeadline = []
      if (this.state.filtering === true) {
        searchHeadline.push(
          <SearchHeadline
            resetSearch={this.resetSearch.bind(this)}
            guest={this.state.filteredReview.length}
            searchKey={this.state.searchKeyFixed}
            key={uuid.v4()}
          />
        )
      }
      const indexOfLast = currentPage * perPage
      const indexOfFirst = indexOfLast - perPage
      const currentReview = this.state.filteredReview.slice(
        indexOfFirst,
        indexOfLast
      )

      review = currentReview.map(r => {
        return (
          <div
            key={uuid.v4()}
            style={{ marginTop: '10px', marginBottom: '10px' }}
          >
            <ReviewRow review={r} />
            <Divider />
            <Divider />
          </div>
        )
      })
    }

    return (
      <div>
        <div>
          <h1>Review Section</h1>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <h1>{this.props.review.length} Reviews</h1>
              <Rating
                readonly
                initialRating={this.state.rating}
                emptySymbol={
                  <img src={like_empty} className="icon" alt="emptyicon" />
                }
                fullSymbol={<img src={like} className="icon" alt="emptyicon" />}
              />
            </div>
            <div className="col-6">
              <form
                noValidate
                autoComplete="off"
                onSubmit={this.handleSearch.bind(this)}
              >
                <TextField
                  label="Search"
                  type="search"
                  className={classes.textField}
                  onChange={this.onChange.bind(this)}
                  margin="normal"
                  name="searchKey"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </form>
            </div>
          </div>

          {searchHeadline}
        </div>

        {review}

        <div>
          <Paginate
            firstPage={this.firstPage.bind(this)}
            lastPage={this.lastPage.bind(this)}
            prevPage={this.prevPage.bind(this)}
            nextPage={this.nextPage.bind(this)}
            currentPage={this.state.currentPage}
            totalPage={this.state.totalPage}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ReviewComponent)
