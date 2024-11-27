import { useState  } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput,Button, Dimensions, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';


function prec(c) {
    
    if (c === '^')
        return 3;
    else if (c === '/' || c === '*')
        return 2;
    else if (c === '+' || c === '-')
        return 1;
    else
        return -1;
}
function isOperand(c){
    
        if (c.charCodeAt() >= 48 && c.charCodeAt() <= 57)
            return true;
        else
            return false;
}
 
function evaluatePrefix(exprsn){
        let Stack = [];
 
        for (let j = exprsn.length - 1; j >= 0; j--) {
 
            
            if (isOperand(exprsn[j]))
                Stack.push((exprsn[j].charCodeAt() - 48));
 
            else {
 
              
                let o1 = Stack[Stack.length - 1];
                Stack.pop();
                let o2 = Stack[Stack.length - 1];
                Stack.pop();
 
                // Use switch case to operate on o1
                // and o2 and perform o1 Or o2.
                switch (exprsn[j]) {
                case '+':
                    Stack.push(o1 + o2);
                    break;
                case '-':
                    Stack.push(o1 - o2);
                    break;
                case '*':
                    Stack.push(o1 * o2);
                    break;
                case '/':
                    Stack.push(o1 / o2);
                    break;
                }
            }
        }
 
        return Stack[Stack.length - 1];
    }
function infixToPostfix(s) {
    s = s.join('').replace('X', '*').split('')
    let st = [];
    let result = [];

    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        //(c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')
        if (typeof s[i] === 'number')
            result.push(c);

        else if (c === '(')
            st.push('(');

        else if (c === ')') {
            while (st[st.length - 1] !== '(') {
                result.push(st.pop());
            }
            st.pop();
        }

        else {
            while (st.length && (prec(c) < prec(st[st.length - 1]) ||
                                 prec(c) === prec(st[st.length - 1]))) {
                result(st.pop());
            }
            st.push(c);
        }
    }

    while (st.length) {
        result.push(st.pop());
    }

    return result;
}
function CalcButton({content, bgColor, onPress}){
    return(
        <TouchableOpacity style={{...styles.BtnWrap, backgroundColor: bgColor}} onPress={()=>{onPress(content)}}>
            <Text style={{...styles.btnText, fontSize: 40}}>{content}</Text>
        </TouchableOpacity>
    )
}
function ResultDisplay({display}){
    return(
    <View style={styles.topCont}>
        <View style={styles.resultHis}>
            {/* <Text></Text>
            <Text></Text> */}
        </View>
        <View style={styles.input}>
            <Text style={styles.inputText}>
                {display}
            </Text>
        </View>
        
    </View>
    )
}
function KeyPad({showOnScreen}){
    let keys = [
        {content: 'AC', bgColor: '#5c5c5f'},
        {content: '- +', bgColor: '#5c5c5f'},
        {content: '%', bgColor: '#5c5c5f'},
        {content: '/', bgColor: '#ff9f0a'},
        {content: '7', bgColor: '#2a2a2c'},
        {content: '8', bgColor: '#2a2a2c'},
        {content: '9', bgColor: '#2a2a2c'},
        {content: 'X', bgColor: '#ff9f0a'},
        {content: '4', bgColor: '#2a2a2c'},
        {content: '5', bgColor: '#2a2a2c'},
        {content: '6', bgColor: '#2a2a2c'},
        {content: '-', bgColor: '#ff9f0a'},
        {content: '1', bgColor: '#2a2a2c'},
        {content: '2', bgColor: '#2a2a2c'},
        {content: '3', bgColor: '#2a2a2c'},
        {content: '+', bgColor: '#ff9f0a'},
        {content: 'E', bgColor: '#2a2a2c'},
        {content: '0', bgColor: '#2a2a2c'},
        {content: '.', bgColor: '#2a2a2c'},
        {content: '=', bgColor: '#ff9f0a'},
    ]
    return(
        <View style={styles.bottomCont}>
            ({keys.map(ele =>  <CalcButton key={ele.content} content={ele.content} bgColor={ele.bgColor} onPress={(val)=>{showOnScreen(val)}}/>)})

        </View>
    )
}
export default function App(){
    const [display, setDisplay] = useState('')
    const [nums, setNums] = useState([])
    function Execute(){
        setDisplay('Result')
    }
    function showOnScreen(val){
        let temp = display.toString()
        let opr = ['+', '=', '-', 'x']
        console.log(temp == val)
        console.log(opr.includes(val))
        console.log(temp[temp.length-1] == val && opr.includes(val))
        if(val === 'AC'){
            setDisplay('')
            setNums(null)
            return
        }
        else if(display.charAt(display.length) === val && opr.includes(val)){
            console.log(inside)
        }
        else if(val === "="){
            // console.log(infixToPostfix(nums))
            // console.log(evaluatePrefix(Array.from(infixToPostfix(nums)).reverse()))
            // setDisplay(evaluatePrefix(Array.from(infixToPostfix(nums)).reverse()))
            setDisplay('')
            return
        }
        else if(val === "X"){
            setDisplay(prev => prev+'x')
            return
        }
        setDisplay(prev => prev+val)
        // setNums(prev => [...prev, val])
    }
    return(
        <View style={styles.container}>
            <StatusBar/>
            <SafeAreaView >
                <ResultDisplay display={display}/>
                <KeyPad showOnScreen={(a)=>{showOnScreen(a)}}/>
            </SafeAreaView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        padding: 0    
    },
    childCont:{
        // flex: 1,
        // width: 100,
        // height: '50%',
        color: '#fff',
        // backgroundColor: 'red'
    },
    topCont:{
        // flex: 1,
        height: '35%',
        color: '#fff',
        // borderWidth: 2,
        // borderColor: 'red',
        backgroundColor: '#000'
    },
    bottomCont:{
        paddingTop: '5%',
        // marginTop: 10,
        // flex: 2,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        height: '65%',
        // borderWidth: 2,
        // borderColor: 'green',
        color: '#fff',
        backgroundColor: '#000',
        padding: 10
    },
    BtnWrap:{
        margin: '5',
        height: '18%',
        // width: '21%',
        width: '22%',
        // width: '25%',
        // borderWidth: 2,
        // borderColor: 'yellow',
        borderRadius: '50%',
        // backgroundColor: '#ff9f0a'
    },
    btnText:{
        color:'white', 
        width: '100%', 
        height: '100%' , 
        textAlign: 'center', 
        textAlignVertical: 'center',
        fontWeight: 350
        // fontSize: '18'
    },
    resultHis:{
        height: '50%',
        // backgroundColor: 'yellow'
    },
    input:{
        height: '50%',
        
        // backgroundColor: 'red'
    },
    inputText:{
        color: '#fff',
        textAlign: 'right',
        verticalAlign: 'bottom',
        fontSize: 75
    }
})