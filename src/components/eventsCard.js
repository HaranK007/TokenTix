import { View, Text, TouchableOpacity, Dimensions, Platform, } from 'react-native'
import React from 'react'
import { themeColors } from '../theme/Colors'
import { useNavigation } from '@react-navigation/native'
import { UserGroupIcon } from 'react-native-heroicons/solid';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function EventsCard({ item }) {
  const navigation = useNavigation();
  return (

    <View
      style={{
        borderRadius: 40,
        backgroundColor: themeColors.bgDark,
        height: ios ? height * 0.4 : height * 0.50,
        width: width * 0.65,
      }}
    >
      <View
        style={{
          shadowColor: 'black',
          shadowRadius: 30,
          shadowOffset: { width: 0, height: 40 },
          shadowOpacity: 0.8,
          marginTop: ios ? -(height * 0.08) : 15,
        }}
        className="flex-row justify-center">

      </View>
      <View className={`px-5 flex-1 justify-between ${ios ? 'mt-5' : ''}`}>
        <View className="space-y-3 mt-3">

          <Text className="text-3xl text-white font-semibold z-10">
            {item.name}
          </Text>

          <View style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 w-16">
            <UserGroupIcon size="15" color="white" />
            <Text className="text-base font-semibold text-white">{item.stars}</Text>
          </View>

          <View className="space-x-1 z-10">
            <Text className="text-base text-white font-semibold opacity-60 mt-4">
              About
            </Text>
            <Text className="text-base text-white font-semibold"> {item.about}</Text>
          </View>
          
        </View>


        <View style={{
          backgroundColor: ios ? themeColors.bgDark : 'transparent',
          shadowColor: themeColors.bgDark,
          shadowRadius: 25,
          shadowOffset: { width: 0, height: 40 },
          shadowOpacity: 0.8,
        }} className="flex-row justify-between items-center mb-5">

          <Text className="text-white font-bold text-lg">$ {item.price}</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('EventsDetails', { ...item })}
            style={{
              shadowColor: 'black',
              shadowRadius: 40,
              shadowOffset: { width: -20, height: -10 },
              shadowOpacity: 1,
            }} className="p-2 bg-white rounded-full w-20 items-center">
            <Text className="font-bold text-lg">View</Text>
          </TouchableOpacity>

        </View>


      </View>

    </View>

  )
}