import * as React from 'react';
import { useContext, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useNavigate } from "react-router";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { NotesContext } from '../NotesContext'
import { useParams } from "react-router";

export const EditDialog : React.FC<React.PropsWithChildren<{fullScreen?: boolean}>> =  ({fullScreen: fullScreenProp}) => {
  const [noteValue, setNoteValue] = React.useState('')
  const rteRef = React.useRef<RichTextEditorRef>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));  
  const navigate = useNavigate();
  const { data: noteData, setItem: addNote } = useContext(NotesContext);
  const { noteId } = useParams();

  useEffect(()=>{
    const noteValue = noteData.find(({id: sourceId}) =>  sourceId == noteId)?.data
    setNoteValue(noteValue ?? '')
  }, [noteId])

  return (
    <Dialog open={true}  maxWidth='lg' fullScreen={fullScreen || fullScreenProp}>
      <DialogContent>

        <RichTextEditor
          ref={rteRef}
          extensions={[StarterKit]} // Or any Tiptap extensions you wish!
          content={noteValue} // Initial content for the editor
          // Optionally include `renderControls` for a menu-bar atop the editor:
          renderControls={() => (
            <MenuControlsContainer>
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
              {/* Add more controls of your choosing here */}
            </MenuControlsContainer>
          )}
        />        


      </DialogContent>
      <List sx={{ pt: 0 }}>
        <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={() => { 
              const noteText = rteRef.current?.editor?.getHTML() ?? "";
              addNote({id: noteId === 'new' ? null : noteId , data: noteText})
              navigate('/SEOTLT');
            }}
          >
            <DoneIcon />
            <ListItemText primary="Сохранить и выйти" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>

          <ListItemButton
            autoFocus
            onClick={() => { navigate('/SEOTLT') }}
          >
            <CloseIcon />
            <ListItemText primary="Выйти без сохранения" />
          </ListItemButton>
        </ListItem>        
      </List>
    </Dialog>
  );
}