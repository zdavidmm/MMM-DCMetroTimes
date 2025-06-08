# Module: DC Metro Times
This is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror) project, forked from [AdamMoses-GitHub MMM-DCMetroTrainTimes](https://github.com/AdamMoses-GitHub/MMM-DCMetroTrainTimes).

> The `MMM-DCMetroTrainTimes` module is a module designed to display the train arrival times as stations along the Washington Metropolitan Area Transit Authority metro system, aka the Washington DC metro system. It is configurable based on the stations to get arrival times for, destinations to exclude, coloring line codes visually, and other options.

> It also will show any incidents reported by WMATA on the rail lines by listing which color lines are currently affected, i.e. Orange, Blue, Silver, etc.

In addition, I have added WMATA real-time bus predictions, which are configurable in ways similar to the trains.

Example:

![Full](images/example1.jpg) ![Full](images/example2.jpg) ![Full](images/example3.png)

## Dependencies / Requirements

This module requires access to a WMATA Developers API key. For more information on acquiring this please visit <https://developer.wmata.com/>.

### Trains

You will need to configure the metro stations of interest to you by using the station code which are listed in the seperate [./stationcodes/stationcodes.md](./stationcodes/stationcodes.md).

NOTE: The [./stationcodes/stationcodes.json](./stationcodes/stationcodes.json) file is actually used by the module so calls are not made to get it each time the module runs since the station codes and other information are rarely changed. If a problem occurs involving the codes you can run the [./stationcodes/getStationCodes.js](./stationcodes/getStationCodes.js) to update them.

### Buses

You will need to configure the bus stops of interest to you by using the Stop ID, which can be searched [here](https://www.wmata.com/schedules/service-nearby/).

If you desire to exclude any route from the stop, include it in the `routesToExcludeList` configurable, detailed below.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-DCMetroTimes',
		position: 'bottom_right',
		config: {
		// general
		// visit the url below for the wmata api key
		// https://developer.wmata.com/
			wmata_api_key: 'FILL IN',
		// trains
		// use the station codes file ./stationcodes/stationcodes.md for
		// more on these values
			stationsToShowList: [ 'C04', 'A04', 'D03' ],
		// buses
		// visit the url below to find the Stop ID
		// https://www.wmata.com/schedules/service-nearby/
			showBusStopTimes: true, // hide bus times by default
			stopsToShowList: [ '1001451' ] // Stop IDs as strings
		}
	}	
]
````

## Configuration options

The following properties can be configured:

### General 

| Option | Description |
| --- | --- |
| `wmata_api_key` | Used by the module to make calls to the WMATA JSON REST API.<br>For more visit https://developer.wmata.com/.<br>This value is **REQUIRED** |
| `showHeader` | Toggles the header title on or off.<br>**Example:** false<br>**Default value:** true<br>This value is **OPTIONAL** |
| `headerText` | The text to display in the header title.<br>**Example:** "WMATA Train Arrival Times"<br>**Default value:** "DC Metro Times"<br>This value is **OPTIONAL** |

### Trains

