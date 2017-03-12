import React from 'react'
import stores from '../stores'
const moment = require('moment')

import Timeslip from './Timeslip'

export default function Day (props) {
  const date = moment(props.date)
  const inMonth = date.isSame(props.month, 'month')
  const isWeekday = date.isoWeekday() < 6

  let timeslips = []
  let total = 0
  let timeslipsHtml = ''
  let className = 'day'

  if (props.loaded) {
    timeslips = props.timeslips
    total = props.total
    timeslipsHtml = timeslips.map(timeslip => {
      const taskNameOb = stores.taskDisplayNameStore.getTaskDisplayNameOb(timeslip.task)
      return <Timeslip
        key={timeslip.url}
        hours={timeslip.hours}
        isLocked={!!timeslip.billed_on_invoice}
        taskNameOb={taskNameOb}
        onDelete={e => { e.stopPropagation(); props.onDeleteTimeslip(timeslip) }} />
    })
  }

  if (date.isSame(moment(), 'day')) {
    className += ' today'
  } else if (date.isBefore(moment())) {
    className += (total < 8 ? ' short' : ' complete')
  }

  if (!inMonth) className += ' text-muted'

  className += isWeekday ? ' weekday' : ' weekend'

  return <div className={className} onClick={props.onSelectDay} >
    <div className='day-header'>
      <span>{date.format('Do')}</span>
      <span>
        <input type='checkbox' checked={props.selected} />
      </span>
    </div>
    <div className='day-total'>Total: <span className='day-total-hours'>{parseInt(total || 0, 10)}h</span></div>
    <div className='day-timeslips'>{timeslipsHtml}</div>
  </div>
}
