import React, { useEffect, useState } from 'react'
import * as styles from './style.scss'

export const Board = () => {
  const [type, setType] = useState('line')
  useEffect(() => {
    drawOnCanvas()
    setType('line')
  })

  const drawOnCanvas = () => {
    var canvas = document.querySelector('#board')
    var ctx = canvas.getContext('2d')

    var sketch = document.querySelector('#sketch')
    var sketch_style = getComputedStyle(sketch)
    canvas.width = parseInt(sketch_style.getPropertyValue('width'))
    canvas.height = parseInt(sketch_style.getPropertyValue('height'))

    var mouse = { x: 0, y: 0 }
    var last_mouse = { x: 0, y: 0 }
    var coordinates = {}
    var allCoordinateMaps = []
    /* Mouse Capturing Work */
    canvas.addEventListener(
      'mousemove',
      function (e) {
        last_mouse.x = mouse.x
        last_mouse.y = mouse.y

        mouse.x = e.pageX - this.offsetLeft
        mouse.y = e.pageY - this.offsetTop
        coordinates.end = mouse
      },
      false
    )

    /* Drawing on Paint App */
    ctx.lineWidth = 5
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.strokeStyle = 'blue'

    canvas.addEventListener(
      'mousedown',
      function (e) {
        console.log('md')
        mouse.x = e.pageX - this.offsetLeft
        mouse.y = e.pageY - this.offsetTop
        coordinates.start = { ...mouse }
        allCoordinateMaps.push({})
        canvas.addEventListener('mousemove', onPaint, false)
      },
      false
    )

    canvas.addEventListener(
      'mouseup',
      function (e) {
        mouse.x = e.pageX - this.offsetLeft
        mouse.y = e.pageY - this.offsetTop
        coordinates = { ...mouse }
        canvas.removeEventListener('mousemove', onPaint, false)
      },
      false
    )
    canvas.addEventListener(
      'mouseleave',
      function () {
        canvas.removeEventListener('mousemove', onPaint, false)
      },
      false
    )

    var onPaint = function () {
      ctx.beginPath()
      allCoordinateMaps[allCoordinateMaps.length - 1].push(coordinates.end)
      console.log(`Coordinates: ${JSON.stringify(coordinates)}`)
      if (type === 'line') {
        ctx.moveTo(coordinates.start.x, coordinates.start.y)
        ctx.lineTo(coordinates.end.x, coordinates.end.y)
      } else {
        ctx.moveTo(last_mouse.x, last_mouse.y)
        ctx.moveTo(last_mouse.x, last_mouse.y)
      }
      ctx.closePath()
      ctx.stroke()
      // if (timeout !== undefined) clearTimeout(timeout)
      // timeout = setTimeout(() => {
      //   var base64image = canvas.toDataUrl('image/png')
      // }, 1000)
    }
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div id='sketch' style={{ width: '100%', height: '100%' }}>
        <canvas id='board' style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}
