import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom';
const Sidebar = (props) => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">

              
              <Link to="/">
                <li className="nav-item">
                   <div className="lead">
                   Explore<i className="fas fa-binoculars" 
                            style={{
                              cursor:'pointer',
                              float:'right',
                              marginTop:'0.25em',
                              marginRight:'3.75em'
                            }}
                    />
                  </div>
                </li>
              </Link>
              
              <li className="nav-item">
                  <div className="lead">My Houses</div>
                <ul>
                  <div>
                  <li className="nav-item">
                    <Link to="/myhouses" className="nav-link">
                      <i className="fas fa-binoculars" 
                          style={{
                            cursor:'pointer',
                            float:'right',
                            marginTop:'0.8em',
                            marginRight:'4em'
                            }}> 
                      </i>
                      </Link>View</li>
                  </div>

                  <li className="nav-item">
                    <Link to="/addHouse" className="nav-link">
                      <i className="fas fa-plus" 
                          style={{
                            cursor:'pointer',
                            float:'right',
                            marginTop:'0.8em',
                            marginRight:'4em'
                          }}> </i>
                    </Link>Add
                     </li>
                </ul>
              </li>

              <h3>Features</h3>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span data-feather="shopping-cart"></span>
                  My Bookings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span data-feather="users"></span>
                  Customers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span data-feather="bar-chart-2"></span>
                  Reports
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span data-feather="layers"></span>
                  Integrations
                </a>
              </li>
            </ul>

            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Saved reports</span>
              <a className="d-flex align-items-center text-muted" href="/">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span data-feather="file-text"></span>
                  Current month
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span data-feather="file-text"></span>
                  Last quarter
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span data-feather="file-text"></span>
                  Social engagement
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <span data-feather="file-text"></span>
                  Year-end sale
                </a>
              </li>
            </ul>
          </div>
        </nav>
  )
}

export default Sidebar
