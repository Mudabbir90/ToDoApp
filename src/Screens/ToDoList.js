import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import remove from '../image/remove.png';
import star from '../image/star.png';
import star1 from '../image/star1.png';

const ToDoList = () => {
  const [todo, setTodo] = useState([]);
  const [todoTextNew, setTodoTextNew] = useState('');
  const [page, setPage] = useState(1);

  const AddTodo = () => {
    setTodo([...todo, {text: todoTextNew, isFavorite: false}]);
    console.log(todo);
    setTodoTextNew('');
  };

  const DeleteTodo = index => {
    const newTodos = [...todo];
    newTodos.splice(index, 1);
    setTodo(newTodos);
  };

  const handleToggleFavorite = index => {
    setTodo([
      ...todo.filter(todo => todo.isFavorite),
      ...todo.filter(todo => !todo.isFavorite),
    ]);
    console.log(index);
    const newTodos = [...todo];
    newTodos[index].isFavorite = !newTodos[index].isFavorite;
    setTodo(newTodos);
  };

  const getPageTodos = () => {
    const start = (page - 1) * 4;
    const end = start + 4;
    return [
      ...todo.filter(todo => todo.isFavorite),
      ...todo.filter(todo => !todo.isFavorite),
    ].slice(start, end);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>Todo List</Text>
      </View>
      <View style={styles.Container}>
        <View style={styles.TextField}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Todo Task"
            onChangeText={setTodoTextNew}
            value={todoTextNew}
          />
          <TouchableOpacity style={styles.AddButton} onPress={AddTodo}>
            <Text style={styles.AddButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={[...getPageTodos()]}
          renderItem={({item, index}) => {
            return (
              <View style={styles.TodoLists}>
                <Text style={styles.itemText}>{item.text}</Text>
                <View style={styles.Icons}>
                  <TouchableOpacity onPress={() => handleToggleFavorite(index)}>
                    {item.isFavorite ? (
                      <Image source={star1} style={styles.DeleteImg} />
                    ) : (
                      <Image source={star} style={styles.DeleteImg} />
                    )}
                  </TouchableOpacity>

                  <Pressable onPress={() => DeleteTodo(index)}>
                    <Image source={remove} style={styles.DeleteImg} />
                  </Pressable>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.PageButtons}>
          <View style={{marginVertical: 10}}>
            {page > 1 && <Button title="Prev" onPress={handlePrevPage} />}
          </View>
          <View>
            {todo.length > page * 4 && (
              <Button title="Next" onPress={handleNextPage} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ToDoList;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  Header: {
    margin: 10,
  },
  HeaderText: {
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
  },

  Container: {
    width: '90%',
    backgroundColor: 'white',
    alignSelf: 'center',
  },

  TextInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    paddingLeft: 10,
    width: '80%',
  },
  AddButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    width: '15%',
    borderRadius: 10,
  },
  TextField: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  AddButtonText: {
    color: 'white',
  },
  TodoLists: {
    marginTop: 20,
    borderWidth: 1,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DeleteImg: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  Icons: {
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 20,
  },
});
