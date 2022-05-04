import { useState, useEffect } from "react"
import { getOrders } from "../request"
import { useSelector, useDispatch } from "react-redux"
import { Typography, Skeleton, Alert } from "@mui/material"
import MenuItem from "../components/MenuItem"
import PrenotationCard from "../components/PrenotationCard"

export default function Orders() {
  const [orders, setOrders] = useState(null)
  const [error, setError] = useState(false)
  const user = useSelector(state => state.login).login
  const token = useSelector(state => state.login).token

  //ask getMenu in useEffect just with componentDidMount
  useEffect(() => {
    getOrders(token, user['ID']).then(res => {
      setOrders(res.data)
      setError(false)
    }).catch(err => {
      setError(true)
    })
  }, [])

  return (
    <div style={{ padding: '10px', marginTop: '30px' }}>
      <Typography variant="h4">Prenotazioni</Typography>
      <hr />
      {
        error ?
          <Alert severity ="error">Errore nel recupero delle prenotazioni</Alert>
          :
          null
      }
      
      {
        orders ?
          orders.map((item, index) => { 
            return (
              <PrenotationCard key={index} prenotation={item} />
            )
          }) :
          <>
            <Skeleton variant="rect" width={300} height={300} />
            <Skeleton variant="rect" width={300} height={300} />
            <Skeleton variant="rect" width={300} height={300} />
            <Skeleton variant="rect" width={300} height={300} />
            <Skeleton variant="rect" width={300} height={300} />
            <Skeleton variant="rect" width={300} height={300} />
            <Skeleton variant="rect" width={300} height={300} />
            <Skeleton variant="rect" width={300} height={300} />
            <Skeleton variant="rect" width={300} height={300} />
            <Skeleton variant="rect" width={300} height={300} />
          </>
      }
    </div>
  )
}