import React from "react";
import styles from "./MyInput.module.css"

const MyInput = ({value, onChange, placeholder, type = "text", ...props}) => {
  return (
    <input 
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={styles.input}
    {...props}
    />
  );
};

export default MyInput;
