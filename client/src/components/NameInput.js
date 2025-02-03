import React from "react";

function UserNameInput({ value, onChange }) {
  return (
    <div>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default UserNameInput;