import React from "react";

function UsernameInput({ value, onChange }) {
  return (
    <div>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default UsernameInput;