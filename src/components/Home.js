

const Home = () => {
  const homestyle = {
    height: "80vh",
    backgroundColor: "#2D7064",
    fontSize: ".9em",
    padding: "20px 40px",
    color: "#d8cfcf",
  };
  const apilink = {
    background: "red",
    padding: "3px",
    color: "#e28b8b",
    backgroundColor: "rgba(58, 44, 44, 0.5)"
  }

  return (
    <div style={homestyle}>
      <h1>Welcome to React Movie Base (V2.0)</h1>
      <p>
        <li>
          The Gallery page will load Top 200 movies from the MovieDB API{" "}
          <span style={apilink}>
          https://api.themoviedb.org
          </span>
        </li>
        <li>
         You can then Filter through the Movies by genre,name,rating, date,  or all combined.
        </li>
      </p>
    </div>
  );
};

export default Home;
