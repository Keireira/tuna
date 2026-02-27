export interface AccentColor {
  id: string;
  color: string;
  hover: string;
  light: string;
  lightDark: string;
  gradient: string;
  gradientDark: string;
}

export const ACCENT_COLORS: AccentColor[] = [
  {
    id: 'blue',
    color: '#007AFF',
    hover: '#0066DD',
    light: 'rgba(0, 122, 255, 0.1)',
    lightDark: 'rgba(10, 132, 255, 0.15)',
    gradient: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
    gradientDark: 'linear-gradient(135deg, #0A84FF 0%, #5E5CE6 100%)',
  },
  {
    id: 'purple',
    color: '#AF52DE',
    hover: '#9A42C8',
    light: 'rgba(175, 82, 222, 0.1)',
    lightDark: 'rgba(191, 90, 242, 0.15)',
    gradient: 'linear-gradient(135deg, #AF52DE 0%, #5856D6 100%)',
    gradientDark: 'linear-gradient(135deg, #BF5AF2 0%, #5E5CE6 100%)',
  },
  {
    id: 'pink',
    color: '#FF2D55',
    hover: '#E0264B',
    light: 'rgba(255, 45, 85, 0.1)',
    lightDark: 'rgba(255, 55, 95, 0.15)',
    gradient: 'linear-gradient(135deg, #FF2D55 0%, #AF52DE 100%)',
    gradientDark: 'linear-gradient(135deg, #FF375F 0%, #BF5AF2 100%)',
  },
  {
    id: 'red',
    color: '#FF3B30',
    hover: '#E0342A',
    light: 'rgba(255, 59, 48, 0.1)',
    lightDark: 'rgba(255, 69, 58, 0.15)',
    gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF9500 100%)',
    gradientDark: 'linear-gradient(135deg, #FF453A 0%, #FF9F0A 100%)',
  },
  {
    id: 'orange',
    color: '#FF9500',
    hover: '#E08600',
    light: 'rgba(255, 149, 0, 0.1)',
    lightDark: 'rgba(255, 159, 10, 0.15)',
    gradient: 'linear-gradient(135deg, #FF9500 0%, #FFCC00 100%)',
    gradientDark: 'linear-gradient(135deg, #FF9F0A 0%, #FFD60A 100%)',
  },
  {
    id: 'green',
    color: '#34C759',
    hover: '#2DB14E',
    light: 'rgba(52, 199, 89, 0.1)',
    lightDark: 'rgba(48, 209, 88, 0.15)',
    gradient: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
    gradientDark: 'linear-gradient(135deg, #30D158 0%, #34C759 100%)',
  },
  {
    id: 'teal',
    color: '#5AC8FA',
    hover: '#4AB8EA',
    light: 'rgba(90, 200, 250, 0.1)',
    lightDark: 'rgba(100, 210, 255, 0.15)',
    gradient: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
    gradientDark: 'linear-gradient(135deg, #64D2FF 0%, #0A84FF 100%)',
  },
  {
    id: 'indigo',
    color: '#5856D6',
    hover: '#4B49C0',
    light: 'rgba(88, 86, 214, 0.1)',
    lightDark: 'rgba(94, 92, 230, 0.15)',
    gradient: 'linear-gradient(135deg, #5856D6 0%, #AF52DE 100%)',
    gradientDark: 'linear-gradient(135deg, #5E5CE6 0%, #BF5AF2 100%)',
  },
];
