# musement_homework
Musement | Backend tech homework.

**Name**: Daniele

**Surname**: Draganti

**Consulting Company**: PNP Technology S.r.l.

### Step 1
Developed in Node.js 14.15.5 LTS, with `request` library. Dockerfile included.

*NOTE:* The Node.js app for Step 1 needs a weatherapi.com API key, which can be passed through the ENV variable `WEATHERAPI_KEY`.

### Step 2

#### Endpoint to set the forecast for a specific city
`PUT /api/v3/cities/{cityId}/forecast`

##### Parameters:
* `cityId`: City ID
* `X-Musement-Version`: As per v3 API
* `Accept-Language`: Accepted localization

##### Payload:
A JSON array, where the element at index 0 is today. The index increases according to the distance from today. E.g. tomorrow will be 1, two days from today will be 2, etc.
Each element will contain a `string`, qualitatively representing the condition for the specified day, as received by WeatherAPI.com.

*Note:* To avoid stale data, this endpoint should be called regularly through a periodic task/cron job/similar solution.

##### Possible responses:
* **200:** Inserted successfully.
* **404:** Resource not found.
* **503:** Service unavailable (also in case of WeatherAPI.com response unavailable).

This endpoint will receive an array (as described in the payload) and will save its data in the Musement database. Implementation will not be discussed at length here, but it would be ideal to update the whole forecast array each time that this endpoint is called, to purge old data, and to keep it idempotent (as required by `PUT`).


#### Endpoint to get the forecast for a specific city
`GET /api/v3/cities/{cityId}/forecast?dayOffset={day}`

##### Parameters:
* `cityId`: City ID
* `day`: Day the forecast is requested for, offset from today. If not present, returns the whole forecast data.
* `X-Musement-Version`: As per v3 API
* `Accept-Language`: Accepted localization

##### Payload:
None.

##### Possible responses:
* **200:** Returns a JSON array, with the day (or the days) requested. Each element of the array will contain the qualitative description of the forecast for that day as a `string`.
* **400:** Filter out of limits.
* **404:** Resource not found.
* **503:** Service unavailable.

This endpoint will return the forecast for the specified day (or all the days saved in the database if no filter specified) as a qualitative description string.