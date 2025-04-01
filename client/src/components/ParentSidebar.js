const ParentSidebar = ({ setActiveView, sidebarOpen, handleLogout }) => {
    return (
      <nav className={`nav ${sidebarOpen ? "open" : ""}`}>
        <button onClick={() => setActiveView("parentProfile")}>Profiili</button>
        <button onClick={() => setActiveView("linkChild")}>Linkitä lapsi</button>
        <button
          className="settings-button"
          onClick={() => setActiveView("settings")}
        >
          Asetukset
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Kirjaudu ulos
        </button>
      </nav>
    );
  };
  
  export default ParentSidebar;