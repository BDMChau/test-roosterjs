import React from 'react';

import withStyles from '@mui/styles/withStyles';


import PropTypes from 'prop-types';
import { getAllFeatures } from 'roosterjs-editor-plugins';

import Editor from './Editor';
import PluginManage from './plugins/plugins';
import Ribbon from './plugins/ribbon/Ribbon';
import styles from './styles';
import InputComponent from './utils/InputComponent';

export const UrlPlaceholder = '$url$';
class RoosterEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: true
    };
    this.timeoutId = null;
    this.isFocus = false;
    this.editorRef = React.createRef();
    this.pluginManage = null;
    this.initialState = {
      pluginList: {
        hyperlink: true,
        paste: true,
        contentEdit: true,
        watermark: true,
        ImageEdit: true,
        tableResize: true,
        customReplace: true,
        pickerPlugin: true,
      },
      contentEditFeatures: getAllFeatures(),
      defaultFormat: {},
      linkTitle: `Ctrl+Click to follow the link:${UrlPlaceholder}`,
      watermarkText: 'Type content here ...',
      showRibbon: true,
      useExperimentFeatures: true
    };
    // this.initPlugins();
  }

  componentDidMount() {
    console.log(this.props)
  }

  initPlugins() {
    if (this.pluginManage) {
      this.pluginManage.dispose();
      this.pluginManage = null;
    }
    this.pluginManage = new PluginManage();
  }

  onBlur = () => {
    // if not provide onBlur() >> Formik will create its own (Formik will automagically inject  onBlur)
    this.timeoutId = setTimeout(() => {
      this.isFocus = false;
      if (this.props.onBlur) {
        this.props.onBlur();
      }
    });
  };

  onFocus = () => {
    clearTimeout(this.timeoutId);

    if (!this.isFocus) {
      this.isFocus = true;
      if (this.props.onFocus) {
        this.props.onFocus();
      }
    }
  };

  getEditor = () => this.editorRef.current.editor;

  getContent = () => this.editorRef.current.getContent();

  resetEditorPlugin = (pluginState) => {
    this.editorRef.current.resetEditorPlugin(pluginState);
  };

  updateFormatState = () => {
    this.pluginArray.getPlugins().formatState.updateFormatState();
  };

  render() {
    this.initPlugins();
    const { classes, label, className, required, disabled, placeholder, ...rest } = this.props;
    const plugins = this.pluginManage?.getPlugins() ?? {};
    const pluginArray = this.pluginManage?.getAllPluginArray() ?? [];
    if (placeholder) {
      this.initialState.watermarkText = placeholder;
    }
    return (
      <div>
        {label && <div className={'input-label'}>
          {label}
        </div>}
        <div className={`${classes.editorContainer} ${className} editor-container input-container`}>
          <div style={{ width: '100%' }}>
            <Ribbon
              plugin={plugins.ribbon}
              className={classes.noGrow}
              ref={plugins?.ribbon?.refCallback}
              disabled={disabled}
              {...rest}
            />
            <div className={`${classes.body}`}>
              <Editor
                plugins={pluginArray}
                className={classes.editor}
                ref={this.editorRef}
                initState={this.initialState}
                placeholder={'placeholder'}
                disabled={disabled}
                {...rest}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}
RoosterEditor.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

const EditorInput = React.forwardRef((props, ref) => {
  const { ...rest } = props;
  console.log({ ...rest })
  return (
    <RoosterEditor
    {...rest}
    />
    // <InputComponent
    //   autoSave={autoSave}
    //   Component={RoosterEditor}
    //   handleClickInside={(inputRef) => {
    //     const editor = inputRef.current.getEditor();
    //     if (editor) {
    //       editor.focus();
    //     }
    //     if (handleClickInside) {
    //       handleClickInside(inputRef);
    //     }
    //   }}
    //   onChange={(_e, inputRef) => {
    //     const content = inputRef?.current?.getContent ? inputRef.current.getContent() : '';
    //     if (onChange) {
    //       onChange(content);
    //     }
    //   }}
    //   {...rest} ref={ref} />
  )
});
EditorInput.propTypes = {
  autoSave: PropTypes.bool,
  handleClickInside: PropTypes.func,
  onChange: PropTypes.func
};
export default withStyles(styles)(EditorInput);
