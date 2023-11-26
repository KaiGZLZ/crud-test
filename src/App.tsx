import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom'
import { EntryPage } from './views/entry'
import { ListPage } from './views/list'
import { EditPage } from './views/edit'

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Public Routes */}
          <Route path="/" element={<EntryPage />} />


          <Route path="/list" element={<ListPage />} />

          <Route path="/edit/:id" element={<EditPage />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
