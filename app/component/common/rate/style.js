import { StyleSheet } from "react-native";
import { heightToDp, scale, widthToDp } from "../../../utils";


const style=StyleSheet.create({
    container:{
        flex:1,
        padding:widthToDp(1),
        justifyContent:'center'
    },
    textStyle:{
        textAlign:'center',
        fontSize:scale(6)
    },
    CustomRatingBar:{
        justifyContent:'center',
        flexDirection:'row',
        marginTop:widthToDp(3)
    },
    starImgStyle:{
        width:widthToDp(10),
        height:heightToDp(5),
        resizeMode:'cover'
    }
})
export default style;