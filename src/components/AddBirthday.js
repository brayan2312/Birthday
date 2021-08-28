import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePickerResult from '@react-native-community/datetimepicker';
import moment from "moment";

export default function AddBirthday() {
    const [isDatePicketVisible, setIsDatePicketVisible] = useState(false);
    const [formData, setFormData] = useState({});

    const hideDatePicker = () => {
        setIsDatePicketVisible(false);

    }

   

    const handlerConfirm = (date)  => {
        
        // if(e.type == "set"){
            hideDatePicker();
            var dateBirth = date;
            dateBirth.setHours(0);
            dateBirth.setMinutes(0);
            dateBirth.setSeconds(0);
            setFormData({...formData, dateBirth: "0"});
            console.log(dateBirth);
            console.log(date);
            console.log(formData);
           


        // }else {
        //     hideDatePicker();
        //     console.log(date);
        //     console.log(isDatePicketVisible);


        // }
    }

    // setDate = (event, date) => {
    //     console.log(date);
    // };
    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="#969696"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    placeholderTextColor="#969696"
                />
                <View style={[styles.input, styles.datepicker]}>
                    <Text style={styles.textDate} onPress={() => setIsDatePicketVisible(true)} >Fecha de nacimiento</Text>
                </View>
                
            </View>

                {
                    isDatePicketVisible && (

                    <DateTimePickerResult
                        // display="spinner"
                        // locale="es-ES"
                        testID="dateTimePicker"
                        value={new Date()}
                        mode="date"
                        
                        onChange={() => handlerConfirm(new Date())}
                       
                         
                    /> )

                }
            

            {/* <RNDateTimePicker mode="date" value={new Date()} /> */}
        </>
    );
}
function fecha(){
    return{
        nombre: "",
        apelllido: "",
        dateBirth: "",
    }
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
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
        borderColor: "#1e3040"
    },
    datepicker: {
        justifyContent: "center"
    },
    textDate: {
        color: "#969696",
        fontSize: 18,
    },
})
