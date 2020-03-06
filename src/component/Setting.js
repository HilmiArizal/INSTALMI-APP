import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { onUserLogout } from '../actions';
import { CommonActions } from '@react-navigation/native';

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

class Settings extends Component {

    componentDidUpdate() {
        if (!this.props.user.id) {
           const resetAction = CommonActions.reset({
               index: 0,
               routes: [
                   {name: "Login"}
               ]
           });
           this.props.rootStackNavigation.dispatch(resetAction)
        }
    }

    state = {}
    render() {
        const { containerStyle } = styles;
        return (
            <View style={containerStyle}>
                <Button
                    title="Log Out"
                    containerStyle={{
                        marginVertical: 15,
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        width: '90%'
                    }}
                    titleStyle={{ color: 'white' }}
                    onPress={this.props.onUserLogout}
                />
            </View>
        );
    }
}

const mapStatetoProps = ({ user }) => {
    return { user }
}

export default connect(mapStatetoProps, { onUserLogout })(Settings);