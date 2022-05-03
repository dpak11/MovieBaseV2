import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Gallery from "./components/MovieGallery";
import MovieDetail from "./components/MovieDetail";
import { MovieProvider } from "./store/MovieContext";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import "./css/App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Nav />
        <MovieProvider>
          <div>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/details/:id" component={MovieDetail} />
              <Route path="/*" component={() => <Redirect to="/" />} />
            </Switch>
          </div>
          <Footer />
        </MovieProvider>
      </div>
    </Router>
  );
}

export default App;
