import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableFooter from "@material-ui/core/TableFooter"
import Divider from "@material-ui/core/Divider"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import TablePaginationActions from "./TablePaginationActions"
import ReviewRow from "./ReviewRow"

let counter = 0
function createData(user, date, content) {
  counter += 1
  return { id: counter, name, calories, fat }
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
})

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [
      createData("Cupcake", 305, 3.7),
      createData("Donut", 452, 25.0),
      createData("Eclair", 262, 16.0),
      createData("Frozen yoghurt", 159, 6.0),
      createData("Gingerbread", 356, 16.0),
      createData("Honeycomb", 408, 3.2),
      createData("Ice cream sandwich", 237, 9.0),
      createData("Jelly Bean", 375, 0.0),
      createData("KitKat", 518, 26.0),
      createData("Lollipop", 392, 0.2),
      createData("Marshmallow", 318, 0),
      createData("Nougat", 360, 19.0),
      createData("Oreo", 437, 18.0),
      createData("Cupcake", 305, 3.7),
      createData("Donut", 452, 25.0),
      createData("Eclair", 262, 16.0),
      createData("Frozen yoghurt", 159, 6.0),
      createData("Gingerbread", 356, 16.0),
      createData("Honeycomb", 408, 3.2),
      createData("Ice cream sandwich", 237, 9.0),
      createData("Jelly Bean", 375, 0.0),
      createData("KitKat", 518, 26.0),
      createData("Lollipop", 392, 0.2),
      createData("Marshmallow", 318, 0),
      createData("Nougat", 360, 19.0),
      createData("Oreo", 437, 18.0)
    ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
    page: 0,
    rowsPerPage: 5
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  render() {
    const { classes } = this.props
    const { rows, rowsPerPage, page } = this.state
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow key={row.id}>
                      <ReviewRow name={row.name} />
                      <Divider />
                    </TableRow>
                  )
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[0]}
                  page={page}
                  onChangePage={this.handleChangePage}
                  ActionsComponent={TablePaginationActions}
                  labelDisplayedRows={({ from, to, count }) =>
                    "page " +
                    Math.round(page + 1) +
                    " of " +
                    Math.round(rows.length / rowsPerPage + 0.5)
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomPaginationActionsTable)
