import React, { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import init, { add, get_attraction_force_vector2 } from "wasm-lib";

interface Body {
    position: [number, number];
    direction: [number, number];
    mass: number;
    radius: number;
    color: string;
}

function App() {
    const [ans, setAns] = useState(0);
    useEffect(() => {
        init().then(() => {
            setAns(add(1, 1));
        });
    }, []);

    /* States */
    const [bodies, setBodies] = useState<Body[]>([]);
    const [update, setUpdate] = useState(false);

    /* Refs */
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    /* Calculate new planet locations */
    useEffect(() => {
        const i = setInterval(() => {
            let scale = 100000000;
            // calculate new positions
            const newBodies = bodies.map((b) => {
                for (const b2 of bodies) {
                    if (b === b2) continue;
                    const force = get_attraction_force_vector2(b.mass, b2.mass, b.position as unknown as Float64Array, b2.position as unknown as Float64Array);
                    b.direction[0] += force[0] * scale;
                    b.direction[1] += force[1] * scale;
                    console.log("Moved", b.direction[0], b.direction[1]);
                }
                b.position[0] += b.direction[0];
                b.position[1] += b.direction[1];

                return b;
            });
            console.log("Bodiess", bodies);
            console.log("New bodies", newBodies);

            setBodies(newBodies);
        }, 1000);

        return () => clearInterval(i);
    }, []);

    /* memoize drawBodies, update it if bodies or update changes */
    const drawBodies = useCallback(() => {
        const ctx = getCanvasContext();
        if (!ctx) return;

        for (const b of bodies) {
            ctx.fillStyle = b.color;
            circle(ctx, b.position[0], b.position[1], b.radius);
        }
    }, [bodies, update]);

    /* call drawBodies when it is updated */
    useEffect(() => {
        drawBodies();
    }, [drawBodies]);

    /* resize canvas when window is resized */
    useEffect(() => {
        /* resize canvas to min(page width, page height) */
        const resizeCanvas = () => {
            const ctx = getCanvasContext();
            if (!ctx) return;

            const size = Math.min(window.innerWidth, window.innerHeight) * 0.9;
            ctx.canvas.width = size;
            ctx.canvas.height = size;
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            setUpdate((cur) => !cur);
        };

        /* call it once, then add event listener */
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    /* get canvas context */
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

    /* add body when canvas is clicked */
    const onClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = getCanvasContext();
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.fillStyle = "red";
        const position: [number, number] = [e.clientX - rect.left, e.clientY - rect.top];
        setBodies((cur) => [
            ...cur,
            {
                position,
                direction: [0, 0],
                mass: 1000,
                radius: 25,
                color: "purple",
            },
        ]);
    };

    /* draw a circle */
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
