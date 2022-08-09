import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/system'
import axios from 'axios'
import {makeStyles} from "@material-ui/core/styles"
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../Config/api'
import { CryptoState } from '../context/cryptoContext'
import { CircularProgress } from '@mui/material'
import { Line } from 'react-chartjs-2'
import { chartDays } from "../Config/data"
import SelectButton from "./SelectButton"
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';

const CoinInfo = ({coin}) => {

    const [historicalData , setHistoricalData ] = useState([])
    const [days , setDays] = useState(1)
    const [flag,setflag] = useState(false);
    const {currency} = CryptoState()

    const fetchDays = async ()=>{
        const {data} = await axios.get(HistoricalChart(coin.id ,days , currency))
        setflag(true)
        setHistoricalData(data.prices)
        
        
    }
    Chart.register(
        ArcElement,
        LineElement,
        BarElement,
        PointElement,
        BarController,
        BubbleController,
        DoughnutController,
        LineController,
        PieController,
        PolarAreaController,
        RadarController,
        ScatterController,
        CategoryScale,
        LinearScale,
        LogarithmicScale,
        RadialLinearScale,
        TimeScale,
        TimeSeriesScale,
        Decimation,
        Filler,
        Legend,
        Title,
        Tooltip,
        SubTitle
      )
    
    
    useEffect(()=>{
        fetchDays()
    },[currency , days])

    console.log( "data" ,historicalData)

    const darkTheme = createTheme({
        palette:{
            primary:{
                main:"#fff",
            },
            mode:"dark"
        }
    });

    const useStyle = makeStyles((theme)=>({
        container:{
            width:"75%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            marginTop:25,
            padding:40,
            [theme.breakpoints.down("md")]:{
                width:"100%",
                marginTop:0,
                padding:20,
                paddingTop:0
            }
        }
    }))
    const classes = useStyle()
  return (
    <ThemeProvider theme={darkTheme} >
        <div className={classes.container}>
        {!historicalData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ):(
            <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
            )
            }
        </div>

    </ThemeProvider>
  )
}

export default CoinInfo