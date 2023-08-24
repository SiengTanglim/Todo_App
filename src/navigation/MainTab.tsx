import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import style, {deviceWidth} from '../styles';
import Home from '../components/main_tab/Home';
import Favourite from '../components/main_tab/Favourite';
import Cart from '../components/main_tab/Cart';
import Account from '../components/main_tab/Account';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  const inset = useSafeAreaInsets();
  const renderIcon = (name: string, icon_name: any, color: any) => {
    return (
      <>
        <Ionicons name={icon_name} color={color} size={25} />
        <Text style={[styles.title,
            {
              color,
              opacity: color == colors.secondColor ? 1 : 0.5,
            }]}>{name}</Text>
        {/* <TextTranslate
          style={[
            styles.title,
            {
              color,
              opacity: color == colors.secondColor ? 1 : 0.5,
            },
          ]}
          numberOfLines={1}
        >
          {name}
        </TextTranslate> */}
      </>
    );
  };
  return (
    <>
      <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondColor,
        tabBarInactiveTintColor: colors.inActiveColor,
        tabBarAllowFontScaling: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.whiteColor,
          minHeight: 53 + inset.bottom,
          elevation: 1,
          paddingTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color }) => renderIcon('Home', focused ? 'home' : 'home-outline', color),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({ focused,color }) => renderIcon('Favourite', focused ? 'ios-heart-sharp' : 'ios-heart-outline' , color),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused,color }) => renderIcon('Cart', focused ? 'ios-cart' : 'ios-cart-outline' , color),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused,color }) =>
            renderIcon('account', focused ? 'person' : 'person-outline' , color),
        }}
      />
    </Tab.Navigator>
    </>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  title: {
    ...style.p,
    fontSize:13,
    width: deviceWidth / 3,
    textAlign: 'center',
  }
});
