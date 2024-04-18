import "./Sidebar.css";

function Sidebar() {
  return (
    <aside>
      <ul className="sidebar">
        <li className="home">
          <a href="#">Home</a>
        </li>
        <li className="about">
          <a href="#">About</a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
