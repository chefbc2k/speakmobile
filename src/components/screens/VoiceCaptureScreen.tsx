import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-nativescript";
import { SpeechRecognition } from "nativescript-speech-recognition";
import { TNSRecorder } from '@nativescript-community/audio';
import { AudioVisualization } from "../ui/AudioVisualization";
import { RecordButton } from "../ui/RecordButton";
import { TranscriptionDisplay } from "../ui/TranscriptionDisplay";

export function VoiceCaptureScreen() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState("");
    const [audioLevel, setAudioLevel] = useState(0);
    
    const speechRecognition = new SpeechRecognition();
    const recorder = useRef(new TNSRecorder());
    const meterIntervalRef = useRef<any>(null);

    useEffect(() => {
        return () => {
            if (meterIntervalRef.current) {
                clearInterval(meterIntervalRef.current);
            }
            if (recorder.current) {
                recorder.current.dispose();
            }
        };
    }, []);

    const startRecording = async () => {
        try {
            const available = await speechRecognition.available();
            if (available) {
                setIsRecording(true);
                
                // Start recording
                await recorder.current.start({
                    filename: "recording.m4a",
                    metering: true,
                    format: "m4a"
                });

                // Simulate audio level updates
                meterIntervalRef.current = setInterval(() => {
                    const randomLevel = Math.random() * -60;
                    setAudioLevel(randomLevel);
                }, 100);

                // Start speech recognition
                speechRecognition.startListening({
                    locale: "en-US",
                    onResult: (transcription) => {
                        setTranscription(transcription.text);
                    },
                    onError: (error) => {
                        console.error(error);
                    }
                });
            }
        } catch (error) {
            console.error("Recording error:", error);
        }
    };

    const stopRecording = async () => {
        try {
            if (meterIntervalRef.current) {
                clearInterval(meterIntervalRef.current);
                meterIntervalRef.current = null;
            }
            
            await recorder.current.stop();
            speechRecognition.stopListening();
            setIsRecording(false);
            setAudioLevel(0);
        } catch (error) {
            console.error("Stop recording error:", error);
        }
    };

    return (
        <stackLayout style={styles.container}>
            <AudioVisualization level={audioLevel} />
            
            <RecordButton 
                isRecording={isRecording}
                onPress={isRecording ? stopRecording : startRecording}
            />

            <TranscriptionDisplay text={transcription} />
        </stackLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5"
    }
});
