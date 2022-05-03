

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
    backgroundColor: "rgba(139, 124, 124, 0.5)"
  }

  return (
    <div style={homestyle}>
      <h1>Welcome to React Movie Base (Homepage)</h1>
      <p>
        <li>
          The Gallery Link will load random list of movies from external API{" "}
          <span style={apilink}>
            https://api.mockaroo.com/api/671ec130?key=30660820
          </span>
        </li>
        <li>
          Filter through the loaded Movies by Category or by Genre or by searching
          the movie name. Or all combined.
        </li>
      </p>
    </div>
  );
};

export default Home;
