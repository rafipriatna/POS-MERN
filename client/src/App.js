import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Components
import CheckToken from './Components/CheckToken'
import PageWrapper from './Components/PageWrapper'
import HomePage from './Components/Pages/HomePage'
import MasukPage from './Components/Pages/MasukPage'

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/masuk" component={MasukPage}/>
        <CheckToken>
          <PageWrapper>
            <Route exact path="/" component={HomePage}/>
          </PageWrapper>
        </CheckToken>
      </Switch>
    </Router>
  )
}

export default App;
