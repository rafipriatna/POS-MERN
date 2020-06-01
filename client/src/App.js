import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Components
import CheckToken from './Components/CheckToken'
import PageWrapper from './Components/PageWrapper'
import MasukPage from './Components/Pages/MasukPage'
import HomePage from './Components/Pages/HomePage'
import Pengguna from './Components/Pages/Admin/Pengguna'
import DataBarang from './Components/Pages/Admin/DataBarang'

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/masuk" component={MasukPage}/>
        <CheckToken>
          <PageWrapper>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/pengguna" component={Pengguna}/>
            <Route exact path="/barang" component={DataBarang}/>
          </PageWrapper>
        </CheckToken>
      </Switch>
    </Router>
  )
}

export default App;
