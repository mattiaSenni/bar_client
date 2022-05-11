import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpecificOrder } from '../request';
import MenuItem from './MenuItem';

export default function PrenotationCard({ prenotation }) {
  const [detail, setDetail] = useState(null)
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.login).login
  const token = useSelector(state => state.login).token
  console.log(prenotation);

  const handleClickOpen = () => {
    if (!detail) {
      getSpecificOrder(token, user, prenotation.ID).then(res => { 
        setDetail(res.data)
        console.log('MYDATA',res.data)
      }).catch(err => { })
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <div style={{ padding: '10px', margin: '5px', marginBottom: '10px', borderRadius: '5px', boxShadow: '2px 2px 5px #cacaca', backgroundColor:'white' }} onClick={handleClickOpen}>
        {stato[prenotation.Stato]}<br />
        {prenotation['Ora_Inizio']} - {prenotation['Ora_Fine']}<br />
        €{prenotation['Saldo']} - {prenotation['Tipologia']}<br />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          
          <div>
              {detail ?
              detail.menu.map((el, i1) => {
                  console.log(el);
                return (
                  <div key={i1} style={{ border: '1px solid black', borderRadius: '5px', padding: '10px', margin: '5px' }}>
                    {el.Nome}<br />
                    {
                      el.prodotti.map((el1, index) => {
                        return (
                          <div key={index}>
                            {el1.Descrizione} - 
                            {el1.Categoria}<br />
                          </div>
                        )
                      })
                    }
                    Quantità: {el.Quantita}
                  </div>
                )
                })
                :
                null}
            
          </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CHIUDI</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
const modPagamaento = {
  1: 'cassa',
  2: 'online'
}

const stato = {
  1: 'ritirato',
  2: 'pronto',
  3: 'in elaborazione',
  4: 'cancellato'
}

