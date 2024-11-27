import { View, Text, Button, StyleSheet} from 'react-native'
import {useState, useEffect} from 'react'

export default function App() {
   const [min, setMin] = useState(0)
   const [sec, setSec] = useState(0)
   const [ms, setMS] = useState(0)
   const [timer, setTimer] = useState(null)

   useEffect(()=>{
    if(ms > 59){
        setMS(0)
        setSec(prev => prev + 1)
    }
    if(sec > 59){
        setSec(0)
        setMin(prev => prev+1)
    }
   },[min, sec, ms])

   function startHandler(){
        if(!timer){
            setTimer(setInterval(()=>{setMS(prev => prev+1)},10))
        }
   }
   function stopHandler(){
        setTimer(prev => clearInterval(prev))
   }
   function resetHandler(){
        setTimer(prev => clearInterval(prev))
        setMS(0)
        setMin(0)
        setSec(0)
   }
    
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{min>9?min:"0"+min}:{sec>9?sec:'0'+sec}:{ms>9?ms:'0'+ms}</Text>
      <View >
        <View style={styles.BtnWrap}>
            <Button title={'Start'} onPress={startHandler}/> 
        </View>
        <View style={styles.BtnWrap}>
            <Button title={'Stop'} onPress={stopHandler}/> 
        </View>
        <View style={styles.BtnWrap}>
            <Button title={'Reset'} onPress={resetHandler}/> 
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:  1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BtnWrap:{
        width: 150,
        margin: 10,
    },
    label:{
        fontSize: 24, 
        marginBottom: 10, 
        textAlign: 'center'
    }
})