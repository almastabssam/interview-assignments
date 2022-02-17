import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
function AudioListItem({ item, index }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        NetInfo.fetch().then(state => {
          console.log("Connection type", state.type);
          console.log("Is connected?", state.isConnected);
          if(state.isConnected){
            global.imageURL=item.imageURL;
            navigation.navigate('PlayAudio',{
              id: item.identifier,
              imageURL: item.imageURL,
              index: index,
            });
          }
          else {
            alert('Internet is not available, Please connect internet');
          }

        });
      }}
      style={styles.rootContainer}
    >
      <View style={styles.circleRootContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: item.imageURL,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
      <Text style={styles.textTitle} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={styles.textDate} numberOfLines={1}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#ddd',
  },
  circleRootContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 10,
    height: 250,
    width: 300,
    overflow: 'hidden',
  },
  circleContainer: {
    marginTop: -30,
    marginLeft: 10,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  textDate: {
    textAlign: 'center',
    fontSize: 15,
  },
});

export default AudioListItem;
