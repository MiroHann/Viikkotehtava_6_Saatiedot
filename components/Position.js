import * as location from 'expo-location';
import Weather from './Weather'
import {useEffect, useState } from 'react';
import {StyleSheet,View,Text} from 'react-native';

export default function Position(){
    const [latitude, setLatitude] = useState(0); 
    const [longtude, setLongtude] = useState(0); 
    const [message, setMessage] = useState('Retrieving location...'); 
    const [isLoading, setLoading] = useState(true); 
    useEffect(()=> {
    (async () => {
        let {status} = await location.requestForegroundPermissionsAsync()
    console.log(status)
    try {
        if(status !== 'granted'){
            setMessage("Location not permitted")
        } else {
            const position = await location.getCurrentPositionAsync({accuracy: location.Accuracy.High})
            setLatitude(position.coords.latitude)
            setLongtude(position.coords.longitude)
            setMessage('Location retrieved')
        }
    } catch (error) {
       setMessage("Error retrieving location.")
       console.log(error)
    }
    setLoading(false)
})()
    }, [])

    return (
        <View>
        <Text style={styles.coords}>{latitude.toFixed(3)},{longtude.toFixed(3)}</Text> 
        { isLoading === false && 
        <Weather latitude={latitude} longitude={longtude}/>
        }
        <Text style={styles.message}>{message}</Text> 
        </View>
    )
    
}
const styles = StyleSheet.create({
    coords: {
      backgroundColor: '#ccc',
      textAlign: 'center',
    },
    message: {
        backgroundColor: '#ccc',
        textAlign: 'center',

    }
  });
  