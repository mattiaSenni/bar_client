import { useSelector, useDispatch } from "react-redux"
import MenuItem from "../components/MenuItem"
import { Button, Typography, Fab } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { putPrenotazione } from "../request";
import InputLabel from '@mui/material/InputLabel';
import MenuItemMui from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Carrello() {
    const cart = useSelector(state => state.carrello.carrello)
    const [open, setOpen] = useState(false)
    const [transazione, setTransazione] = useState(4)

    const handlePutPrenotazione = ()=>{
        //now is tosta
        const obj = {
            
        }
    }
    
    const calcolaTotale = ()=>{
        const sum = cart.reduce(
            (prev, curr) => prev + curr.menu.Prezzo * curr.count, 0
        )        
        return sum
    }

    console.log('CART', cart);
    const tot = calcolaTotale()

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

        <Fab variant="extended" style={{position: 'fixed',bottom: 66,right: 16,}} color="primary" onClick={()=>{setOpen(true)}}>
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
              <form>
              <FormControl fullWidth>
                <InputLabel id="tipo-pagamento">Tipo pagamento</InputLabel>
                <Select
                    labelId="tipo-pagamento"
                    value={transazione}
                    label="Age"
                    onChange={(e)=> setTransazione(e.target.value)}
                >
                    <MenuItemMui value={1}>Visa</MenuItemMui>
                    <MenuItemMui value={2}>MasterCard</MenuItemMui>
                    <MenuItemMui value={3}>Satispay</MenuItemMui>
                    <MenuItemMui value={4}>Contanti</MenuItemMui>
                </Select>
            </FormControl>
              </form>
              <p>prezzo: €{tot}</p>
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

  const provenienza = {
    'Visa':1,
    'MasterCard':2,
    'Satispay':3,
    'Contanti':4,
  }
  const provenienzaValue = [
    'Visa',
    'MasterCard',
    'Satispay',
    'Contanti',
  ]