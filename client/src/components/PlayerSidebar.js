const PlayerSidebar = ({ onViewChange, sidebarOpen, handleLogout }) => {
  return (
    <nav className={`nav ${sidebarOpen ? "open" : ""}`}>
      <button onClick={() => onViewChange("home")}>Koti</button>
      <button onClick={() => onViewChange("profile")}>Profiili</button>
      <button onClick={() => onViewChange("stats")}>Tilastot</button>
      <button onClick={() => onViewChange("startTraining")}>
        Tee harjoitus
      </button>
      <button onClick={() => onViewChange("completedTrainings")}>
        Tehdyt harjoitukset
      </button>

      <button onClick={() => onViewChange("joinTeam")}>
        Liity joukkueeseen
      </button>

      <button onClick={() => onViewChange("settings")}>
        Asetukset
      </button>
      <button onClick={handleLogout}>
        Kirjaudu ulos
      </button>
    </nav>
  );
};

export default PlayerSidebar;
