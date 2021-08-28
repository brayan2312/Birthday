import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, SafeAreaView, StatusBar, Button}  from "react-native"
import firebase from "./src/utils/firebase";
import Auth from "./src/components/Auth";
import "firebase/auth";
import ListBirthday from "./src/components/ListBirthday";


export default function App(){
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  },[]);

  if(user === undefined) return null;

  return(
    <>
    <StatusBar barStyle="li" />
    <SafeAreaView style={styles.background}>
      {user ? <ListBirthday /> : <Auth />}
    </SafeAreaView>
    </>
  );

 
}

function Logout() {
  const logout = () => {
   firebase.auth().signOut();
  }
  return(
    <View>
      <Text>Estas Logeado</Text>
      <Button title="Cerrar Sesión" onPress={logout}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#15212b",
    height: "100%",
  }
})