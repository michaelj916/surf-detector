import TideChart from "./tideChart"
import InfoBox from "../../components/infoBox"
import './style/tideForecast.css'
import { useState } from 'react'
import convertTime from "../../utils/convertTime"

export default function TideForecast(props: any) {
    const [time, setTime] = useState(0)
    const [tide, setTide] = useState(0)
    
    function changeTime(t) {
        setTime(t)
    }

    function changeTide(t) {
        if (t) {
            let num = parseFloat(t);
            let roundedNum = num.toFixed(2); // Convert to string with 2 decimal places
    
            // Ensure there are always two digits after the decimal point
            let formattedNum = roundedNum.includes('.') ? roundedNum : roundedNum + '.00';
    
            setTide(parseFloat(formattedNum));
        }
    }
    
    

    return (
        <div className='tide--forecast'>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#A8A6A7'}}>Tide</div>
            <div className='info'>
                <InfoBox title={convertTime(time)} content={<div> {tide} feet</div>}/>
            </div>
          {props.spot && props.minTimestamp && props.maxTimestamp && props.data && props.spot ?
                <TideChart spot={props.spot} changeTide={changeTide} minTimestamp={props.minTimestamp} maxTimestamp={props.maxTimestamp} data={props.data} changeTime={changeTime}/> :
                <p>loading</p>
        }
      </div>
    )
}