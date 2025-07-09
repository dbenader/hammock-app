import type { AppTheme } from '@/constants/Theme';
import { useTheme as useNavigationTheme } from '@react-navigation/native';

export const useAppTheme = (): AppTheme => {
  return useNavigationTheme() as AppTheme;
};