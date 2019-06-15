import React from "react";
import { View, Text } from "react-native";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import UserForm from "./UserForm";
import { signIn } from "../../loginUtils";

const LoginUser = props => {
  const loginUser = async ({ email, password }) => {
    try {
      const signin = await props.signinUser({
        variables: { email, password }
      });
      signIn(signin.data.signinUser.token);
      props.client.resetStore();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <UserForm type="Login" onSubmit={loginUser} />
    </View>
  );
};
const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

export default graphql(signinUser, { name: "signinUser" })(LoginUser);
