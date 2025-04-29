import Login from '../pages/Login';
//import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import '../App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Submission_Portal from '../pages/Submission_Portal';
import CreatePosting from '../pages/CreatePosting';
import MyAccount from '../pages/MyAccount';
import Postings from '../pages/Postings';
import { Provider } from 'react-redux';
import store from '../store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className='content'>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/postings' component={Postings}/>
              <Route exact path='/login' component={Login} />
              <Route exact path='/postings/submission-portal' component={Submission_Portal}/>
              <Route exact path='/my-account' component={MyAccount}/>
              <Route exact path='/my-account/create-posting' component={CreatePosting}/>
              
            </Switch>

          </div>

        </div>
      </Router>

    </Provider>

    
   
  );
}

export default App;
