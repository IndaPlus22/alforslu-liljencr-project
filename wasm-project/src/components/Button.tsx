import React, { useEffect, useState } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    children: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

export function Button({ children, onClick, style }: ButtonProps) {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={style}>
            <span>{children}</span>
        </button>
    );
}
