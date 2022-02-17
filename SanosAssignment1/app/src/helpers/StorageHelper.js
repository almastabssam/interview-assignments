import AsyncStorage from '@react-native-async-storage/async-storage';

 export let storeData = async (data) => {
    try {
        await AsyncStorage.setItem(
            'listData',
            JSON.stringify(data)
        );
    } catch (error) {
        // Error saving data
        console.log('error');
        console.log(error);
    }
};
export let retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('listData');
        if (value !== null) {
            // We have data!!
            console.log('valueData');
            console.log(value);
            return value;
        }
    } catch (error) {
        // Error retrieving data
        console.log('error');
        console.log(error);
        return error;
    }
};
