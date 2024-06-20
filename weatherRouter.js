const express = require('express')
const weatherRouter = express.Router()

let data = [
  {
    activity: ['morning jog', 'breakfast', 'work', 'lunch', 'gym'],
    weather: 'sunny',
  },
  {
    activity: ['work', 'coffee break', 'meetings', 'dinner', 'movie'],
    weather: 'cloudy',
  },
  {
    activity: ['weekend', 'hiking', 'picnic', 'reading', 'gardening'],
    weather: 'rainy',
  },
]

// Get all list
weatherRouter.get('/list', (req, res) => {
  res.send(data)
})

// Get by activities
weatherRouter.get('/list/activities', (req, res) => {
  const activityToFind = req.query.activity
  if (!activityToFind) {
    return res.status(400).send('Activity parameter is missing')
  }

  const foundItems = data.filter((item) =>
    item.activity.includes(activityToFind)
  )

  if (!foundItems.length) {
    return res.status(404).send(`Can not find the activite: ${activityToFind}`)
  }
  res.send(foundItems)
})

// Post new item
weatherRouter.post('/activities', (req, res) => {
  console.log('body', req.body)
  const { activity, weather } = req.body
  if (!activity || !weather) {
    return res.status(400).send('Activity parameter is missing')
  }
  data.push({ activity, weather })
  res.status(201).send({ msg: 'Add activity successfully' })
})

// Get activities base on weather conditions
weatherRouter.get('/activities/weather/:condition', (req, res) => {
  const weatherCondition = req.params.condition
  const itemsWithCondition = data.filter((item) => {
    return item.weather === weatherCondition
  })
  res.send(itemsWithCondition)
})

weatherRouter.delete('/activities/weather/:condition', (req, res) => {
  const weatherCondition = req.params.condition
  const foundIndex = data.findIndex((item) => item.weather === weatherCondition)
  if (!foundIndex) {
    return res.status(404).send('No match result')
  }
  const deleteWeather = data.splice(foundIndex, 1)
  res.send({
    msg: 'Activity delete',
    deleteWeather: deleteWeather[0],
  })
})
module.exports = weatherRouter
