import React, {useState, useRef, useEffect, createRef} from 'react';
import {View, Image, Button, Animated, Dimensions} from 'react-native';

import {colorStrings, navigationStrings} from '../../constants';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {HeaderComponent} from '../../component';
import style from './style';
import {IconButton} from 'react-native-paper';

const DocViewer = ({route}) => {
  const zoomableViewRef = createRef(null);

  return (
    <>
      <HeaderComponent
        hasDrawerButton={false}
        hasBackButton={true}
        title="Document"
      />

      <View style={style.bottomController}>
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          doubleTapZoomToCenter={true}
          ref={zoomableViewRef}
          style={{
            // padding: 10,
            backgroundColor: colorStrings.SNOW_WHITE,
          }}>
          <Image
            style={{flex: 0, width: '100%', height: '80%'}}
            source={{
              uri: route.params,
            }}
            resizeMode="contain"
          />
        </ReactNativeZoomableView>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          {/*zoomBy */}
          <IconButton
            onPress={() => zoomableViewRef.current.zoomBy(-0.1)}
            icon="magnify-minus-outline"
          />
          <IconButton
            onPress={() => zoomableViewRef.current.zoomBy(0.1)}
            icon="magnify-plus-outline"
          />
          {/*zoomTo */}
          <IconButton
            onPress={() => zoomableViewRef.current.zoomTo(1)}
            icon="autorenew"
          />

          {/* moveBy */}
          <IconButton
            onPress={() => zoomableViewRef.current.moveBy(-30, 0)}
            icon="arrow-left-bold"
          />
          <IconButton
            onPress={() => zoomableViewRef.current.moveBy(30, 0)}
            icon="arrow-right-bold"
          />
          <IconButton
            onPress={() => zoomableViewRef.current.moveBy(0, -30)}
            icon="arrow-up-bold"
          />
          <IconButton
            onPress={() => zoomableViewRef.current.moveBy(0, 30)}
            icon="arrow-down-bold"
          />

          {/* moveTo */}
          {/* <Button
            onPress={() => zoomableViewRef.current.moveTo(300, 200)}
            title="Move to"
          /> */}
        </View>
      </View>
    </>
  );
};

export default DocViewer;
