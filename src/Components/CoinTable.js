import  Typography from '@mui/material/Typography'
import  Container  from '@mui/material/Container'
import { ThemeProvider ,createTheme } from '@mui/material/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {CoinList} from "../Config/api"
import { CryptoState } from '../context/cryptoContext'
import  TextField from '@mui/material/TextField'
import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@mui/styles'
import { numberWithCommas } from './banner/Carousel'
import { fontFamily } from '@mui/system'

const CoinTable = () => {

    const [coin , setCoin]= useState([])
    const [load , setLoad]= useState(false)
    const [search , setSearch]= useState('')
    const [page , setPage]= useState(1)
    const {currency , symbol} = CryptoState()
    const navigate = useNavigate()

    const fetchCoin = async ()=>{
        setLoad(true);
        const {data} = await axios.get(CoinList(currency))
        setCoin(data)
        setLoad(false)
        
    }
    useEffect(() => {
        
        fetchCoin();
        
    } , [currency])

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            mode:"dark"
        }
    });

    const useStyle=makeStyles(()=>({
        row:{
            backgroundColor:"#16171a",
            cursor:"pointer",
            "&:hover":{
                backgroundColor:"#131111"
            },
            fontFamily:"montserrat"
        },
        pagination:{
            "& .MuiPaginationItem-root":{
                color:"gold"
            }
        }
    }))

    const classes = useStyle()

    const searchHandler = ()=>{
        return coin.filter(item => (item.name.toLowerCase().includes(search) || item.symbol.toLowerCase().includes(search) ))
    }


    
  return (
    <ThemeProvider theme={darkTheme} >
        <Container style={{textAlign:"center"}} >
            <Typography variant='h4' style={{margin:18 , fontFamily:"montserrat"}} >
                CryptoCurrency Prices By Market Cap
            </Typography>
            <TextField 
            label="Search for crypto currency .."
            variant='outlined'
            onChange={e=>setSearch(e.target.value)}
            style={{marginBottom:20 , width:"100%"}}
            />
            <TableContainer>
                {load?(
                    <LinearProgress style={{backgroundColor:"gold"}}/>
                ):(
                    <Table>
                        <TableHead style={{backgroundColor:"#eebc1d"}} >
                            <TableRow>
                                {["Coin","Price","24Change","Market Cap"].map(head=>(
                                    <TableCell style={{color:"black" , fontWeight:700 , fontFamily:"montserrat"}} key={head} align={head==="Coin"?"":"right"} >
                                        {head}
                                    </TableCell>
                                ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchHandler().slice((page-1)*10 ,(page-1)*10+10).map(row=>{
                                const profit=row.price_change_percentage_24h >0;
                                return(
                                    <TableRow onClick={()=>{navigate(`/coins/${row.id}`)}} className={classes.row} key={row.name} >
                                        <TableCell component="th" scope='row' style={{display:"flex",gap:15 }} >
                                            <img src={row?.image} alt={row?.name} height="50" style={{marginBottom:10}}/>
                                            <div style={{textTransform:"uppercase" , fontSize:22}}>
                                                <span style={{display:"flex" , flexDirection:"column"}}>{row.symbol}</span>
                                                <span style={{color:"darkgray" , fontSize:18}}>{row.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align='right'>
                                            {symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell align='right' style={{color:profit >0 ? "rgb(14 , 203 , 129)":"red" , fontWeight:500}} >
                                            {profit && "+"}{row.price_change_percentage_24h.toFixed(0)}%
                                        </TableCell>
                                        <TableCell align='right'>
                                            {symbol}{" "}{numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <Pagination
            count={(searchHandler()?.length/10).toFixed(0)}
            style={{padding:20 , width:"100%" , display:"flex" , justifyContent:"center" }}
            classes={{ul:classes.pagination}}
            onChange={( _ , value)=>{setPage(value);
                window.scroll(0,450)}}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinTable