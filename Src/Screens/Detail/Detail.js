import React,{ Component } from 'react';
import { StyleSheet,ScrollView,View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
class Detail extends Component {
  render() {
    return (
      <View
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          style={styles.scrollView}>



        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  }
});
export default Detail;