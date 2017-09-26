import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import t from 'tcomb-form-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { RecipeListQuery } from './RecipeList';

const Form = t.form.Form;

const Recipe = t.struct({
  title: t.String,
  preparationTime: t.Number,
  servingCount: t.Number,
  directions: t.String,
});

class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  _onChange = (value) => {
    this.setState({ value });
  }

  _clearForm = () => {
    this.setState({ value: null });
  }

  _onPress = () => {
    const value = this.refs.recipeForm.getValue();
    const validate = this.refs.recipeForm.validate();

    if (!value) { return null; }

    this.props.mutate({
      variables: {
        recipe: {
          title: value.title,
        }
      },
      refetchQueries: [ { query: RecipeListQuery }],
    });

    this._clearForm();
  }

  render() {
    console.log('this.props', this.props)
    return (
      <View>
        <Form
          ref="recipeForm"
          type={Recipe}
          value={this.state.value}
          onChange={this._onChange}
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
