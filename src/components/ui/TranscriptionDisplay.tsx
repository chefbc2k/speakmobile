import * as React from "react";
import { StyleSheet } from "react-nativescript";

interface TranscriptionDisplayProps {
    text: string;
}

export const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ text }) => {
    return (
        <stackLayout>
            <label 
                className="transcription"
                style={styles.text}
            >
                {text || "Speak to see transcription..."}
            </label>
        </stackLayout>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: "#333",
        textAlignment: "center",
        padding: 20,
        width: "100%"
    }
});
