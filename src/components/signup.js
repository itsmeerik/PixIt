import * as React from 'react';
import { View, Text, Image, Button, FormLabel, TextInput, StyleSheet } from 'react-native';

export default SignupScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.headline}>Who are you, dude?</Text>
            <TextInput placeholder="Username/Email" />
            <Text style={styles.headline}>Make a Secret Safe Word:</Text>
            <TextInput secureTextEntry={true} placeholder="Password" />
            <Button style={styles.return} title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%'
    },
    headline: {
        marginTop: 50,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    return: {
        marginTop: 1000,
    }
})
