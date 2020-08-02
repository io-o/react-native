import React, { Children } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Button,
  View,
  Text,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const FieldWrapper = ({ formikKey, label, formikProps, children }) => {
  return (
    <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
      <Text style={{ marginBottom: 5 }}>{label}</Text>
      {children}
      <Text style={{ color: "red" }}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </View>
  );
};

const OInput = ({ formikKey, label, formikProps, ...rest }) => {
  const checkValue =
    formikProps.touched[formikKey] && formikProps.errors[formikKey]
      ? "red"
      : "black";

  const styles = {
    borderWidth: 1,
    borderColor: checkValue,
    padding: 10,
    marginBottom: 5,
  };

  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={styles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};

const validationSchema = yup.object().shape({
  email: yup.string().label("Email").email().required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(2, "Seems a bit short...")
    .max(10, "We prefer insecure system, try a shorter password."),
  // agreeToTerms: yup
  //   .boolean()
  //   .label('Terms')
  //   .test(
  //     'is-true',
  //     'Must agree to terms to continue',
  //     value => value === true
  //   ),
});

const signUp = ({ email }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "aa@a.com") {
        reject(new Error("邮箱错误"));
      }
      resolve(true);
    }, 100);
  });
};

const Demo = () => (
  <SafeAreaView style={{ marginTop: 90 }}>
    <Formik
      initialValues={{ email: "", password: "", agreeToTerms: false }}
      onSubmit={(values, actions) => {
        signUp({ email: values.email })
          .then(() => {
            alert(values);
          })
          .catch((err) => {
            actions.setFieldError("general", err.message);
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <React.Fragment>
          <OInput
            label="Email"
            formikProps={formikProps}
            formikKey="email"
            placeholder="a@example.com"
            autoFocus
          />

          <OInput
            label="Password"
            formikProps={formikProps}
            formikKey="password"
            placeholder="password"
            secureTextEntry
          />
          {/* 
          <StyledSwitch
            label="Agree to Terms"
            formikKey="agreeToTerms"
            formikProps={formikProps}
          /> */}

          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <>
              <Button title="Submit" onPress={formikProps.handleSubmit} />
              <Text style={{ color: "red" }}>{formikProps.errors.general}</Text>
            </>
          )}
        </React.Fragment>
      )}
    </Formik>
  </SafeAreaView>
);

export default Demo;
