import { Text as NativeText } from 'react-native';
import theme from '../theme';

const Text = (props) => {
  return <NativeText {...props} style={[{ fontFamily: theme.fonts.main }, props.style]} />;
};

export default Text;