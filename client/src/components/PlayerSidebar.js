const PlayerSidebar = ({ setActiveView, sidebarOpen, handleLogout }) => {
  return (
    <nav className={`nav ${sidebarOpen ? "open" : ""}`}>
      <button onClick={() => setActiveView("home")}>Koti</button>
      <button onClick={() => setActiveView("profile")}>Profiili</button>
      <button onClick={() => setActiveView("stats")}>Tilastot</button>
      <button onClick={() => setActiveView("startTraining")}>
        Tee harjoitus
      </button>
      <button onClick={() => setActiveView("completedTrainings")}>
        Tehdyt harjoitukset
      </button>

      <button onClick={() => setActiveView("joinTeam")}>
        Liity joukkueeseen
      </button>

      <button className="settings-button" onClick={() => setActiveView("settings")}>
        Asetukset
      </button>
      <button className="logout-button" onClick={handleLogout}>
        Kirjaudu ulos
      </button>
    </nav>
  );
};

export default PlayerSidebar;
