const CoachSidebar = ({ setActiveView, sidebarOpen, handleLogout }) => {
  return (
    <nav className={`nav ${sidebarOpen ? "open" : ""}`}>
      <button onClick={() => setActiveView("coachProfile")}>Profiili</button>
      <button onClick={() => console.log("Luo harjoitus kesken")}>
        Luo harjoitus
      </button>
      <button onClick={() => setActiveView("coach")}>Luo joukkue</button>
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

export default CoachSidebar;
