import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Component/privateRoutes';
import { Provider } from 'react-redux';
import store from './Store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute path="/" exact component={Dashboard} />
          </Switch>
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
        </Router>
      </Provider>
    </>
  );
}

export default App;
