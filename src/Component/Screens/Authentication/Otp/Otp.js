import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../../utils/colors';
import { String } from '../../../utils/String';
import { sendOtp, verifyOtp } from '../../../../Redux/Action/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import OTPTextView from 'react-native-otp-textinput';


const Otp = ({ navigation }) => {
    const [otp, setOtp] = useState("");
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userDetail);    
    console.log('user>>>>>>>>>>>', user)
    const otpVarificationStatus = useSelector(
        (state) => state?.user?.otpVerification
    );
    console.log("otpVarificationStatus", otpVarificationStatus)
    const sendOtpstate = useSelector((state) => state?.user?.userDetail); 
    console.log("sendOtpstate>>>>>>>>>>>>>>", sendOtpstate)

    const handleChange = (enteredOtp) => {
        setOtp(enteredOtp);
    };

    useEffect(() => {

    }, [])


    return (

        <View style={{ flex: 1, backgroundColor: colors.black }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                <Image source={require("../../../../assets/otp.png")} style={{ height: 100, width: 100, }} />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.white }}>{String.OTP_Verification}</Text>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.white, marginHorizontal: 20, top: 20, }}>{String.OTP_Msg}</Text>

            </View>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                <OTPTextView ref={e => (otpInput = e)}
                    inputCount={6}
                    defaultValue={otp}
                
                />
                <View style={{ margin: 30, flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(
                                verifyOtp({
                                    id: sendOtpstate?.id,
                                    otp: sendOtpstate?.otp,
                                })
                                
                            );
                            setTimeout(() => {
                                navigation.navigate("ForgotPassword")
                            }, 3000 )
                        }}
                        style={{
                            height: 50,
                            width: "75%", borderColor: colors.aqua, borderWidth: 5,
                            backgroundColor: colors.aqua, borderRadius: 5, justifyContent: "center",
                            alignItems: "center", marginBottom: 30
                        }}>
                        <Text style={{ fontSize: 19, fontWeight: "bold", color: colors.black }}>
                            {String.confirm_otp}</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
})

export default Otp;
