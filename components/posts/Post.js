import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Fab, Icon } from "native-base";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

const Post = ({ Post, loading, navigation }) => {
  if (loading) return <ActivityIndicator size="large" />;

  editPost = () => {
    navigation.navigate("UpdatePost", { id: Post.id, title: Post.title });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.bodyText}>{Post.body}</Text>
      <Fab style={styles.editPost} onPress={editPost}>
        <Icon name="create" />
      </Fab>
    </View>
  );
};

Post.navigationOptions = ({ navigation }) => {
  return { title: navigation.getParam("title") };
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  bodyText: {
    fontSize: 16
  },
  editPost: {
    backgroundColor: "#82D8D8"
  }
});

const getPostQuery = gql`
  query Post($id: ID!) {
    Post(id: $id) {
      id
      title
      body
    }
  }
`;

export default graphql(getPostQuery, {
  props: ({ data }) => ({ ...data }),
  options: ({ navigation }) => ({
    variables: {
      id: navigation.getParam("id")
    }
  })
})(Post);
