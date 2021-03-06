import React, { Component } from 'react';
import { Alert, View, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Text from "../../components/Text";
import TextInput from "../../components/TextInput";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IntlPhoneInput from 'react-native-intl-phone-input';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from 'react-native-iphone-x-helper';
import TermAndConditions from "../../components/TermAndConditions";
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import Loading from "../Loading";
import { registerSuccess } from "../../actions/AuthActions";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
const iphonex = isIphoneX();
const { width, height } = Dimensions.get("window");
class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            email: "",
            password: "",
            phoneNumber: "",
            countryDialCode: "",
            countryCode: "",
            toc: false,
            showToC: false,
            loading: false,
        };
    }

    _onPressToc = () => {
        const that = this;
        Alert.alert(
            "Agree to Terms and Conditions",
            "Do you agree to the terms and conditions of Pursue?",
            [
                {
                    text: "Disagree",
                    onPress: () => that.setState({ toc: false, showToC: false })
                },
                { 
                    text: "Agree", 
                    onPress: () =>  that.setState({ toc: true, showToC: false }) 
                }
            ],
            { cancelable: false }
        );

        // this.setState({ showToC: true })
    }

    _onChangeEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) this.setState({ email: email })
        else this.setState({ email: "" })
    }

    _onChangePassword = (password) => {
        this.setState({ password: password });
    }

    _onChangePhoneNumber = (props) => {
        const { isVerified, phoneNumber, selectedCountry } = props;
        if (isVerified) {
            this.setState({ countryCode: selectedCountry.code, countryDialCode: selectedCountry.dialCode, phoneNumber: phoneNumber });
        }
    };
    _onChangeFullName = (fullname) => {
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        if (regName.test(fullname)) {
            this.setState({ fullname: fullname });
        } else {
            this.setState({ fullname: "" });
        }
    }

    _onToCAccept = () => {
        this.setState({ toc: true, showToC: false });
    }

    _onToCDelcine = () => {
        this.setState({ toc: false, showToC: false });
    }

    _onPressLogIn = () => {
        this.props.navigation.navigate("LoginScreen");
    }

    _onPressRegister = () => {
        if (this.state.fullname == "") {
            alert("Please enter your full name!");
            return;
        }
        if (this.state.password == "") {
            alert("Please enter your password!");
            return;
        }
        if (this.state.email == "") {
            alert("Please enter your email!");
            return;
        }
        if (this.state.phoneNumber == "") {
            alert("Please enter your Phone Number!");
            return;
        }
        if (!this.state.toc) {
            alert("Please confirm the Terms and Conditions!");
            return;
        }
        const { showToC, loading, toc, ...userInput } = this.state;
        this.setState({ loading: true });
        const {user, registerSuccess } = this.props;
        auth().createUserWithEmailAndPassword(userInput.email, userInput.password)
            .then(async (res) => {
                this.setState({ loading: false });
                const { email, emailVerified, phoneNumber, uid } = res.user;
                const data = {
                    email: email,
                    uid: uid,
                    fullname: this.state.fullname,
                    phoneNumber: this.state.phoneNumber,
                    countryDialCode: this.state.countryDialCode,
                    countryCode: this.state.countryCode
                }
                registerSuccess(data);
            })
            .catch(e => {
                // console.warn(e);
                var errorMsg = e.message;
                alert(errorMsg);
                this.setState({ loading: false });
            })

    }

    render() {
        const confirmed = this.state.fullname != "" && this.state.password != "" && this.state.email != "" && this.state.phonenumber != "" && this.state.toc;
        return (

            <LinearGradient colors={["#EA3DE2", "#AD3F71"]} style={styles.bg} source={require("../../../assets/images/background_login.jpg")}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <View style={{ width: width, backgroundColor: "rgba(254,254,254,.1)", borderTopRightRadius: 80, borderBottomLeftRadius: 60, justifyContent: "center", alignItems: "center" }}>
                        <View style={styles.logoContainer}>
                            <MCIcon name="account-plus-outline" size={42} color={"#EA455A"} />
                        </View>
                        <Text style={{ fontSize: iphonex ? 50 : 36, color: "white", marginTop: 0, marginBottom: 20, fontFamily: "DMSans-Medium"}}>Registrarse</Text>
                        <TextInput placeholder="Nombre completo" onChangeText={this._onChangeFullName} />
                        <TextInput placeholder="Correo electrónico" email onChangeText={this._onChangeEmail} disableAutoCapitalize />
                        <TextInput placeholder="Contraseña" password onChangeText={this._onChangePassword} />
                        <View style={{ width: wp("90%"), marginTop: iphonex ? 10 : 7 }}>
                            <IntlPhoneInput
                                onChangeText={this._onChangePhoneNumber}
                                defaultCountry="US"
                                containerStyle={{ backgroundColor: "rgba(255,255,255,0.25)", height: 45, justifyContent: "center", alignItems: "center" }}
                                phoneInputStyle={{ color: 'white', fontSize: 16, marginLeft: 10, justifyContent: "center", alignItems: "center", paddingVertical : 5 }}
                                placeholder="Número de teléfono"
                                dialCodeTextStyle={{ fontSize: 18, color: "white" }}
                                flagStyle={{fontSize : 22}}
                            />
                        </View>
                        <TouchableOpacity style={styles.remember} onPress={this._onPressToc} activeOpacity={1}>
                            <View style={{ ...styles.rememberIcon, backgroundColor: this.state.remember ? "white" : "rgba(254,254,254,.25)" }}>
                                {this.state.toc && <MCIcon name="check" color="#EA465B" size={20} />}
                            </View>
                            <Text style={{ fontSize: 16, fontFamily: "DMSans-Bold" }}>Agree to Terms & Contditions</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submit} onPress={this._onPressRegister} activeOpacity={confirmed ? .5 : 1}>
                            <Text style={{color : confirmed?"pink":"white", fontSize : 20}}>REGISTER</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>                        
                        <TouchableOpacity style={{flexDirection :"row"}} onPress={this._onPressLogIn}>
                            <MCIcon name="exit-to-app" size={22} color={"white"}/>
                            <Text style={{fontSize : 18, fontFamily:"DMSans-Bold", marginLeft : 10}}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                    <TermAndConditions
                        isVisible={this.state.showToC}
                        onPressAccept={this._onToCAccept}
                        onPressDecline={this._onToCDelcine}
                    />
                </KeyboardAvoidingView>
                {this.state.loading && <Loading />}

            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    bg: {
        width: width,
        height: height,
        alignItems: "center",
        paddingTop: iphonex?hp("15%"):hp("10%")
    },
    logoContainer: {
        width: iphonex ? 90 : 80,
        height: iphonex ? 90 : 80,
        borderRadius: iphonex ? 45 : 40,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -40
    },
    remember: {
        width: width - 60,
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center"
    },
    rememberIcon: {
        width: 20,
        height: 20,
        borderRadius: 15,
        backgroundColor: "rgba(254,254,254,.25)",
        marginRight: 10,
        justifyContent: 'center',
        alignItems: "center"
    },

    submit : {
        width :wp("90%"), 
        height :wp("13%"), 
        backgroundColor :"#3b59d099", 
        marginTop : 25,
        marginBottom: 25,
        borderRadius :30, 
        justifyContent:"center", 
        alignItems :"center"
    },
    bottom : {
        // position: "absolute",
        // bottom : iphonex?200:Platform.OS=="ios"?100:100,
        marginTop : 40,
        justifyContent:"center",
        width : width,
        height : 50,
        alignItems:"center"
    }

});
const mapStateToProps = state => ({
    user: state.UserReducer
})

const mapDispatchToProps = dispatch => ({
    registerSuccess: data => dispatch(registerSuccess(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
