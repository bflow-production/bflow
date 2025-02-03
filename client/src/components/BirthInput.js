import React from "react";

function BirthYearInput({ value, onChange }) {
  return (
    <div>
      <label>Birth Year:</label>
      <input
        type="number"
        name="birthYear"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default BirthYearInput;