import AsyncStorage from '@react-native-async-storage/async-storage';
const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // saving error
  }
};

export {clearAsyncStorage};
