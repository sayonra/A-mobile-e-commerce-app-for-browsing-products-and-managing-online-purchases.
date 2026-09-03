import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

export default function RootNavigator() {
  const token = useSelector((s) => s.auth.token);

  return <NavigationContainer>{token ? <MainTabs /> : <AuthStack />}</NavigationContainer>;
}
