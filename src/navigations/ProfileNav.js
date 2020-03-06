import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../component/Profile';
import EditProfile from '../component/EditProfile';
import PostDetailProfile from '../component/PostDetailProfile';


const Stack = createStackNavigator()

export default (props) => {
    return (
        <Stack.Navigator
            initialRouteName="Profile"
            headerMode="none"
        >

            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile}/>
            <Stack.Screen name="PostDetailProfile" component={PostDetailProfile}/>
        </Stack.Navigator>
    )
}