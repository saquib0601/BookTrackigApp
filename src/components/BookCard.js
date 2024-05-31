import React, { useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import BookCardDialog from './dialog/BookCardDialog'
import { useDrag, useDrop } from 'react-dnd';


   const ItemTypes = {
     CARD: 'card',
   };


export default function BookCard({img, title, author, description, id, index, moveCard}) {

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleBookCardDialog= () => {
    setOpen(true);
  }

  function handleCloseDialog () {
    setOpen(false);
  }

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (

    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
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
    </div>
  );
}
