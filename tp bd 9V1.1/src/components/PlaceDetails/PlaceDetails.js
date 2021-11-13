import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={place.Logo}
        title={place.Nombre}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{place.Nombre}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Precio:</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.Menu.Precio} $
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="h5">Menu:</Typography>
        </Box>
        {
          place.Menu?.comidas.map((i) => (
            <Box display="flex" justifyContent="space-between" key={i.id}>
              <Typography gutterBottom variant="subtitle1">
                {i.Categoria} : {i.Nombre}
              </Typography>
            </Box>
          ))
        }
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Abierto desde:</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.Año_de_apertura}
          </Typography>
        </Box>
        {place?.Reseñas?.map((i) => (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center" key={i.id}>
            <img
              style={{ width: '50px', height: '50px' }}
              src={
              i.Voto_Positivo ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Facebook_Thumb_icon.svg/1200px-Facebook_Thumb_icon.svg.png' : 'https://www.incubaweb.com/wp-content/uploads/2015/09/Not_facebook_not_like_thumbs_down.png'
            }
            />
            <Typography variant="subtitle1">{i.Nombre_de_Usuario} : {i.Descripcion}</Typography>
            <Rating name="read-only" size="small" value={Number(i.Valoracion)} readOnly />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
