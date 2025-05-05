const CoachSidebar = ({ onViewChange, sidebarOpen, handleLogout }) => {
  return (
    <nav className={`nav ${sidebarOpen ? "open" : ""}`}>
      <button onClick={() => onViewChange("coachProfile")}>Profiili</button>
      <button onClick={() => onViewChange("createExercise")}>
        Luo harjoitus
      </button>
      <button onClick={() => onViewChange("createTeam")}>Luo joukkue</button>
      <button onClick={() => onViewChange("settings")}>Asetukset</button>
      <button onClick={handleLogout}>Kirjaudu ulos</button>
    </nav>
  );
};

export default CoachSidebar;
