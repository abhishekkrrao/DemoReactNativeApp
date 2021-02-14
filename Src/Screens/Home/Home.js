import React,{ Component } from 'react';
import data from "../../Res/libs"
import gData from "../../Res/gulffood"
import {
  StyleSheet,ScrollView,
  View,Text,FlatList,TouchableOpacity,Image,Dimensions,Animated, Easing
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { connect } from "react-redux";
import { HomeContext } from "../../Routes/HomeContext";
import { API_CALL } from "../../redux/Actions";
const width = Dimensions.get("screen").width;
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { data: [],title: "Day 1 Food",days: [] }
    this.animatedValue = new Animated.Value(0)
  }
  componentDidMount() {
    let days = [{ title: "Sunday",isSelected: true },{ title: "Monday",isSelected: false },{ title: "Tuesday",isSelected: false },
    { title: "Wednesday",isSelected: false },{ title: "Thrusday",isSelected: false },{ title: "Friday",isSelected: false },
    { title: "Saturday",isSelected: false }];
    this.setState({ days: days,data: data.data },() => { });
    this.animate();
    console.log(this.props)
  }
  animate() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1500,
      delay: 200,
      easing: Easing.linear
    }).start()
  }
  render() {

    return (
      <View
        style={{ flex: 1 }}>
        {/* <Header></Header> */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}>
          {/* Days List  */}
          <View
            style={{ height: 96 }}>
            <Text
              style={{
                fontSize: 27,paddingLeft: 5,
                fontFamily: "Poppins-Bold",color: "#616161"
              }}>{"Days"}</Text>


            <FlatList
              style={{ flex: 1 }}
              horizontal={true}
              data={this.state.days}
              renderItem={({ item,index }) => {
                return this.singleHeading(item,index)
              }}
              keyExtractor={({ index }) => index + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
            />
          </View>


          {/* Days List  */}
          <View
            style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 27,paddingLeft: 5,
                fontFamily: "Poppins-Bold",color: "#616161"
              }}>{this.state.title}</Text>


            <FlatList
              style={{ flex: 1 }}
              numColumns={2}
              data={this.state.data}
              renderItem={({ item,index }) => {
                return this.singleLibrary(item,index)
              }}
              keyExtractor={({ index }) => index + '' + new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
  transformX() {
    return {
      translateY: this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [700, 300, 0]
      })
    }
  }
  singleHeading(item,index) {
    const viewStyle = item.isSelected ? styles.selectedButton : styles.normalButton;
    const textStyle = item.isSelected ? styles.selectedTxtStyle : styles.normalText;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.onDateSelect(index);
        }}>
        <View
          key={index}
          style={viewStyle}>
          <Text
            style={textStyle}
            key={index}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  singleLibrary(item,index) {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          this.props.navigation.navigate("Detail")
        }}>
        <Animated.View
          key={index}
          style={{ width: (width / 2) - 12,height: 190,backgroundColor: "#fbfcfc",margin: 5,padding: 10,transform: [this.transformX()] }}>
          <Image
            style={{ width: 126,height: 126,resizeMode: "contain",alignSelf: "center" }}
            source={item.imageUrl}>
          </Image>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 11,textAlign: "center",
              padding: 5,fontFamily: "Poppins-Regular"
            }}>
            {item.title + " " + (index + 1)}
          </Text>

          <View
            style={{ flex: 1,flexDirection: "row",width: "100%",justifyContent: "center" }}>
            <Text
              style={{ fontSize: 11,fontFamily: "Poppins-Light",textAlign: "center",marginEnd: 10 }}>
              {item.price + "  د.ك " + ""}</Text>
            <Text
              style={{ fontSize: 11,fontFamily: "Poppins-Light",textAlign: "right" }}>
              {"Rating " + item.rating}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  onDateSelect(index) {
    this.state.days.map((obj,i) => {
      index === i ? this.state.days[i].isSelected = true : this.state.days[i].isSelected = false;
    });
    if (index != 0) {
      this.setState({ data: gData.data,title: "Day " + (index + 1) + " Food" },() => { console.log(this.state.data); });
    } else {
      this.setState({ data: data.data,title: "Day " + (index + 1) + " Food" },() => { console.log(this.state.data); });
    }
    
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  selectedButton: {
    flex: 1,justifyContent: "center",width: 111,height: 46,backgroundColor: "#f57c00",marginRight: 5,marginLeft: 5,marginTop: 6,borderRadius: 10
  },
  normalButton: {
    flex: 1,justifyContent: "center",width: 111,height: 46,backgroundColor: "#fff",marginRight: 5,marginLeft: 5,marginTop: 6,borderRadius: 10
  },
  selectedTxtStyle: {
    fontSize: 15,textAlign: "center",color: "#fff",fontFamily: "Poppins-Regular"
  },
  normalText: {
    fontSize: 15,textAlign: "center",color: "#757575",fontFamily: "Poppins-Regular"
  }
});
const mapStateToProps = (state) => {
  return {
      data: state.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      apiReducer: data => dispatch({ type: API_CALL,data }),
  };
};
Home.contextType = HomeContext;
export default connect(mapStateToProps,mapDispatchToProps)(Home);