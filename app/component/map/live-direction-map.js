import React, {useState, useEffect, useRef} from 'react';
import MapView, {AnimatedRegion, Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import style from './style';
import {colorStrings, imagePath, mapType} from '../../constants';
import {GOOGLE_MAP_API_KEY} from '@env';
import {heightToDp, scale} from '../../utils';
import {View, Image, Dimensions, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LiveDirectionMap = props => {
  const {confirmed_trip} = useSelector(state => state.trips.confirmed_trips);
  const {load, vehicle} = confirmed_trip;
  const mapRef = useRef();

  return (
    <>
      {load?.pickup?.lat && load?.pickup?.lng && (
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: load?.pickup?.lat,
            longitude: load?.pickup?.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          zoomControlEnabled={true}
          style={[style.map, {height: props.height || heightToDp(35)}]}>
          <RenderMap mapType={props.mapType} mapRef={mapRef} />
        </MapView>
      )}
    </>
  );
};

const RenderMap = props => {
  const {confirmed_trip} = useSelector(state => state.trips.confirmed_trips);
  const {load, vehicle} = confirmed_trip;

  return (
    <>
      <Marker
        description="Pickup Location"
        coordinate={{
          latitude: load?.pickup?.lat,
          longitude: load?.pickup?.lng,
        }}>
        <Icon
          name="map-marker-radius-outline"
          size={scale(5)}
          color={colorStrings.COLOR_PRIMARY}
        />
      </Marker>
      <Marker
        description="Delivery Location"
        coordinate={{
          latitude: load?.delivery?.lat,
          longitude: load?.delivery?.lng,
        }}>
        <Icon
          name="map-marker-radius"
          size={scale(5)}
          color={colorStrings.COLOR_PRIMARY}
        />
      </Marker>
      {props.mapType === mapType.LIVE_MAP && (
        <VehicleLocation mapRef={props.mapRef} />
      )}

      <MapViewDirections
        origin={{latitude: load?.pickup?.lat, longitude: load?.pickup?.lng}}
        destination={{
          latitude: load?.delivery?.lat,
          longitude: load?.delivery?.lng,
        }}
        apikey={GOOGLE_MAP_API_KEY}
        strokeWidth={3}
        strokeColor={colorStrings.COLOR_PRIMARY}
      />
    </>
  );
};

const VehicleLocation = props => {
  const {confirmed_trip} = useSelector(state => state.trips.confirmed_trips);
  const {load, vehicle} = confirmed_trip;
  const [cameraHeading, setCameraHeading] = useState(0);
  const markerRef = useRef();

  const [state, setState] = useState({
    curLoc: {
      latitude: vehicle?.gps?.latitude || 1,
      longitude: vehicle?.gps?.longitude || 1,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: vehicle?.gps?.latitude || 1,
      longitude: vehicle?.gps?.longitude || 1,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {coordinate} = state;
  const updateState = data => setState(state => ({...state, ...data}));

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const getLiveLocation = async () => {
    if (vehicle.gps) {
      const {latitude, longitude, heading} = vehicle?.gps;
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });

      props.mapRef.current.animateCamera({
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        heading: heading,
        pitch: 90,
      });
    }
  };

  useEffect(() => {
    getLiveLocation();
  }, [vehicle]);

  return (
    <>
      {vehicle?.gps.latitude && vehicle?.gps.longitude && (
        <Marker
          description="Vehicle"
          coordinate={{
            latitude: vehicle?.gps?.latitude || 1,
            longitude: vehicle?.gps?.longitude || 1,
          }}
          ref={markerRef}>
          <Image
            source={imagePath.LOCATION_POINTER}
            style={{height: 35, width: 35}}
          />
        </Marker>
      )}
    </>
  );
};
export default LiveDirectionMap;
