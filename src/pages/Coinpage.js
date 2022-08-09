import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import {CryptoState} from "../context/cryptoContext"
import {SingleCoin} from "../Config/api"
import axios from 'axios'
import CoinInfo from '../Components/CoinInfo'
import { LinearProgress, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'



const Coinpage = () => {
  const {id} = useParams()
  const [coin , setCoin]=useState()
  const {currency , symbol} = CryptoState()
  const fetchCoin = async ()=>{
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data)
  }
  useEffect(()=>{
    fetchCoin()
  },[])

  const useStyle = makeStyles((theme)=>({
    container:{
      display:"flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
      sidebar:{
        width:"30%",
        [theme.breakpoints.down("md")]:{
          width:"100%",
        },
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        marginTop:25,
        borderRight: "2px solid grey"
        
      },
      marketData:{
        alignSelf:"start",
        padding:25,paddingTop:10,
        [theme.breakpoints.down("md")]:{
          display:"flex",
          justifyContent:"space-around"
        },
        [theme.breakpoints.down("sm")]:{
          flexDirection:"column",
          alignItems:"center"
        },
        [theme.breakpoints.down("xs")]:{
          alignItems:"start"
        }
      }
    
  }))
  const classes = useStyle()

  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>

  return (
    <div className={classes.container} >
      <div className={classes.sidebar}>
        <img src={coin?.image.large}  height="200" style={{marginBottom:20}} />
        <Typography variant='h3' className={classes.heading} style={{fontWeight:"bold",marginBottom:20 , fontFamily:"montserrat"}}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' style={{width:"100%" , fontFamily:"montserrat" , padding:25 , paddingBottom:15,paddingTop:0 , textAlign:"justify" }}>
          {(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{display:"flex"}}>
            <Typography className={classes.heading} variant="h5" style={{fontWeight:"bold",marginBottom:20 , fontFamily:"montserrat"}} >
              Rank :
              &nbsp;
              &nbsp;
            </Typography>
            <Typography variant='h5' style={{fontFamily:"montserrat"}}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography className={classes.heading} variant="h5" style={{fontWeight:"bold",marginBottom:20 , fontFamily:"montserrat"}} >
            Current Price :
              &nbsp;
              &nbsp;
            </Typography>
            <Typography variant='h5' style={{fontFamily:"montserrat"}}>
              {symbol}{" "}{(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography className={classes.heading} variant="h5" style={{fontWeight:"bold",marginBottom:20 , fontFamily:"montserrat"}} >
               Market Cap :
              &nbsp;
              &nbsp;
            </Typography>
            <Typography variant='h5' style={{fontFamily:"montserrat"}}>
            {symbol}{" "}{(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}

export default Coinpage