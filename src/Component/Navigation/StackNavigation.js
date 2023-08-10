import React from "react";
import { View, StyleSheet } from "react-native";
import Dashboard from "../Screens/Dashboard/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Withdraw from "../Screens/Withdraw/withdraw";
import Deposit from "../Screens/Deposit/Deposit";
import ThirdParty from "../Screens/ThirdParty/ThirdParty";
import PaymentMethhod from "../Screens/Deposit/PaymentMethhod";
import PaytmModal from "../Screens/Withdraw/PaytmModal";
import AddBankDetails from "../Screens/Withdraw/AddBankDetails";
import WithdrawDetails from "../Screens/Withdraw/WithDrawdetails";
import Googlepaydetails from "../Screens/Withdraw/Googlepaydetails";
import Phonepaydetails from "../Screens/Withdraw/Phonepaydetails";
import Upidetails from "../Screens/Withdraw/Upidetails";
import OtherData from "../Screens/Withdraw/OtherData";
import CashDeposit from "../Screens/Withdraw/CashDeposit";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="Deposit" component={Deposit} />
        <Stack.Screen name="ThirdParty" component={ThirdParty} />
        <Stack.Screen name="WithdrawDetails" component={WithdrawDetails} />
        <Stack.Screen name="Googlepaydetails" component={Googlepaydetails} />
        <Stack.Screen name="Phonepaydetails" component={Phonepaydetails} />
        <Stack.Screen name="PaymentMethhod" component={PaymentMethhod} />
        <Stack.Screen name="PaytmModal" component={PaytmModal} />
        <Stack.Screen name="AddBankDetails" component={AddBankDetails} />
        <Stack.Screen name="Upidetails" component={Upidetails} />
        <Stack.Screen name="OtherData" component={OtherData} />
        <Stack.Screen name="CashDeposit" component={CashDeposit} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StackNavigation;
