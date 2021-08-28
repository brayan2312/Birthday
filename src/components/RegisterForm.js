import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import {validateEmail} from "../utils/validations";
import firabase from "../utils/firebase";
import firebase from '../utils/firebase';

export default function RegisterForm(props) {
    const {changeForm} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({})

    const register = () => {
       const {email, password, repeatPassword} = formData;
       let errors = {};

       if(!email || !password || !repeatPassword){
           if(!email) errors.email = true;
           if(!password) errors.password = true;
           if(!repeatPassword) errors.repeatPassword = true;
       } else if(!validateEmail(email)){
           errors.email = true;
       }else if(password !== repeatPassword){
            errors.password = true;
            errors.repeatPassword = true;
       }else if(password.length < 6){
            errors.password = true;
            errors.repeatPassword = true;
       }else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                setFormError({
                    email: true,
                    password: true,
                    repeatPassword: true
                })
            })

       }

       setFormError(errors);
    }
  
    return (
        <>
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo electronico"
                placeholderTextColor="#969696"
                onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
            />

            <TextInput
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => setFormData({...formData, password: e.nativeEvent.text})}
            />

            <TextInput
                style={[styles.input, formError.repeatPassword && styles.error]}
                placeholder="Repetir Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                onChange={(e) => setFormData({...formData, repeatPassword: e.nativeEvent.text})}
            />

            <TouchableOpacity onPress={register}>
                <Text style={styles.btnText}>Registrar</Text>
            </TouchableOpacity>

            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
                
           
        </>
    )

    function defaultValue() {
        return {
            email: "",
            password: "",
            repeatPassword: "",
        }
    }

   
}

const styles = StyleSheet.create({
    btnText: {
        color: "#fff",
        fontSize: 18,
    },
    input: {
        height: 50,
        color: "#fff",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040",
    },
    login: {
        flex: 2,
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    error: {
        borderColor: "#940c0c",
    }
 

    
})
