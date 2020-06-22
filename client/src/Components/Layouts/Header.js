import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

// Components
import Navigation from "./Navigation";

// Functions
import { checkToken } from "../../Functions/AuthFunction";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      dataUser: [],
    };
  }

  logOut(e) {
    e.preventDefault();
    localStorage.clear("userAuth");
    localStorage.clear("userData");
    window.location = "/masuk";
  }

  async componentDidMount() {
    const check = await checkToken();
    if (check) {
      const data = JSON.parse(JSON.stringify(check));
      this.setState({
        login: true,
        dataUser: data,
      });
    } else {
      localStorage.clear("userAuth");
      this.setState({ login: false });
    }
  }

  render() {
    if (this.state.login === false) return <Redirect to="/masuk" />;
    return (
      <div id="wrapper">
        <Navigation level={this.state} />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars"></i>
              </button>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/#"
                    id="searchDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-search fa-fw"></i>
                  </Link>
                  <div
                    className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown"
                  >
                    <form className="form-inline mr-auto w-100 navbar-search">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control bg-light border-0 small"
                          placeholder="Search for..."
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>

                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      {this.state.dataUser.nama}
                    </span>
                    {this.state.dataUser.foto && (
                      <img
                        className="img-profile rounded-circle"
                        alt=""
                        src={
                          "http://localhost:5000/images/profile/" +
                          this.state.dataUser.foto
                        }
                      />
                    )}
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <a className="dropdown-item" href="/#">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </a>
                    <a className="dropdown-item" href="/#">
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                      Settings
                    </a>
                    <a className="dropdown-item" href="/#">
                      <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                      Activity Log
                    </a>
                    <div className="dropdown-divider"></div>
                    <a
                      className="dropdown-item"
                      href="/#"
                      onClick={this.logOut}
                    >
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
