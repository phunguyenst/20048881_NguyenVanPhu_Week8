import {StyleSheet,View, Text ,Image, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 

export default function Screen1({navigation}){
    const [email, setEmail] = React.useState("phuvan@gmail.com")
    const [password, setPassword] = React.useState('123');
    const [data, setData] = React.useState([])
    var a = []
    React.useEffect(()=>{
        fetch("http://localhost:3000/users")
        .then((x)=> x.json())
        .then((data) => {setData(data)})
    }, [])
    var loginAccount = () => {
        const account = data.find((item) => item.email === email && item.password === password);
        if (account) {
          navigation.navigate("screen2", account);
        } else {
          window.alert("Invalid email or password");
        }
      };
    var handleEmailChange = (text) =>{
        setEmail(text);
    }
    var handlePasswordChange = (text) =>{
        setPassword(text);
    }
    return (
        <View style = {styles.container}>
            <View style = {{flex: 4}}>
                <Image
                    source={require("../assets/noteapp.png")}
                    style = {{height: 220, width: 350, alignItems:"center", margin:"auto"}}
                    resizeMode='contain'
                ></Image>
            </View>
            <View style = {{flex: 1, justifyContent:"center"}}>
                <Text style = {{textAlign:"center", fontSize:"22", fontWeight:"bold", color:"#8353e2"}}>MANAGER YOUR</Text>
                <Text style = {{textAlign:"center", fontSize:"22", fontWeight:"bold",color:"#8353e2"}}>TASK</Text>
            </View>
            <View style = {{flex: 2, justifyContent:"center", alignItems:"center"}}>
            {/* <MaterialIcons name="email" size={24} color="#333" 
                style = {{position:"absolute", top:55, left: 22}}
            /> */}
                <TextInput
                    placeholder='Enter your email'
                    value={email}
                    style = {{paddingLeft: 30, height:40, width: 350, borderRadius: 8, borderWidth:1}}                
                    onChangeText={handleEmailChange}
                ></TextInput>
                {/* <MaterialIcons name="eye" size={24} color="#333" 
                style = {{position:"absolute", top:55, left: 22}}
            /> */}
                <TextInput
                    placeholder='Enter your password'
                    value={password}
                    style = {{paddingLeft: 30, height:40, width: 350, borderRadius: 8, borderWidth:1}}                
                    onChangeText={handlePasswordChange}
                ></TextInput>
                <TouchableOpacity
                    onPress={() => navigation.navigate("screensignup")}
                >
                    <Text>Signup</Text>
                </TouchableOpacity>
            </View>
            <View style = {{flex: 3, alignItems:"center", justifyContent:"center"}}>
                <TouchableOpacity
                    style = {{height: 35, width: 150, alignItems:"center", backgroundColor:"#00bdd6"}}
                    onPress={loginAccount}
                >
                    <Text style = {{textAlign:"center", marginTop: 6}}>GET STARTED</Text>
                </TouchableOpacity>
            </View>
        </View>
      )
}
const styles = StyleSheet.create({
    container :{
        flex: 1,
        
    }
})