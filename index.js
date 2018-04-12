#!/usr/bin/env node
'use strict';

const meow = require('meow')
const ora = require('ora')
const hannoverjs = require('hannoverjs')

const cli = meow(`
  Get next HannoverJS meetup date.

  Usage
    $ hannoverjs
`)

const spinner = ora('Fetching next meetup').start()

hannoverjs.getEvents().then(({ body }) => {
  spinner.stop()

  const [nextMeetup] = body

  if (!nextMeetup) {
    return console.log(`The next meetup has no date yet 😢`)
  }

  const date = new Date(nextMeetup.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  })

  console.log(`Next meetup is on ${date} 🚀`)
})
