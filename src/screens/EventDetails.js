import { View, Text, TouchableOpacity, Image, Dimensions, Platform, FlatList, ScrollView } from 'react-native'
import React, { useState,useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

import { ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import { HeartIcon, UserGroupIcon } from 'react-native-heroicons/solid';

import { themeColors } from '../theme/Colors';
import UserContext from '../data/Context'


const ios = Platform.OS == 'ios';

export default function EventDetails(props) {

  const item = props.route.params;
  console.log(item)
  const navigation = useNavigation();

  const { setUserValues, userValues } = useContext(UserContext);

  const  handleRegister = (value,name) => {
    
    async function mintToken(){
      console.log("mintToken")
      try {
        const response = await axios.post('http://192.168.1.6:3000/trigger-script'); //replace this with your custom url based on your network
        console.log('Response:', response.data[0]);

        setUserValues((previous) => ({...previous,registered : [...previous.registered,value],tickets : [...previous.tickets,{assertId : response.data[0], eventName : name}]}));
        console.log(userValues)
      } catch (error) {
        console.error('Error:', error);
      }
      console.log("end mint")
    }

    mintToken();
    console.log(userValues)
  }


  return (
    <View className="flex-1">
      <StatusBar style="light" />

      <SafeAreaView className="space-y-4 flex-1">
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity className=" rounded-full " onPress={() => navigation.goBack()}>
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className=" rounded-full border-2 border-white p-2">
            <HeartIcon size="24" color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            shadowColor: themeColors.bgDark,
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 30 },
            shadowOpacity: 0.9,
          }}
          className="flex-row justify-center">
        </View>
        <View
          style={{ backgroundColor: themeColors.bgLight }}
          className="flex-row justify-center items-center mx-4 rounded-3xl p-1 px-2 space-x-1 opacity-90 w-16">
          <UserGroupIcon size="15" color="white" />
          <Text className="text-base font-semibold text-white">{item.stars}</Text>
        </View>
        <View className="px-4 flex-row justify-between items-center">
          <Text style={{ color: themeColors.text }} className="text-3xl font-semibold">
            {item.name}
          </Text>
          <Text style={{ color: themeColors.text }} className="text-lg font-semibold">
            $ {item.price}
          </Text>
        </View>


        <View className="px-5 mt-6 space-y-2">
          <Text style={{ color: themeColors.text }} className="text-lg font-bold">Skills</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={item.skills}
            keyExtractor={item => item.id}
            className="overflow-visible"
            renderItem={({ item }) => {
              console.log(item)
              return (
                <TouchableOpacity
                  style={{ backgroundColor: 'rgba(0,0,0,0.07)' }}
                  className="p-3 px-8 mr-2 rounded-full shadow">
                  <Text className={"font-semibold "}>{item.name}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>

        <ScrollView className="space-y-4 flex-1">
          <View className="px-4 space-y-2">
            <Text style={{ color: themeColors.text }} className="text-lg font-bold">About</Text>
            <Text className="text-gray-600">
              {item.desc}
            </Text>
          </View>

          <View className="px-4 space-y-2">
            <Text style={{ color: themeColors.text }} className="text-lg font-bold mb-4">Timeline</Text>
            <View className="px-4 flex-row justify-between items-center">
              <Text style={{ color: themeColors.bgLight }} className="text-3xl font-semibold">
                01 Jan
              </Text>
              <Text style={{ color: themeColors.text }} className="text-lg float-left">
                Registeration
              </Text>
            </View>
            <View className="px-4 flex-row justify-between items-center">
              <Text style={{ color: themeColors.bgLight }} className="text-3xl font-semibold">
                05 Jan
              </Text>
              <Text style={{ color: themeColors.text }} className="text-lg float-left">
                Hack Begins
              </Text>
            </View>
            <View className="px-4 flex-row justify-between items-center">
              <Text style={{ color: themeColors.bgLight }} className="text-3xl font-semibold">
                28 Jan
              </Text>
              <Text style={{ color: themeColors.text }} className="text-lg">
                Hack Ends
              </Text>
            </View>
          </View>

          <View className="px-4 space-y-2">
            <Text style={{ color: themeColors.text }} className="text-lg font-bold mt-4">Rules & Regulations</Text>
            <Text className="text-gray-600">
              {item.rules}
            </Text>
          </View>

        </ScrollView>

      </SafeAreaView>

      <View className={`space-y-3 ${ios ? 'mb-6' : 'mb-3'}`}>
        <View className="flex-row justify-between px-4">
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bgDark }}
            className="p-4 rounded-full flex-1 ml-4"
            onPress={()=>handleRegister(item.id,item.name)}>
            <Text className="text-center text-white text-base font-semibold">Register</Text>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  )
}
