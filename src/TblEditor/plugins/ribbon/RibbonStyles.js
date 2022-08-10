const styles = (theme) => ({
  ribbon: {
    // height: 38,
    whiteSpace: 'nowrap',
    display: 'flex',
  },
  line: {
    height: '20px',
  },
  textButton: {
    marginLeft: 'auto'
  },
  dropDownButton: {
    position: 'relative',
    overflow: 'visible',
  },
  dropDownButtonDisabled: {
    opacity: '0.4'
  },
  dropDown: {
    zIndex: 1,
    minWidth: 180,
    display: 'inline-block',
    backgroundColor: 'white',
    position: 'absolute',
    top: 32,
    left: 0,
    border: '1px solid #E9ECEF',
    boxSizing: 'border-box',
    boxShadow: '0px 8px 32px rgba(33, 37, 41, 0.16)',
  },
  dropDownItem: {
    cursor: 'pointer',
    padding: 2,
    whiteSpace: 'nowrap',
    minWidth: 60,
    '&:hover': {
      backgroundColor: '#aaf6ff',
    }
  }
});
export default styles;