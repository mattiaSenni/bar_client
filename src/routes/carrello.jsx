import { useSelector, useDispatch } from "react-redux"
import MenuItem from "../components/MenuItem"
import { Button, Typography, Fab, Snackbar } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { putPrenotazione, getFasciaOraria } from "../request";
import InputLabel from '@mui/material/InputLabel';
import MenuItemMui from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { deleteCarrello } from '../features/carrello'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import React from "react";

export default function Carrello() {
  const cart = useSelector(state => state.carrello.carrello)
  const login = useSelector(state => state.login) 
  const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [transazione, setTransazione] = useState(4)
    const [fasciaOraria, setFasciaOraria] = useState(null)
  const [fasciaOrariaSelected, setFasciaOrariaSelected] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false)
  
  
  if (!fasciaOraria) {
    getFasciaOraria(login.token, login.login.IDBar).then(res => {
      
      setFasciaOraria(res.data)
    })
  }

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
  
  const handleSetPrenotation = async() => {
    const data = {
      "transazione": {
        'idProvenienza': transazione,
        'saldo': tot
      },
      'idUtente': login.login.ID,
      'modalitaPagamento': transazione == 4 ? 1 : 2,
      'idFasciaOraria': fasciaOrariaSelected,
      'menu': [
        ...cart.map(item => {
          return {
            'idMenu': item.menu.ID,
            'quantita': item.count
          }
        })
      ]
    }


    dispatch(deleteCarrello())
    setOpen(false)
    putPrenotazione(login.token, login.login.ID, JSON.stringify(data)).then(res => { 
      setSnackbarOpen(true)
    }).catch(err => {
      setSnackbarErrorOpen(true)
    })

  }

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
                    label="Tipo pagamento"
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
              {
                fasciaOraria ?
                  <FormControl fullWidth>
                    <InputLabel id="fasciaOraria">Fascia Oraria</InputLabel>
                    <Select
                      labelId="fasciaOraria"
                      value={fasciaOrariaSelected}
                      label="Tipo pagamento"
                      onChange={(e) => setFasciaOrariaSelected(e.target.value)}
                    >
                      {
                        fasciaOraria.map((item, index) => { 
                          return (
                            <MenuItemMui value={item.ID}>{item['Ora_Inizio']} - {item['Ora_Fine']}</MenuItemMui>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                  :<p>Attendere il caricamento delle fascie orarie</p>
              }
          </div>

        </DialogContent>
        <DialogActions>
        <Button variant="contained" onClick={handleSetPrenotation}>INVIA</Button>
          <Button onClick={()=>{setOpen(false)}}>CHIUDI</Button>
        </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={()=>{setSnackbarOpen(false)}}
          message="Prenotazione inviata con successo"
          action={<IconButton size="small" aria-label="close" color="inherit" onClick={()=>{setSnackbarOpen(false)}}><CloseIcon fontSize="small" /></IconButton>}
        />
        <Snackbar
          open={snackbarErrorOpen}
          autoHideDuration={6000}
          onClose={() => { setSnackbarErrorOpen(false) }}
          message="ERRORE INVIO PRENOTAZIONE"
          action={<IconButton size="small" aria-label="close" color="inherit" onClick={() => { setSnackbarErrorOpen(false) }}><CloseIcon fontSize="small" /></IconButton>}
        />
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