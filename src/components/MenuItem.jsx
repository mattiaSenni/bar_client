import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'
import { useState } from 'react';

export default function MenuItem({ item }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(item)
  return (
    <>
      <div style={{ padding: '10px', margin: '5px', borderRadius: '5px', boxShadow: '2px 2px 10px #333' }} onClick={handleClickOpen}>
        {item['Nome']}<br />
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
                item.prodotti.map(p => {
                  return (
                    <div style={{ border: '1px solid black', borderRadius: '5px', padding: '10px', margin: '5px'}}>
                      {p.Nome}<br />
                      {p.Categoria}<br />
                      {p.Descrizione}<br />
                      Allergeni: {p.NomeAllergeni}
                    </div>
                  )
                })
              }
          </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}