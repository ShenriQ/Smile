import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBackButton } from '@react-navigation/stack';
import LoginScreen from "../screens/authScreens/LoginScreen";
import RegisterScreen from "../screens/authScreens/RegisterScreen";
// import ForgotPassword from "../screens/auth/ForgotPassword";
// import UploadPhoto from "../screens/auth/UploadPhoto";
// import SelectGender from "../screens/auth/SelectGender";
// import UpdateProfile from "../screens/auth/UpdateProfile";

const Stack = createStackNavigator();

function AuthStack({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            gestureEnabled :false,
            headerStyle: {
                backgroundColor: "black",
            },
            headerTintColor: "white",
            headerTitleStyle: {
                fontFamily: "DMSans-Medium",
                fontSize: 20, 
            },
            headerTitleAlign : "center", 
            headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.pop()} />
        }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                headerShown: false
                // headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Start")} />
            }}/>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{
                headerShown: false
                // headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Start")} />
            }} />
            {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
                title : "Forgot Password",
                headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Start")} />
            }} />
            <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{
                title : "Upload your Photo",
                headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Register")} />
            }} />
            <Stack.Screen name="SelectGender" component={SelectGender} options={{
                title : "Select Gender",
                headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("UploadPhoto")} />
            }}/>
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{
                title : "Update Profile",
                headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("SelectGender")} />
            }}/> */}
            {/* <Stack.Screen name="Ethnicity" component={Ethnicity} options={{
                title : "Update Profile",
                headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("UpdateProfile")} />
            }} /> */}
            {/* <Stack.Screen name="Interests" component={Interests} options={{
                title : "Update Profile",
                headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Ethnicity")} />
            }} />
            <Stack.Screen name="LookingFor" component={LookingFor} options={{
                title : "Update Profile",
                headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Interests")} />
            }} /> */}
            {/* <Stack.Screen name="Relationship" component={Relationship} options={{
                title : "Update Profile",
                headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("UpdateProfile")} />
            }} />
            <Stack.Screen name="ReligiousAffiliation" component={ReligiousAffiliation} options={{
                title : "Update Profile",
                headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("Relationship")} />
            }} />
            <Stack.Screen name="Occupation" component={Occupation} options={{
                title : "Update Profile",
                headerLeft: (props) => <HeaderBackButton tintColor="white" labelVisible={false} style={{ marginLeft: 10 }} onPress={() => navigation.navigate("ReligiousAffiliation")} />
            }} />
            
            <Stack.Screen name="CompleteScreen" component={CompleteScreen} options={{
                headerShown : false
            }} /> */}
        </Stack.Navigator> 
    )
}

export default AuthStack;