| Option | Description |
| --- | --- |
| `stationsToShowList` | Contains a JSON array of strings indicating WMATA Metro Station Code values. These are the stations you want to see train arrival times for. A table of these values can be found at ./stationcodes/stationcodes.md.<br><br>**Example:** `[ 'C04', 'A04', 'D03' ]`<br>**Default value:** `[ 'A01', 'C01' ]`<br>This value is **OPTIONAL, BUT EFFECTIVELY REQUIRED** |
| `showIncidents` | Toggle to turn on or off the incidents listing which will be shown before the train arrival times. Default is on.<br><br>**Example:** false<br>**Default value:** true<br>This value is **OPTIONAL**
| `showStationTrainTimes` | Toggle to turn on or off the station train arrival times listing which is shown after the incidents listing. Default is on.<br><br>**Example:** false<br>**Default value:** true<br>This value is **OPTIONAL** |
| `destinationsToExcludeList` | Contains a JSON array of strings indicating WMATA Metro Station Code values. The station codes listed here will be hidden from any list of train arrivals for any of the stationsToShowList. This is useful if you live near the end of a line and aren't interested in taking trains towards your end. If left empty no destination stations will be excluded.<br><br>**Example:** [ 'N06', 'D13' ]<br>**Default value:** [ ]<br>This value is **OPTIONAL** |
| `showDestinationFullName` | Toggle to turn on or off full destination station names. Otherwise it will be an abbreviated destination station name. Default is on (full station name).<br><br>**Example:** false<br>**Default value:** true<br>This value is **OPTIONAL** |
| `refreshRateIncidents` | Specified in **MILLISECONDS**, sets the rate at which updates will be made to the metro incidents list. This value defaults to every two minutes. Note setting this value to low, i.e. fast, can use up a lot of alloted daily API calls so don't abuse this value. Also, incidents aren't updated nearly as often as train arrival times.<br><br>**Example:** 6 * 60 * 1000<br>**Default value:** 2 * 60 * 1000<br>This value is **OPTIONAL** |
| `refreshRateStationTrainTimes` | Specified in **MILLISECONDS**, sets the rate at which updates will be made to the station train arrival times list. This value defaults to every thirty seconds. Note setting this value to low, i.e. fast, can use up a lot of alloted daily API calls so don't abuse this value.<br><br>**Example:** 1 * 60 * 1000<br>**Default value:** 30 * 1000<br>This value is **OPTIONAL** |
| `maxTrainTimesPerStation` | The maximum number of train times to show per station, i.e. if you set this to 2 you would only ever get the 2 next train times for a given station. This defaults to zero which means show all the train times.<br><br>**Example:** 3<br>**Default value:** 0<br>This value is **OPTIONAL** |
| `limitWidth` | The width of cell containing the incident list, usually the widest cell. It effectively limits the total width of this module. Usually specified in pixels but can specified in any HTML width style. Specified as a string.<br><br>**Example:** "350px"<br>**Default value:** "200px"<br>This value is **OPTIONAL** |
| `colorizeLines` | Toggle this to enable colorizing any train line code or name by its color, i.e. the Orange Line 'OR' will be colored orange, the Blue Line 'BL' will be colored blue, etc. When enabled a small colored circle appears before each line abbreviation showing the line color. Defaults to off to fit with the usual Magic Mirror look.<br><br>**Example:** true<br>**Default value:** false<br>This value is **OPTIONAL** |
| `incidentCodesOnly` | Toggle to change from the full text of the lines with incidents to just showing line codes, i.e. "Incident Reported On The Orange Line" as opposed to just showing "OR". Turned off by default to do a full-text listing of lines with incidents on them.<br><br>**Example:** true<br>**Default value:** false<br>This value is **OPTIONAL** |
| `hideTrainTimesLessThan` | Will exclude listing trains that are arriving in time less than the specified amount in **MINUTES**. This is useful if, for instance, it took you 4 minutes to walk to your station, so showing trains arriving in less than 4 minutes would be useful. This defaults to 0 which disables it.<br><br>**Example:** 4<br>**Default value:** 0<br>This value is **OPTIONAL** |

### Buses

| Option | Description |
| --- | --- |
| `showBusStopTimes` | Toggle to turn on or off the bus arrival times listing.  Default is off.<br><br>**Example:** true<br>**Default value:** false<br>This value is **OPTIONAL** |
| `stopsToShowList` | Contains a JSON array of strings indicating WMATA Stop ID values. These are the bus stops you want to see bus arrival times for. These values can be searched [here](https://www.wmata.com/schedules/service-nearby/).<br><br>**Example:** [ '1001451', '1001399', '1000826' ]<br>**Default value:** ['1001451']<br>This value is **OPTIONAL, BUT EFFECTIVELY REQUIRED** |
| `routesToExcludeList` | Contains an array of array of strings indicating WMATA Route ID values. The Route IDs listed here will be hidden from any list of bus arrivals for any of the `stopsToShowList`. This is useful if you live near the end of a line and aren't interested in taking buses towards your end. If left empty no routes will be excluded.<br><br>**Example:** [ [ ], [ '42', 'N4' ], ['96'] ]<br>**Default value:** [ ]<br>This value is **OPTIONAL** |
| `directionText` | Toggle to turn on or off the description of direction and destination for a bus text which will be shown between the Route ID and arrival time. Default is on.<br><br>**Example:** false<br>**Default value:** true<br>This value is **OPTIONAL** |
| `hideBusTimesLessThan` | Will exclude listing buses that are arriving in time less than the specified amount in **MINUTES**. This is useful if, for instance, it took you 4 minutes to walk to your stop, so showing buses arriving in less than 4 minutes would be useful. This defaults to 0 which disables it.<br><br>**Example:** 4<br>**Default value:** 0<br>This value is **OPTIONAL** |
| `hideBusTimesGreaterThan` | Will exclude listing buses that are arriving in time greater the specified amount in **MINUTES**. This defaults to 45 minutes.<br><br>**Example:** 30<br>**Default value:** 45<br>This value is **OPTIONAL** |
| `refreshRateBusStopTimes` | Specified in **MILLISECONDS**, sets the rate at which updates will be made to the bus stop arrival times list. This value defaults to every thirty seconds. Note setting this value to low, i.e. fast, can use up a lot of alloted daily API calls so don't abuse this value.<br><br>**Example:** 1 * 60 * 1000<br>**Default value:** 30 * 1000<br>This value is **OPTIONAL** |
| `maxBusTimesPerStop` | The maximum number of bus times to show per station, i.e. if you set this to 2 you would only ever get the 2 next bus times for a given stop. This defaults to 0 which means show all the train times.<br><br>**Example:** 3<br>**Default value:** 0<br>This value is **OPTIONAL** |