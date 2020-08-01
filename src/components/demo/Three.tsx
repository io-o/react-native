import React, { Fragment } from "react";
import {
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Button,
  View,
  Text,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup.string().label("姓名").required(),
  password: yup.string().label("密码").required().min(8, "密码不少于8位数"),
});

export default function DemoThree() {
  return (
    <SafeAreaView style={{ marginTop: 90 }}>
      <Formik
        initialValues={{ name: "", password: "" }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <Fragment>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text style={{ marginBottom: 3 }}>姓名</Text>
              <TextInput
                placeholder="请输入"
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  padding: 10,
                  marginBottom: 3,
                }}
                onChangeText={formikProps.handleChange("name")}
                onBlur={formikProps.handleBlur("name")}
                autoFocus
              />
              {/* 错误提示 */}
              <Text style={{ color: "red" }}>
                {formikProps.touched.name && formikProps.errors.name}
              </Text>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
              <Text style={{ marginBottom: 3 }}>密码</Text>
              <TextInput
                placeholder="请输入"
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  padding: 10,
                  marginBottom: 3,
                }}
                onChangeText={formikProps.handleChange("password")}
                onBlur={formikProps.handleBlur("password")}
                secureTextEntry
              />
              {/* 错误提示 */}
              <Text style={{ color: "red" }}>
                {formikProps.touched.password && formikProps.errors.password}
              </Text>
            </View>
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Button title="提交" onPress={formikProps.handleSubmit} />
            )}
          </Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
}
