import logo from './logo.svg';
import './App.css';
import Header from "./Components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import {router} from "./router";
import Footer from "./Components/Footer";


function App() {
  return (
      <BrowserRouter>
          <div className="wrapper">
              <Header/>
              <div className="content">
                  {router()}
              </div>
              <Footer/>
          </div>
      </BrowserRouter>
  );
}

export default App;
