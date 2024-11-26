import { useState  } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput,Button, Dimensions } from 'react-native';



let height = Dimensions.get('window').height
let width = Dimensions.get('window').width
let isEditing = false
let editIndex = null
// let count = 2

// height = height*0.6

export default function App() {
  const [key, setKey] =  useState(0)
  const [todo, setTodo] = useState([])
  const [inputContent, setInputContent] = useState('')

  function addTodo(){
    if(inputContent.trim() === ''){
      return
    }
    else if(isEditing){
        const temp = [...todo]
        temp[editIndex].content = inputContent
        setTodo(temp)
        setInputContent('')
        isEditing = false
        editIndex = null
      }
      else{
      setTodo([...todo, {content: inputContent, key: key, status: false}])
      setInputContent('')
      setKey(key+1)
    }
  }

  let removeTodo = function(index){
    // console.log(index)
    // // const temp = [...todo];
    // // temp.splice(index, 1)
    setTodo(prev => prev.filter((_, idx) => idx !== index))
  }

  let editTodo = function(index){
    setInputContent(todo[index].content)
      isEditing = true
      editIndex = index
  }

  let markTodo = function(index){
    // console.log({index})
    // // const temp = [...todo]
    // // temp[index].status = !temp[index].status

    setTodo(prev => prev.map((todo, idx) => {
      if (idx !== index) return todo
      return {...todo, status: !todo.status
      }
    } ))
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headLeft}> 
          <TextInput style={styles.input} value={inputContent} placeholder='Add here...' onChangeText={(val)=>{setInputContent(val)}}/>
        </View>
        <View style={styles.headRight}>
          <Button title='Add' onPress={addTodo}/>
        </View>
      </View>
      <View>
        <TodoList todo={todo} editTodo={editTodo} removeTodo={removeTodo} markTodo={markTodo} />
      </View>
    </View>
  );
}

const TodoList = function({todo, editTodo, removeTodo, markTodo}){
  return(
    <FlatList 
      data={todo}
      renderItem={({item, index})=> {
        return (
          <View style={styles.todoWrap}>
            <View style={styles.todoItem}>
              
              <Text style={item.status?styles.doneItem:styles.todoText}>{item.content}</Text>
            </View>
            <View style={styles.todoButtons}>
              <View style={styles.doneBtn}>
                <Button title={`${item.status?'Undone':'Done'}`} onPress={()=>{markTodo(index)}}/>
              </View>
              <View style={styles.editBtn}>
                <Button title='Edit' onPress={()=>{editTodo(index)}}/>
              </View>
              <View style={styles.delBtn}>
                <Button title='Delete' onPress={()=>{removeTodo(index)}}/>
              </View>
            </View>
            
          </View>)
      }
      }
      />
  )
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
  },
  doneItem:{
    fontSize: 18,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  color: '#333',
}
});
