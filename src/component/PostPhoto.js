import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Button, Input, Header } from 'react-native-elements';
import { Icon } from 'native-base';
import { connect } from 'react-redux'
import { onInputCaptionChange, onImagePostChange, postingPhoto } from '../actions'
import ImagePicker from 'react-native-image-crop-picker';

class PostPhoto extends Component {

    onBtnSelectGalery = () => {
        ImagePicker.openPicker({
            width: 700,
            height: 700,
            cropping: true,
            mediaType: 'photo'
        }).then(image => {
            console.log(image);
            this.setState({ isVisible: false })
            this.props.onImagePostChange(image)
        }).catch(err => {
            console.log(err)
        })
    }

    onBtnOpenCamera = () => {
        ImagePicker.openCamera({
            width: 700,
            height: 700,
            cropping: true,
            mediaType: 'photo'
        }).then(image => {
            console.log(image);
            this.setState({ isVisible: false })
            this.props.onImagePostChange(image)
        }).catch(err => {
            console.log(err)
        })
    }

    onBtnPostImage = () => {
        this.props.postingPhoto(this.props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    leftComponent={{
                        text: 'Select Image',
                        style: { color: 'black', fontSize: 18, fontWeight: '700' }
                    }}
                    leftContainerStyle={{ flex: 3 }}
                    containerStyle={{
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        marginTop: Platform.OS === ' ios' ? 0 : - 25,
                        elevation: 2
                    }}
                />
                <ScrollView>
                    <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
                        <Button
                            icon={
                                <Icon
                                    name="photo-library"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Select from Gallery"
                            onPress={this.onBtnSelectGalery}
                            containerStyle={{ marginBottom: 15 }}
                            buttonStyle={{ backgroundColor: 'black' }}
                        />
                        <Button
                            icon={
                                <Icon
                                    name="photo-camera"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Open Camera"
                            onPress={this.onBtnOpenCamera}
                            buttonStyle={{ backgroundColor: 'black' }}
                        />
                        <Input
                            placeholder='Caption'
                            onChangeText={this.props.onInputCaptionChange}
                            value={this.props.caption}
                        />
                    </View>
                    <View
                        style={{
                            marginHorizontal: 15,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Image
                            source={{ uri: this.props.image ? this.props.image.path : null }}
                            style={{ height: 350, width: '100%' }}
                        />
                    </View>
                    <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
                        <Text style={{ color: 'red' }}>{this.props.error}</Text>
                        <Button
                            icon={
                                <Icon
                                    name="cloud-upload"
                                    size={30}
                                    color="white"
                                />
                            }
                            title="Post Image"
                            buttonStyle={{backgroundColor: 'black'}}
                            onPress={this.onBtnPostImage}
                            loading={this.props.loading}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStatetoProps = ({ postPhoto }) => {
    return {
        ...postPhoto
    }
}

export default connect(mapStatetoProps, { onInputCaptionChange, onImagePostChange, postingPhoto })(PostPhoto);