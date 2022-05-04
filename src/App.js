import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Gallery from "./components/MovieGallery";
import MovieDetail from "./components/MovieDetail";
import { MovieProvider } from "./store/MovieContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate  
} from "react-router-dom";

import "./css/App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Nav />
        <MovieProvider>
          <div>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/details/:id" element={<MovieDetail />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </MovieProvider>
      </div>
    </Router>
  );
}

export default App;
