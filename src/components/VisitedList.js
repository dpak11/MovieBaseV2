const VisitedList = ({ visited }) => {
  const toggleFullName = (e) => {
    const fullName = e.target.getAttribute("data-name");
    if (fullName.length > 20) {
      if (e.target.textContent === fullName) {
        e.target.textContent = `${fullName.substr(0, 19)}...`;
        return;
      }
    }
    e.target.textContent = fullName;
  };
  const trimMovieName = (name) => {
    if (name.length > 20) {
      return `${name.substr(0, 19)}...`;
    }
    return name;
  };
  return (
    <p>
      {visited.map((page, i) => (
        <span
          onClick={toggleFullName}
          data-name={`${page}`}
          className="visitedStyle"
          key={i}
        >
          {trimMovieName(page)}
        </span>
      ))}
    </p>
  );
};

export default VisitedList
