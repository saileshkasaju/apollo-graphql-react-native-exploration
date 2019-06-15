import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { StyleSheet, View, ActivityIndicator, Button } from "react-native";
import { Fab, Icon } from "native-base";
import { graphql, withApollo } from "react-apollo";
import { gql } from "apollo-boost";
import navigationStyles from "./styles/navigationStyles";
import Post from "./components/posts/Post";
import Posts from "./components/posts/Posts";
import NewPost from "./components/posts/NewPost";
import UpdatePost from "./components/posts/UpdatePost";
import Login from "./components/user/Login";
import { signOut } from "./loginUtils";

function Home(props) {
  const gotoNewPost = () => props.navigation.navigate("NewPost");
  const signout = () => {
    signOut();
    props.client.resetStore();
  };
  return (
    <View style={styles.container}>
      <Posts {...props} />
      <Button onPress={signout} title="Logout" />
      <Fab style={styles.newPost} onPress={gotoNewPost}>
        <Icon name="add" />
      </Fab>
    </View>
  );
}

Home.navigationOptions = {
  title: "Home"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  newPost: {
    backgroundColor: "#82D8D8"
  },
  newPostText: {
    fontSize: 20,
    textAlign: "center"
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: withApollo(Home),
    Post,
    NewPost,
    UpdatePost
  },
  {
    defaultNavigationOptions: navigationStyles
  }
);

const AuthNavigator = createStackNavigator(
  {
    Login
  },
  {
    defaultNavigationOptions: navigationStyles
  }
);

const App = createAppContainer(AppNavigator);
const Auth = createAppContainer(AuthNavigator);

const NavWrapper = ({ loading, user }) => {
  if (loading) return <ActivityIndicator />;
  if (!user) return <Auth />;
  return <App screenProps={{ user }} />;
};

const userQuery = gql`
  query userQuery {
    user {
      id
      email
      posts(orderBy: createdAt_DESC) {
        id
        title
      }
    }
  }
`;

export default graphql(userQuery, {
  props: ({ data }) => ({ ...data })
})(NavWrapper);
