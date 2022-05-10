import { useSelector, useDispatch } from "react-redux"
import MenuItem from "../components/MenuItem"
import { Button, Typography, Fab } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


export default function Carrello() {
    const cart = useSelector(state => state.carrello.carrello)
    const [open, setOpen] = useState(false)

    return (
        <div style={{ padding: '10px', marginTop: '30px'}}>
        <Typography variant="h4">Prenotazioni</Typography><hr />
        {
            cart.map((item, index) => {
                
                
                return (
                    <>
                        <MenuItem key={index} item={item.menu} number={item.count} hasNumber removeFromCart/>
                    </>
                )
            })
        }

        <Fab variant="extended" style={{position: 'absolute',bottom: 66,right: 16,}} color="primary" onClick={()=>{setOpen(true)}}>
        <SendIcon sx={{ mr: 1 }} />
            INVIA LA PRENOTAZIONE
        </Fab>

        <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>

          <div>
              Sei sicuro di voler mandare la prenotazione
          </div>

        </DialogContent>
        <DialogActions>
        <Button>INVIA</Button>
          <Button onClick={()=>{setOpen(false)}}>CHIUDI</Button>
        </DialogActions>
      </Dialog>
      </div>
      
    )
  }