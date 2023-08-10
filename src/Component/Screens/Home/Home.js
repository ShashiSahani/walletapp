import { StatusBar } from "expo-status-bar";

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../utils/colors";
import { SliderBox } from "react-native-image-slider-box";
import { String } from "../../utils/String";
const images = [
  "https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?girl",
  "https://source.unsplash.com/1024x768/?tree",
];

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: "15%", backgroundColor: colors.aqua }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Image
                source={require("../../../assets/joinnow.png")}
                style={{ height: 75, width: 160 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Image
                source={require("../../../assets/loginbtn.png")}
                style={{ height: 75, width: 160 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{}}>
        <ScrollView
          style={{
            marginButtom: 5,
            height: "100%",
            backgroundColor: colors.black,
          }}
        >
          <View style={styles.newLogo}>
            <Image
              source={require("../../../assets/newlogo.png")}
              style={{ height: "80%", width: 100, borderRadius: 20 }}
            />
          </View>

          <View style={styles.withDrawContainer}>
            <View style={styles.withDraw}>
              <View style={styles.imgWrapper}>
                <Image
                  source={require("../../../assets/withdraw.png")}
                  style={{ height: 40, width: 42 }}
                />
              </View>
              <Text style={styles.textWrapper}>{String.WITHDRAW}</Text>
            </View>

            <View style={styles.withDraw}>
              <View style={styles.imgWrapper}>
                <Image
                  source={require("../../../assets/deposit.png")}
                  style={{ height: 42, width: 42 }}
                />
              </View>
              <Text style={styles.textWrapper}>{String.Deposit}</Text>
            </View>
            <View style={styles.withDraw}>
              <View style={styles.imgWrapper}>
                <Image
                  source={require("../../../assets/third-party.png")}
                  style={{ height: 42, width: 42 }}
                />
              </View>
              <Text style={styles.textWrapper}>{String.THIRDPARTY}</Text>
            </View>
          </View>

          <View
            style={{
              flex: 5,
              borderRadius: 20,
              height: 230,
              width: "90%",
              left: 20,
              right: 20,
              marginTop: 50,
              borderStartWidth: 1,
              borderColor: colors.black,
              backgroundColor: colors.aqua,
              paddingTop: 10,
              shadowColor: colors.shadowColor,
              shadowOpacity: 0.9,
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            <SliderBox
              images={images}
              sliderBoxHeight={200}
              dotColor="#fff"
              inactiveDotColor="grey"
              paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
              resizeMethod={"resize"}
              resizeMode={"cover"}
              paginationBoxStyle={{
                position: "absolute",
                bottom: 0,
                padding: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 10,
              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: "rgba(128, 128, 128, 0.92)",
              }}
              ImageComponentStyle={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                width: "80%",
                marginTop: 5,
                marginRight: 40,
              }}
              imageLoadingColor="#2196F3"
              autoplayInterval={10000}
            />
          </View>
          <View
            style={{
              // flexShrink: "nowrap",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              flex: 1,
              marginTop: 20,
              right: 20,
            }}
          >
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                backgroundColor: "#25D366",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                // alignSelf: "center",
              }}
              onPress={() => {
                Linking.openURL("http://api.whatsapp.com/send?phone=962");
              }}
            >
              <FontAwesome name="whatsapp" size={34} color="white" style={{}} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  newLogo: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: colors.aqua,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.9,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 4 },
    height: "25%",
  },
  withDrawContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  withDraw: {
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 50,
    shadowOpacity: 0.9,
    shadowOffset: { width: 1, height: 4 },
  },
  imgWrapper: {
    height: 70,
    width: 70,
    borderRadius: 20,
    backgroundColor: colors.aqua,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    marginTop: 10,
    color: colors.white,
  },
});
