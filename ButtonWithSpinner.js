import { Button, CircularProgress } from '@mui/material';
import styled from 'styled-components';

// constants
const APP_BUTTON_COLOR = '#7150FF';
const lightAmout = 35;
const xtraLightAmout = 85;

const getColorVariants = (color, amount) => {
  // example color = '#5934FF'

  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const lighten = (c) => {
    const value = Math.round(c + (255 - c) * (amount / 100));
    const hexValue = value.toString(16).padStart(2, '0');
    return hexValue;
  };

  const lightenedR = lighten(r);
  const lightenedG = lighten(g);
  const lightenedB = lighten(b);

  const lightenedHex = `#${lightenedR}${lightenedG}${lightenedB}`;
  return lightenedHex;
};

const Loader = ({ size, thickness, color }) => {
  return (
    <CircularProgress
      size={size || '80px'}
      thickness={thickness || 4}
      sx={{
        color: `${color || '#3BA694'}`,
      }}
    />
    // </Box>
  );
};

const StyledButton = styled(Button)((props) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: 'Roboto',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '500',
  height: '40px',
  justifyContent: 'center',
  lineHeight: '20px',
  padding: '10px 16px',
  border: `1px solid ${props?.$color || '#5934FF'}`,
  backgroundColor: props?.$inverted ? '#FFFFFF' : props?.$color || '#5934FF',
  color: props?.$inverted ? props?.$color || '#5934FF' : '#FFFFFF',
  textTransform: 'none',
  '&:hover': {
    borderColor: getColorVariants(
      props?.$color || APP_BUTTON_COLOR,
      lightAmout
    ),
    backgroundColor: getColorVariants(
      props?.$color || APP_BUTTON_COLOR,
      props?.$inverted ? xtraLightAmout : lightAmout
    ),
  },
  '&:disabled': {
    color: props?.$inverted
      ? getColorVariants(props?.$color || '#5934FF', lightAmout)
      : '#FFFFFF',
    border: `1px solid ${getColorVariants(
      props?.$color || '#5934FF',
      lightAmout
    )}`,
    backgroundColor: props?.$inverted
      ? '#FFFFFF'
      : getColorVariants(props?.$color || '#5934FF', lightAmout),
  },
  '& .MuiButton-startIcon': {
    marginLeft: props?.text && props.text.length === 0 && 0,
    marginRight: props?.text && props.text.length === 0 && 0,
  },
  '& .MuiButton-endIcon': {
    marginLeft: props?.text && props.text.length === 0 && 0,
    marginRight: props?.text && props.text.length === 0 && 0,
  },
  ...props?.sx,
}));

const ButtonWithSpinner = ({
  color,
  disabled,
  endIcon,
  inverted,
  isLoading,
  onClick,
  startIcon,
  sx,
  text,
  ...props
}) => {
  return (
    <StyledButton
      $color={color}
      disabled={disabled || isLoading}
      $inverted={inverted}
      onClick={onClick}
      sx={sx}
      endIcon={
        endIcon && isLoading ? (
          <Loader
            color={
              inverted
                ? getColorVariants(color || APP_BUTTON_COLOR, lightAmout)
                : '#FFFFFF'
            }
            size={18}
            thickness={4}
          />
        ) : (
          endIcon
        )
      }
      startIcon={
        startIcon && isLoading ? (
          <Loader
            color={
              inverted
                ? getColorVariants(color || APP_BUTTON_COLOR, lightAmout)
                : '#FFFFFF'
            }
            size={18}
            thickness={4}
          />
        ) : (
          startIcon
        )
      }
    >
      {text}
    </StyledButton>
  );
};

export default ButtonWithSpinner;
