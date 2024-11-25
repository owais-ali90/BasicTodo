import { StatusBar } from 'expo-status-bar';
import { useState  } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput,Button, Dimensions } from 'react-native';



let height = Dimensions.get('window').height
let width = Dimensions.get('window').width

// height = height*0.6


let removeTodo = function(){

}
let markTodo = function(){

}
let editTodo = function(){

}

export default function App() {
  const [todo, setTodo] = useState([{content: 'apple', key: '1'}, {content: 'banana', key: '2'}])
  const [inputContent, setInputContent] = useState('')

  function addTodo(){
      setTodo((prev) => [...prev, {content: inputContent, key: Math.random().toString(8).substring(1, 10)}])
      setInputContent('hello')
  }

  const TodoList = function(){
    return(
      <FlatList 
        data={todo}
        renderItem={(item)=>(
          <View style={styles.todoWrap}>
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item.item.content}</Text>
            </View>
            <View style={styles.todoButtons}>
              <View style={styles.doneBtn}>
                <Button title='Done'/>
              </View>
              <View style={styles.editBtn}>
                <Button title='Edit'/>
              </View>
              <View style={styles.delBtn}>
                <Button title='Delete'/>
              </View>
            </View>
            
          </View>)
        }
        />
    )
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headLeft}> 
          <TextInput style={styles.input} value = {inputContent} placeholder='Add here...' onChange={setInputContent}/>
        </View>
        <View style={styles.headRight}>
          <Button title='Add' onPress={addTodo}/>
        </View>
      </View>
      <View>
        <TodoList/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header:{
    margin: 0,
    width: width*0.9,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: height*0.1,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  headLeft:{
    width: width*0.6,
    margin: 10
  },
  input:{
    borderWidth: 1,
    borderBlockColor: '#555'
  },
  headRight:{
    width: width*0.3,
    margin: 10
  },
  todoButtons:{
    display: 'flex',
    flexDirection: 'row',
  },
  doneBtn: {
    width: width*0.2,
    margin: 10
  },
  editBtn: {
    width: width*0.2,
    margin: 10
  },
  delBtn: {
    width: width*0.2,
    margin: 10
  },
  todoWrap:{
    marginTop: 10,
    borderBottomWidth: 1,
    borderBlockColor: '#bbb'
  },
  listItem:{
    backgroundColor: 'pink',
    marginTop: 24,
    padding: 30,
    fontSize: 24,
    marginHorizontal: 10,
  },
  todoText:{
    fontSize: 18
  }
});
