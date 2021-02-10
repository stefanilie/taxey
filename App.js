/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { Button, ButtonGroup, Input } from 'react-native-elements';
import {
  ANNUAL_TO_THP,
  ANNUAL_TO_THP_COPY,
  MARGIN,
  THP_TO_ANNUAL_COPY,
} from './constants';
import { hp, wp } from './utils';

const App: () => React$Node = () => {
  const [calculatorMode, setCalculatorMode] = useState(0);
  const [displayResults, setDisplayResults] = useState(false);
  const [value, setValue] = useState(0);
  const [computedValue, setComputedValue] = useState(0);

  const placeholderDecider = () => {
    return calculatorMode === ANNUAL_TO_THP
      ? ANNUAL_TO_THP_COPY
      : THP_TO_ANNUAL_COPY;
  };

  const handleClickCompute = () => {
    // do the calculus.
    setComputedValue(value);
    setDisplayResults(!displayResults);
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={styles.title}>taxey</Text>
        <Text style={styles.subtitle}>
          Easily generate your {placeholderDecider()}
        </Text>
        <View style={styles.container}>
          <ButtonGroup
            onPress={setCalculatorMode}
            selectedIndex={calculatorMode}
            buttons={['Annual/Take Home Pay', 'Take Home Pay/Annual']}
            containerStyle={styles.buttonGroupContainer}
            selectedButtonStyle={styles.buttonGroupSelectedStyle}
          />
          <Input
            placeholder={placeholderDecider()}
            inputContainerStyle={styles.inputContainer}
            containerStyle={styles.textfieldContainerStyle}
            inputStyle={styles.inputStyle}
            onChangeText={(value) => {
              setValue(value);
              displayResults ? setDisplayResults(false) : null;
            }}
          />
          <Button
            title={'Submit'}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.buttonStyle}
            onPress={handleClickCompute}
          />
          {displayResults && (
            <View style={styles.resultsContainer}>
              <Text style={styles.header}>Your {placeholderDecider()}:</Text>
              <Text style={styles.amount}>{computedValue}£</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  container: {
    marginTop: hp(5),
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '900',
    margin: MARGIN,
    color: '#161d6f',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
    margin: MARGIN,
    color: '#161d6f',
  },
  buttonGroupContainer: {
    height: hp(5),
    borderRadius: 10,
    width: wp(90),
    marginLeft: MARGIN * 2,
    marginTop: MARGIN,
  },
  buttonGroupSelectedStyle: {
    backgroundColor: '#98ded9',
  },
  inputContainer: {
    height: hp(4),
    width: wp(90),
    borderRadius: 10,
    borderColor: '#161d6f',
    borderWidth: 1,
    paddingLeft: 10,
    margin: MARGIN,
  },
  textfieldContainerStyle: {
    height: hp(6),
  },
  inputStyle: {
    color: '#161d6f',
  },
  buttonContainer: {
    backgroundColor: '#161d6f',
    marginLeft: MARGIN * 2,
    borderRadius: 10,
    width: wp(90),
  },
  buttonStyle: {
    backgroundColor: '#98ded9',
  },
  resultsContainer: {
    paddingTop: hp(3),
    display: 'flex',
  },
  header: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: MARGIN,
    color: '#161d6f',
  },
  amount: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#161d6f',
    padding: MARGIN,
  },
});

export default App;
