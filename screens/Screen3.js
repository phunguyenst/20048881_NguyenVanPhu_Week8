import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Screen3({ route, navigation }) {
    const { note } = route.params;
    const [editedTitle, setEditedTitle] = useState(note.title);

    const saveChanges = () => {
        fetch(`https://65095ffef6553137159b4db8.mockapi.io/todo/notes/${note.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: editedTitle,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Change this line
            // navigation.navigate('screen2', { note });
            navigation.navigate('screen2', { note: { ...note, title: editedTitle } });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Editing note ID: {note.id}</Text>
            <TextInput
                value={editedTitle}
                onChangeText={setEditedTitle}
                style={styles.input}
            />
            <TouchableOpacity onPress={saveChanges} style={styles.button}>
                <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
