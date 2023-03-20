import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ToDoList from './src/Screens/ToDoList'

const App = () => {
  return (
    <View style={styles.MainContainer}>
      <ToDoList/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  MainContainer:{
    flex:1,
  },
})