import React, {useState, useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {HeaderComponent, LiveDirectionMap} from '../../component';
import style from './style';
import {mapType, navigationStrings} from '../../constants';

const TrackingMap = () => {
  const [locationData, setLocationData] = useState({
    pickup: {latitude: 26.114396504404304, longitude: 91.80554347280838},
    current: {latitude: 26.119628098155644, longitude: 91.8225074691412},
    delivery: {latitude: 26.348837141915176, longitude: 91.77790997686131},
  });
  // ------------------------------------------------------------------------------------
  return (
    <>
      {/* ---------------header -------------------------------------------------------- */}
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title={navigationStrings.TRACKING_SCREEN}
      />

      <View style={style.mapContainer}>
        <LiveDirectionMap
          pickup={locationData.pickup}
          delivery={locationData.delivery}
          mapType={mapType.LIVE_MAP}
          currentLocation={locationData.current}
          height="100%"
        />
      </View>
    </>
  );
};

export default TrackingMap;
