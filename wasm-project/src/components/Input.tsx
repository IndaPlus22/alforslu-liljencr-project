import React from "react";
import styles from "./Input.module.css";

type InputProps = {
    label?: string;
    error?: string;
    showCurrent?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Input({ onClick, style, placeholder, onChange, value, label, error, showCurrent, type }: InputProps) {
    return (
        <div className={styles.container}>
            <p>
                {label}: {showCurrent}
            </p>
            <input
                type={type}
                className={styles.input}
                onClick={onClick}
                style={style}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            <p style={{ color: "#BB0000", height: "1em" }}>{error}</p>
        </div>
    );
}
