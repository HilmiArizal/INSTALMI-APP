import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Icon, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Axios from 'axios';
import { API_URL } from '../helpers/API_URL';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    inputContainerStyle: {
        marginTop: 50,
        marginBottom: 100,
        width: '80%'
    }
})

class RegisterForm extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        confimrPassword: '',
        hidePassword: true,
        hideConfirmPassword: true,
        btnRegisterLoading: false,
        error: ''
    }

    onBtnRegister = async () => {
        try {
            this.setState({ btnRegisterLoading: true, error: '' })
            if (this.state.username !== '' && this.state.email !== '' && this.state.password !== '' && this.state.confimrPassword !== '') {

                if (this.state.password === this.state.confimrPassword) {
                    const res = await Axios.post(API_URL + `/user/register`, {
                        username: this.state.username,
                        email: this.state.email,
                        password: this.state.password
                    })
                    this.setState({ btnRegisterLoading: false, error: 'Akun berhasil dibuat!'})
                    console.log(res.data)
                    this.setState({ 
                        btnRegisterLoading: false,
                        username: '',
                        email: '',
                        password: '',
                        confimrPassword: ''
                     })
                } else {
                    this.setState({ btnRegisterLoading: false, error: 'Password and Confirm Password tidak sama!' })
                }
            } else {
                this.setState({ btnRegisterLoading: false, error: 'Semua harus di isi!' })
            }
        } catch (err) {
            this.setState({ btnRegisterLoading: false, error: err.response.data.message })
        }
    }

    render() {
        const { containerStyle, inputContainerStyle } = styles
        return (
            <View style={containerStyle}>
                <Text h4>
                    JOIN WITH INSTAL<Text h4 style={{ color: 'red' }}>MI</Text>!
                </Text>
                <View style={inputContainerStyle}>
                    <Input
                        placeholder='Username'
                        leftIcon={
                            <Icon
                                name='account-circle'
                                size={24}
                                color='black'
                            />
                        }
                        value={this.state.username}
                        onChangeText={(val) => this.setState({ username: val.toLowerCase().replace(/\s/g, '') })}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='email'
                                size={24}
                                color='black'
                            />
                        }
                        value={this.state.email}
                        onChangeText={(val) => this.setState({ email: val })}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='black'
                            />
                        }
                        rightIcon={
                            <Icon
                                name={this.state.hidePassword ? 'visibility-off' : 'visibility'}
                                size={24}
                                color={this.state.hidePassword ? '#bfc3c9' : 'black'}
                                onPress={() => this.setState({ hidePassword: !this.state.hidePassword })}
                            />
                        }
                        value={this.state.password}
                        onChangeText={(val) => this.setState({ password: val })}
                        secureTextEntry={this.state.hidePassword}
                    />
                    <Input
                        placeholder='Confirm Password'
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='black'
                            />
                        }
                        rightIcon={
                            <Icon
                                name={this.state.hideConfirmPassword ? 'visibility-off' : 'visibility'}
                                size={24}
                                color={this.state.hideConfirmPassword ? '#bfc3c9' : 'black'}
                                onPress={() => this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword })}
                            />
                        }
                        value={this.state.confimrPassword}
                        onChangeText={(val) => this.setState({ confimrPassword: val })}
                        secureTextEntry={this.state.hideConfirmPassword}
                    />
                
                        <Text style={{ color: 'red', textAlign:'center' }}>{this.state.error}</Text>
       
                </View>
                <Button
                    title="Submit"
                    containerStyle={{ width: '70%', marginBottom: 10 }}
                    buttonStyle={{ backgroundColor: 'red', borderColor: 'white', borderWidth: 1 }}
                    titleStyle={{ color: 'white' }}
                    type="outline"
                    onPress={this.onBtnRegister}
                    loading={this.state.btnRegisterLoading}
                />
                <Button
                    title="Back to Login"
                    containerStyle={{ width: '70%' }}
                    buttonStyle={{ backgroundColor: 'black' }}
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}

export default RegisterForm;