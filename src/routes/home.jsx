import HelloWord from "../components/HelloWord";
import { useSelector, useDispatch } from "react-redux";
import { setNumber } from "../features/number";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const cardMaxWidth = 345;
const imgHeight = 140;



export default function Home(){
    const user = useSelector(state => state.login).login
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const items = [
        {
            name: 'Menu',
            image: require('../assets/menu.png'),
            alt: 'immagine del menu',
            description: 'Visualizza il menù e agginugi alimenti al tuo carrello per poi effettuare l\'ordine',
            action: () => { navigate('/menu') }
        },
        {
            name: 'Prenotazioni',
            image: require('../assets/prenotation.png'),
            alt: 'immagine delle prenotazioni',
            description: 'Visualizza tutte le tue prenotazioni facendo distinzioni tra quelle già soddisfatte e quelle ancora da soddisfare',
            action: () => { navigate('/orders') }
        },
        {
            name: 'Carrello',
            image: require('../assets/cart.png'),
            alt: 'immagine dell carrello',
            description: 'Visualizza il tuo carrello, modifica gli elementi presenti e effettua la tua prenotazione',
            action: () => { navigate('/carrello') }
        },
    ]

    return(
        <div style={{margin:'10px', marginTop:'30px'}} >
            <Typography variant="h4">Buongiorno {user.Nome}</Typography>
            <img src={require('../assets/bar_intro.png')} style={{width:'90%', maxWidth:'900px', margin:'10px'}} alt="immagine di benvenuto"/>
            <hr />
            <Typography variant="p">{user.NomeScuola}</Typography><br />
            <Typography variant="p">{user.Indirizzo}, {user.Citta}</Typography><br />
            <br />
            
            <div className="container">
                <div className="row">
                    {
                        items.map((item, index) => {
                            return (
                                <Card sx={{ maxWidth: cardMaxWidth, margin: '10px', marginLeft: 'auto', marginRight: 'auto' }} className="col-12 col-md-6 col-xl-4">
                                    <CardActionArea onClick={item.action} >
                                        <CardMedia
                                            component="img"
                                            height={imgHeight}
                                            image={item.image}
                                            alt={item.alt}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })
                    }

                </div>
            </div>
            
        </div>
    )
}