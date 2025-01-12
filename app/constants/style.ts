import { Colors } from "@/app/constants/Colors";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.default.background,
    padding: 20,
  },
  button: {
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: Colors.default.tint,
    backgroundColor: Colors.default.tint,
  },
});
