import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
 } from 'react-native';
import t from 'tcomb-form-native';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import StatusBar from '../components/common/StatusBar';

const styles = StyleSheet.create({
  'wrapper': {
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

const PositiveNumber = t.refinement(t.Number, (n) => { n >= 0 });

const Recipe = t.struct({
  title: t.String,
  preparationTime: PositiveNumber,
  servingCount: PositiveNumber,
  directions: t.maybe(t.String),
});

const options = {
  fields: {
    title: {
      error: 'Title can\'t be empty!',
    },
    preparationTime: {
      error: 'Preparation time needs to be positive number!'
    },
    servingCount: {
      error: 'Serving count needs to be positive number!'
    },
    directions: {
      multiline: true,
      stylesheet: {
          ...Form.stylesheet,
          textbox: {
            ...Form.stylesheet.textbox,
            normal: {
              ...Form.stylesheet.textbox.normal,
              height: 150,
            },
            error: {
              ...Form.stylesheet.textbox.error,
              height: 150,
            },
          },
        },
      },
    }
  };

class NewRecipe extends Component {
  // _clearForm = () => {
  //   this.setState({ value: null });
constructor() {
  super();
  this.state = {
    visible: false,
  }
}

setVisibility = (visibility) => {
  this.setState({ visible: visibility});
}

_onPress = () => {
  const validate = this.refs.recipeForm.validate();

  if (validate.errors.length === 0) {
    this.setVisibility(true);
    setTimeout(() => { this.setVisibility(false) } , 1000);
    const value = this.refs.recipeForm.getValue();
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
}

  render() {
    console.log('this.props', this.props)
    return (
      <View style={{marginTop: 20}}>
        <StatusBar
          visible={this.state.visible}
          text={'Done!'}
        />
        <View style={styles.wrapper}>
          <Form
            ref="recipeForm"
            type={Recipe}
            options={options}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={this._onPress}>
            <Text style={styles.buttonTextStyle}>Save</Text>
          </TouchableOpacity>
        </View>
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
