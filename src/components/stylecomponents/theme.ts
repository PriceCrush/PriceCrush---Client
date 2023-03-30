interface fontSizeProp {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  pageTitle: string;
}

interface colorProp {
  BLACK: string;
  WHITE: string;
  GRAY: string;
  LIGHT_GRAY: string;
  DEEP_ORANGE: string;
  ORANGE: string;
}

interface heightProp {
  header: string;
}

interface paddingProps {
  baseX: string;
  baseY: string;
  inputX: string;
  inputY: string;
}

interface zindexProps {
  header: string;
}

interface topProps {
  topZero: number;
  topScrollDown: string;
}

interface positionProps {
  fabRight: string;
  fabBottom: string;
}

export interface themeProp {
  fontSize: fontSizeProp;
  color: colorProp;
  height: heightProp;
  padding: paddingProps;
  zindex: zindexProps;
  top: topProps;
  position: positionProps;
}

const fontSize: fontSizeProp = {
  sm: '1.2rem',
  md: '1.6rem',
  lg: '2.2rem',
  xl: '2.6rem',
  pageTitle: '3rem',
};

const top: topProps = {
  topZero: 0,
  topScrollDown: '-47px',
};

const height: heightProp = {
  header: '14vh',
};

const padding: paddingProps = {
  baseX: '18vw',
  baseY: '3vh',
  inputX: '10px',
  inputY: '10px',
};

const color: colorProp = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY: '#d4d4d4',
  LIGHT_GRAY: '#f4f4f4',
  DEEP_ORANGE: '#FF5C00',
  ORANGE: '#D68558',
};

const position: positionProps = {
  fabRight: '10vw',
  fabBottom: '10vh',
};

const zindex: zindexProps = {
  header: '50',
};

const theme: themeProp = {
  fontSize,
  color,
  height,
  padding,
  zindex,
  top,
  position,
};

export default theme;
