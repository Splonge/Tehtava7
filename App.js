import React, { useReducer, useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now().toString(), text: action.payload }];
    case "REMOVE":
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, []);
  const [task, setTask] = useState("");

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Add new..." value={task} onChangeText={setTask} />
      <Button title="Save" onPress={() => task.trim() && (dispatch({ type: "ADD", payload: task }), setTask(""))} />
      <FlatList
        data={state}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => dispatch({ type: "REMOVE", payload: item.id })}>
            <Text style={styles.task}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  task: { padding: 15, backgroundColor: "#f9c2ff", marginBottom: 10, borderRadius: 5, textAlign: "center" },
});

export default TodoApp;
