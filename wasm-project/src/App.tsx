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

    return (
        <div className={styles.app}>
            <header className={styles.appHeader}>
                <p>1 + 1 = {ans}</p>
            </header>
        </div>
    );
}

export default App;
