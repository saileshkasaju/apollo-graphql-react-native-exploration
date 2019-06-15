import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import PostForm from "./PostForm";

const NewPost = ({ newPost, navigation, screenProps }) => {
  const [loading, setLoading] = useState(false);
  const makeNewPost = ({ title, body }) => {
    setLoading(true);
    newPost({ variables: { title, body, userId: screenProps.user.id } })
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <PostForm onSubmit={makeNewPost} />
      )}
    </View>
  );
};

NewPost.navigationOptions = {
  title: "New Post"
};

const newPost = gql`
  mutation newPost($title: String!, $body: String!, $userId: ID!) {
    createPost(title: $title, body: $body, userId: $userId) {
      id
      title
    }
  }
`;

export default graphql(newPost, {
  name: "newPost",
  options: {
    refetchQueries: ["userQuery"]
  }
})(NewPost);
