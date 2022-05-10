import { useState, useEffect } from "react"
import { getMenu } from "../request"
import { useSelector, useDispatch } from "react-redux"
import { Typography, Skeleton, Alert } from "@mui/material"
import MenuItem from "../components/MenuItem"

export default function Menu() {
  const [menu, setMenu] = useState(null)
  const [error, setError] = useState(false)
  const user = useSelector(state => state.login).login
  const token = useSelector(state => state.login).token

  //ask getMenu in useEffect just with componentDidMount
  useEffect(() => {
    getMenu(token, user['IDBar']).then(res => {
      setMenu(res.data)
      setError(false)
    }).catch(err => {
      setError(true)
    })
  }, [])

  return (
    <div style={{padding:'10px', marginTop:'30px'}}>
      <Typography variant="h4">Menu</Typography>
      <hr />
      {
        error ?
          <Alert severity="error">Errore nel recupero dei menu</Alert>
          :
          null
      }
      {
        menu ?
          menu.map((item, index) => { 
            return (
              <MenuItem key={index} item={item} addToCart/>
            )
          })
          :
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