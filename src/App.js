import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import MovieGallery from "./components/MovieGallery";
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
              <Route path="/gallery" element={<MovieGallery />} />
              <Route path="/details/:id" element={<MovieDetail />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </div>          
        </MovieProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
