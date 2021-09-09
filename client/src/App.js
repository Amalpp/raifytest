
import './App.css';
import {BrowserRouter as Router ,Route} from "react-router-dom";
import Login from './components/login/Login';
import Stock from './components/StockHome/Stock';

function App() {
  return (
    <div className="App">
    <Router>
    <Route path="/" exact><Login/></Route>
    <Route path="/stocks"><Stock/></Route>
    
    
    </Router>
    </div>
  );
}

export default App;
