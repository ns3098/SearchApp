import React, { useState } from 'react';
import { StyledWrapper, StyledLabel, StyledInput } from './StyledComponents';

const InputWithActiveLabel = (props) => {
  const textInputProps = {
    ...props,
    placeholder: props.placeholder,
  };
  const [focused, setFocused] = useState(false);
  const onFocus = () => {
    setFocused(true);
    props.onFocus && props.onFocus();
  };
  const onBlur = (event) => {
    if (props.onBlur) {
      props.onBlur(event);
    }
    setFocused(false);
  };

  return (
    <StyledWrapper>
      {props.label && <StyledLabel active={focused}>{props.label}</StyledLabel>}
      <StyledInput
        {...textInputProps}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={props.inputRef}
        // onMouseEnter={onFocus}
        // onMouseLeave={onBlur}
      />
      {!props.hideErrorMessage &&
        (props.successMessage ? (
          <div className="success-message">
            {props.successMessage || <>&nbsp;</>}
          </div>
        ) : (
          <div className="error-message">
            {props.errorMessage || <>&nbsp;</>}
          </div>
        ))}
    </StyledWrapper>
  );
};

export default InputWithActiveLabel;
