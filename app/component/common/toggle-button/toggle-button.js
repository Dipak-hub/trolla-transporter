import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {colorStrings} from '../../../constants';
import style from './style';
import {widthToDp, heightToDp, scale} from '../../../utils';

const CustomToggleButton = ({
  selectedMode,
  option1,
  option2,
  onSelectSwitch,
  width,
}) => {
  const [getSelectedMode, setSelectedMode] = useState(selectedMode);

  const updateSwitchData = value => {
    onSelectSwitch(value === 1 ? option1 : option2);
    setSelectedMode(value);
  };
  return (
    <>
      <View style={[style.toggleButtonView, {width}]}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            style.button,
            {
              backgroundColor:
                getSelectedMode == 1 ? colorStrings.COLOR_PRIMARY : 'white',
            },
          ]}
          onPress={() => updateSwitchData(1)}>
          <Text
            style={{
              color: getSelectedMode == 1 ? 'white' : 'black',
              fontSize: scale(3.5),
            }}>
            {option1}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={[
            style.button,
            {
              backgroundColor:
                getSelectedMode == 2 ? colorStrings.COLOR_PRIMARY : 'white',
            },
          ]}
          onPress={() => updateSwitchData(2)}>
          <Text
            style={{
              color: getSelectedMode == 2 ? 'white' : 'black',
              fontSize: scale(3.5),
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CustomToggleButton;
