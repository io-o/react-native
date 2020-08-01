import React, { Fragment } from "react";
import {
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Button,
  Text,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const vaildationSchema = yup.object().shape({
  name: yup.string().required().label("Name").min(6),
});

export default function DemoTwo() {
  return (
    <SafeAreaView style={{ marginTop: 90 }}>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={vaildationSchema}
      >
        {(formikProps) => (
          <Fragment>
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 3 }}
              onChangeText={formikProps.handleChange("name")}
            />
            <Text style={{ color: "red" }}>{formikProps.errors.name}</Text>
            {formikProps.isSubmitting ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <Button title="提交" onPress={formikProps.handleSubmit} />
            )}
          </Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
}
