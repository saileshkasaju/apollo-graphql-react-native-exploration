import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { withApollo } from "react-apollo";
import LoginUser from "./LoginUser";
import CreateUser from "./CreateUser";

const Login = props => {
  const [register, setRegister] = useState(true);
  return (
    <View style={styles.container}>
      {register ? <CreateUser {...props} /> : <LoginUser {...props} />}
      <Button
        onPress={() => setRegister(prevState => !prevState)}
        title={register ? "Go to Login" : "Go To Register"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default withApollo(Login);
