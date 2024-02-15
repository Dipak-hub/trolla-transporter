import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {MapFooterStyle} from './mapFooter.style';
import {Card, List, Button} from 'react-native-paper';
import {View} from 'react-native';

const MapFooterComponent = () => {
  return (
    <View style={MapFooterStyle.container}>
      <Card>
        <Card.Content>
          <List.Item
            title="Trolla Express"
            left={() => (
              <View>
                <Button
                  onPress={() => {
                    props.showPolyline.polyline;
                  }}>
                  Show map {pState}
                </Button>
                <Button
                  mode="contained"
                  onPress={() => {
                    HidePolyline();
                  }}>
                  Hide map
                </Button>
              </View>
            )}
            right={() => (
              <View>
                <Button onPress={() => {}}>Show Line</Button>
                <Button mode="contained">Hide Line</Button>
              </View>
            )}
          />
        </Card.Content>
      </Card>
    </View>
  );
};
