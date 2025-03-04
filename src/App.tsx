import './App.style.scss'
import { Header } from './components/Header'
import { SideBar } from './components/SideBar'
import { Table } from './components/Table'

export function App() {
  return (
    <>
      <Header />
      <div className="container">
        <SideBar />
        <main className="main-content">
          <p className="title-container">
            <span>Строительно-монтажные работы</span>
          </p>
          <Table />
        </main>
      </div>
    </>
  )
}
