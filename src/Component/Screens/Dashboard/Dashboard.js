import React, { useState, useEffect, useCallback } from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../utils/colors";
import { DrawerActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  GetWalletBalance,
  getCountriesData,
} from "../../../Redux/Action/WalletAction";
import Toast, { BaseToast } from "react-native-toast-message";
import { String } from "../../utils/String";
import { shadow } from "material-bread";

const images = [
  "https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?girl",
  "https://source.unsplash.com/1024x768/?tree",
];
const toastConfig = {
  success: (props) => (
    <View
      style={{
        height: 60,
        marginBottom: 30,
      }}
    >
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "green",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    </View>
  ),
};

const Dashboard = ({ navigation }) => {
  const [token, settoken] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const WalletBalance = useSelector(
    (state) => state?.wallet?.wallet_bal?.balance
  );

  const UserToken = AsyncStorage.getItem("UserToken");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountriesData());
    dispatch(GetWalletBalance());
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={{ height: "10%", backgroundColor: colors.aqua }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              height: 60,
              width: 60,
              margin: 5,

              alignItems: "center",
              justifyContent: "center",

              flex: 1,
              right: 20,
              marginRight: 30,
              marginBottom: 10,
              flexDirection: "row-reverse",
            }}
          >
            <MaterialCommunityIcons
              name="microsoft-xbox-controller-menu"
              size={44}
              color={colors.white}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ backgroundColor: colors.black, height: "100%" }}>
          <View style={styles.totalBalance}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Text style={{ color: colors.white }}>
                {String.Toatl_balance}
              </Text>
              {WalletBalance ? (
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  {WalletBalance}
                </Text>
              ) : (
                <Text style={{ color: colors.white }}>{String.Zero}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                Toast.show({
                  type: "success",
                  text1: "Balance updated..!!",
                  //text2: "Copied ",
                  visibilityTime: 2000,
                  onShow: () => {},
                  onHide: () => {},
                  position: "bottom",
                });
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <Ionicons
                name="ios-reload-circle-sharp"
                size={28}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.withDrawContainer}>
            <View style={styles.withDraw}>
              <View style={styles.imgWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Withdraw")}
                >
                  <Image
                    source={require("../../../assets/withdraw.png")}
                    style={{ height: 40, width: 42 }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.textWrapper}>{String.WITHDRAW}</Text>
            </View>

            <View style={styles.withDraw}>
              <View style={styles.imgWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Deposit")}
                >
                  <Image
                    source={require("../../../assets/deposit.png")}
                    style={{ height: 42, width: 42 }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.textWrapper}>{String.DEPOSITE}</Text>
            </View>
            <View style={styles.withDraw}>
              <View style={styles.imgWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ThirdParty")}
                >
                  <Image
                    source={require("../../../assets/third-party.png")}
                    style={{ height: 42, width: 42 }}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.textWrapper}>{String.THIRDPARTY}</Text>
            </View>
          </View>

          <View
            style={{
              borderRadius: 20,
              height: 250,
              width: "90%",
              left: 20,
              right: 20,
              marginTop: 20,
              borderStartWidth: 1,
              borderColor: colors.gray,
              backgroundColor: colors.gray,
              paddingTop: 10,
              shadowColor: colors.shadowColor,
              shadowOpacity: 0.9,
              shadowRadius: 3,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            <View style={styles.inwithDraw}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("http://api.whatsapp.com/send?phone=962")
                }
              >
                <View style={styles.inwithDrawWrapper}>
                  <Text style={styles.textWrapper2}>{String.IN_WITHDRAW}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("http://api.whatsapp.com/send?phone=962")
                }
              >
                <View style={styles.inwithDrawWrapper}>
                  <Text style={styles.textWrapper2}>{String.IN_DEPOSITE}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <SliderBox
              images={images}
              sliderBoxHeight={200}
              dotColor={colors.white}
              inactiveDotColor={colors.gray}
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
                marginBottom: 35,
              }}
              ImageComponentStyle={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
                height: "90%",
                width: "80%",
                marginTop: 5,
                marginRight: 40,
              }}
              imageLoadingColor="#2196F3"
            />
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginTop: 30,
              //  marginLeft: 350,
            }}
          >
            <TouchableOpacity
              style={{
                height: 40,
                marginTop: "auto",
                width: 40,
                backgroundColor: colors.green,

                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-end",
                right: 25,
              }}
              onPress={() => {
                Linking.openURL("http://api.whatsapp.com/send?phone=962");
              }}
            >
              <FontAwesome name="whatsapp" size={34} color={colors.white} />
            </TouchableOpacity>
            <Toast
              config={toastConfig}
              ref={(ref) => {
                Toast.setRef(ref);
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  totalBalance: {
    flexDirection: "row",
    marginTop: "6%",
    backgroundColor: colors.gray,
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
    height: "20%",
    color: colors.white,
  },
  withDrawContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  withDraw: {
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 50,
    shadowOpacity: 0.9,
    shadowOffset: { width: 1, height: 4 },
  },
  inwithDraw: {
    flexDirection: "row",
    marginLeft: 30,
    justifyContent: "space-between",
  },
  imgWrapper: {
    height: 70,
    width: 70,
    borderRadius: 20,
    backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    marginTop: 10,
    color: colors.white,
  },
  textWrapper2: {
    marginTop: 2,
    color: colors.white,
  },
  inwithDrawWrapper: {
    height: 40,
    width: 150,
    backgroundColor: colors.black,

    borderWidth: 2,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    right: 20,

    shadowColor: colors.shadowColor,
    shadowOpacity: 0.2,
    shadowRadius: 3,

    shadowOpacity: 0.9,
  },
});
