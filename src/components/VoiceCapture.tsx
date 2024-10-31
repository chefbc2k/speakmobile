import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-nativescript";
import { SpeechRecognition } from "@nativescript/speech-recognition";
import { TNSTextToSpeech } from "@nativescript/text-to-speech";
import { TNSRecorder } from '@nativescript-community/audio';
import nlp from 'compromise';

export function VoiceCapture() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState("");
    const speechRecognition = new SpeechRecognition();
    const tts = new TNSTextToSpeech();
    const recorder = new TNSRecorder();

    const startRecording = async () => {
        try {
            const available = await speechRecognition.available();
            if (available) {
                setIsRecording(true);
                
                // Start audio recording
                await recorder.start({
                    filename: "recording.m4a",
                    metering: true,
                    format: "m4a"
                });

                // Start speech recognition
                speechRecognition.startListening({
                    locale: "en-US",
                    onResult: (transcription) => {
                        setTranscription(transcription.text);
                        analyzeText(transcription.text);
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
            await recorder.stop();
            speechRecognition.stopListening();
            setIsRecording(false);
        } catch (error) {
            console.error("Stop recording error:", error);
        }
    };

    const analyzeText = (text: string) => {
        const doc = nlp(text);
        const topics = doc.topics().json();
        const sentiment = doc.sentiment();
        
        console.log("Topics:", topics);
        console.log("Sentiment:", sentiment);
    };

    const speakText = async (text: string) => {
        try {
            await tts.speak({
                text: text,
                locale: "en-US",
                pitch: 1,
                speakRate: 1
            });
        } catch (error) {
            console.error("TTS error:", error);
        }
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl mb-4 font-bold text-center">
                Voice Capture
            </label>
            
            <button
                className={`p-4 rounded-full ${isRecording ? 'bg-red-500' : 'bg-blue-500'}`}
                onTap={isRecording ? stopRecording : startRecording}
            >
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>

            {transcription && (
                <flexboxLayout style={styles.transcriptionContainer}>
                    <label className="text-lg mb-2">Transcription:</label>
                    <label className="text-base mb-4">{transcription}</label>
                    <button
                        className="bg-green-500 p-2 rounded"
                        onTap={() => speakText(transcription)}
                    >
                        Speak Text
                    </button>
                </flexboxLayout>
            )}
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    transcriptionContainer: {
        marginTop: 20,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    }
});