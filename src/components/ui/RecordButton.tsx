import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface RecordButtonProps {
    isRecording: boolean;
    onPress: () => void;
}

export function RecordButton({ isRecording, onPress }: RecordButtonProps) {
    return (
        <flexboxLayout>
            <button
                className={`record-button ${isRecording ? 'recording' : ''}`}
                style={styles.button}
                onTap={onPress}
            >
                {isRecording ? "Stop" : "Record"}
            </button>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#ff4444",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlignment: "center",
        verticalAlignment: "middle",
        margin: 20
    }
});