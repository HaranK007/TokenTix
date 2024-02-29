import React, { useContext, useState } from 'react'
import { Text, View, Dimensions, Platform, Image, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import QRCode from 'react-native-qrcode-svg';

import { themeColors } from '../theme/Colors';
import { StatusBar } from 'expo-status-bar';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function Tickets() {

  const { userValues } = useContext(UserContext);
  console.log(userValues)

  const [showQRCode, setShowQRCode] = useState(false);

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />

      <SafeAreaView className={ios ? '-mb-8' : ''}>
        <View className=" mx-8 flex-row justify-between items-center mt-2">
          <Image source={require('../../assets/images/avatar.png')}
            className="h-9 w-9 rounded-full" />

          <View className="flex-row items-center space-x-2">

            <Text className="font-semibold text-base">
              Tickets
            </Text>
          </View>
          <BellIcon size="27" color="black" />
        </View>

        <View className="mx-5 shadow" style={{ marginTop: height * 0.06 }}>
          <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
            <TextInput placeholder='Type Ticket Id or Name' className="p-4 flex-1 font-semibold text-gray-700" />
            <TouchableOpacity
              className="rounded-full p-2 m-2"
              style={{ backgroundColor: themeColors.bgLight }}>
              <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <View className="flex-1 items-center mt-8 ">
        {userValues.tickets.map((ticket, index) => (
          <TouchableOpacity key={index} onPress={() => toggleQRCode(index)} className=' mt-4'>
            <View className="w-80 p-4 shadow-md rounded-xl" style={{ backgroundColor: themeColors.bgLight }}>
              <Text className="font-bold text-lg mb-2 text-white">Event: {ticket.eventName}</Text>
              <Text className="font-semibold text-white">Assert Id</Text>
              <Text className="text-base opacity-60 text-gray-700">{ticket.assertId}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <Modal visible={showQRCode} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={toggleQRCode}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                <QRCode value={`https://example.com/assertId=${userValues.tickets.assertId}`} size={200} />
                <TouchableOpacity onPress={toggleQRCode} style={{ marginTop: 20 }}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  )
}
