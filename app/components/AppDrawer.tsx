import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator()

export default function AppDrawer(props: any) {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                {props.children}
            </Drawer.Navigator>
        </NavigationContainer>
    )
}