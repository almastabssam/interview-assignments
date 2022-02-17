import React, { Fragment, useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { MediaService } from '../../../js/MediaService';
import AudioListItem from '../components/AudioListItem';
import NoRecordFound from '../components/NoRecordFound';
import {retrieveData, storeData} from '../helpers/StorageHelper';
const AudioListScreen = () => {
  const [loader, setShowLoader] = useState(true);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    fetchAudioData();
  }, []);
  let fetchAudioData = pageNo => {
    setShowLoader(true);
    retrieveData().then(res=>{
      console.log('retrieveData');
      console.log(res);
      if(res){
        setShowLoader(false);
        console.log('JSON.parse(res)');
        console.log(JSON.parse(res));
        setListData(JSON.parse(res));
      }
      else {
        MediaService.list()
            .then(response => {
              console.log('response');
              console.log(response);
              setShowLoader(false);
              if (response && response.length) {
                setListData(response);
                storeData(response);
              }
            })
            .catch(error => {
              setShowLoader(false);
              console.log('error');
              console.log(error);
            });
      }
    }).catch(error=>{
      console.log('error');
      console.log(error);
    });

  };
  const renderItem = (item, index) => {
    return <AudioListItem item={item} index={index}/>;
  };
  return (
    <Fragment>
      {loader ? <ActivityIndicator size="large" color="green" /> : null}
      <View style={styles.rootContainer}>
        {listData.length > 0 ? (
          <FlatList
            style={styles.listContainer}
            data={listData}
            keyExtractor={(item, index) => item.identifier}
            renderItem={({ item, index }) => renderItem(item,index)}
          />
        ) : (
          <NoRecordFound />
        )}
      </View>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
});

export default AudioListScreen;
