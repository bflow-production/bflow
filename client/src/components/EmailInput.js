import React from "react";

function EmailInput({ value, onChange }) {
  return (
    <div>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default EmailInput;