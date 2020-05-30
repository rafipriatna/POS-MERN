import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

// Components
import PageWrapper from './Components/PageWrapper'
import Home from './Components/Pages/Home'
import MasukPage from './Components/Pages/MasukPage'

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/masuk" component={MasukPage}/>
        <PageWrapper>
          <Route exact path="/" component={Home}/>
        </PageWrapper>
      </Switch>
    </Router>
  )
}

export default App;
