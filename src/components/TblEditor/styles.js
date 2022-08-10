const styles = (theme) => ({
  root: {
    '&:focus': {
      '& .editor-container': {
        border: '1px solid red'
      }
    },
    '& td': {
      wordBreak: 'break-word'
    }
  },
  editorContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: '1px solid ',
    borderRadius: '8px',
    borderColor: 'gray',
    paddingBottom: 8,
    color: 'black',
    height:'300px'
  },

  noGrow: {
    flex: '0 0 auto'
  },
  body: {
    flex: '1 1 auto',
    position: 'relative',
    display: 'flex',
    background: 'white',
    borderRadius: '8px'
  },
  editor: (props) => ({
    minWidth: 200,
    flexGrow: 1,
    flexShrink: 1,
    position: 'relative',
    height: 'auto !important',
    overflow: 'visible',
    minHeight: props.height || '200px',
    fontSize: '18px',
    maxHeight: 'calc(50vh)',
    padding: '10px',
    '& #_rooster_watermarkSpan': {
      fontSize: `16px !important`,
      color: `gray !important`
    },
    '& h1': {
      lineHeight: '18px'
    },
    '& h2': {
      lineHeight: '18px'
    }
  })
});
export default styles;