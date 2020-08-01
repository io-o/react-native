import React from "react";
import { SafeAreaView, ActivityIndicator, Button } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import OInput from "../OInput";
import OSwitch from "../OSwitch";

const validationSchema = yup.object().shape({
  name: yup.string().label("姓名").required(),
  password: yup.string().label("密码").required().min(8, "密码不少于8位数"),
  isb: yup.boolean().label("开关"),
});

export default function DemoFour() {
  return (
    <SafeAreaView style={{ marginTop: 90 }}>
      <Formik
        initialValues={{ name: "", password: "", isb: false }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <>
            <OInput
              placeholder="请输入"
              label="账号"
              formikProps={formikProps}
              cellKey="name"
            />
            {/* <OInput
              placeholder="请输入"
              label="密码"
              formikProps={formikProps}
              key="password"
              secureTextEntry
            /> */}
            <OSwitch label="开关" cellKey="isb" formikProps={formikProps} />
            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Button title="提交" onPress={formikProps.handleSubmit} />
            )}
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}
