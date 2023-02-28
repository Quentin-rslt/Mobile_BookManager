import { StyleSheet } from "react-native";
import { COLORS } from "../../../Common/CommonColors";

export default StyleSheet.create({
    container : {
        width: 170,
        height:170,
        overflow:'hidden',
        backgroundColor: COLORS.componentBackground,
        borderRadius : 30,
        marginBottom: 19,
    },
    text : {
        fontSize: 25,
        fontWeight: '800',
        color: COLORS.foreground,
        marginLeft : 15,
        marginRight : 15,
        marginTop: 30, 
    },
    numberBook : {
        position : 'absolute',
        right : 20,
        bottom : 15,
    }
});
