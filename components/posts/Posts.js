import React from "react";
import { View, Text, FlatList } from "react-native";
import { List, ListItem, Body, Right, Icon } from "native-base";

const Posts = ({ navigation, screenProps }) => {
  const goToPost = (id, title) => navigation.navigate("Post", { id, title });

  return (
    <View>
      <List>
        <FlatList
          data={screenProps.user.posts}
          renderItem={({ item }) => (
            <ListItem onPress={() => goToPost(item.id, item.title)}>
              <Body>
                <Text>{item.title}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          )}
          keyExtractor={item => item.id}
        />
      </List>
    </View>
  );
};

export default Posts;
