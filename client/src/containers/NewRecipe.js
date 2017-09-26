import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import t from 'tcomb-form-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const Form = t.form.Form;

const Recipe = t.struct({
  title: t.String,
  preparationTime: t.Number,
  servingCount: t.Number,
  directions: t.String,
});

class NewRecipe extends Component {
  // _clearForm = () => {
  //   this.setState({ value: null });

  _onPress = () => {
    const value = this.refs.recipeForm.getValue();
console.log(this.props)
    if (value) {
      this.props.mutate({
        variables: {
          recipe: {
            title: value.title,
          }
        },
      });
    }
  }

  render() {
    console.log('this.props', this.props)
    return (
      <View>
        <Form
          ref="recipeForm"
          type={Recipe}
        />
        <TouchableHighlight onPress={this._onPress}>
          <Text>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const NewRecipeMutation = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(input: $recipe) {
      title
    }
  }
`;

const NewRecipeWithMutation = graphql(NewRecipeMutation)(NewRecipe);

export default NewRecipeWithMutation;
