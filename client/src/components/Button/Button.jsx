import { button } from "./Button.module.css";

/* eslint-disable react/prop-types */
export default function Button({ children, disabled = false, onClick = null }) {
  return (
    <button className={button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
