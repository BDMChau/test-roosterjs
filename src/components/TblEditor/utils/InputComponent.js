/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useImperativeHandle, useRef } from 'react';

import isEqual from 'lodash/isEqual';

import makeStyles from '@mui/styles/makeStyles';


import clsx from 'clsx';
import PropTypes from 'prop-types';

import useOnClickOutside from './useOnClickOutside';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .focus-content': {
      '& .input-container': {
        outline: 'none',
      },
    },
    '& .has-error': {
      '& .input-container': {
      },
    },
  },
}));
const InputComponent = React.forwardRef(
  (
    {
      Component,
      label,
      onSave,
      onAbort,
      onChange,
      handleClickInside,
      disabled,
      error,
      autoSave,
      defaultValue,
      height,
      required,
      customButtons,
      ...rest
    },
    ref
  ) => {
    const classes = useStyles();
    const inputRef = React.useRef();
    const inputActionsRef = React.useRef();
    const inputContainerRef = useRef();
    const handleSave = useCallback((e) => {
      if (!autoSave && onChange) {
        onChange(e, inputRef);
      }
      if (onSave) {
        onSave(e, inputRef);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const {
      clickedOutside,
      setClickedOutside,
      addEventListener,
      removeEventListener,
    } = useOnClickOutside(inputContainerRef, true, disabled, handleSave);

    const handleCancel = useCallback((e) => {
      if (onAbort && autoSave) {
        onAbort(e, inputRef);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = useCallback((e, value) => {
      onClickInside(e);
      if (onChange) {
        onChange(e, value);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickInside = useCallback(
      (e) => {
        if (disabled) {
          return;
        }
        setClickedOutside(inputActionsRef.current.contains(e.target));
      },
      [disabled, setClickedOutside]
    );

    React.useEffect(() => {
      if (!clickedOutside && !disabled) {
        addEventListener();
        if (handleClickInside) {
          handleClickInside(inputRef);
        }
      } else {
        removeEventListener();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickedOutside, disabled, inputRef, handleClickInside]);

    useImperativeHandle(ref, () => ({
      inputField: inputRef.current,
    }));

    const contentMemo = React.useMemo(
      () => (
        <Component
          ref={inputRef}
          label={label}
          disabled={disabled}
          onClickInside={onClickInside}
          defaultValue={defaultValue}
          onChange={handleChange}
          height={height}
          required={required}
          customButtons={customButtons}
          {...rest}
        />
      ),
      [defaultValue]
    );

    const actionMemo = React.useMemo(
      () => (
        <div ref={inputActionsRef}>
         
        </div>
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ),
      [autoSave, clickedOutside, disabled, error]
    );

    return (
      <div
        ref={inputContainerRef}
        className={classes.root}
        onClick={onClickInside}
      >
        <div
          className={clsx({
            'focus-content': !clickedOutside,
            'has-error': error?.hasError,
          })}
        >
          {contentMemo}
        </div>
        {actionMemo}
      </div>
    );
  }
);

InputComponent.propTypes = {
  ref: PropTypes.any,
  onSave: PropTypes.func,
  onAbort: PropTypes.func,
  autoSave: PropTypes.bool,
  Component: PropTypes.any,
  label: PropTypes.string,
  onChange: PropTypes.func,
  handleClickInside: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.object,
  defaultValue: PropTypes.any,
  height: PropTypes.number,
  required: PropTypes.bool,
  customButtons: PropTypes.object,
};
InputComponent.defaultProps = {
  error: {
    hasError: false,
    errorMessage: '',
  },
  defaultValue: '',
  height: 200,
  required: false,
  customButtons: {},
};
const InputComponentMemo = React.memo(
  (props) => <InputComponent {...props} />,
  (prev, next) =>
    prev.defaultValue === next.defaultValue && isEqual(prev.error, next.error)
);
// InputComponentMemo.whyDidYouRender = {
//   customName: 'InputComponent'
// };
export default InputComponentMemo;
