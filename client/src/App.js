import React,{Component} from 'react';
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Switch, Link  } from 'react-router-dom';
import Predict from './components/Predict';
import Qrcodecl from './components/Qrcodecl';

class App extends Component{
  render()
   {
    const {classes} =this.props;
    return(
      <>
     <div>
     </div>
    <BrowserRouter>
    <Switch>
    <Route exact path="/" component={Login}/>
     <Route path="/predict" component={Predict}/>
     <Route path="/qrcodecl" component={Qrcodecl}/>
    </Switch>
  </BrowserRouter>
  <div>
     </div>
      </>
    );
  }
}
export default App;
