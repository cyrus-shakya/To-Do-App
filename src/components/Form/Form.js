import { useState } from "react";
import { View, Text, TextInput, Switch, Button, Keyboard } from "react-native";
import styles from "./styles";
import * as database from "../../database";
import { useDispatch } from "react-redux";
import { addPostAction } from "../../redux/postSlice";
import { Alert } from "react-native";

export default function Form(props) {

  const [taskDescription, setTaskDescription] = useState('');
  const [taskDone, setTaskDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAddPress = () => {
    if (taskDescription) {
      onAddTask(taskDescription, taskDone);

      setErrorMessage(null);
      setTaskDescription('');
      setTaskDone(false);

      Keyboard.dismiss();
    } else {
      setErrorMessage("The description is required.");
    }
  };

  const handleDescriptionChange = (value) => {
    setTaskDescription(value);
  };


  const handleStatusChange = (value) => {
    setTaskDone(value);
  };

  const onAddTask = async (description, done) => {
    try {
      const result = await database.addPost(description, done);
      dispatch(addPostAction(result));
      
    } catch (err) {
      console.log("err", err);
      
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage && (
        <View>
          <Text style={{color:'red'}}>*Attention*</Text>
          <Text style={{color:'red'}}>{errorMessage}</Text>
        </View>
      )}
      <TextInput
        placeholder="Enter task name:"
        maxLength={140}
        onChangeText={handleDescriptionChange}
        defaultValue={taskDescription} //variable 
      />
      <View style={{display:'flex', marginTop : 10}}>
        <Text>Completed:</Text>
        <Switch value={taskDone} onValueChange={handleStatusChange} />
      </View>
      <Button title="Add" onPress={handleAddPress} />
    </View>
  );


}
