import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";
import PostForm from "./PostForm";

const UpdatePost = ({ navigation, screenProps, updatePost, Post }) => {
  const [loading, setLoading] = useState(false);

  const editPost = ({ title, body, id }) => {
    setLoading(true);
    updatePost({ variables: { title, body, userId: screenProps.user.id, id } })
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
        <PostForm onSubmit={editPost} post={Post} />
      )}
    </View>
  );
};

UpdatePost.navigationOptions = {
  title: "Update Post"
};

const updatePost = gql`
  mutation updatePost($title: String!, $body: String!, $userId: ID!, $id: ID!) {
    updatePost(title: $title, body: $body, userId: $userId, id: $id) {
      id
      title
    }
  }
`;

const getPostQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      body
    }
  }
`;

export default compose(
  graphql(getPostQuery, {
    props: ({ data }) => ({ ...data }),
    options: ({ navigation }) => ({
      variables: {
        id: navigation.getParam("id")
      }
    })
  }),
  graphql(updatePost, {
    name: "updatePost",
    options: {
      refetchQueries: ["Post"]
    }
  })
)(UpdatePost);
