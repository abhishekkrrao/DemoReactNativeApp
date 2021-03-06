import React, { Component } from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import { assets as assets } from '../../Res'
import { CommonActions } from "@react-navigation/native";
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

});
export default class Loading extends Component {
    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.dispatch({
                ...CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Home" }]
                })
              });
        },2000);
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1,justifyContent:"center",alignContent:"center" }} source={assets.loader}>
                    {/* <Image
                        style={{ width: 242.77, height: 167.33,alignSelf:"center" }}
                        source={assets.appimage}
                    /> */}
                </ImageBackground>
            </View>

        );
    }
}
