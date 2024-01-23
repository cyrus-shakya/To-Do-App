import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";

export default function Header() {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="tasks" size={25} />
      <Text style={{fontWeight:'900'}}> Todo App </Text>
      <Text>by Cyrus Shakya</Text>
    </View>
  );
}
