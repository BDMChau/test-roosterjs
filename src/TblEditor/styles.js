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
    paddingBottom: 8,
  },

  noGrow: {
    flex: '0 0 auto'
  },
  body: {
    flex: '1 1 auto',
    position: 'relative',
    display: 'flex',
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
    maxHeight: 'calc(50vh)',
   
  })
});
export default styles;