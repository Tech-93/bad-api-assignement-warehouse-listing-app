import './index.css'
import { Navbar, Nav } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import clothesService from './services/clothes'
import ProductList from './Components/ListRenderer'
import SortedLists from './Components/ListSorter'
import SearchForItem from './Components/Search'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"


const App = () => {
    const [shirts, setShirts] = useState([])
    const [jackets, setJackets] = useState([])
    const [accessories, setAccessories] = useState([])
  
    const [items, setItems] = useState([])
  
    const [xoon, setXoon] = useState([])
    const [abiplos, setAbiplos] = useState([])
    const [derp, setDerp] = useState([])
    const [reps, setReps] = useState([])
    const [nouke, setNouke] = useState([])
  
    const [manufacturers, setManufacturer] = useState([])
  
    const [renderStartpoint, setRenderStartPoint] = useState(0)
    const [renderEndpoint, setRenderEndPoint] = useState(1000)
  
    const [counter, setCounter] =useState(0)
  
    // Sets a timeout for loading screen to hide the initial setup of page
    if(counter !== 5) {
      console.log(counter)
          setTimeout(
              () => setCounter(counter + 1),
              1000
            )
    }
    
  
    // fetches all resources from the apis given into their own lists
    useEffect(() => {
      clothesService.getShirts().then(response => {
        setShirts(response.data)
      })
  
      clothesService.getJackets().then(response => {
        setJackets(response.data)
      })
  
      clothesService.getAccessores().then(response => {
        setAccessories(response.data)
      })
  
      clothesService.getXoon().then(response => {
        console.log("XOON" , response)
        setXoon(response.data.response)
        
      })
    
      clothesService.getAbiplos().then(response => {
        console.log("ABIPLOS", response)
        setAbiplos(response.data.response)
      })
  
      clothesService.getNouke().then(response => {
        console.log("NOUKE", response)
        setNouke(response.data.response)
      })
  
      clothesService.getDerp().then(response => {
        console.log("DERP", response)
        setDerp(response.data.response)
      })
  
      clothesService.getReps().then(response => {
        console.log("REPS", response)
        setReps(response.data.response)
      })
    }, [])
  
  
    // Sorts lists in alphabetical order according to item names.
    SortedLists(shirts,jackets,accessories)
  
  
    // Hook to fill the manufacturers array with data from all manufacturer APIs into one list. Also fills the items list with all product items for the search engine
    // to iterate. 
    useEffect(() => {
      if(xoon.length !== 0 && abiplos.length !== 0 && nouke.length !== 0 && derp.length !== 0 && reps.length !== 0) {
        setManufacturer(xoon)
        setManufacturer(manufacturers => manufacturers.concat(abiplos))
        setManufacturer(manufacturers => manufacturers.concat(nouke))
        setManufacturer(manufacturers => manufacturers.concat(derp))
        setManufacturer(manufacturers => manufacturers.concat(reps))
      }
  
      if(shirts !== 0 && jackets.length !== 0 && accessories.length !== 0) {
        setItems(shirts)
        setItems(items => items.concat(jackets))
        setItems(items => items.concat(accessories))
      }
  
    }, [xoon,abiplos, derp, nouke, reps, shirts, jackets, accessories])
  
    
    // logs manufacturers and items lists in order to determine a successful fetch, since the APIS given where not to be changed
    // according to assignment brief.
    console.log("MANUFACTURERS", manufacturers)
    console.log("ITEMS", items)
  
  
    // Sets the startpoint and endpoint for rendering items, which will show the first 1000 only to cut short loading time.
    const handleClick = () => {
      setRenderStartPoint(0)
      setRenderEndPoint(1000)
    }
    
  
    return (
      <div className="container"> 
      <Router>
  
  
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <button onClick={handleClick} > <Link to="/"> SHIRTS </Link> </button>  
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <button onClick={handleClick} > <Link to="/jackets"> JACKETS </Link> </button>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                  <button onClick={handleClick} > <Link to="/accessories"> ACCESSORIES </Link> </button>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <button > <Link to="/itemsearch"> SEARCH </Link> </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
  
        <Switch>
          <Route path="/jackets" > 
            <ProductList list={jackets} type="Jackets" manufacturers={manufacturers} 
              renderStartpoint={renderStartpoint} setRenderStartPoint={setRenderStartPoint} 
              renderEndpoint={renderEndpoint} setRenderEndPoint={setRenderEndPoint} 
              counter={counter} setCounter={setCounter}
            />           
          </Route>
  
          <Route path="/accessories" > 
            <ProductList list={accessories} type="Accessories" manufacturers={manufacturers} 
              renderStartpoint={renderStartpoint} setRenderStartPoint={setRenderStartPoint} 
              renderEndpoint={renderEndpoint} setRenderEndPoint={setRenderEndPoint} 
              counter={counter} setCounter={setCounter}
              /> 
              
          </Route>
  
         <Route path="/itemsearch" >
           <SearchForItem items={items} manufacturers={manufacturers} counter={counter} setCounter={setCounter}  />
         </Route> 
          
          <Route path="/" > 
            <ProductList list={shirts} type="Shirts" manufacturers={manufacturers} 
              renderStartpoint={renderStartpoint} setRenderStartPoint={setRenderStartPoint} 
              renderEndpoint={renderEndpoint} setRenderEndPoint={setRenderEndPoint} 
              counter={counter} setCounter={setCounter}
              />
               
          </Route>
        </Switch>
      </Router>
      </div>
    )
  }

  export default App