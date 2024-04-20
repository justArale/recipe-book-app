import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="home">
        <a href="/">Home</a>
      </h3>
      <h3 className="about">
        <a href="/about">About</a>
      </h3>
    </aside>
  );
}

export default Sidebar;
