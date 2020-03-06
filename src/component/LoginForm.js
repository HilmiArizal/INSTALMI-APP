import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, Input, Icon, Button } from 'react-native-elements';
import { onInputText, hideUnhidePassword, onUserLogin, userLoginCheck } from '../actions'
import { StackActions } from '@react-navigation/native'

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

class LoginForm extends Component {

    componentDidMount() {
        this.props.userLoginCheck()
    }

    componentDidUpdate() {
        if (this.props.user.token) {
            this.props.navigation.dispatch(StackActions.replace('DrawerMenu'))
        }
    }

    onBtnLogin = () => {
        this.props.onUserLogin(this.props.loginForm)
        // this.props.onUserLogin({
        //     email: this.props.loginForm.email,
        //     password: this.props.loginForm.password  ====>> BISA MENGGUNAKAN CARA SEPERTI INI
        // })
    }

    render() {

        if (this.props.user.authChecked && !this.props.user.id) {
            const { containerStyle, inputContainerStyle } = styles
            return (
                <View style={containerStyle}>
                    <Text h3>
                        INSTAL<Text h3 style={{ color: 'red' }}>MI</Text>
                    </Text>
                    <View style={inputContainerStyle}>
                        <Input
                            placeholder='Email'
                            leftIcon={
                                <Icon
                                    name='email'
                                    size={24}
                                    color='black'
                                />
                            }
                            value={this.props.loginForm.email}
                            onChangeText={(val) => this.props.onInputText('email', val)}
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
                                    name={this.props.loginForm.hidePassword ? 'visibility-off' : 'visibility'}
                                    size={24}
                                    color={this.props.loginForm.hidePassword ? '#bfc3c9' : 'black'}
                                    onPress={() => this.props.hideUnhidePassword()}
                                />
                            }
                            value={this.props.loginForm.password}
                            onChangeText={(val) => this.props.onInputText('password', val)}
                            secureTextEntry={this.props.loginForm.hidePassword}
                        />
                    </View>
                    <Text style={{ color: 'red', textAlign: 'center' }}>{this.props.loginForm.error}</Text>
                    <Button
                        title="Login"
                        containerStyle={{ width: '70%', marginBottom: 10 }}
                        buttonStyle={{ backgroundColor: 'black' }}
                        onPress={this.onBtnLogin}
                        loading={this.props.loginForm.loading}

                    />
                    <Button
                        title="Register"
                        containerStyle={{ width: '70%' }}
                        buttonStyle={{ backgroundColor: 'red', borderColor: 'white', borderWidth: 1 }}
                        titleStyle={{ color: 'white' }}
                        type="outline"
                        onPress={() => this.props.navigation.navigate('Register')}
                    />
                </View>
            );
        }
        return (
            <View style={styles.containerStyle}>
                <Icon type="feather" name="instagram" size={70}/>
                <Text h3>
                    INSTAL<Text h3 style={{ color: 'red' }}>MI</Text>
                </Text>
            </View>
        )

    }
}

const mapStatetoProps = ({ user, loginForm }) => {
    return { user, loginForm }
}

export default connect(mapStatetoProps, { onInputText, hideUnhidePassword, onUserLogin, userLoginCheck })(LoginForm);