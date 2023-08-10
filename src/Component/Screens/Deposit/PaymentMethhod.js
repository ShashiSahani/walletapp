import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { String } from "../../utils/String";
import { colors } from "../../utils/colors";
import { AntDesign } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "expo-image-picker";
import {
  GetCashDepositList,
  GetDepositDetail,
  RequestDeposite,
} from "../../../Redux/Action/WalletAction";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseToast } from "react-native-toast-message";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as Clipboard from "expo-clipboard";

const toastConfig = {
  success: (props) => (
    <View
      style={{
        height: 50,
      }}
    >
      <BaseToast
        {...props}
        style={{
          backgroundColor: colors.aqua,
          borderLeftColor: colors.aqua,
          borderColor: colors.blueText,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "60%",
          fontVariant: "small-caps",
          borderRadius: 10,
        }}
        contentContainerStyle={{}}
        text1Style={{
          fontSize: 14,
          fontWeight: 600,
          fontVariant: "small-caps",
        }}
        text2Style={{
          color: colors.black,
        }}
      />
    </View>
  ),
};

const PaymentMethhod = ({ navigation, route }) => {
  const coins = route?.params?.coins;

  const CashDepositList = useSelector(
    (state) => state?.CashDeposit?.CashDepositlist_data
  );
  const [text, setText] = useState([]);
  const [newId, setnewId] = useState("");

  const User_ID = async () => {
    let data = await AsyncStorage.getItem("UserId");
    console.log("data>>>>>>?", data);
    setnewId(data);
  };
  const depositDetail = useSelector((state) => state?.deposit?.Deposit_detail);
  console.log("depositDetail", depositDetail);
  const dropdowndata = CashDepositList?.map((item) => {
    console.log(item.name);
    return (
      <View style={{ backgroundColor: colors.white }}>
        <Text style={{}}>Name: {item?.name}</Text>
        <Text>Area: {item?.area}</Text>
        <Text>Book Name: {item?.book_name}</Text>
        <Text>Mobile: {item?.mobile}</Text>
      </View>
    );
  });


  useEffect(() => {
    setText(depositDetail);
    Clipboard.setStringAsync(text?.bank_name);
    Clipboard.setStringAsync(text?.account_holder_name);
    Clipboard.setStringAsync(text?.account_number);
    Clipboard.setStringAsync(text?.ifsc_code);
    Clipboard.setStringAsync(text?.paytm_name);
    Clipboard.setStringAsync(text?.paytm_link);
    Clipboard.setStringAsync(text?.gpay_name);
    Clipboard.setStringAsync(text?.gpay_link);
    Clipboard.setStringAsync(text?.phonepay_name);
    Clipboard.setStringAsync(text?.phonepay_link);
    Clipboard.setStringAsync(text?.bhim_name);
    Clipboard.setStringAsync(text?.bhim_link);
    Clipboard.setStringAsync(text?.other_name);
    Clipboard.setStringAsync(text?.other_link);
  }, []);
  //BankDetail copy Function for Clipboard
  const handleBanknameCopy = async () => {
    await Clipboard.setStringAsync(text?.bank_name);
    Toast.show({
      type: "success",
      text1: "Copy!!",
      text2: "Bank Name Copy!!",

      visibilityTime: 2000,
      onShow: () => { },
      onHide: () => { },
      position: "bottom",
    });
  };
  const handlecopyaccount_holder_name = async () => {
    await Clipboard.setStringAsync(text?.account_holder_name);
    Toast.show({
      type: "success",
      text1: "Copy!!",
      text2: "Account Name Copy!!",

      visibilityTime: 2000,
      onShow: () => { },
      onHide: () => { },
      position: "bottom",
    });
  };
  const handleAcountNumberCopy = async () => {
    await Clipboard.setStringAsync(text?.account_number);
    Toast.show({
      type: "success",
      text1: "Copy!!",
      text2: "Account Number Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },
      position: "bottom",
    });
  };
  const handleIFSCCopy = async () => {
    await Clipboard.setStringAsync(text?.ifsc_code);
    Toast.show({
      type: "success",
      text1: "Copy!!",
      text2: "IFSC CODE Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },
      position: "bottom",
    });
  };

  //Paytm Wallet Clipboard Copy functionality
  const handlePaytmNameCopy = async () => {
    await Clipboard.setStringAsync(text?.paytm_name);
    Toast.show({
      type: "success",
      text1: "Copy!!",
      text2: "Person Name Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },
      position: "bottom",
    });
  };
  const handlePaytmIdCopy = async () => {
    await Clipboard.setStringAsync(text?.paytm_link);
    Toast.show({
      type: "success",
      text1: "Copy!!",
      text2: "Person ID Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },
      position: "bottom",
    });
  };
  //GooglePay Clipboard Copy Functionality
  const handleGpayNamecopy = async () => {
    await Clipboard.setStringAsync(text?.gpay_name);
    Toast.show({
      type: "success",
      text1: "COPY!!",
      text2: "Google Pay name Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },
      position: "bottom",
    });
  };
  const handleGpayIdCopy = async () => {
    await Clipboard.setStringAsync(text?.gpay_link);
    Toast.show({
      type: "success",
      text1: "COPY !!",
      text2: "Google ID Pay Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },

      position: "bottom",
    });
  };

  //Phone Pay  Clipboard Copy Functionality
  const handlePhonepayCpoy = async () => {
    await Clipboard.setStringAsync(text?.phonepay_name);
    Toast.show({
      type: "success",
      text1: "COPY !!",
      text2: "Phone Pay Name Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },

      position: "bottom",
    });
  };
  const handlePhonepayIdCpoy = async () => {
    await Clipboard.setStringAsync(text?.phonepay_link);
    Toast.show({
      type: "success",
      text1: "COPY !!",
      text2: "Phone Pay ID Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },

      position: "bottom",
    });
  };

  //copy functionality for UPI
  const handleUPIcopy = async () => {
    await Clipboard.setStringAsync(text?.bhim_name);
    Toast.show({
      type: "success",
      text1: "COPY !!",
      text2: "UPI Name Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },

      position: "bottom",
    });
  };
  const handleUPIidcopy = async () => {
    await Clipboard.setStringAsync(text?.bhim_link);
    Toast.show({
      type: "success",
      text1: "COPY !!",
      text2: "UPI ID Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },

      position: "bottom",
    });
  };
  //Copy functionality for Other
  const handleOtherName = async () => {
    await Clipboard.setStringAsync(text?.other_name);
    Toast.show({
      type: "success",
      text1: "COPY !!",
      text2: "Other Bank Name Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },

      position: "bottom",
    });
  };
  const handleOtherID = async () => {
    await Clipboard.setStringAsync(text?.bhim_link);
    Toast.show({
      type: "success",
      text1: "COPY !!",
      text2: "Other ID Copy!!",
      visibilityTime: 1000,
      onShow: () => { },
      onHide: () => { },

      position: "bottom",
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCashDepositList());
    dispatch(GetDepositDetail());
    User_ID();
  }, []);
  console.log(CashDepositList, "fhtfrhyrthyrt");

  const onImagesubmit = (values) => {
    const formData = new FormData();
    formData.append(
      "notes",
      `${"CashDepositTransfer"},${values.CashDeposit_value}`
    );
    formData.append("amount", coins);
    formData.append("user_id", newId);
    formData.append("refer_code", value);
    formData.append("image", img1);
    formData.append("type_id", paymenyTypeID);

    dispatch(RequestDeposite(formData));
  };
  const [modalVisible, setModalVisible] = useState(true);
  const [value, setValue] = useState("");
  const [presseble, setPresseble] = useState(false);
  const [presseble1, setPresseble1] = useState(false);
  const [id, setid] = useState("");
  const [addCashError, setAddCashError] = useState("");
  const [image, setImage] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [img6, setImg6] = useState("");

  const [showImage, setShowImage] = useState(true);

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    addCash: "",
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  // UPI Image pickImage2
  const pickImage2 = async () => {
    let result2 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result2.canceled) {
      setImg1(result2.assets[0].uri);
    }
  };
  // Phone pay Image Picker
  const pickImage3 = async () => {
    let result3 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result3.canceled) {
      setImg2(result3.assets[0].uri);
    }
  };
  // Google pay image picker
  const pickImage4 = async () => {
    let result4 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result4.canceled) {
      setImg3(result4.assets[0].uri);
    }
  };
  // Paytm wallet pay image picker
  const pickImage5 = async () => {
    let result5 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result5.canceled) {
      setImg4(result5.assets[0].uri);
    }
  };
  //Bank Details Image Picker
  const pickImage6 = async () => {
    let result6 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result6.canceled) {
      setImg5(result6.assets[0].uri);
    }
  };
  //Other Details Image Picker
  const pickImage7 = async () => {
    let result7 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result7.canceled) {
      setImg6(result7.assets[0].uri);
    }
  };
  const onSubmit = () => {
    if (user.addCash == "") {
      setAddCashError("Please Select the Option!");
    } else {
      pickImage();
    }
  };
  const fatchImg1 = () => {
    pickImage2();
  };
  //Phone Pay
  const fatchImg2 = () => {
    pickImage3();
  };
  //Google Pay
  const fatchImg3 = () => {
    pickImage4();
  };
  // Paytm wallet
  const fatchImg4 = () => {
    pickImage5();
  };
  //BANK DETAILS
  const fatchImg5 = () => {
    pickImage6();
  };
  //Other DETAILS
  const fatchImg6 = () => {
    pickImage7();
  };

  const data = [
    {
      id: 1,
      Payment_name: "Bank Details",
      img_url: require("../../../assets/bank.png"),
    },
    {
      id: 2,
      Payment_name: "Paytm wallet",
      img_url: require("../../../assets/paytm.png"),
    },
    {
      id: 3,
      Payment_name: "Google pay",
      img_url: require("../../../assets/google_pay.png"),
    },
    {
      id: 4,
      Payment_name: "Phone Pay ",
      img_url: require("../../../assets/phone_pe.png"),
    },
    {
      id: 5,
      Payment_name: "UPI",
      img_url: require("../../../assets/upi.png"),
    },
    {
      id: 6,
      Payment_name: "CashDeposite",
      img_url: require("../../../assets/hawala.png"),
    },
    {
      id: 7,
      Payment_name: "Others",
      img_url: require("../../../assets/payment.png"),
    },
  ];
  const pressebleClick = () => {
    setPresseble(!presseble);
  };
  const pressebleClick1 = () => {
    setPresseble1(!presseble1);
  };
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setid(item.id);
        }}
        style={{
          height: 100,
          width: "25%",
          borderColor: "#3d4562",
          borderWidth: 1,
          backgroundColor: "#3d4562",
          borderRadius: 10,
          marginVertical: 10,
          marginHorizontal: 12,
          right: 10,
          left: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Image
            source={item?.img_url}
            style={{ height: 40, width: 40, borderRadius: 40 }}
          />
          <Text
            style={{
              color: colors.white,
              fontSize: 12,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 5,
            }}
          >
            {item?.Payment_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />

      <Modal
        animationType="slide"
        //animationInTiming = {13900}
        transparent={true}
        visible={modalVisible}
        // animationOut = "slide"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        style={{}}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View style={styles.modalView}>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                right: 10,
                top: 5,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <AntDesign name="closecircleo" size={30} color={colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>{String.DO_YOU_HAVE_ANY_REF_CODE}</Text>

            <View style={{}}>
              <TextInput
                style={{
                  height: 40,
                  marginTop: 12,
                  borderWidth: 1,
                  padding: 5,
                  borderColor: "#3d4562",
                  width: "90%",
                  borderRadius: 10,
                  color: colors.white,
                  margin: 12,
                  backgroundColor: "#3d4562",
                }}
                value={value}
                onChangeText={(text) => {
                  setValue(text);
                }}
                placeholder={String.ReferralCode}
                placeholderTextColor={colors.white}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: colors.aqua,
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  width: "30%",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>{String.Skip}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={value === "" && true}
                style={{
                  backgroundColor: value == "" ? "#ADD8E6" : colors.aqua,
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  width: "30%",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>{String.Submit}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View
        style={{
          height: "100%",
          backgroundColor: colors.aqua,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 30,
            height: 50,
            marginLeft: 10,
            marginTop: 5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back-circle-sharp"
            size={44}
            color={colors.white}
            style={{}}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            top: 10,
            right: 28,
          }}
        >
          <Text style={{ color: colors.white, fontSize: 25 }}>
            {String.Payment_Method}
          </Text>
        </View>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: colors.black,
            // backgroundColor: "pink",
            height: "100%",
            width: "100%",
            borderWidth: 1,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginTop: 80,
            position: "absolute",
          }}
        >
          <View style={{ marginTop: 10, left: 20 }}>
            <Text
              style={{ color: colors.white, fontSize: 16, fontWeight: "bold" }}
            >
              {String.Payment_method_text}
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: 12,
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              {String.MAKE_A_PAYMENT_OF_COINS_UPLOAD_SS}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <FlatList data={data} renderItem={renderItem} numColumns={3} />
          </View>
          {/* Bank details  */}
          {id == 1 ? (
            <View
              style={{
                marginTop: 16,
                // height: "42%",
                width: "90%",
                left: 20,
                right: 10,
                borderColor: "#3d4562",
                backgroundColor: "#3d4562",
                borderWidth: 10,
                borderRadius: 20,
              }}
            >
              <View style={{ marginTop: 5, left: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  {String.MAKE_YOUR_PAYMENT_BELOW}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {String.BANK_NAME}  {depositDetail?.bank_name}
                </Text>
                <TouchableOpacity>
                  <Feather
                    name="copy"
                    size={26}
                    color={colors.white}
                    style={{ right: 20 }}
                    onPress={handleBanknameCopy}
                  />
                </TouchableOpacity>
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  right: 20,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {String.ACCOUNT_HOLDER_NAME}  {depositDetail?.account_holder_name}
                </Text>
                <Feather
                  name="copy"
                  size={24}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={() => handlecopyaccount_holder_name()}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {String.ACCOUNT_NUMBER}  {depositDetail?.account_number}
                </Text>

                <TouchableOpacity>
                  <Feather
                    name="copy"
                    size={26}
                    color={colors.white}
                    style={{ right: 20 }}
                    onPress={() => handleAcountNumberCopy()}
                  />
                </TouchableOpacity>
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {String.IFSC}  {depositDetail?.ifsc_code}
                </Text>
                <TouchableOpacity>
                  <Feather
                    name="copy"
                    size={26}
                    color={colors.white}
                    style={{ right: 20 }}
                    onPress={handleIFSCCopy}
                  />
                </TouchableOpacity>
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>

              <View
                style={{
                  top: 5,
                  width: "90%",
                  left: 20,
                  right: 10,
                  borderColor: colors.black,
                  backgroundColor: colors.black,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 10,
                  borderRadius: 20,
                  marginBottom: 50,
                }}
              >
                {!img5 ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={24}
                      color={colors.white}
                      onPress={fatchImg5}
                    />

                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "400",
                        color: colors.white,
                      }}
                    >
                      {String.CLICK_HERE_TO_UPLOAD_SCREENSHOT}
                    </Text>
                  </View>
                ) : null}

                {img5 && (
                  <View
                    style={{
                      width: "100%",

                      backgroundColor: colors.black,

                      // borderRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        top: 5,
                        right: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setImg5(!showImage);
                          setImg5("");
                        }}
                      >
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        top: 10,

                        backgroundColor: colors.black,
                        marginBottom: 30,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!loading ? (
                        <ActivityIndicator
                          //visibility of Overlay Loading Spinner
                          visible={loading}
                          //Text with the Spinner
                          textContent={"Loading..."}
                          //Text style of the Spinner Text
                          textStyle={styles.spinnerTextStyle}
                        />
                      ) : (
                        <Image
                          source={{ uri: img5 }}
                          style={{
                            width: 200,
                            height: 150,
                            borderRadius: 10,
                          }}
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          onImagesubmit()
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#01b0ff",
                            top: 10,
                            borderRadius: 15,
                            padding: 10,
                            elevation: 2,
                            width: 90,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {String.Submit}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : null}
          {/* Paytm wallet  */}
          {id == 2 ? (
            <View
              style={{
                marginTop: 16,
                // height: "42%",
                width: "90%",
                left: 20,
                right: 10,
                borderColor: "#3d4562",
                backgroundColor: "#3d4562",
                borderWidth: 10,
                borderRadius: 20,
              }}
            >
              <View style={{ marginTop: 5, left: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  {String.MAKE_YOUR_PAYMENT_BELOW}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {String.PERSON_NAME}  {depositDetail?.paytm_name}
                </Text>
                <Feather
                  name="copy"
                  size={26}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={handlePaytmNameCopy}
                />
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  right: 20,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {String.PAYTM_ID}  {depositDetail?.paytm_link}
                </Text>
                <Feather
                  name="copy"
                  size={24}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={handlePaytmIdCopy}
                />
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>

              <View
                style={{
                  top: 5,

                  width: "90%",
                  left: 20,
                  right: 10,
                  borderColor: colors.black,
                  backgroundColor: colors.black,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 10,
                  borderRadius: 20,
                  marginBottom: 50,
                }}
              >
                {!img4 ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={24}
                      color={colors.white}
                      onPress={fatchImg4}
                    />

                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "400",
                        color: colors.white,
                      }}
                    >
                      {String.CLICK_HERE_TO_UPLOAD_SCREENSHOT}
                    </Text>
                  </View>
                ) : null}

                {img4 && (
                  <View
                    style={{
                      width: "100%",

                      backgroundColor: colors.black,

                      // borderRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        top: 5,
                        right: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setImg4(!showImage);
                          setImg4("");
                        }}
                      >
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        top: 10,

                        backgroundColor: colors.black,
                        marginBottom: 30,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!loading ? (
                        <ActivityIndicator
                          //visibility of Overlay Loading Spinner
                          visible={loading}
                          //Text with the Spinner
                          textContent={"Loading..."}
                          //Text style of the Spinner Text
                          textStyle={styles.spinnerTextStyle}
                        />
                      ) : (
                        <Image
                          source={{ uri: img4 }}
                          style={{
                            width: 200,
                            height: 150,
                            borderRadius: 10,
                          }}
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          onImagesubmit()
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#01b0ff",
                            top: 10,
                            borderRadius: 15,
                            padding: 10,
                            elevation: 2,
                            width: 90,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {String.Submit}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : null}
          {/* Google Pay Image  */}
          {id == 3 ? (
            <View
              style={{
                marginTop: 16,
                // height: "42%",
                width: "90%",
                left: 20,
                right: 10,
                borderColor: "#3d4562",
                backgroundColor: "#3d4562",
                borderWidth: 10,
                borderRadius: 20,
              }}
            >
              <View style={{ marginTop: 5, left: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                  {String.MAKE_YOUR_PAYMENT_BELOW}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                 {String.GOOGLE_PAY}  {depositDetail?.gpay_name}
                </Text>
                <Feather
                  name="copy"
                  size={26}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={handleGpayNamecopy}
                />
                <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  right: 20,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                 {String.GOOGLE_PAY_ID}  {depositDetail?.gpay_link}
                </Text>
                <Feather
                  name="copy"
                  size={24}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={handleGpayIdCopy}
                />
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>

              <View
                style={{
                  top: 5,
                  width: "90%",
                  left: 20,
                  right: 10,
                  borderColor: colors.black,
                  backgroundColor: colors.black,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 10,
                  borderRadius: 20,
                  marginBottom: 50,
                }}
              >
                {!img3 ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={24}
                      color={colors.white}
                      onPress={fatchImg3}
                    />

                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "400",
                        color: colors.white,
                      }}
                    >
                    {String.CLICK_HERE_TO_UPLOAD_SCREENSHOT}
                    </Text>
                  </View>
                ) : null}

                {img3 && (
                  <View
                    style={{
                      width: "100%",

                      backgroundColor: colors.black,

                      // borderRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        top: 5,
                        right: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setImg3(!showImage);
                          setImg3("");
                        }}
                      >
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        top: 10,
                        backgroundColor: colors.black,
                        marginBottom: 30,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!loading ? (
                        <ActivityIndicator
                          //visibility of Overlay Loading Spinner
                          visible={loading}
                          //Text with the Spinner
                          textContent={"Loading..."}
                          //Text style of the Spinner Text
                          textStyle={styles.spinnerTextStyle}
                        />
                      ) : (
                        <Image
                          source={{ uri: img3 }}
                          style={{
                            width: 200,
                            height: 150,
                            borderRadius: 10,
                          }}
                        />
                      )}
                      <TouchableOpacity onPress={() => {
                        onImagesubmit()
                      }}>
                        <View
                          style={{
                            backgroundColor: "#01b0ff",
                            top: 10,
                            borderRadius: 15,
                            padding: 10,
                            elevation: 2,
                            width: 90,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {String.Submit}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : null}
          {/* Phone Pe Image  */}
          {id == 4 ? (
            <View
              style={{
                marginTop: 16,
                // height: "42%",
                width: "90%",
                left: 20,
                right: 10,
                borderColor: "#3d4562",
                backgroundColor: "#3d4562",
                borderWidth: 10,
                borderRadius: 20,
              }}
            >
              <View style={{ marginTop: 5, left: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                {String.MAKE_YOUR_PAYMENT_BELOW}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {String.PHONE_PAY}  {depositDetail?.phonepay_name}
                </Text>
                <Feather
                  name="copy"
                  size={26}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={handlePhonepayCpoy}
                />
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  right: 20,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                 {String.PHONE_PAY_ID}  {depositDetail?.phonepay_link}
                </Text>
                <Feather
                  name="copy"
                  size={24}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={handlePhonepayIdCpoy}
                />
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>

              <View
                style={{
                  top: 5,

                  width: "90%",
                  left: 20,
                  right: 10,
                  borderColor: colors.black,
                  backgroundColor: colors.black,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 10,
                  borderRadius: 20,
                  marginBottom: 50,
                }}
              >
                {!img2 ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={24}
                      color={colors.white}
                      onPress={fatchImg2}
                    />

                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "400",
                        color: colors.white,
                      }}
                    >
                     {String.CLICK_HERE_TO_UPLOAD_SCREENSHOT}
                    </Text>
                  </View>
                ) : null}

                {img2 && (
                  <View
                    style={{
                      width: "100%",

                      backgroundColor: colors.black,

                      // borderRadius: 20,
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        top: 5,
                        right: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setImg2(!showImage);
                          setImg2("");
                        }}
                      >
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        top: 10,

                        backgroundColor: colors.black,
                        marginBottom: 30,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!loading ? (
                        <ActivityIndicator
                          //visibility of Overlay Loading Spinner
                          visible={loading}
                          //Text with the Spinner
                          textContent={"Loading..."}
                          //Text style of the Spinner Text
                          textStyle={styles.spinnerTextStyle}
                        />
                      ) : (
                        <Image
                          source={{ uri: img2 }}
                          style={{
                            width: 200,
                            height: 150,
                            borderRadius: 10,
                          }}
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          onImagesubmit()
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#01b0ff",
                            top: 10,
                            borderRadius: 15,
                            padding: 10,
                            elevation: 2,
                            width: 90,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {String.Submit}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : null}
          {/* UPI Image */}
          {id == 5 ? (
            <View
              style={{
                marginTop: 16,
                // height: "42%",
                width: "90%",
                left: 20,
                right: 10,
                borderColor: "#3d4562",
                backgroundColor: "#3d4562",
                borderWidth: 10,
                borderRadius: 20,
              }}
            >
              <View style={{ marginTop: 5, left: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                 {String.MAKE_YOUR_PAYMENT_BELOW}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                {String.UPI} {depositDetail?.bhim_name}
                </Text>
                <Feather
                  name="copy"
                  size={26}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={handleUPIcopy}
                />
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  right: 20,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                {String.UPI_ID}  {depositDetail?.bhim_link}
                </Text>
                <Feather
                  name="copy"
                  size={24}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={handleUPIidcopy}
                />
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>

              <View
                style={{
                  top: 5,

                  width: "90%",
                  left: 20,
                  right: 10,
                  borderColor: colors.black,
                  backgroundColor: colors.black,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 10,
                  borderRadius: 20,
                  marginBottom: 50,
                }}
              >
                {!img1 ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={24}
                      color={colors.white}
                      onPress={fatchImg1}
                    />

                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "400",
                        color: colors.white,
                      }}
                    >
                     {String.CLICK_HERE_TO_UPLOAD_SCREENSHOT}
                    </Text>
                  </View>
                ) : null}

                {img1 && (
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: colors.black
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        top: 5,
                        right: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setImg1(!showImage);
                          setImg1("");
                        }}
                      >
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        top: 10,
                        backgroundColor: colors.black,
                        marginBottom: 30,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!loading ? (
                        <ActivityIndicator
                          visible={loading}
                          textContent={"Loading..."}
                          textStyle={styles.spinnerTextStyle}
                        />
                      ) : (
                        <Image
                          source={{ uri: img1 }}
                          style={{
                            width: 200,
                            height: 150,
                            borderRadius: 10,
                          }}
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          onImagesubmit()
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#01b0ff",
                            top: 10,
                            borderRadius: 15,
                            padding: 10,
                            elevation: 2,
                            width: 90,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {String.Submit}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : null}

          {/* CashDeposit */}
          {id == 6 ? (
            <View
              style={{
                marginTop: 16,
                height: "48%",
                width: "90%",
                left: 20,
                right: 10,
                borderColor: "#3d4562",
                backgroundColor: "#3d4562",

                borderWidth: 10,
                borderRadius: 20,
                marginBottom: 50,
              }}
            >
              <View style={{ marginTop: 5, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: colors.white,
                    marginBottom: 10,
                  }}
                >
                  {String.MAKE_YOUR_PAYMENT_BELOW}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 15,
                  flexDirection: "column",
                }}
              >
                {/* drop down */}
                <SelectDropdown
                  data={dropdowndata}
                  onSelect={(selectedItem, index) => {
                    setUser(
                      { ...user, addCash: selectedItem },
                      setAddCashError()
                    );
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={{
                    top: 10,
                    width: "90%",
                    height: user.addCash ? 80 : 40,
                    backgroundColor: colors.white,
                    borderBottomColor: "#fff",
                    marginBottom: 5,
                    top: -1,
                    borderWidth: 1,
                    borderColor: colors.black,
                  }}
                  buttonTextStyle={styles.dropdownBtnTxtStyle}
                  renderDropdownIcon={(isOpened) => {
                    return (
                      <AntDesign
                        name={isOpened ? "up" : "down"}
                        size={24}
                        color="black"
                        style={{ left: 10 }}
                      />
                    );
                  }}
                  dropdownIconPosition={"right"}
                  dropdownStyle={styles.dropdownDropdownStyle}
                  rowStyle={styles.dropdownRowStyle}
                  rowTextStyle={styles.dropdownRowTxtStyle}
                />
                {user.addCash == "" || null ? (
                  <Text style={styles.errorStyle}>{addCashError}</Text>
                ) : null}
                {image && (
                  <View
                    style={{
                      width: "90%",
                      height: "65%",

                      backgroundColor: colors.black,
                      marginBottom: 100,
                      borderRadius: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setShowImage(!showImage);
                        setImage("");
                      }}
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        top: 10,
                        right: 10,
                      }}
                    >
                      <AntDesign
                        name="closecircleo"
                        size={24}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                    {!image ? (
                      <ActivityIndicator
                        size="large"
                        style={{
                          flex: 1,
                          justifyContent: "center",
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          flex: 1,
                        }}
                      >
                        <Image
                          source={{ uri: image }}
                          style={{
                            width: 200,
                            height: 150,
                            borderRadius: 10,
                          }}
                        />

                        <TouchableOpacity
                          onPress={() => {
                            onImagesubmit()
                          }}
                        >
                          <View
                            style={{
                              height: 40,
                              backgroundColor: "#01b0ff",
                              top: 10,
                              borderRadius: 15,
                              padding: 10,
                              elevation: 2,
                              width: 90,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: colors.white,
                                fontSize: 16,
                                fontWeight: 500,
                              }}
                            >
                              {String.Submit}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              </View>

              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  right: 20,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              ></View>
              {image ? null : (
                <View
                  style={{
                    marginTop: 16,
                    height: "32%",
                    width: "90%",
                    left: 20,
                    right: 10,
                    borderColor: colors.black,
                    backgroundColor: colors.black,
                    borderWidth: 10,
                    borderRadius: 20,
                    marginBottom: 50,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={24}
                      color={colors.white}
                      onPress={onSubmit}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "400",
                        color: colors.white,
                      }}
                    >
                 {String.CLICK_HERE_TO_UPLOAD_SCREENSHOT}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ) : null}
          {id == 7 ? (
            <View
              style={{
                marginTop: 16,
                // height: "42%",
                width: "90%",
                left: 20,
                right: 10,
                borderColor: "#3d4562",
                backgroundColor: "#3d4562",
                borderWidth: 10,
                borderRadius: 20,
              }}
            >
              <View style={{ marginTop: 5, left: 5 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: colors.white,
                  }}
                >
                 {String.MAKE_YOUR_PAYMENT_BELOW}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                  {String.OTHER_NAME}  {depositDetail?.other_name}
                </Text>
                <Feather
                  name="copy"
                  size={26}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={handleOtherName}
                />
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  left: 10,
                  right: 20,
                  flexDirection: "row",
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "400",
                  }}
                >
                   {String.OTHER_ID}  {depositDetail?.other_link}
                </Text>
                <Feather
                  name="copy"
                  size={24}
                  color={colors.white}
                  style={{ right: 20 }}
                  onPress={handleOtherID}
                />
                <Toast
                  config={toastConfig}
                  ref={(ref) => {
                    Toast.setRef(ref);
                  }}
                />
              </View>

              <View
                style={{
                  top: 5,
                  width: "90%",
                  left: 20,
                  right: 10,
                  borderColor: colors.black,
                  backgroundColor: colors.black,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 10,
                  borderRadius: 20,
                  marginBottom: 50,
                }}
              >
                {!img6 ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="pluscircle"
                      size={24}
                      color={colors.white}
                      onPress={fatchImg6}
                    />

                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "400",
                        color: colors.white,
                      }}
                    >
                     {String.MAKE_A_PAYMENT_OF_COINS_UPLOAD_SS}
                    </Text>
                  </View>
                ) : null}

                {img6 && (
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: colors.black
                    }}
                  >
                    <View
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        top: 5,
                        right: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setImg6(!showImage);
                          setImg6("");
                        }}
                      >
                        <AntDesign
                          name="closecircleo"
                          size={24}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        top: 10,
                        backgroundColor: colors.black,
                        marginBottom: 30,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {!loading ? (
                        <ActivityIndicator
                          visible={loading}
                          textContent={"Loading..."}
                          //Text style of the Spinner Text
                          textStyle={styles.spinnerTextStyle}
                        />
                      ) : (
                        <Image
                          source={{ uri: img6 }}
                          style={{
                            width: 200,
                            height: 150,
                            borderRadius: 10,
                          }}
                        />
                      )}

                      <TouchableOpacity
                        onPress={() => {
                          onImagesubmit()
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#01b0ff",
                            top: 10,
                            borderRadius: 15,
                            padding: 10,
                            elevation: 2,
                            width: 90,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: colors.white,
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {String.Submit}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: colors.black,
    borderRadius: 20,
    height: 250,
    width: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  dropdownBtnTxtStyle: {
    color: colors.black,
    textAlign: "left",
  },
  dropdownDropdownStyle: {
    backgroundColor: colors.white,
  },
  dropdownRowStyle: {
    backgroundColor: colors.white,
    borderBottomColor: "#C5C5C5",
    height: 100,
  },
  dropdownRowTxtStyle: {
    color: "#FFF",
    textAlign: "left",
  },

  textStyle: {
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 30,
    color: colors.white,
  },
  errorStyle: {
    color: colors.red,
  },
});

export default PaymentMethhod;
