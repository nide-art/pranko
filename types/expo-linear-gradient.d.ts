declare module 'expo-linear-gradient' {
  import { ViewProps } from 'react-native';
  import React from 'react';

  export interface LinearGradientProps extends ViewProps {
    colors: readonly [string, string, ...string[]];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    locations?: number[];
  }

  export class LinearGradient extends React.Component<LinearGradientProps> {}
}