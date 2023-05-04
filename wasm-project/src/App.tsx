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

    return (
        <div className={styles.app}>
            <Canvas />
        </div>
    );
}

export default App;
