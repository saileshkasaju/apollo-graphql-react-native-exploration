import React, { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { Form, Item, Input, Label } from "native-base";

const PostForm = ({ post, onSubmit }) => {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const submitForm = () => {
    onSubmit({
      ...post,
      title,
      body
    });
  };
  return (
    <Form>
      <Item floatingLabel>
        <Label>Title</Label>
        <Input value={title} onChangeText={setTitle} />
      </Item>
      <Item floatingLabel>
        <Label>Body</Label>
        <Input
          style={styles.body}
          value={body}
          onChangeText={setBody}
          multiline
        />
      </Item>

      <Button title="Save Post" onPress={submitForm} />
    </Form>
  );
};

PostForm.defaultProps = {
  post: { title: "", body: "" }
};

export default PostForm;

const styles = StyleSheet.create({
  body: {
    height: 480,
    textAlignVertical: "top"
  }
});
