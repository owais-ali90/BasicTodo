import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  Dimensions,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'

// function prec(c) {
//   if (c === '^') return 3
//   else if (c === '/' || c === '*') return 2
//   else if (c === '+' || c === '-') return 1
//   else return -1
// }

// function isOperand(c) {
//   return !isNaN(c)
// }

// function infixToPostfix(expression) {
//   if (expression.indexOf(/[-+*/]/)) {
//     console.log('inside of if')
//     return
//   }
//   expression = expression.replace('x', '*')
//   let stack = []
//   let result = []
//   let number = ''

//   // Parse the expression and handle multi-digit numbers
//   for (let i = 0; i < expression.length; i++) {
//     let c = expression[i]

//     if (!isNaN(c)) {
//       // Accumulate digits for multi-digit numbers
//       number += c
//     } else {
//       if (number !== '') {
//         result.push(number) // Push the complete number to result
//         number = '' // Reset number accumulator
//       }

//       if (c === '(') {
//         stack.push(c)
//       } else if (c === ')') {
//         while (stack.length && stack[stack.length - 1] !== '(') {
//           result.push(stack.pop())
//         }
//         stack.pop() // Pop the '('
//       } else {
//         while (stack.length && prec(c) <= prec(stack[stack.length - 1])) {
//           result.push(stack.pop())
//         }
//         stack.push(c)
//       }
//     }
//   }

//   // Push the remaining number, if any
//   if (number !== '') {
//     result.push(number)
//   }

//   // Pop all remaining operators from the stack
//   while (stack.length) {
//     result.push(stack.pop())
//   }

//   return result
// }
// function evaluatePostfix(postfixExpression) {
//   let stack = []

//   for (let i = 0; i < postfixExpression.length; i++) {
//     let c = postfixExpression[i]

//     if (isOperand(c)) {
//       stack.push(parseFloat(c)) // Push the number onto the stack
//     } else {
//       let o2 = stack.pop()
//       let o1 = stack.pop()

//       switch (c) {
//         case '+':
//           stack.push(o1 + o2)
//           break
//         case '-':
//           stack.push(o1 - o2)
//           break
//         case '*':
//           stack.push(o1 * o2)
//           break
//         case '/':
//           stack.push(o1 / o2)
//           break
//       }
//     }
//   }

//   return stack.pop() // The final result
// }

function CalcButton({ content, bgColor, onPress }) {
  return (
    <TouchableOpacity
      style={{ ...styles.BtnWrap, backgroundColor: bgColor }}
      onPress={() => {
        onPress(content)
      }}
    >
      <Text style={{ ...styles.btnText, fontSize: 40 }}>{content}</Text>
    </TouchableOpacity>
  )
}
function ResultDisplay({ display }) {
  return (
    <View style={styles.topCont}>
      <View style={styles.resultHis}>
        {/* <Text></Text>
            <Text></Text> */}
      </View>
      <View style={styles.input}>
        <Text style={styles.inputText}>
          {[...display].reduce((acc, ele) => acc + ele, '')}
        </Text>
      </View>
    </View>
  )
}
function KeyPad({ showOnScreen }) {
  let keys = [
    { content: 'AC', bgColor: '#5c5c5f' },
    { content: '- +', bgColor: '#5c5c5f' },
    { content: '%', bgColor: '#5c5c5f' },
    { content: '/', bgColor: '#ff9f0a' },
    { content: '7', bgColor: '#2a2a2c' },
    { content: '8', bgColor: '#2a2a2c' },
    { content: '9', bgColor: '#2a2a2c' },
    { content: 'X', bgColor: '#ff9f0a' },
    { content: '4', bgColor: '#2a2a2c' },
    { content: '5', bgColor: '#2a2a2c' },
    { content: '6', bgColor: '#2a2a2c' },
    { content: '-', bgColor: '#ff9f0a' },
    { content: '1', bgColor: '#2a2a2c' },
    { content: '2', bgColor: '#2a2a2c' },
    { content: '3', bgColor: '#2a2a2c' },
    { content: '+', bgColor: '#ff9f0a' },
    { content: 'E', bgColor: '#2a2a2c' },
    { content: '0', bgColor: '#2a2a2c' },
    { content: '.', bgColor: '#2a2a2c' },
    { content: '=', bgColor: '#ff9f0a' },
  ]
  return (
    <View style={styles.bottomCont}>
      (
      {keys.map((ele) => (
        <CalcButton
          key={ele.content}
          content={ele.content}
          bgColor={ele.bgColor}
          onPress={(val) => {
            showOnScreen(val)
          }}
        />
      ))}
      )
    </View>
  )
}
export default function App() {
  const [display, setDisplay] = useState([])
  const [current, setCurrent] = useState([0])
  function Execute() {
    setDisplay('Result')
  }
  function showOnScreen(val) {
    console.log(val)
    let type = null
    let opr = ['+', '-', 'X', '/', '=', '%', 'AC']
    if (opr.includes(val)) {
      if (val === 'AC') {
        setDisplay([])
        setCurrent([])
      } else if (val === '=') {
      } else if (val === '%') {
      } else {
        console.log(
          ['+', '-', '*', '/'].includes([...display].slice(-1).toString())
        )
        if (val === 'X') {
          val = '*'
        }
        if (display.length === 0) {
          console.log('inside if')
          setDisplay((prev) => [0, val])
        } else if (
          ['+', '-', '*', '/'].includes([...display].slice(-1).toString())
        ) {
          console.log('inside else if')
          setDisplay((prev) => [...prev].slice(0, -1).push(val))
        } else {
          setDisplay((prev) => [...prev, val])
          console.log('inside else')
        }
      }
    } else {
      setDisplay((prev) => [...prev, val])
    }
    // let opr = ['+', '=', '-', 'x']
    // if (val === 'AC') {
    //   setDisplay('')
    //   //   setNums(null)
    //   return
    // }
    // if (val === '=') {
    //   // console.log(infixToPostfix(nums))
    //   // console.log(evaluatePrefix(Array.from(infixToPostfix(nums)).reverse()))
    //   // setDisplay(evaluatePrefix(Array.from(infixToPostfix(nums)).reverse()))
    //   setDisplay(evaluatePostfix(infixToPostfix(display)))
    //   //   setDisplay('')
    //   return
    // } else if (val === 'X') {
    //   setDisplay((prev) => prev + 'x')
    //   return
    // }
    // setDisplay((prev) => prev + val)
    // // setNums(prev => [...prev, val])
  }
  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView>
        <ResultDisplay display={display} />
        <KeyPad
          showOnScreen={(a) => {
            showOnScreen(a)
          }}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 0,
  },
  childCont: {
    color: '#fff',
  },
  topCont: {
    height: '35%',
    color: '#fff',
    backgroundColor: '#000',
  },
  bottomCont: {
    paddingTop: '5%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: '65%',
    color: '#fff',
    backgroundColor: '#000',
    padding: 10,
  },
  BtnWrap: {
    margin: '5',
    height: '18%',
    width: '22%',
    borderRadius: '50%',
  },
  btnText: {
    color: 'white',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 350,
  },
  resultHis: {
    height: '50%',
  },
  input: {
    height: '50%',
  },
  inputText: {
    color: '#fff',
    textAlign: 'right',
    verticalAlign: 'bottom',
    fontSize: 75,
  },
})
