import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUserData() {
	return new Promise((resolve, reject) => {
		AsyncStorage.setItem("UserToken",JSON.parse(loginData?.data?.data[0]?.token));

	});
}

	export async function removeToken() {
		return new Promise((resolve, reject) => {
			AsyncStorage.removeItem("UserToken",JSON.parse(loginData?.data?.data[0]?.token));
	
		});
	}