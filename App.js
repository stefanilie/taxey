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
  ALLOWANCE,
  ANNUAL_TO_THP,
  ANNUAL_TO_THP_COPY,
  BASIC_RATE,
  HIGHER_RATE,
  MARGIN,
  THP_TO_ANNUAL_COPY,
  NI_1920_MTH_ALLOWANCE,
  NI_2021_MTH_ALLOWANCE,
  NI_1920_MTH_UEL,
  NI_BASIC_RATE,
  ADDITIONAL_RATE,
  NI_UEL_RATE,
} from './constants';
import { hp, wp } from './utils';

const App: () => React$Node = () => {
  const [value, setValue] = useState(0);
  const [calculatorMode, setCalculatorMode] = useState(0);
  const [taxYear, setTaxYear] = useState(0);
  const [displayResults, setDisplayResults] = useState(false);
  const [computedValue, setComputedValue] = useState(0);
  const [details, setDetails] = useState({});

  const placeholderDecider = () => {
    return calculatorMode === ANNUAL_TO_THP
      ? ANNUAL_TO_THP_COPY
      : THP_TO_ANNUAL_COPY;
  };

  const computeUELIncomeTax = () => {
    const availableAllowance = Math.abs(ALLOWANCE - (value - 100000) / 2);
    const withoutAllowance =
      value > 100000 ? 50000 - availableAllowance : 50000 - ALLOWANCE;
    return withoutAllowance * BASIC_RATE + (value - 50000) * HIGHER_RATE;
  };

  const computeIncomeTax = () => {
    switch (true) {
      case value <= ALLOWANCE:
        return 0;
      case value > ALLOWANCE && value <= 50000: {
        return BASIC_RATE * (value - ALLOWANCE);
      }
      case value > 50000 && value <= 150000:
        return computeUELIncomeTax();
      case value > 150000: {
        const upTo15k = computeIncomeTax(150000);
        return upTo15k + (value - 150000) * ADDITIONAL_RATE;
      }
    }
  };

  const computeNationalInsurance = (monthlyAllowance) => {
    const allowance = monthlyAllowance * 12;
    const uelLimit = NI_1920_MTH_UEL * 12;
    const upToUEL = (value - allowance) * NI_BASIC_RATE;
    switch (true) {
      case value <= allowance:
        return 0;
      case value > allowance && value <= uelLimit:
        return upToUEL;
      case value > uelLimit:
        return upToUEL + (value - uelLimit) * NI_UEL_RATE;
    }
  };

  const handleClickCompute = () => {
    const incomeTax = computeIncomeTax();
    const ni20 = computeNationalInsurance(NI_1920_MTH_ALLOWANCE);
    const ni21 = computeNationalInsurance(NI_2021_MTH_ALLOWANCE);
    const valueFor20 = value - incomeTax - ni20;
    const valueFor21 = value - incomeTax - ni21;
    setDetails({
      valueFor20: valueFor20,
      valueFor21: valueFor21,
      ni20: ni20,
      ni21: ni21,
    });
    taxYear === 0 ? setComputedValue(valueFor20) : setComputedValue(valueFor21);
    setDisplayResults(true);
  };

  const handleTaxYearSwitch = (taxYearSwitch) => {
    taxYearSwitch === 0
      ? setComputedValue(details.valueFor20)
      : setComputedValue(details.valueFor21);
    setTaxYear(taxYearSwitch);
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
            onChangeText={(inputValue) => {
              setValue(parseInt(inputValue));
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
              <ButtonGroup
                onPress={handleTaxYearSwitch}
                selectedIndex={taxYear}
                buttons={['19/20 Tax Year', '20/21 Tax Year']}
                containerStyle={styles.buttonGroupContainer}
                selectedButtonStyle={styles.buttonGroupSelectedStyle}
              />
              <Text style={styles.header}>Your {placeholderDecider()}:</Text>
              <Text style={styles.amount}>{computedValue}£</Text>
              <Text style={styles.monthly}>
                Monthly: {(computedValue / 12).toFixed(2)}£
              </Text>
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
  monthly: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: '#161d6f',
    padding: MARGIN,
  },
});

export default App;
