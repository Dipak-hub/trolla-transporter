import React, {useEffect} from 'react';
import {Button, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
// import Routes from './app/navigation/routes';
import Routes from './app/Navigation/Routes';
import {colorStrings} from './app/constants';
import store from './app/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import theme from './app/themes/theme-config';
// import Test from './app/screen/test';
import codePush from 'react-native-code-push';

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <View style={{flex: 1}}>
            <StatusBar backgroundColor={colorStrings.COLOR_PRIMARY} />
            <Routes />
            {/* <Tes /> */}
          </View>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default codePush(App);
// export default App;
