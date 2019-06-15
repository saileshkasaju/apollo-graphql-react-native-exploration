import React from "react";
import { View, Text } from "react-native";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";
import UserForm from "./UserForm";
import { signIn } from "../../loginUtils";

const CreateUser = props => {
  const createUser = async ({ email, password }) => {
    try {
      const user = await props.createUser({
        variables: { email, password }
      });
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
      <Text>Register</Text>
      <UserForm type="Register" onSubmit={createUser} />
    </View>
  );
};

const createUser = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
  }
`;

const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

export default compose(
  graphql(signinUser, { name: "signinUser" }),
  graphql(createUser, { name: "createUser" })
)(CreateUser);
