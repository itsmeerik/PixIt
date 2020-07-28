import * as React from 'react';
import { View, Text, Image, Button, FormLabel, TextInput, FormValidationMessage } from 'react-native';

export default LoginScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <Text>What's your name?</Text>
            <TextInput placeholder="Username" />
            <Text>Password:</Text>
            <TextInput secureTextEntry={true} placeholder="Password" />
            <Button title="Don't have an account?" onPress={() => navigation.navigate('Signup')} />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}
