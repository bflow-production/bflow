import { useState } from "react";

const SettingsView = () => {
    const [selectedOption, setSelectedOption] = useState("Valmentaja");

    const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="settings-view">
      <h1>Käyttäjänimi</h1>
      <h2>Asetukset</h2>
      <div class="kielet">
        <p>Kieli: </p>
      </div>
      <div class="harjoitukset">
        <p>Harjoitusten jakaminen:</p>
        <label className="vaihtoehdot">
        <input
          type="radio"
          value="Valmentaja"
          checked={selectedOption === "Valmentaja"}
          onChange={handleChange}
        />
        Valmentaja
      </label>
      <label>
        <input
          type="radio"
          value="Huoltaja"
          checked={selectedOption === "Huoltaja"}
          onChange={handleChange}
        />
        Huoltaja
      </label>
      </div>
      <div class= "vaihda-salasana">
        <p>Vaihda salasana:</p>
      </div>
    </div>
  );
};

export default SettingsView;