import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native"
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { String } from "../../utils/String";
import { colors } from "../../utils/colors";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Table, Row, Rows } from "react-native-table-component";
import { getTransactions } from "../../../Redux/Action/WalletAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

const Passbook = ({ navigation, details }) => {
  const [show, setShow] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [modalData, setModaldata] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [newId, setnewId] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  //select start select date in datePicker
  const [startselectedDate, setStartSelectedDate] = useState("");
  //select end select date in datePicker
  const [endselectedDate, setEndSeletedDate] = useState("");
  const [startformatedDate, setstartformatedDate] = useState("");
  const [endformateDate, setEndFormatedDate] = useState("");

  const [filteredUsers, setFilteredUsers] = useState([]);

  const TransactionList = useSelector(
    (state) => state?.transactionData?.transactions?.data
  );

  const [filterList, setfilterList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setfilterList(TransactionList);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [TransactionList]);

  const User_ID = async () => {
    let data = await AsyncStorage.getItem("UserId");

    setnewId(data);
  };

  useEffect(() => {
    if (newId) {
      dispatch(
        getTransactions({
          start_date: null,
          end_date: null,
          user_id: newId,
        })
      );
    }

    User_ID();
  }, [newId]);

  const ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    setModaldata(date + "-" + month + "-" + year);
  };
  const filterUsersByDate = () => {
    const filterUser = TransactionList.filter((user) => {
      const userListDate = new Date(user.date);
      return (
        userListDate >= startselectedDate && userListDate <= endselectedDate
      );
    });
    setFilteredUsers(filterUser);
  };
  console.log();
  useEffect(() => {
    ShowCurrentDate();
  }, []);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
    //ShowCurrentDate()
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker1 = () => {
    setDatePickerVisibility2(true);
    //ShowCurrentDate()
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility2(false);
  };

  const handleFilter = () => {
    setShow(!show);
  };

 

  const tableheader = [
    { Date: "Date" },
    { Deposit: "Deposite" },
    { Balance: "Balance" },
    { Withdraw: "Withdraw" },
    { Details: "-" },
  ];

  const keys = Object.keys(tableheader);
  const tableHeaderText = tableheader?.map((t, index) => {
    return [
      <Text>{t.Date}</Text>,
      <Text>{t.Deposit}</Text>,
      <Text>{t.Balance}</Text>,
      <Text>{t.Withdraw}</Text>,
      <Text>{t.Details}</Text>,
    ];
  });
  // set the index if Note and Remark on button click

  const displayModalData = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };
  //function for formate the date in dd/mm/yyyy set startSelectedDate

  const startDateConfirm = (date) => {
    console.log(date, "date----------dwehwjfvjhferjh");
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const newDate = `${day}-${month}-${year}`;
    setstartformatedDate(newDate);
    console.log(newDate, "startformattedDate===>");
    setStartSelectedDate(date.toDateString());
    hideDatePicker();
    // getDates();
  };
  //functtion for end selected Date and format the in dd/mm/yyyy

  const endDateConfirm = (enddate) => {
    const year = enddate.getFullYear();
    const month = enddate.getMonth() + 1;
    const day = enddate.getDate();
    const newDate = `${day}-${month}-${year}`;
    setEndFormatedDate(newDate);
    console.log(newDate, "endformated===>");
    setEndSeletedDate(enddate.toDateString());
    hideDatePicker1();
    // getDates();
  };

  const filterData = (minDate, maxDate, Data) => {
    if (minDate == "") {
      minDate = new Date();
    }

    if (maxDate == "") {
      maxDate = new Date();
    }

    var startDate = new Date(minDate);
    var endDate = new Date(maxDate);

    var resultProductData = Data.filter((a) => {
      var date = new Date(a.Date);

      return date >= startDate && date <= endDate;
    });
    console.log(minDate, maxDate, resultProductData.length, "all");

    return resultProductData;
  };

  const filterlist = () => {
    const list = filterData(
      startselectedDate,
      endselectedDate,
      TransactionList
    );
    console.log(startselectedDate, endselectedDate, list);
    setfilterList([...list]);
  };
 
  let f = show ? filterList : TransactionList;

  const TransactionListData = f?.map((list, index) => {
    return [
      <Text
        key={index}
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: colors.white,
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        {list.Date}
      </Text>,
      <Text key={index} style={styles.rowDataStyle}>
        {list.Deposit}
      </Text>,
      <Text key={index} style={styles.rowDataStyle}>
        {list.Withdraw}
      </Text>,
      <Text key={index} style={styles.rowDataStyle}>
        {list.Balance}
      </Text>,
      <TouchableOpacity onPress={() => displayModalData(index)}>
        <View style={styles.detailButton}>
          <Text
            style={{
              color: colors.white,
            }}
          >
            {String.Details}
          </Text>
        </View>
      </TouchableOpacity>
    ];
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <StatusBar />
      <View style={{ backgroundColor: colors.aqua, height: "14%" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={38}
              color={colors.white}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,

              justifyContent: "center",
              alignItems: "center",
              marginRight: 50,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {String.Passbook}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            left: 5,
          }}
        >
          <Text style={styles.transactionsStyle}>{String.Transactions}</Text>
        </View>

        <TouchableOpacity onPress={handleFilter}>
          <View style={styles.filterButton}>
            <Text style={styles.filterButtonText}>{String.Filter}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ height: 240 }}>
        <View style={styles.container}>
          <Table>
            <Row
              data={tableHeaderText}
              style={styles.head}
              textStyle={styles.text}
            />

            {TransactionListData && !isLoading ? (
              <ScrollView style={{ height: 200 }}>
                {TransactionListData.length > 0 && !isLoading ? (
                  <Rows
                    data={TransactionListData}
                    style={styles.evenRow}
                    textStyle={styles.text}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignSelf: "center",
                      alignItems: "center",
                      marginTop: 40,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 16,
                        fontWeight: 600,
                      }}
                    >
                      {String.notFound}
                    </Text>
                  </View>
                )}
              </ScrollView>
            ) : (
              <ActivityIndicator
                size="large"
                color={colors.red}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 60,
                }}
              />
            )}
          </Table>
        </View>
      </View>
      {/* whatsapp icon  */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignSelf: "flex-end",
                  width: 50,
                }}
              >
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color={colors.white}
                    style={{
                      top: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  />
                </TouchableOpacity>
              </View>

              {selectedIndex >= 0 && (
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {TransactionList[selectedIndex]?.Note == null ? null : (
                    <Text style={styles.modalText}>
                      {String.Note}: {TransactionList[selectedIndex]?.Note}
                    </Text>
                  )}
                  <Text style={styles.modalText}>
                    {String.Remarks}: {TransactionList[selectedIndex]?.Remarks}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>

      {show ? (
        <View
          style={{
            //  flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 10,

            //  backgroundColor:"red"
          }}
        >
          <View
            style={{
              width: "30%",
              height: 40,
              backgroundColor: colors.gray,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderColor: colors.gray,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                showDatePicker();
              }}
            >
              {startselectedDate ? (
                <Text
                  style={{ fontSize: 16, color: colors.white, fontWeight: 600 }}
                >
                  {startformatedDate}
                </Text>
              ) : (
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {modalData}
                </Text>
              )}
            </TouchableOpacity>
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={startDateConfirm}
              onCancel={hideDatePicker}
              // date={inputValue.startDate}
            />
          </View>

          <View
            style={{
              width: "30%",
              height: 40,
              backgroundColor: colors.gray,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderColor: colors.gray,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                showDatePicker1();
              }}
            >
              {endselectedDate ? (
                <Text
                  style={{ fontSize: 16, color: colors.white, fontWeight: 600 }}
                >
                  {endformateDate}
                </Text>
              ) : (
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {modalData}
                </Text>
              )}
            </TouchableOpacity>
            <DateTimePicker
              isVisible={isDatePickerVisible2}
              mode="date"
              onConfirm={endDateConfirm}
              onCancel={hideDatePicker1}
              // date={inputValue.startDate}
            />
          </View>
        </View>
      ) : null}
      {show ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 30,
          }}
        >
          <TouchableOpacity onPress={handleFilter}>
            <View
              style={{
                width: 80,
                height: 40,
                backgroundColor: colors.aqua,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                //marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {String.Close}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={filterlist}>
            <View
              style={{
                width: 80,
                height: 40,
                backgroundColor: colors.aqua,
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {String.Apply}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={{ backgroundColor: colors.black }}>
        <TouchableOpacity
          style={styles.whatappWrapper}
          onPress={() => {
            Linking.openURL("http://api.whatsapp.com/send?phone=962");
          }}
        >
          <FontAwesome name="whatsapp" size={34} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Passbook;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.white,

    overflow: "scroll",
  },
  head: {
    height: 40,
    backgroundColor: "#3d4562",

    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
  },
  text2: { margin: 6, color: colors.white },
  filterButton: {
    backgroundColor: colors.aqua,
    height: 40,
    width: 80,
    top: -5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    right: 10,
  },
  filterButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionsStyle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  whatappWrapper: {
    top: 10,
    height: 40,
    marginTop: "auto",
    width: 40,
    backgroundColor: colors.green,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    right: 25,
  },
  closeButton: {},
  applyButton: {},

  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: {
    margin: 6,
    fontWeight: 600,
    justifyContent: "space-between",
    alignItems: "center",
  },
  evenRow: {
    backgroundColor: colors.tableBackground,
    fontWeight: 600,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    borderColor: colors.white,
    borderWidth: 1,
  },
  oddRow: {
    backgroundColor: colors.oddRowcolor,
    fontWeight: 600,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: colors.white,
    borderWidth: 1,
  },
  detailButton: {
    fontSize: 11,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.aqua,

    margin: 5,
    padding: 5,
    color: colors.white,
    borderRadius: 5,
  },
  rowDataStyle: {
    fontWeight: 600,
    color: colors.white,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: colors.aqua,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 20,
    width: 250,
    height: 150,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    top: 10,
    fontSize: 15,
    fontWeight: 600,
    color: colors.white,
  },
});
