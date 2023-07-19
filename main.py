import noaa.BuoyData as BuoyData
import schedule
import datetime
import time
from surfline.spot import Spot

# Run Collect(True) to collect data locally. Run Collect(False) to collect data remotely.
class Collect:
    def __init__(self, local: bool = True):
        self.local = local

        # The spots to collect data for. Ex. Spot(common name, spotId, camName, nearestBuoyId)
        self.spots = [
                Spot('Malibu', '5842041f4e65fad6a7708817', 'malibuclose', '46222'),
                Spot('Huntington Beach, 20th', '5842041f4e65fad6a77088ea', 'twentiethst', '46222')
                ]
        
        # The buoys to collect data for. Ex. BuoyData.BuoyData(buoyId, spotName)

    def addCrowdData(self):
        for spot in self.spots:
            spot.addCrowdData(self.local)

    # Collects data every 10 minutes for crowd. Should only run between hours of 05:00 and 8:00.
    def startCollecting(self): 
        for spot in self.spots:                             # Add Surfline data once a day for each spot. 
            spot.addSurflineData()
        
        schedule.every(10).seconds.do(self.addCrowdData)    # Add crowd data every 10 minutes.
        
        while datetime.datetime.now().hour < 20:
            schedule.run_pending()
            time.sleep(1)
            
    def run(self):
        self.startCollecting()
        schedule.every().day.at('05:00').do(self.startCollecting) # Run every day starting at 5AM. 
        
        while True: 
            schedule.run_pending()
            time.sleep(1)

if __name__ == '__main__':
    Collect().run()
