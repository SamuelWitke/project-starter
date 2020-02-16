import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link,
  NavLink
} from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import PostFormPage from './pages/PostFormPage';
import ShowPostPage from './pages/ShowPostPage';

import './App.css';


function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm ">
       <ul className="navbar-nav mr-auto">
       <li className="nav-item">
       <NavLink className="nav-link" exact to="/">
           Table  
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/posts/new">
            Create a Entry 
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}


class App extends React.Component {
  render() {
    return (
        <Router>
          <Navigation />
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                <Route path="/posts/new" component={PostFormPage} />
                <Route path="/posts/:id" component={ShowPostPage} />
                <Route path="/" component={PostsListPage} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
