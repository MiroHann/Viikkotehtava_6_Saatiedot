
import {useEffect, useState } from 'react';
import {StyleSheet,View,Text, Image} from 'react-native';

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL
}
export default function Weather(props) {
    const [temp, setTemp] = useState(0)
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    const [name, setName] = useState('')

    useEffect(()=> {
    const url  = api.url + 
    'lat=' + props.latitude +
    '&lon=' + props.longitude + 
    '&units=metric' + 
    '&appid=' + api.key
    fetch(url)
    .then(res => res.json())
    .then((json)=> {
        console.log(json)
        setTemp(json.main.temp)
        setDescription(json.weather[0].description)
        setIcon(api.icons + json.weather[0].icon + '@2x.png')
        setName(json.name)
    })
    .catch((error) => {
        setDescription("Error retrieving info")
        console.log(error)
    })
    }, [])

    return(
        <View>
            <View style={styles.container}>
           {icon && 
             <Image source={{uri: icon}} style={styles.image}/>
           } 
           <Text style={[temp < 1 ? styles.tempCold : styles.tempWarm]}>{temp.toFixed(0)} °C</Text>
           </View>
            <Text style={styles.message}>{description} in {name}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#d3d3d3',
    alignContent: 'center'
    },
    message: {
        textAlign: 'center',
        backgroundColor: '#d3d3d3',
        fontSize: 40,
    },
    tempCold: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue',
    },
    tempWarm: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    },
    image: {
        width: 100,
        height: 100,
        
    }
  });