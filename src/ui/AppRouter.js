import React from 'react'
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import CardComponent from './screens/card/CardComponent'
import {Provider} from 'react-redux'
import Store from '../redux/store/Store'
import CardDetailComponent from './screens/card/CardDetailComponent'


function AppRouter() {
    return (
     <Provider store= {Store}>
           <Router>
           <Switch>
               <Route path='/' exact component={CardComponent}/>
               <Route path= '/cards' exact component={CardDetailComponent} />

           </Switch>
       </Router>
     </Provider>
    )
}

export default AppRouter
