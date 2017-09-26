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

  setVisibility = (visibility) => {
    this.setState({ visible: visibility});
  }

  _onPress = () => {
    this.setVisibility(true);
    setTimeout(() => { this.setVisibility(false) } , 1000);
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
            value={this.state.value}
            onChange={this._onChange}
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
