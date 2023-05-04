import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import init, { add } from "wasm-lib";
import Canvas from "./components/Canvas";
import { Button } from "./components/Button";

function App() {
    const [ans, setAns] = useState(0);
    useEffect(() => {
        init().then(() => {
            setAns(add(1, 1));
        });
    }, []);

    const [isRunning, setIsRunning] = useState(false);

    return (
        <div className={styles.app}>
            <div className={styles.settings}>
                <div
                    className={styles.settings}
                    style={{ flex: 1 }}></div>
                <Button
                    style={{ marginBottom: "20px" }}
                    onClick={() => setIsRunning((cur) => !cur)}>
                    {isRunning ? "STOP" : "PLAY"}
                </Button>
            </div>
            <Canvas isRunning={isRunning} />
        </div>
    );
}

export default App;
