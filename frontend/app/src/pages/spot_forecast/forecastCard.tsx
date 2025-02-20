import './style/forecastCard.css'

export default function ForecastCard(props: any) {
  const ratingDict = {0: '#FF5454', 1: '#FF5454', 2:'#E7A600', 3: '#23AE00', 4: '#166D00', 5: '#4100CA', 6: '#4100CA'}
  
  function backgroundColor(val : number) {
    return ratingDict[val]
  }

  function handleClick(){
      props.handleClick(props.data.date.month, props.data.date.day, props.data.minTimestamp, props.data.maxTimestamp)
  }

  return props.isLoading ? 
    (
        <div className='forecastCard' style={{borderColor: '#D1D1D1'}}>
            
            <div className='date--container'>
              <div className='month'></div>
              <div className='day'></div>
            </div>
            
            <div className='reports'>
              <div className='report--container'>
                <div className='height--loading'>AM</div>
                <div className='time--loading'>AM</div>
              </div>
              <div className='report--container'>
                <div className='height--loading'>NOON</div>
                <div className='time--loading'>NOON</div>
              </div>
              <div className='report--container'>
                <div className='height--loading'>PM</div>
                <div className='time--loading'>PM</div>
              </div>
            </div>
        </div>
    )
   :
    (
        <div onClick={handleClick} className={props.selectedCard?.month == props.data.date.month && props.selectedCard?.day == props.data.date.day ? 'forecastCard--selected' : 'forecastCard'}>
            
            <div className='date--container'>
              <div className='month' style={props.selectedCard?.month == props.data.date.month && props.selectedCard?.day == props.data.date.day ? {color: 'black'} : {color: '#A8A6A7'}}>{props.data.date.month}</div>
              <div className='day'><strong>{props.data.date.day}</strong></div>
            </div>
            
            <div className='reports'>
              <div className='report--container'>
                <div className='height' style={{backgroundColor: backgroundColor(props.data.rating.AM)}}>{props.data.am.min} - {props.data.am.max}ft.</div>
                <div>AM</div>
              </div>
              <div className='report--container'>
                <div className='height' style={{backgroundColor: backgroundColor(props.data.rating.NOON)}}>{props.data.noon.min} - {props.data.noon.max}ft.</div>
                <div>NOON</div>
              </div>
              <div className='report--container'>
                <div className='height' style={{backgroundColor: backgroundColor(props.data.rating.PM)}}>{props.data.pm.min} - {props.data.pm.max}ft.</div>
                <div>PM</div>
              </div>
            </div>
        </div>
    )
}
