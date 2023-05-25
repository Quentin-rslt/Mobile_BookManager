import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import NavBar from './src/components/buttons/NavBar';
import { createStackNavigator } from '@react-navigation/stack';
import AddBookScreen from './src/Screens/book/AddBookScreen';
import Client from './src/Common/class/Client';
import CommonStyles from './src/styles/CommonStyles';
import { COLORS } from './src/Common/CommonColors';
import AddTagScreen from './src/Screens/tag/AddTagScreen';
import EditBookScreen from './src/Screens/book/EditBookScreen';
import EditTagScreen from './src/Screens/tag/EditTagScreen';

const Stack = createStackNavigator();

export default function App() {

    const client = useMemo(() => new Client(), []);
    
    const [ isLoad, setIsLoad ] = useState<boolean>(false);

    const loadClient = async () => {
        await client.fetchAll();
        
        setIsLoad(true);
    }

    useEffect(() => {
        loadClient();
    }, []);

    
    if(!isLoad) {
        return (
            <View style={CommonStyles.container}>
                <ActivityIndicator style={CommonStyles.firstLoader} size="large" color={COLORS.accentColor}/>
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="NavBar" component={NavBar} options={{ headerShown: false }} initialParams={{ client }}/>
                <Stack.Screen name="AddBookScreen" component={AddBookScreen} options={{ headerShown: false, animationEnabled: false }} initialParams={{ client }}/>
                <Stack.Screen name="EditBookScreen" component={EditBookScreen} options={{ headerShown: false, animationEnabled: false }} initialParams={{ client }}/>
                <Stack.Screen name="AddTagScreen" component={AddTagScreen} options={{ headerShown: false, animationEnabled: false }} initialParams={{ client }}/>
                <Stack.Screen name="EditTagScreen" component={EditTagScreen} options={{ headerShown: false, animationEnabled: false }} initialParams={{ client }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
