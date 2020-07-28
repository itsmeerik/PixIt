import * as React from 'react';
import axios from 'axios';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { View, Text, Image, Button, StyleSheet, Animated, PanResponder, Easing, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import { response } from 'express';

export default class ChooseScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationResult: null,
            geolocation: {
                latitiude: null,
                longitude: null,
            },
            hasLocationPermissions: false,
            errorMsg: '',
            data: [],
            modalVisible: false,
            clicked: '',
            modalImage: '',
            count: 0,
        }
        this.getImages = this.getImages.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.handleCounter = this.handleCounter.bind(this);
    }

    getImages() {
        const term = this.props.route.params.search;
        const { geolocation } = this.state;
        axios.get('http://127.0.0.1:3000/food', { params: { search: term, location: geolocation } })
        .then(response => {
            // console.log(response);
            // let chunk = [];
            // let smallerChunk = [];
            // let obj = {};
            // let images = [];
            // response.data.forEach(obj => {
            //     chunk.push(obj);
            // })
            // console.log('chunk: ', chunk);
            // for (let i = 0; i < chunk.length; i++) {
            //     for (let j = 0; j < chunk[i].photos.length; j++) {
            //         smallerChunk.push(chunk[i].photos[j]);
            //     }
            // }
            // console.log(smallerChunk);
            this.setState({ data: response.data });
        })
        .catch(err => console.log(err));
    }

    componentDidMount = () => {
        this.getLocationAsync();
    }

    handlePress(image, name) {
        this.setModalVisible(!this.state.modalVisible);
        this.setState({ clicked: name, modalImage: image });
    }

    handleCounter() {
        // const { clicked } = this.state;
        // console.log(clicked);
        // if (clicked === 'Golden Boy Pizza') {
        //     this.setState({ count: response.data.count });
        //     if (this.state.count === 6) {
        //         alert(`CONGRATS YOUR CHOICE IS ${clicked}`)
        //     }
        //     axios.patch('http://localhost:3000/user', { choice: clicked, user: 'Host' })
        //     .then(response => console.log('RESPONSE: ', response))
        //     .catch(err => console.log(err));
        //     console.log('GOLDEN PICKED');
        // } else if (clicked === 'Square Pie Guys') {
        //     this.setState({ count: response.data.count });
        //     if (this.state.count === 6) {
        //         alert(`CONGRATS YOUR CHOICE IS ${clicked}`)
        //     }
        //     axios.patch('http://localhost:3000/user', { choice: clicked, user: 'Host' })
        //     .then(response => console.log('RESPONSE: ', response))
        //     .catch(err => console.log(err));
        //     console.log('SQUARE PICKED');
        // } else if (clicked === 'Tony\'s Pizza Napoletana') {
        //     this.setState({ count: response.data.count });
        //     if (this.state.count === 6) {
        //         alert(`CONGRATS YOUR CHOICE IS ${clicked}`)
        //     }
        //     axios.patch('http://localhost:3000/user', { choice: clicked, user: 'Host' })
        //     .then(response => console.log('RESPONSE: ', response))
        //     .catch(err => console.log(err));
        //     console.log('TONY PICKED');
        // } else if (clicked === 'Jersey') {
        //     this.setState({ count: response.data.count });
        //     if (this.state.count === 6) {
        //         alert(`CONGRATS YOUR CHOICE IS ${clicked}`)
        //     }
        //     axios.patch('http://localhost:3000/user', { choice: clicked, user: 'Host' })
        //     .then(response => console.log('RESPONSE: ', response))
        //     .catch(err => console.log(err));
        //     console.log('JERSEY PICKED');
        // }
    }

    

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    getLocationAsync = async () => {

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied', 
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }
        let location = await Location.getCurrentPositionAsync({});
        JSON.stringify(location);
        this.setState({ geolocation: {
            latitiude: location.coords.latitude,
            longitide: location.coords.longitude,
        }}, () => {
            this.getImages();
        });
    }


    
    render() {
        const { modalVisible, modalImage, data } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffe0b3' }}>
                <Text>Pick Anything Enticing!</Text>
                {/* {
                    this.getSnapshotBeforeUpdate.locationResult === null ?
                    <Text>Finding your current location...</Text> :
                    this.state.hasLocationPermissions === false ?
                    <Text>Map Region doesn't exist.</Text>
                } */
                /* <Text>Location: {this.state.geolocation.latitude} {this.state.geolocation.longitude}</Text> */}
                <View style={styles.centeredView}>
                            <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Image source={{ uri: modalImage }} style={{ height: 300, width: 300, borderColor: 'pink', borderWidth: 10, alignItems: 'stretch', }}/>
                                        <TouchableHighlight
                                        style={{ ...styles.openButton }}
                                        onPress={() => {
                                            this.handleCounter();
                                            this.setModalVisible(!modalVisible);
                                        }}>
                                        <Text style={{ backgroundColor: 'white' }}>Choose</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                <View style={styles.imgContainer}>
                    {
                        data.map((item) => 
                            <YelpImages images={item.photos} press={this.handlePress} name={item.name} />
                            )
                    }
                </View>
            </View>
        );
    }
}

class YelpImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
        this.props.press(e, this.props.name);
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                <TouchableOpacity activeOpacity={ 0.5 } onPress={() => { this.imageClicked(this.props.images[0]); }}>
                <Image source={{ uri: this.props.images[0] }} style={styles.images} />
                </TouchableOpacity>
                </View>
                <View style={styles.imgContainer}>
                <TouchableOpacity activeOpacity={ 0.5 } onPress={() => { this.imageClicked(this.props.images[1]); }}>
                <Image source={{ uri: this.props.images[1] }} style={styles.images} />
                </TouchableOpacity>
                </View>
                <View style={styles.imgContainer}>
                <TouchableOpacity activeOpacity={ 0.5 } onPress={() => { this.imageClicked(this.props.images[2]); }}>
                <Image source={{ uri: this.props.images[2] }} style={styles.images} />
                </TouchableOpacity>
                </View>
            </View>
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
        alignContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 20,
        marginHorizontal: 5,
        marginVertical: 2,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    images: {
        height: 100,
        width: 100,
        padding: 50,
        borderColor: 'pink',
        borderWidth: 10,
    },
    modalView: {
        top: 100,
        position: 'absolute',
        margin: 20,
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
