import { useState } from "react";
import styles from "./App.module.css";
import Canvas from "./components/Canvas";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

const NUMBERREGEX = /^[0-9e+-.]*$/;

function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [mass, setMass] = useState<string>("5.9722e+24");
    const [radius, setRadius] = useState<string>("6.371e+7");
    const [color, setColor] = useState<string>("#b30092");
    /* const [direction, setDirection] = useState<number>(0);
    const [speed, setSpeed] = useState<string>("0"); */

    return (
        <div className={styles.app}>
            <div className={styles.settingsContainer}>
                <div className={styles.settings}>
                    <Input
                        placeholder="mass"
                        onChange={(e) => setMass(e.currentTarget.value)}
                        value={mass}
                        showCurrent={mass.match(NUMBERREGEX) ? parseFloat(mass).toString() : "NaN"}
                        label="Mass (kg)"
                        error={mass && !mass.match(NUMBERREGEX) ? "Invalid number" : undefined}
                    />
                    <Input
                        placeholder="radius"
                        onChange={(e) => setRadius(e.currentTarget.value)}
                        value={radius}
                        showCurrent={radius.match(NUMBERREGEX) ? parseFloat(radius).toString() : "NaN"}
                        label="Radius (m)"
                        error={radius && !radius.match(NUMBERREGEX) ? "Invalid number" : undefined}
                    />
                    <Input
                        label="Color"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.currentTarget.value)}
                        style={{ paddingTop: 1, paddingBottom: 1 }}
                    />
                    Presets:
                    <div style={{display: 'flex'}}>
                        <Button 
                            onClick={() => {
                                setColor('#0000FF');
                                setRadius('6.371e+7')
                                setMass('5.9722e+24')
                            }}
                        >
                            Earth
                        </Button>
                        <Button 
                            onClick={() => {
                                setColor('#FF00FF');
                                setRadius('6.371e+7')
                                setMass('5.9722e+25')
                            }}
                        >
                            Heavy Earth
                        </Button>
                    </div>
                    {/* Direction and speed not supported yet */}
                    {/* <Input
                        placeholder="speed"
                        onChange={(e) => setSpeed(e.currentTarget.value)}
                        value={speed}
                        showCurrent={speed.match(NUMBERREGEX) ? parseFloat(speed).toString() : "NaN"}
                        label="Speed (m/s)"
                        error={speed && !speed.match(NUMBERREGEX) ? "Invalid number" : undefined}
                    /> */}
                    {/* <Input
                        label="Direction"
                        type="range"
                        value={direction}
                        onChange={(e) => setDirection(parseInt(e.currentTarget.value))}
                        style={{ padding: 0, backgroundColor: "black" }}
                    />
                    <div
                        className={styles.directionCircle}
                        style={{ backgroundColor: color }}>
                        <div className={styles.directionDot}></div>
                    </div> */}
                </div>
                <Button onClick={() => setIsRunning((cur) => !cur)}>{isRunning ? "STOP" : "PLAY"}</Button>
            </div>
            <Canvas
                isRunning={isRunning}
                mass={mass.match(NUMBERREGEX) ? parseFloat(mass) : 0}
                radius={radius.match(NUMBERREGEX) ? parseFloat(radius) : 0}
                color={color}
                // direction={direction}
                // speed={speed.match(NUMBERREGEX) ? parseFloat(speed) : 0}
            />
        </div>
    );
}

export default App;
