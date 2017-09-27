import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import t from 'tcomb-form-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import StatusBar from '../components/common/StatusBar';
import { RecipeListQuery } from './RecipeList';
import {
  ingredient,
  ingredientOptions,
  options,
  recipe,
} from '../components/newRecipe/FormStructure';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  textStyle: {
    fontSize: 22,
    paddingBottom: 5,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

const Form = t.form.Form;

class NewRecipeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      value: null,
      ingredientValue: null,
      ingredients: [],
    };
  }

  onChange = (value) => {
    this.setState({ value });
  }

  onIngredientChange = (ingredientValue) => {
    this.setState({ ingredientValue });
  }

  clearForm = () => {
    this.setState({
      value: null,
      ingredientValue: null,
      ingredients: [],
    });
  }

  clearIngredientForm = () => {
    this.setState({ ingredientValue: null });
  }

  setVisibility = (visibility) => {
    this.setState({ visible: visibility });
  }

  onIngredientPress = () => {
    const validate = this.refs.ingredientForm.validate();

    if (validate.errors.length === 0) {
      const ingredientValue = this.refs.ingredientForm.getValue();

      this.setState({ ingredients: [...this.state.ingredients, ingredientValue] });
      this.clearIngredientForm();
    }
  }

  onPress = () => {
    const validate = this.refs.recipeForm.validate();

    if (validate.errors.length === 0) {
      this.setVisibility(true);
      setTimeout(() => { this.setVisibility(false); }, 1000);
      const value = this.refs.recipeForm.getValue();

      const {
        title,
        preparationTime,
        servingCount,
        directions,
      } = value || {};

      this.props.mutate({
        variables: {
          recipe: {
            title,
            preparationTime,
            servingCount,
            directions,
            ...this.state.ingredients,
          },
        },
        refetchQueries: [{ query: RecipeListQuery }],
      });

      this.clearIngredientForm();
      this.clearForm();
    }
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <StatusBar
          visible={this.state.visible}
          text="Done!"
        />
        <ScrollView style={styles.wrapper}>
          <Text style={styles.textStyle}>Recipe details</Text>
          <Form
            ref="recipeForm"
            type={recipe}
            options={options}
            value={this.state.value}
            onChange={this.onChange}
          />
          <View style={{ paddingVertical: 10 }}>
            <Text style={styles.textStyle}>Ingredients</Text>
            <Form
              ref="ingredientForm"
              type={ingredient}
              options={ingredientOptions}
              value={this.state.ingredientValue}
              onChange={this.onIngredientChange}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.onIngredientPress}
            >
              <Text style={styles.buttonTextStyle}>Add Ingredient</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.onPress}
          >
            <Text style={styles.buttonTextStyle}>Save Recipe</Text>
          </TouchableOpacity>
        </ScrollView>
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

const NewRecipeWithMutation = graphql(NewRecipeMutation)(NewRecipeContainer);

export default NewRecipeWithMutation;
