import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BookCardDialog from './dialog/BookCardDialog'

export default function BookCard({img, title, author, description}) {

  const [open, setOpen] = useState(false);

  const handleBookCardDialog= () => {
    setOpen(true);
  }

  function handleCloseDialog () {
    setOpen(false);
  }

  return (

    <Card sx={{ maxWidth: 345 }}>
      {open && <BookCardDialog description={description} img={img} author={author} title={title}  open={open} handleClose={handleCloseDialog}/>}
      <CardActionArea onClick={handleBookCardDialog}>
        <CardMedia
          component="img"
          height="100"
          image={img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {author.map((i) => i )}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
