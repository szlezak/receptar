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

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
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

const PositiveNumber = t.refinement(t.Number, n => n > 0);

const Recipe = t.struct({
  title: t.String,
  preparationTime: PositiveNumber,
  servingCount: PositiveNumber,
  directions: t.maybe(t.String),
  ingredients: t.struct({
    name: t.String,
    amount: PositiveNumber,
    amountUnit: t.String,
  }),
});

const options = {
  fields: {
    title: {
      error: 'Title can\'t be empty!',
    },
    preparationTime: {
      error: 'Preparation time needs to be positive number!',
    },
    servingCount: {
      error: 'Serving count needs to be positive number!',
    },
    directions: {
      multiline: true,
      help: 'Markdown: *) divides lines',
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 200,
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 200,
          },
        },
      },
    },
  },
};

class NewRecipeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      value: null,
    };
  }

  onChange = (value) => {
    this.setState({ value });
  }

  clearForm = () => {
    this.setState({ value: null });
  }

  setVisibility = (visibility) => {
    this.setState({ visible: visibility });
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
        ingredients,
      } = value || {};

      const {
        name,
        amount,
        amountUnit,
      } = ingredients || {};

      this.props.mutate({
        variables: {
          recipe: {
            title,
            preparationTime,
            servingCount,
            directions,
            ingredients: {
              name,
              amount,
              amountUnit,
            },
          },
        },
        refetchQueries: [{ query: RecipeListQuery }],
      });
    }

    this.clearForm();
  }

  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <StatusBar
          visible={this.state.visible}
          text="Done!"
        />
        <ScrollView style={styles.wrapper}>
          <Form
            ref="recipeForm"
            type={Recipe}
            options={options}
            value={this.state.value}
            onChange={this.onChange}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this.onPress}
          >
            <Text style={styles.buttonTextStyle}>Save</Text>
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
