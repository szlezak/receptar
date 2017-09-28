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

import BasicLabel from '../components/common/BasicLabel';
import IngredientForm from '../components/newRecipe/IngredientForm';
import StatusBar from '../components/common/StatusBar';
import { RecipeListQuery } from './RecipeList';
import { options, recipe } from '../helpers/FormStructure';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
  },
  formWrapper: {
    marginHorizontal: 15,
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
      ingredients: [],
    };
  }

  onChange = (value) => {
    this.setState({ value });
  }

  clearForm = () => {
    this.setState({
      value: null,
      ingredients: [],
    });
  }

  setVisibility = (visibility) => {
    this.setState({ visible: visibility });
  }

  onIngredientPress = (newIngredient) => {
    const { ingredients } = this.state;

    this.setState({ ingredients: [...ingredients, newIngredient] });
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

      const { ingredients } = this.state;

      this.props.mutate({
        variables: {
          recipe: {
            title,
            preparationTime,
            servingCount,
            directions,
            ingredients,
          },
        },
        refetchQueries: [{ query: RecipeListQuery }],
      });

      this.clearForm();
    }
  }

  render() {
    const { ingredients } = this.state;

    return (
      <View style={styles.wrapper}>
        <StatusBar
          visible={this.state.visible}
          text="Your recipe has been saved!"
        />
        <ScrollView>
          <BasicLabel label="Recipe details"/>
          <View style={styles.formWrapper}>
            <Form
              ref="recipeForm"
              type={recipe}
              options={options}
              value={this.state.value}
              onChange={this.onChange}
            />
          </View>
          <IngredientForm
            ingredients={ingredients}
            onIngredientPress={this.onIngredientPress}
          />
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
