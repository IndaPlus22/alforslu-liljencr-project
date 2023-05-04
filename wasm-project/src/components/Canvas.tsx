import React, { useCallback, useEffect, useState } from "react";
import { get_attraction_force_vector2 } from "wasm-lib";

import styles from "./Canvas.module.css";

interface Body {
    position: [number, number];
    direction: [number, number];
    mass: number;
    radius: number;
    color: string;
}

const SCALE = 1e-6;

interface CanvasProps {
    isRunning: boolean;
}

export default function Canvas({ isRunning }: CanvasProps) {
    /* States */
    const [bodies, setBodies] = useState<Body[]>([]);
    const [update, setUpdate] = useState(false);
    const [i, setI] = useState<NodeJS.Timeout>();

    /* Refs */
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    /* Calculate new planet locations */
    useEffect(() => {   
        if (!isRunning) {
            if (i) {
                clearInterval(i);
            }
        } 
        else {
            const j = setInterval(() => {
                // calculate new positions
                const newBodies = bodies.map((b) => {
                    for (const b2 of bodies) {
                        if (b === b2) continue;
                        const force = get_attraction_force_vector2(b.mass, b2.mass, b.position as unknown as Float64Array, b2.position as unknown as Float64Array);
                        console.log("b.mass : " + b.mass);
                        console.log("b2.mass : " + b2.mass);
                        console.log("b.position : " + b.position);
                        console.log("b2.position : " + b2.position);
                        console.log("force : " + force);
                        b.direction[0] += force[0] * 1e-21;
                        b.direction[1] += force[1] * 1e-21;
                    }
                    b.position[0] += b.direction[0];
                    b.position[1] += b.direction[1];
    
                    console.log(b.position);
                    return b;
                });

                clearCanvas();
                setBodies(newBodies);
            }, 1000);
            setI(j);
        }
        
        return () => clearInterval(i);
    }, [isRunning]);

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

    /* clear the canvas */
    const clearCanvas = (ctx?: CanvasRenderingContext2D | null) => {
        if (!ctx) {
            ctx = getCanvasContext();
            if (!ctx) return;
        }

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    /* resize canvas when window is resized */
    useEffect(() => {
        /* resize canvas to min(page width, page height) */
        const resizeCanvas = () => {
            const ctx = getCanvasContext();
            if (!ctx) return;

            const size = Math.min(window.innerWidth - 390, window.innerHeight * 0.9);
            ctx.canvas.width = size;
            ctx.canvas.height = size;
            clearCanvas(ctx);
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

        if (isRunning) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = getCanvasContext();
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        ctx.fillStyle = "red";
        const position: [number, number] = [e.clientX - rect.left, e.clientY - rect.top];
        setBodies((cur) => [
            ...cur,
            { // TODO: add input for these values
                position,
                direction: [0*SCALE, 0*SCALE],  // Newtons
                mass: 5.9722*(10**24)*SCALE, // KGs
                radius: 63710000*SCALE, // meters
                color: "purple", // poopy 
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
        <canvas
            className={styles.canvas}
            ref={canvasRef}
            onClick={onClick}
        />
    );
}
