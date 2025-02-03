import React from "react";

function PasswordInput({ value, onChange }) {
  return (
    <div>
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default PasswordInput;