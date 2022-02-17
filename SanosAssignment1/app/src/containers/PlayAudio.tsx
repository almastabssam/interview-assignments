import React, {useEffect, useState} from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator
} from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
    Capability,
    Event,
    RepeatMode,
    State,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents,
} from 'react-native-track-player';

import { MediaService } from '../../../js/MediaService';
import FastImage from "react-native-fast-image";
export interface Category {
    url: string;
    title: any;
    artist: any;
    artwork: any;
    duration: any;
}
const setupIfNecessary = async (data: any, index: any) => {
    console.log('index');
    console.log(index);
    if(index === global.index){
        // if app was relaunched and music was already playing, we don't setup again.
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
            return;
        }
    }
    global.index=index;
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
    });

    await TrackPlayer.add(data);

    TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const togglePlayback = async (playbackState: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
        // TODO: Perhaps present an error or restart the playlist?
    } else {
        if (playbackState !== State.Playing) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
};

const PlayAudio = ({route}) => {
    const { id } = route.params;
    const { imageURL } = route.params;
    const { index } = route.params;
    const playbackState = usePlaybackState();
    const progress = useProgress();
    const [loader, setShowLoader] = useState(true);
    const [trackArtwork, setTrackArtwork] = useState<string | number>();
    const [trackTitle, setTrackTitle] = useState<string>();
    const [trackArtist, setTrackArtist] = useState<string>();

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (
            event.type === Event.PlaybackTrackChanged &&
            event.nextTrack !== undefined
        ) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const {title, artist, artwork} = track || {};
            setTrackTitle(title);
            setTrackArtist(artist);
            setTrackArtwork(artwork);
        }
    });

    useEffect(() => {
        getAudioDetail(id);

    }, []);
    let getAudioDetail = id => {
        setShowLoader(true);
        MediaService.getMp3Metadata(id)
            .then((response: any)  => {
                setShowLoader(false);
                console.log('response detail');
                console.log(response);
                if (response) {
                    let readyArray=[];
                        let obj = {} as Category ;
                        obj.url=response.url;
                        obj.title=response.name;
                        obj.artist=response.format;
                        obj.artwork=imageURL;
                        obj.duration=response.durationSeconds;
                        readyArray.push(obj);
                    setupIfNecessary(readyArray, index);
                }
            })
            .catch(error => {
                console.log('error');
                console.log(error);
            });
    };

    return (
        <SafeAreaView style={styles.screenContainer}>
            <StatusBar barStyle={'light-content'} />
            {loader ? <ActivityIndicator size="large" color="green" /> : null}
            <View style={styles.contentContainer}>
                {/*<View style={styles.topBarContainer}>*/}
                {/*    <TouchableWithoutFeedback>*/}
                {/*        <Text style={styles.queueButton}>Queue</Text>*/}
                {/*    </TouchableWithoutFeedback>*/}
                {/*</View>*/}
                <FastImage
                    style={styles.artwork}
                    source={{
                        uri: imageURL,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.titleText}>{trackTitle}</Text>
                <Text style={styles.artistText}>{trackArtist}</Text>
                <Slider
                    style={styles.progressContainer}
                    value={progress.position}
                    minimumValue={0}
                    maximumValue={progress.duration}
                    thumbTintColor="#FFD479"
                    minimumTrackTintColor="#FFD479"
                    maximumTrackTintColor="#FFFFFF"
                    onSlidingComplete={async value => {
                        await TrackPlayer.seekTo(value);
                    }}
                />
                <View style={styles.progressLabelContainer}>
                    <Text style={styles.progressLabelText}>
                        {new Date(progress.position * 1000).toISOString().substr(14, 5)}
                    </Text>
                    <Text style={styles.progressLabelText}>
                        {new Date((progress.duration - progress.position) * 1000)
                            .toISOString()
                            .substr(14, 5)}
                    </Text>
                </View>
            </View>
            <View style={styles.actionRowContainer}>
                {/*<TouchableWithoutFeedback onPress={() => TrackPlayer.skipToPrevious()}>*/}
                {/*    <Text style={styles.secondaryActionButton}>Prev</Text>*/}
                {/*</TouchableWithoutFeedback>*/}
                <TouchableWithoutFeedback onPress={() => togglePlayback(playbackState)}>
                    <Text style={styles.primaryActionButton}>
                        {playbackState === State.Playing ? 'Pause' : 'Play'}
                    </Text>
                </TouchableWithoutFeedback>
                {/*<TouchableWithoutFeedback onPress={() => TrackPlayer.skipToNext()}>*/}
                {/*    <Text style={styles.secondaryActionButton}>Next</Text>*/}
                {/*</TouchableWithoutFeedback>*/}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#212121',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    topBarContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    queueButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD479',
    },
    artwork: {
        width: 240,
        height: 240,
        marginTop: 30,
    },
    titleText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginTop: 30,
    },
    artistText: {
        fontSize: 16,
        fontWeight: '200',
        color: 'white',
    },
    progressContainer: {
        height: 40,
        width: 380,
        marginTop: 25,
        flexDirection: 'row',
    },
    progressLabelContainer: {
        width: 350,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressLabelText: {
        color: 'white',
        fontVariant: ['tabular-nums'],
    },
    actionRowContainer: {

        width: '60%',
        flexDirection: 'row',
        marginBottom: 50,
        justifyContent: 'center',
    },
    primaryActionButton: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFD479',
    },
    secondaryActionButton: {
        fontSize: 14,
        color: '#FFD479',
    },
});

export default PlayAudio;
