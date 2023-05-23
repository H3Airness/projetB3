import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input">
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        value={value}
        onChange={onChange}
      />
      <FontAwesomeIcon
        icon={showPassword ? faEyeSlash : faEye}
        className="password-icon"
        onClick={toggleShowPassword}
      />
    </div>
  );
};

export default PasswordInput;
