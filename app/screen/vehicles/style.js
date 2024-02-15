import {StyleSheet} from 'react-native';
import {heightToDp} from '../../utils';

const style = StyleSheet.create({
  textInput: {
    height: heightToDp(5),
  },
  noDriverContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default style;
