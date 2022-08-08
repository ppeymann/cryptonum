import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material/styles';
import {ThemeProvider} from '@mui/material/styles'
import { CryptoState } from '../context/cryptoContext'

const useStyles = makeStyles (()=>({
    title:{
        flex:1,
        color:'gold',
        fontFamily:"Montserrat",
        fontWeight:"bold",
        cursor:"pointer"
    }
}))
const Header = () => {

    const classes = useStyles()

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            mode:"dark"
        }
    });
    
    const {currency , setCurrency}=CryptoState()


  return (
    <ThemeProvider theme={darkTheme} >
       <AppBar color='transparent' position='static' >
        <Container>
            <Toolbar>
                <Typography className={classes.title} 
                variant='h6'
                >
                    Cryptonum
                </Typography>
                <Select variant='outlined' 
                style={{width:100,height:40,marginRight:15}}
                value={currency}
                onChange={e=> setCurrency(e.target.value)}
                >
                    <MenuItem value="USD" >
                    USD
                    </MenuItem>
                    <MenuItem value="ERU" >
                    ERU
                    </MenuItem>
                </Select>
            </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header