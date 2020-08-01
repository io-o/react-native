import React, { InputHTMLAttributes } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface OInputProps extends InputHTMLAttributes<HTMLElement> {
  label: string;
  cellKey: string;
  formikProps: any;
}

const OInput: React.FC<OInputProps> = ({
  label,
  cellKey,
  formikProps,
  ...rest
}) => {
  return (
    <View style={styles.cell}>
      <Text>{label}</Text>
      <TextInput
        style={styles.oInput}
        onChangeText={formikProps?.handleChange(cellKey)}
        {...rest}
      />
      <Text style={{ color: "red" }}>
        {formikProps?.touched[cellKey] && formikProps?.errors[cellKey]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  oInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 3,
  },
});

export default OInput;
