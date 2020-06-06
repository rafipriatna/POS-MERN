import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// Components
import CheckToken from './Components/CheckToken'
import PageWrapper from './Components/PageWrapper'

// Pages
import MasukPage from './Pages/MasukPage'
import HomePage from './Pages/HomePage'

// Admin Pengguna
import Pengguna from './Pages/Admin/Pengguna/Pengguna'
import TambahPengguna from './Pages/Admin/Pengguna/TambahPengguna'
import EditPengguna from './Pages/Admin/Pengguna/EditPengguna'

// Admin Barang
import DataBarang from './Pages/Admin/DataBarang'

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/masuk" component={MasukPage}/>
        <CheckToken>
          <PageWrapper>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/pengguna" component={Pengguna}/>
            <Route exact path="/pengguna/tambah" component={TambahPengguna}/>
            <Route exact path="/pengguna/edit/:id" component={EditPengguna}/>

            <Route exact path="/barang" component={DataBarang}/>
            <Redirect to="/"/>
          </PageWrapper>
        </CheckToken>
      </Switch>
    </Router>
  )
}

export default App;
