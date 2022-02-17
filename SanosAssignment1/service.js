import TrackPlayer, {Event, State} from 'react-native-track-player';

let wasPausedByDuck = false;

module.exports = async function setup() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener(Event.RemoteDuck, async e => {
        if (e.permanent === true) {
            await TrackPlayer.stop();
        } else {
            if (e.paused === true) {
                const playerState = await TrackPlayer.getState();
                wasPausedByDuck = playerState !== State.Paused;
                await TrackPlayer.pause();
            } else {
                if (wasPausedByDuck === true) {
                    await TrackPlayer.play();
                    wasPausedByDuck = false;
                }
            }
        }
    });
};
