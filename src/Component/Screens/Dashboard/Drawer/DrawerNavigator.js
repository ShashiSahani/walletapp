import { createDrawerNavigator } from "@react-navigation/drawer";
import { useWindowDimensions } from "react-native";
import Profile from "../../Profile/Profile";
import MainNavigation from "../../../Navigation/MainNavigation";
import CustomSidebarMenu from "../../CustomSideBarMenu/CustomSidebarMenu";
import ContactUS from "../../ContactUs/ContactUs";
import Passbook from "../../Passbook/Passbook";
import StackNavigation from "../../../Navigation/StackNavigation";
import Home from "../../Home/Home";
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen name='StackNavigation' component={StackNavigation} />
      <Drawer.Screen name="MainScren" component={Home} />

      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="ContactUS" component={ContactUS} />
      <Drawer.Screen name="Passbook" component={Passbook} />
    </Drawer.Navigator>
  );
};
export default MyDrawer;
