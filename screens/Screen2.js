import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function Screen2({ route, navigation }) {
  const [data, setData] = React.useState([]);
 
 
  React.useEffect(()=>{
    fetch("http://localhost:3000/note")
    .then((x)=> x.json())
    .then((data) => {setData(data)})
  }, [])


 

  //xóa 1 note
  const deleteNote = (id) => {
    fetch(`http://localhost:3000/note/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setData(data.filter(note => note.id !== id));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };
   //làm mới khi có sự thay đổi từ trang khác lên api xong load về
  useFocusEffect(
    React.useCallback(() => {
      // Fetch dữ liệu mới mỗi khi màn hình được tập trung
      fetch("http://localhost:3000/note")
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        });
    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Feather
          name="search"
          size={24}
          color="black"
          style={{ position: "absolute", top: 8, left: 22 }}
        />
        <TextInput
          placeholder="Search"
          style={{
            height: 40,
            width: 350,
            borderRadius: 8,
            borderWidth: 1,
            paddingLeft: 25,
          }}
        ></TextInput>
      </View>
      <View style={{ flex: 8 }}>
        <ScrollView nestedScrollEnabled>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              let backgroundColor;
              switch (item.priority) {
                case "low":
                  backgroundColor = "red";
                  break;
                case "medium":
                  backgroundColor = "orange";
                  break;
                case "high":
                  backgroundColor = "#00cc00";
                  break;
                default:
                  backgroundColor = "#6aebf9"; // default color in case priority is not set
              }
              return (
                <View
                  key={item.id}
                  style={{
                    flex: 1,
                    height: 100,
                    width: 350,
                    backgroundColor: "#6aebf9",
                    borderRadius: 8,
                    margin: 10,
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: backgroundColor,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome name="check-square" size={30} color="green" />
                    <Text>{item.title}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                       onPress={() => {
            navigation.navigate("screen3", { id: item.id, title: item.title});
          }}
                     >
                      <Feather name="edit" size={30} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity
                       onPress={() => deleteNote(item.id)}
                    >
                      <MaterialIcons name="delete" size={30} color="#333" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          ></FlatList>
        </ScrollView>
      </View>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("screen4", data);
          }}
        >
          <AntDesign name="pluscircle" size={70} color="aqua" style={{}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
