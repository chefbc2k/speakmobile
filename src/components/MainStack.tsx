import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { VoiceCaptureScreen } from "./screens/VoiceCaptureScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { InfoScreen } from "./screens/InfoScreen";
import { PaymentScreen } from "./screens/PaymentScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="VoiceCapture"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#65adf1",
                },
                headerTintColor: "white",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="VoiceCapture"
                component={VoiceCaptureScreen}
                options={{ title: "Voice Analysis" }}
            />
            <StackNavigator.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "My Profile" }}
            />
            <StackNavigator.Screen
                name="Info"
                component={InfoScreen}
                options={{ title: "Information" }}
            />
            <StackNavigator.Screen
                name="Payment"
                component={PaymentScreen}
                options={{ title: "Subscription" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);