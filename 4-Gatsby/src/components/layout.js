import * as React from 'react'
import { Link } from 'gatsby'

const Layout = ({ children }) => {
  return (
    <div> 
      <header>
        <h1>Sitio de espacios culturales</h1>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/museo">Museo</Link></li>
            <li><Link to="/teatro">Teatro</Link></li>
            <li><Link to="/biblioteca">Biblioteca</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© {new Date().getFullYear()} Práctica 4 - Gatsby. Espacios culturales</p>
      </footer>
    </div>
  )
}
export default Layout