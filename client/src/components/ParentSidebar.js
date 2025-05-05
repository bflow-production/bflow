const ParentSidebar = ({ onViewChange, sidebarOpen, handleLogout }) => {
  return (
    <nav className={`nav ${sidebarOpen ? "open" : ""}`}>
      <button onClick={() => onViewChange("parentProfile")}>Profiili</button>
      <button onClick={() => onViewChange("linkChild")}>Linkitä lapsi</button>
      <button onClick={() => onViewChange("settings")}>Asetukset</button>
      <button onClick={handleLogout}>Kirjaudu ulos</button>
    </nav>
  );
};

export default ParentSidebar;
