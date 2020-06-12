import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Components
import PageWrapper from "./Components/Layouts/PageWrapper";

// Pages
import MasukPage from "./Pages/MasukPage";
import HomePage from "./Pages/HomePage";

// Admin Pengguna
import Pengguna from "./Pages/Admin/Pengguna/Pengguna";
import TambahPengguna from "./Pages/Admin/Pengguna/TambahPengguna";
import EditPengguna from "./Pages/Admin/Pengguna/EditPengguna";

// Admin Barang
import DataBarang from "./Pages/Admin/Barang/DataBarang";
import TambahBarang from "./Pages/Admin/Barang/TambahBarang";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/masuk" component={MasukPage} />
        <PageWrapper>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/pengguna" component={Pengguna} />
          <Route exact path="/pengguna/tambah" component={TambahPengguna} />
          <Route exact path="/pengguna/edit/:id" component={EditPengguna} />

          <Route exact path="/barang" component={DataBarang} />
          <Route exact path="/barang/tambah" component={TambahBarang} />
          <Redirect to="/" />
        </PageWrapper>
      </Switch>
    </Router>
  );
}

export default App;
