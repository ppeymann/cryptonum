import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import {TrendingCoins} from "../../Config/api"
import { CryptoState } from '../../context/cryptoContext'

const useStyle = makeStyles(()=>({
    CarouselItem:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        cursor:"pointer",
        textTransform:"uppercase",
        color:"white"
    }
}))
export function numberWithCommas(x) {
    return x.toString().replace((/\B(?=(\d{3})+(?!\d))/g,","));
}

const Carousel = () => {
    const classes = useStyle()

    const {currency , symbol} = CryptoState()
    const [data , setData] = useState([])

    const fetchTrendingCoins = async ()=>{
        const trend = await axios.get(TrendingCoins(currency))
        setData(trend.data)
        
    }
    useEffect(()=>{
        fetchTrendingCoins()
    } , [currency])

    const responsive = {
        0:{
            items:2,
        },
        512:{
            items:4
        }
    }

    
    const item = data.map(coin => {
        let profit=coin.price_change_percentage_24h >=0
        return (<Link to={`/coins/${coin.id}`} className={classes.CarouselItem}>
            <img src={coin.image} alt={coin.title} height="80" style={{marginBottom:10}} />
            <span>
            {coin?.symbol}
            &nbsp;
            <span style={{color: profit>0 ? "rgb(14 , 203 , 12)":"red" , fontWeight:500}}>{profit && "+" } {coin?.price_change_percentage_24h?.toFixed(2)}%</span>
            </span>
            <span style={{fontSize:22 , fontWeight:500}}> {symbol} {numberWithCommas(coin?.current_price.toFixed(2))} </span>

        </Link>)
})

  return (
    <div className={classes.Carousel}>
        <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        autoPlay
        responsive={responsive}
        items={item}
        />
    </div>
  )
}

export default Carousel