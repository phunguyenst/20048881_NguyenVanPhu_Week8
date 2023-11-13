import React, { useState } from "react";
import axios from 'axios';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";

export default function Screen4({ route, navigation }) {
    var note = route.params;
    console.log(note);
    const [noteId, setNoteId] = useState("");
    const [noteTitle, setNoteTitle] = useState("");
    const [noteType, setNoteType] = useState("");
    const [notePriority, setNotePriority] = useState("");

    const addNote = async () => {
      const newNote = { id: noteId, title: noteTitle, type: noteType, priority: notePriority };
    
      fetch(`http://localhost:3000/note`, {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(newNote),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
      .then((x) => x.json())
      .then((data) => {
        console.log(data);
        navigation.navigate("screen2", {note: data});
      });
    };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Note ID"
        onChangeText={setNoteId}
      />
      <TextInput
        style={styles.input}
        placeholder="Note Title"
        onChangeText={setNoteTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Note Type"
        onChangeText={setNoteType}
     
      />
      <TextInput
        style={styles.input}
        placeholder="Note Priority"
        onChangeText={setNotePriority}
      
      />
      <TouchableOpacity onPress={addNote} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});