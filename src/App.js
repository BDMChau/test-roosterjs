import { Drawer } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/system';
import { useState } from 'react';
import './App.css';
import TblEditor from './TblEditor';

function App() {
  const [open, setOpen] = useState(false);
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <TblEditor
        name='requirement'
        label='label'
        placeholder='placeholder'
        defaultValue=''
        required
      // customButtons={{
      //   insertImage: {
      //     onClick: insertImage,
      //   },
      // }}
      // onChange={editorChange}
      />

    </ThemeProvider>
  );
}

export default App;
