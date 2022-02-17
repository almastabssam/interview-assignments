import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AudioListScreen from '../containers/AutdioListScreen';
import PlayAudio from '../containers/PlayAudio';

const HomeStack = createNativeStackNavigator();
const HomeStackContainer = () => {
    return (
        <NavigationContainer>
            <HomeStack.Navigator initialRouteName="AudioList">
                <HomeStack.Screen name="AudioList" component={AudioListScreen}/>
                <HomeStack.Screen name="PlayAudio" component={PlayAudio}/>
            </HomeStack.Navigator>
        </NavigationContainer>
    );
};
export default HomeStackContainer;
