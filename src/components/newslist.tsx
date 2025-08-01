import { useContext, useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import { NotesContext } from '../NotesContext'
import {
  RichTextEditor,
} from "mui-tiptap";
import StarterKit from "@tiptap/starter-kit";

export function NewsList() {
  const [forceRender, setForceRender] = useState('')
  const navigate = useNavigate();
  const { data: notesData, deleteItem: deleteNote} = useContext(NotesContext);
  useEffect(()=>{
    setForceRender(value => `${value}_`)
  }, [notesData])

  return (
    <Container
      id="NewsList"
      sx={{
        pt: { xs: 12, sm: 16 },
        pb: { xs: 12, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Grid container spacing={2}>
      {notesData.map(({data, id}) => (
        <Grid size={{ xs: 12, sm: 6 }} key={`${forceRender}_${notesData.length}_${data.length}_${id}`} sx={{ display: "flex" }}>
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: 1,
              minWidth: "250px"
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "text.secondary" }}
              >
                <RichTextEditor content={data} extensions={[StarterKit]}/>
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",
              }}
            >
              <IconButton onClick={() => { navigate(`note/${id}`) }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => {
                deleteNote({id})
                setForceRender(value => `${value}_`)
              }}>
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          </Card>
        </Grid>
      ))}
      </Grid>
    </Container>
  );
}
