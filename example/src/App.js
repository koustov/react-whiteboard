import React from 'react'

import { Whiteboard } from 'react-whiteboard'
import 'react-whiteboard/dist/index.css'

const App = () => {
  return (
    <div className='whiteboard-wrapper'>
      <div>
        <h3> React Whiteboard</h3>
      </div>
      <div className='whiteboard'>
        <Whiteboard text='Create React Library Example 😄' />
      </div>
    </div>
  )
}

export default App
