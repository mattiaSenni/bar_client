import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushCarrello, removeCarrello, EditCarrello } from '../features/carrello';

export default function MenuItem({ item, hasNumber, number, notShowCost}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const itemState = useSelector(state => state.carrello.carrello).filter(i => i.menu.ID == item.ID)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart= ()=>{
    dispatch(pushCarrello(item))
    setOpen(false)
  }
  const handleRemoveFromCart= ()=>{
    dispatch(removeCarrello(item.ID))
    setOpen(false)
  }
  const minus = ()=>{
    let toEdit = {...itemState[0]}
    toEdit.count--;
    if(toEdit.count == 0){
      return;
    }
    dispatch(EditCarrello(toEdit))
  }
  const plus = ()=>{
    let toEdit = {...itemState[0]}
    toEdit.count++;
    console.log("EDITING",toEdit);
    dispatch(EditCarrello(toEdit))
  }

  return (
    <>
      {/* <div style={{ padding: '10px', margin: '5px', marginBottom:'10px', borderRadius: '5px', boxShadow: '2px 2px 10px #333' }} onClick={handleClickOpen}>
        
      </div> */}
      <Card sx={{ maxWidth: 500, margin: '10px', marginLeft: 'auto', marginRight: 'auto' }} className="col-12 col-md-6 col-xl-4">
        <CardMedia
          component="img"
          height="200"
          image={item.Immagine}
          alt={"Immagine del menù" + item.Nome}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item['Nome']}
          </Typography>
          {hasNumber ? "Quantità: " + number.toString() : null}<br />
          {
            !notShowCost
              ? <>€{item['Prezzo']}<br /> </>
              :null
          }
        </CardContent>
        <CardActions>
          {
            !(itemState.length > 0) ?
              <Button size="small" variant='outlined' onClick={handleAddToCart} >AGGIUNGI AL CARRELLO</Button>
              :
              <Button size="small" variant='outlined' onClick={handleRemoveFromCart} >RIMUOVI DAL CARRELLO</Button>
          }
          <Button size="small" onClick={handleClickOpen}>Più informazioni</Button>
          {
            itemState.length > 0 ?
              <>
                <IconButton onClick={minus}><RemoveIcon /></IconButton>
                {
                  <p style={{textAlign:'center'}}>{itemState[0].count}</p>
                }
                <IconButton onClick={plus}><AddIcon /></IconButton>
              </>
              : null
          }
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>

          <div>
              {
                item.prodotti.map((p, index) => {
                  return (
                    <div key={index} style={{ border: '1px solid black', borderRadius: '5px', padding: '10px', margin: '5px'}}>
                      {p.Nome}<br />
                      {p.Categoria}<br />
                      {p.Descrizione}<br />
                      Allergeni: {p.NomeAllergeni}
                    </div>
                  )
                })
              }
          </div>
          <hr />
          <div>
            
          </div>

        </DialogContent>
        <DialogActions>          
          {
            !(itemState.length > 0) ?
              <Button onClick={handleAddToCart}>AGGIUNGI AL CARRELLO</Button>
              :
              <Button onClick={handleRemoveFromCart}>RIMUOVI DAL CARRELLO</Button>
          }
          <Button onClick={handleClose}>CHIUDI</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}