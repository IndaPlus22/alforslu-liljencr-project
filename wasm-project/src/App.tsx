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
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    const getCanvasContext = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return null;
        }
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return null;
        }
        return ctx;
    };

    const resizeCanvas = () => {
        const ctx = getCanvasContext();
        if (!ctx) return;

        const size = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9);
        ctx.canvas.width = size;
        ctx.canvas.height = size;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    const onClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = getCanvasContext();
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.fillStyle = "red";
        const vector2D = [e.clientX - rect.left, e.clientY - rect.top];
        circle(ctx, vector2D[0], vector2D[1], 25);
    };

    const circle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };

    return (
        <div className={styles.app}>
            <canvas
                className={styles.canvas}
                ref={canvasRef}
                onClick={onClick}
            />
        </div>
    );
}

export default App;
