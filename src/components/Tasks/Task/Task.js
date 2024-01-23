
import { useState } from "react";
import { View, Text, Pressable, Modal, Switch, Alert } from "react-native";
import styles from "./styles";
//icon import
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { deletePost } from "../../../database/delete";
import { useDispatch } from "react-redux";
import { deletePostAction, updatePostAction } from "../../../redux/postSlice";
import { updatePost } from "../../../database/update";

export default function Task(props) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleStatusChangePress = async () => {
    try {
      const result = await updatePost({
        ...props.task,
        done: !props.task.done,
      });
      dispatch(updatePostAction(result));
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleRemovePress = () => {
    Alert.alert(
      "Remove Task",
      "This action will permanently delete this task. This action cannot be undone!",
      [
        {
          text: "Confirm",
          onPress: () => {
            onTaskRemoval(props.task.id);
            setShowModal(false);
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  const onTaskRemoval = async (id) => {
    try {
      const result = await deletePost(id);
      dispatch(deletePostAction(result));
    } catch (err) {
      console.log("deleteErr", err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={handleModalToggle}>
        <View style={styles.container}>
          <Text style={styles.title}>{props.task.description}</Text>
          <Text style={styles.text}>Id: {props.task.id}</Text>
          <Text style={styles.text}>
            Status: {props.task.done ? "Completed" : "Open"}
          </Text>
        </View>
      </Pressable>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        presentationStyle="overFullScreen"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}></View>
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
              width: "80%",
            }}
          >
            <Pressable 
              onPress={handleModalToggle}
              style={{ alignSelf: "flex-end", flexDirection : "row",   alignItems : "center"}}
            >
              <MaterialCommunityIcons name='close-circle' size={30} color={'red'} />
              <Text>Close</Text>
              
            </Pressable>
            <Text style={styles.title}>{props.task.description}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <View>
                <Switch
                  value={props.task.done}
                  onValueChange={handleStatusChangePress}
                />
                <Text>Toggle Status</Text>
              </View>
              <View>
                <Pressable onPress={handleRemovePress} 
                style={{ alignSelf: "flex-end", flexDirection : "column",   alignItems : "center"}}
                >
                  <Text>Remove</Text>
                  <MaterialCommunityIcons name='delete' size={30} color={'red'} />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      </Modal>
    </View>
  );


}
