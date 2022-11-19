import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

const Button = ({ children, onPress, style }) => {
  return (
    <Pressable style={({ pressed }) => [styles.button, style, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    borderRadius: 4
  },
  pressed: {
    opacity: 0.7
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primary50
  }
});

export default Button;