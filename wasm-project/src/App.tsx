import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import init, { add } from "wasm-lib";
import Canvas from "./components/Canvas";

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
                <button onClick={() => setIsRunning((cur) => !cur)}>{isRunning ? "Stop" : "Start"}</button>
            </div>
            <Canvas isRunning={isRunning} />
        </div>
    );
}

export default App;
