import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-path">
        <button className="home">
          <a href="/">Home</a>
        </button>
      </div>
      <div className="sidebar-path">
        <button className="about">
          <a href="/about">About</a>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
