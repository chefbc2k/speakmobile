import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface AudioVisualizationProps {
    level: number;
}

export const AudioVisualization: React.FC<AudioVisualizationProps> = ({ level }) => {
    const height = Math.max(10, Math.abs(level) * 2); // Scale the level to visible height

    return (
        <stackLayout style={styles.container}>
            <stackLayout style={[styles.bar, { height }]} />
        </stackLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    bar: {
        width: 20,
        backgroundColor: "#007AFF",
        minHeight: 10
    }
});
