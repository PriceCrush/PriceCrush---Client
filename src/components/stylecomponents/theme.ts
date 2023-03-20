interface fontSizeProp {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

interface colorProp {
  BLACK: string;
  WHITE: string;
  GRAY: string;
  DEEP_ORANGE: string;
  ORANGE: string;
}

export interface themeProp {
  fontSize: fontSizeProp;
  color: colorProp;
}

const fontSize: fontSizeProp = {
  sm: '1.4rem',
  md: '1.6rem',
  lg: '1.8rem',
  xl: '2.2rem',
};

const color: colorProp = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY: '#d4d4d4',
  DEEP_ORANGE: '#FF5C00',
  ORANGE: '#D68558',
};

const theme: themeProp = {
  fontSize,
  color,
};

export default theme;
