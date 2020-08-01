import React from "react";
import { Switch, View, Text } from "react-native";

interface OSwitchProps {
  label: string;
  cellKey: string;
  formikProps: any;
}

const OSwitch: React.FC<OSwitchProps> = ({
  label,
  cellKey,
  formikProps,
  ...rest
}) => {
  return (
    <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
      <Text style={{ marginBottom: 3 }}>{label}</Text>
      <Switch
        value={formikProps.values[cellKey]}
        onValueChange={(value) => {
          formikProps.setFieldValue(cellKey, value);
        }}
        {...rest}
      />
      <Text style={{ color: "red" }}>
        {formikProps.touched[cellKey] && formikProps.errors[cellKey]}
      </Text>
    </View>
  );
};

export default OSwitch;
