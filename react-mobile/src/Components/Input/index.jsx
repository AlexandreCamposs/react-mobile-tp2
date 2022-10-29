import React, { useState } from "react";
import { Inputs } from "./styles.js";

const Input = ({ label, value, onChangeText, type }) => {
  return (
    <>
      <Inputs
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        type={type}
        secureTextEntry={type === "password"}
      />
    </>
  );
};

export default Input;
