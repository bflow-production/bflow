import React from "react";

function CountryInput({ value, onChange }) {
  return (
    <div>
      <label>Country:</label>
      <input
        type="text"
        name="country"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default CountryInput;