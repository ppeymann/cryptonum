import { makeStyles } from '@mui/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import React from 'react'
import { height } from '@mui/system'
import Carousel from './Carousel'
// import "./banner.css"
const useStyle = makeStyles(()=>({
    banner:{
        backgroundImage:"url(http://localhost:3000/static/media/banner2.19419d69e5001e322fee.jpg)",
    },
    bannerContainer:{
        height:400,
        display:"flex",
        flexDirection:'column',
        paddingTop:25,
        justifyContent:'space-around'
    },
    tagline:{
        display:"flex",
        flexDirection:"column",
        height:"40%",
        justifyContent:"center",
        alignItems:"center"
    }
}))

const Banner = () => {

    const classes = useStyle()


  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContainer}>
            <div className={classes.tagline}>
                <Typography variant='h2' fontFamily="montserrat" fontWeight="bold" >
                    Cryptonum
                </Typography>
                <Typography variant='subtitle2' color="darkgray" fontFamily="montserrat" textTransform="capitalize" >
                    Get All The Info Regarding Your Favorite Crypto Currency
                </Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
}

export default Banner