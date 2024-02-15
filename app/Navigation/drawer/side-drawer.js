import React from 'react';
import {Image} from 'react-native';
import style from './style';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawer} from '../../component';
import {imagePath, colorStrings} from '../../constants';
import {heightToDp, widthToDp} from '../../utils';
import TabRoutes from '../tab-routes';

const Drawer = createDrawerNavigator();

const SideDrawer = () => {
  return (
    <>
      {/* <View style={style.container}>
        <Headline>Home screen </Headline>
        <Button
          mode="contained"
          onPress={() => navigation.openDrawer()}></Button>
      </View> */}

      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          unmountOnBlur: true,

          drawerStyle: {
            borderTopEndRadius: 10,
            // borderWidth: 2,
            // borderColor: '#A9A9A9',
            padding: 0,
            margin: 0,
            backgroundColor: colorStrings.TRANSPARENT_WHITE_O9,
            // backgroundColor: colorStrings.TRANSPARENT_YELLOW_O9,
            // backgroundColor: colorStrings.COLOR_PRIMARY_YELLOW,
            opacity: 1,
            width: widthToDp(75),
          },
          headerTintColor: colorStrings.NEON_BLUE,
        }}>
        <Drawer.Screen
          name="Dashboard"
          component={TabRoutes}
          options={{
            drawerIcon: ({focused: boolean, color: string, size: number}) => {
              return <Image source={imagePath.icHome} style={style.itemIcon} />;
            },
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default SideDrawer;
