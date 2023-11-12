import React, { useState } from "react";
import axios from 'axios';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";

export default function Screen4({ route, navigation }) {
    var note = route.params;
    console.log(note);
    const [noteId, setNoteId] = useState("");
    const [noteTitle, setNoteTitle] = useState("");

    const addNote = async () => {
        const newNote = { id: noteId, title: noteTitle, type: "short_term", priority: "low" };
        note.push(newNote);
        fetch(`https://65095ffef6553137159b4db8.mockapi.io/todo/notes/${note.id}`, {
            method: 'PUT',
            cache: 'no-cache',
            body: JSON.stringify(note),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
        .then((x) => x.json())
        .then((data) => console.log(data))
        navigation.navigate("screen2", note);
        console.log(note);
        console.log("note mới them" +newNote);

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
     
      />
      <TextInput
        style={styles.input}
        placeholder="Note Priority"
      
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