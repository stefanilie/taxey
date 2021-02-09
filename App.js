/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { ButtonGroup, Input } from 'react-native-elements';
import {
  ANNUAL_TO_THP,
  ANNUAL_TO_THP_COPY,
  THP_TO_ANNUAL_COPY,
} from './constants';

const App: () => React$Node = () => {
  const [calculatorMode, setCalculatorMode] = useState(0);

  const placeholderDecider = () => {
    return calculatorMode === ANNUAL_TO_THP
      ? ANNUAL_TO_THP_COPY
      : THP_TO_ANNUAL_COPY;
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <ButtonGroup
            onPress={setCalculatorMode}
            selectedIndex={calculatorMode}
            buttons={['Annual/Take Home Pay', 'Take Home Pay/Annual']}
            containerStyle={styles.buttonGroupContainer}
          />
          <Input
            placeholder={placeholderDecider()}
            inputContainerStyle={styles.inputContainer}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    flex: 1,
  },
  buttonGroupContainer: {
    height: 50,
    borderRadius: 10,
  },
  inputContainer: {
    height: 30,
    marginTop: 10,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default App;
