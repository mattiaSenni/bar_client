import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pushCarrello, removeCarrello, EditCarrello } from '../features/carrello';

export default function MenuItem({ item, addToCart, removeFromCart, hasNumber, number }) {
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
    console.log('I AM PUSHING', item);
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
      <div style={{ padding: '10px', margin: '5px', marginBottom:'10px', borderRadius: '5px', boxShadow: '2px 2px 10px #333' }} onClick={handleClickOpen}>
        {hasNumber ? number.toString() + " - " : null}{item['Nome']}<br />
        €{item['Prezzo']}<br />
      </div>
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
            {
              itemState.length > 0 ?
              <>
                <IconButton onClick={minus}><RemoveIcon /></IconButton>
                {
                  itemState[0].count
                }
                <IconButton onClick={plus}><AddIcon /></IconButton>
              </>
              :null
            }
          </div>

        </DialogContent>
        <DialogActions>
          {
            addToCart ?
            <Button onClick={handleAddToCart}>AGGIUNGI AL CARRELLO</Button>:null
          }
          {
            removeFromCart ?
            <Button onClick={handleRemoveFromCart}>RIMUOVI DAL CARRELLO</Button>:null
          }
          <Button onClick={handleClose}>CHIUDI</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}