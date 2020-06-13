import React, { Component } from "react";
import { Link } from "react-router-dom";

// Functions
import { checkToken } from "../../Functions/AuthFunction";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: [],
    };
  }
  async componentDidMount() {
    const check = await checkToken();
    if (check) {
      const data = JSON.parse(JSON.stringify(check));
      this.setState({
        dataUser: data,
      });
    }
  }
  render() {
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/#"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            POS <sup>MERN</sup>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="sidebar-divider my-0" />
        <hr className="sidebar-divider" />
        {this.state.dataUser.level === 0 && (
          <div>
            <div className="sidebar-heading">Administrator</div>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/pengguna"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-fw fa-users"></i>
                <span>Pengguna</span>
              </Link>
              <Link
                className="nav-link collapsed"
                to="/#"
                data-toggle="collapse"
                data-target="#barang"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-fw fa-box"></i>
                <span>Barang</span>
              </Link>
              <div
                id="barang"
                className="collapse"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">Pengaturan barang</h6>
                  <Link to="/barang" className="collapse-item">
                    Data Barang
                  </Link>
                  <Link to="/barang/kategori" className="collapse-item">
                    Kategori Barang
                  </Link>
                </div>
              </div>
            </li>
          </div>
        )}
        <div className="sidebar-heading">Kasir</div>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/penjualan"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-shopping-cart"></i>
            <span>Penjualan</span>
          </Link>
        </li>
      </ul>
    );
  }
}
