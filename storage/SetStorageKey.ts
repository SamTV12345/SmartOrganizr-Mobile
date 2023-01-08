import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStorageKey = async (key: string, value:string) => {
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch (error) {
        console.log(error);
    }
}

export const getStorageKey = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key)
    }
    catch (error) {
        console.log(error);
    }
}