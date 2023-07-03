import requests
import json

def getWeatherData(location):
    url = "http://api.weatherapi.com/v1/current.json?key=cce1d4f16c4d4a5a9fd05549230307&q=huntington-beach&aqi=no"
    response = requests.get(url)
    
    if response.status_code == 200:
        
        # Process the response data

        data = response.content
        data = json.loads(data)
        
        # Add to the return dictionary
        returnDict = {}
        returnDict['time'] = data['location']['localtime']
        returnDict['temp'] = data['current']['temp_f']
        returnDict['wind'] = data['current']['wind_mph']
        returnDict['windDir'] = data['current']['wind_dir']
        returnDict['precip'] = data['current']['precip_in']
        returnDict['currCloud'] = data['current']['cloud']
        
        return returnDict
    
    else:
        # Return an error message
        print('Error: Failed to retrieve data from the Weather API.', status=response.status_code)
