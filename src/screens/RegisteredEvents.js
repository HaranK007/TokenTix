import { View, Text, Image, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-snap-carousel';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'

import { themeColors } from '../theme/Colors';
import { categories, eventsList } from '../constants/index';
import EventsCard from '../components/eventsCard'
import UserContext from '../data/Context'

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function RegisteredEvents() {

  const { userValues } = useContext(UserContext);

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />

      <SafeAreaView className={ios ? '-mb-8' : ''}>
        <View className=" mx-8 flex-row justify-between items-center mt-2">
          <Image source={require('../../assets/images/avatar.png')}
            className="h-9 w-9 rounded-full" />

          <View className="flex-row items-center space-x-2">

            <Text className="font-semibold text-base">
              Registered Events
            </Text>
          </View>
          <BellIcon size="27" color="black" />
        </View>

        {/* search bar */}
        <View className="mx-5 shadow" style={{ marginTop: height * 0.06 }}>
          <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
            <TextInput placeholder='Type an event name' className="p-4 flex-1 font-semibold text-gray-700" />
            <TouchableOpacity
              className="rounded-full p-2 m-2"
              style={{ backgroundColor: themeColors.bgLight }}>
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>

      <View className={`overflow-visible flex justify-center flex-1 ${ios ? 'mt-10' : ''}`}>
        <View>
          <Carousel
            containerCustomStyle={{ overflow: 'visible' }}
            data={eventsList}
            renderItem={({ item }) =>{if(userValues.registered.includes(item.id)){
              return <EventsCard item={item} />
            } }}
            firstItem={1}
            loop={true}
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width * 0.63}
            slideStyle={{ display: 'flex', alignItems: 'center' }}
          />
        </View>
      </View>

    </View>
  )
}
