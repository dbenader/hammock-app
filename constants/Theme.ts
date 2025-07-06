import { Theme as NavTheme } from '@react-navigation/native';

export type AppTheme = NavTheme & {
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    gutterPadding: number;
    borderRadius: number;
    disabled: string;
    success: string;
    error: string;
    tint: string;
    fontSizes: {
      xsmall: number;
      small: number;
      medium: number;
      large: number;
      xlarge: number;
      xxlarge: number;
      [key: string]: number;
    };
};

export const lightTheme: AppTheme = {
    dark: false,
    colors: {
      primary: '#ff7a53',
      background: '#f9eedb',
      card: '#ffffff',
      text: '#4b2810',
      border: '#e0e0e0',
      notification: '#e28483',
    },
    tint: 'rgba(239,186,110,0.5)',
    fonts: {
      regular: { fontFamily: 'SpaceMono', fontWeight: '400' },
      medium: { fontFamily: 'SpaceMono', fontWeight: '500' },
      bold: { fontFamily: 'SpaceMonoBold', fontWeight: '700' },
      heavy: { fontFamily: 'SpaceMonoBold', fontWeight: '800' },
    },
    spacing: {
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32,
      xl: 48,
      xxl: 56
    },
    fontSizes: {
      xsmall: 12,
      small: 14,
      medium: 16,
      large: 20,
      xlarge: 28,
      xxlarge: 36,
    },
    gutterPadding: 24,
    borderRadius: 8,
    disabled: '#F1F1F1',
    success: '#71c28c',
    error: '#e26565',
};

export const darkTheme: AppTheme = {
    dark: true,
    colors: {
      primary: '#ff7a53',
      background: '#1a1a1a',
      card: '#2a2a2a',
      text: '#f1f1f1',
      border: '#3a3a3a',
      notification: '#91b793',
    },
    tint: '#fff',
    fonts: {
      regular: { fontFamily: 'Roboto', fontWeight: '400' },
      medium: { fontFamily: 'Roboto', fontWeight: '500' },
      bold: { fontFamily: 'Roboto', fontWeight: '700' },
      heavy: { fontFamily: 'Roboto', fontWeight: '800' },
    },
    spacing: {
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32,
      xl: 48,
      xxl: 56
    },
    fontSizes: {
      xsmall: 12,
      small: 14,
      medium: 16,
      large: 20,
      xlarge: 28,
      xxlarge: 36,
    },
    gutterPadding: 24,
    borderRadius: 8,
    disabled: '#4a4a4a',
    success: '#71c28c',
    error: '#e26565',
};
