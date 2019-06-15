import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-native";
import { Form, Item, Input, Label } from "native-base";

const UserForm = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = () => {
    props.onSubmit({ email, password });
  };
  return (
    <Form>
      <Item floatingLabel>
        <Label>Email</Label>
        <Input
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </Item>
      <Item floatingLabel>
        <Label>Password</Label>
        <Input secureTextEntry value={password} onChangeText={setPassword} />
      </Item>
      <Button title={props.type} onPress={submitForm} />
    </Form>
  );
};

UserForm.propTypes = {
  title: PropTypes.string
};

UserForm.defaultProps = {
  title: "Submit"
};

export default UserForm;
