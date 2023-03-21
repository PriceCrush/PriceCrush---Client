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

interface heightProp {
  header: string;
}

interface paddingProps {
  baseX: string;
}
export interface themeProp {
  fontSize: fontSizeProp;
  color: colorProp;
  height: heightProp;
  padding: paddingProps;
}

const fontSize: fontSizeProp = {
  sm: '1.2rem',
  md: '1.6rem',
  lg: '2rem',
  xl: '2.4rem',
};

const height: heightProp = {
  header: '8vh',
};

const padding: paddingProps = {
  baseX: '5vw',
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
  height,
  padding,
};

export default theme;
