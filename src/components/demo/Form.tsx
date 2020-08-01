import React, { Fragment } from "react";
import {
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
import { Formik } from "formik";

export default function Form() {
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
      >
        {(formikProps) => (
          <Fragment>
            <TextInput
              style={{ borderWidth: 1, padding: 10, marginBottom: 3 }}
              onChangeText={formikProps.handleChange("name")}
            />
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
