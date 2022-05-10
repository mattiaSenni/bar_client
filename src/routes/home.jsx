import HelloWord from "../components/HelloWord";
import { useSelector, useDispatch } from "react-redux";
import { setNumber } from "../features/number";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const user = useSelector(state => state.login).login
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(user)

    return(
        <div style={{padding:'10px', marginTop:'30px'}}>
            <Typography variant="h4">Buongiorno {user.Nome}</Typography>
            <hr />
            <Typography variant="p">{user.NomeScuola}</Typography><br />
            <Typography variant="p">{user.Indirizzo}, {user.Citta}</Typography><br />
            <br />
            <Button onClick={() => { navigate('/menu') }}>Visualizza il menù</Button><br />
            <Button onClick={() => { navigate('/orders') }}>Tutte le prenotazioni</Button><br />
            <Button onClick={() => { navigate('/carrello') }}>Il tuo carrello</Button>
            
        </div>
    )
}