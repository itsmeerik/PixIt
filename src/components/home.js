import * as React from 'react';
import { View, Text, Image, Button, StyleSheet, Animated, PanResponder, Easing, Modal, TouchableHighlight, Alert } from 'react-native';
// import { Easing } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChooseScreen from './choose.js';

class HomeScreen extends React.Component {
    constructor({ navigation }) {
        super({ navigation });
        this.state = {
            data: [
                {
                    type: 'pastries',
                    image: require('../../food-pics/bakery.png')
                },
                {
                    type: 'burgers',
                    image: require('../../food-pics/burger.png')
                },
                {
                    type: 'chicken',
                    image: require('../../food-pics/chicken.png')
                },
                {
                    type: 'donuts',
                    image: require('../../food-pics/donuts.png')
                },        {
                    type: 'hotdogs',
                    image: require('../../food-pics/hotdog.png')
                },
                {
                    type: 'kebabs',
                    image: require('../../food-pics/kebab.png')
                },        {
                    type: 'pancakes',
                    image: require('../../food-pics/pancakes.png')
                },
                {
                    type: 'pasta',
                    image: require('../../food-pics/pasta.png')
                },        {
                    type: 'pizza',
                    image: require('../../food-pics/pizza.png')
                },
                {
                    type: 'sandwiches',
                    image: require('../../food-pics/sandwich.png')
                },        {
                    type: 'a steakhouse',
                    image: require('../../food-pics/steakhouse.png')
                },
                {
                    type: 'sushi',
                    image: require('../../food-pics/sushi.png')
                },        {
                    type: 'tacos',
                    image: require('../../food-pics/tacos.png')
                },
                {
                    type: 'waffles',
                    image: require('../../food-pics/waffles.png')
                },
            ],
            index: '',
            modalVisible: false,
            clicked: '',
        };
        this.handlePress = this.handlePress.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.animatedValue = new Animated.Value(0);
    }

    handlePress(event, i) {
        console.log(i);
        const { modalVisible, data } = this.state;
        this.setState({ index: i, clicked: data[i].type });
        this.setModalVisible(!modalVisible);
    }


    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
            {/* <Button title="Go to Login" onPress={() => navigation.navigate('Login')} /> */}
            const { navigation } = this.props;
            const { modalVisible, clicked } = this.state;
                return (
                    <View style={styles.container}>
                        <View style={styles.centeredView}>
                            <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Do you want {clicked}?</Text>
                                        <TouchableHighlight
                                        style={{ ...styles.openButton }}
                                        onPress={() => {
                                            this.setModalVisible(!modalVisible);
                                            navigation.navigate('Choose', { search: clicked });
                                        }}>

                                            <Text>Yawp</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                        style={{ ...styles.openButton }}
                                        onPress={() => {
                                            this.setModalVisible(!modalVisible);
                                        }}>
                                            <Text>Nope</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={styles.imgContainer}>
                            {
                                this.state.data.map((item, i) => 
                                    <Images image={item.image} index={i} press={this.handlePress} />
                                    )
                            }
                        </View>
                    </View>
                );
    }
}

class Images extends React.Component {
    constructor(props) {
        super(props)
        this.handleAnimation = this.handleAnimation.bind(this);
        this.animatedValue = new Animated.Value(0); 
        this.imageClicked = this.imageClicked.bind(this);
    }

    handleAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.animatedValue,
                    {
                        toValue: 50.0,
                        duration: 1000,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }),
                Animated.timing(this.animatedValue,
                    {
                        toValue: -50.0,
                        duration: 2000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                Animated.timing(this.animatedValue,
                    {
                        toValue: 0.0,
                        duration: 1000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    })
            ])
        ).start();
    }

    imageClicked = (e) => {
        console.log('clicked');
        this.props.press(e, this.props.index);
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={ 0.5 } onPress={() => { this.imageClicked(); this.handleAnimation(); }}>
            <Animated.Image source={this.props.image} resizeMode='contain'
                            style={{
                                transform: [{
                                    rotate: this.animatedValue.interpolate({
                                        inputRange: [-1, 1],
                                        outputRange: ['-0.1rad', '0.1rad']
                                    })
                                }]
                            }} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    imgContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginHorizontal: 30,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        top: 100,
        position: 'absolute',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});


  export default HomeScreen;