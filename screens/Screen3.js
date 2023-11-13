import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Screen3({ route, navigation }) {
    const note = route.params;
    console.log(note);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedType, setEditedType] = useState(note.type);
    const [editedPriority, setEditedPriority] = useState(note.priority);

    const saveChanges = () => {
        fetch(`http://localhost:3000/note/${note.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: note.id,
                title: editedTitle,
                type: editedType,
                priority: editedPriority
            }),
        })
        .then(data => {
            // Chuyển về màn hình trước đó và truyền lại dữ liệu đã cập nhật
            navigation.navigate('screen2', { note: data });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Editing note ID: {note.id}</Text>
            <TextInput
                placeholder='Title'
                value={editedTitle}
                onChangeText={setEditedTitle}
                style={styles.input}
            />  <TextInput
            placeholder='type'
                value={editedType}
                onChangeText={setEditedType}
                style={styles.input}
            />  <TextInput
            placeholder='priority'
                value={editedPriority}
                onChangeText={setEditedPriority}
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
