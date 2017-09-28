import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import t from 'tcomb-form-native';

import BasicLabel from '../common/BasicLabel';
import IngredientList from '../common/IngredientList';
import { ingredient, ingredientOptions } from '../../helpers/FormStructure';

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    backgroundColor: '#ededed',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#bdbdbd',
  },
  formWrapper: {
    paddingHorizontal: 15,
  },
  ingredientList: {
    paddingHorizontal: 15,
    paddingVertical: 5,
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

class IngredientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientValue: null,
    };
  }

  onIngredientChange = (ingredientValue) => {
    this.setState({ ingredientValue });
  }

  clearIngredientForm = () => {
    this.setState({ ingredientValue: null });
  }

  onPress = () => {
    const { ingredientForm } = this.refs;
    const { onIngredientPress } = this.props;

    const validate = ingredientForm.validate();

    if (validate.errors.length === 0) {
      const ingredientValue = ingredientForm.getValue();

      onIngredientPress(ingredientValue);
      this.clearIngredientForm();
    }
  }

  render() {
    const { ingredientValue } = this.state;
    const { ingredients } = this.props;

    return (
      <View style={styles.wrapper}>
        <BasicLabel label="Ingredients"/>
        <View style={styles.ingredientList}>
          <IngredientList ingredients={ingredients} />
        </View>
        <View style={styles.formWrapper}>
          <Form
            ref="ingredientForm"
            type={ingredient}
            options={ingredientOptions}
            value={ingredientValue}
            onChange={this.onIngredientChange}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onPress}
        >
          <Text style={styles.buttonTextStyle}>Add Ingredient</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default IngredientForm;
