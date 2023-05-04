import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import init, { add } from "wasm-lib";

function App() {
    const [ans, setAns] = useState(0);
    useEffect(() => {
        init().then(() => {
            setAns(add(1, 1));
        });
    }, []);

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }, []);

    return (
        <div className={styles.app}>
            <canvas
                className={styles.canvas}
                ref={canvasRef}
            />
        </div>
    );
}

export default App;
