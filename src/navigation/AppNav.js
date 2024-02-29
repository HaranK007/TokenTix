import React from 'react';
import {Platform,View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {HomeIcon as HomeOutline,TicketIcon, CalendarDaysIcon, RadioIcon } from 'react-native-heroicons/outline';
import {HomeIcon as HomeSolid, CalendarDaysIcon as CalendarDaysIconSolid,RadioIcon as RadioIconSolid, TicketIcon as TicketIconSolid} from 'react-native-heroicons/solid';

import Home from '../screens/Home';
import RegisteredEvents from '../screens/RegisteredEvents';
import HostingEvents from '../screens/HostingEvents';
import Tickets from '../screens/Tickets';
import EventDetails from '../screens/EventDetails';
import { themeColors } from '../theme/Colors';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS == 'ios';



export default function AppNav() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{
            contentStyle: {backgroundColor:'white'}
        }}>
            <Stack.Screen name="Home" options={{headerShown: false}} component={HomeNav} />
            <Stack.Screen name="EventsDetails" options={{headerShown: false}} component={EventDetails} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

function HomeNav(){
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          marginBottom: 20,
          height: 75,
          alignItems: 'center',
          
          borderRadius: 100,
          marginHorizontal: 20,
          backgroundColor: themeColors.bgLight,

        },
        tabBarItemStyle: {
          marginTop: ios? 30: 0,
          
        }
      })}
      
      >
        <Tab.Screen name='home' component={Home} />
        <Tab.Screen name='registered' component={RegisteredEvents} />
        <Tab.Screen name='hosting' component={HostingEvents} />
        <Tab.Screen name='tickets' component={Tickets} />
    </Tab.Navigator>
    )
}

const menuIcons = (route, focused)=> {
    let icon;
    
  
    if (route.name === 'home') {
      icon =  focused? <HomeSolid size="30" color={themeColors.bgDark} /> : <HomeOutline size="30" strokeWidth={2} color="white" />
    } else if (route.name === 'registered') {
      icon =  focused? <CalendarDaysIconSolid size="30" color={themeColors.bgDark} /> : <CalendarDaysIcon size="30" strokeWidth={2} color="white" />
    }else if(route.name==='hosting'){
      icon =  focused? <RadioIconSolid size="30" color={themeColors.bgDark} /> : <RadioIcon size="30" strokeWidth={2} color="white" />
    }else if(route.name==='tickets'){
      icon =  focused? <TicketIconSolid size="30" color={themeColors.bgDark} /> : <TicketIcon size="30" strokeWidth={2} color="white" />
    }
  
    
    let buttonClass = focused? "bg-white": "";
    return (
      <View className={"flex items-center rounded-full p-3 shadow " + buttonClass}>
        {icon}
      </View>
    )
  }