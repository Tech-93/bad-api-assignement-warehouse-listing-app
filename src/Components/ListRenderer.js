import React from 'react'
import Item from './Item'

const ProductList = ( {list, type, renderStartpoint, setRenderStartPoint, renderEndpoint, setRenderEndPoint, manufacturers, counter, setCounter} ) => {
    
    // Hides initial setup with a loading courtain if list or manufacturers list is undefined.
    if(list === undefined || list.length === 0 || manufacturers === undefined || counter !== 5) {
          return(
            <div> <h1> Loading...  </h1> </div>
        )
    }


    // renders items according to a given start point and end point, showing the first 1000 items only to shorten loading time.
    const renderItems = () => list.slice(renderStartpoint, renderEndpoint).map(item => 
        <Item key={item.id} item={item} manufacturers={manufacturers} />
        )


    // Event handlers for buttons corresponding to the shown list of items.    
    const handleNextClick = () => {
        setRenderStartPoint(renderStartpoint + 1000)
        setRenderEndPoint(renderEndpoint + 1000)
    }

    const handlePreviousClick = () => {
        setRenderStartPoint(renderStartpoint - 1000)
        setRenderEndPoint(renderEndpoint - 1000)
    }

    const handleAllClick = () => {
        setCounter(0)
        setRenderStartPoint(0)
        setRenderEndPoint(list.length)
    }

    const handleThousandClick = () => {
        setRenderStartPoint(0)
        setRenderEndPoint(1000)
    }


    // Button for viewing the next 1000 items in the list.
    const nextButton = () => {
        const label = "==> next 1000 items"
        if(renderEndpoint < list.length) {
            return <button onClick={handleNextClick}> {label} </button>                       

        }
    }


    // Button for viewing the last 1000 items. 
    const backButton = () => {
        const label = "<== previous 1000 items"
        if(renderStartpoint > 0) {
            return <button onClick={handlePreviousClick} > {label} </button>
        }
    }


    // Function to toggle between the button to show all items in entire list, and button to revert back to showing the first 1000 items only. 
    const toggleAllButton = () => {

        if(renderStartpoint === 0 && renderEndpoint === list.length) {
            return <button onClick={handleThousandClick} > Show 1000 items only </button>
        }
        return <button onClick={handleAllClick} > Show all items </button>
    }
    
        
    const paddingTop = {
        paddingTop: 20
    }

    const paddingLeft = {
        paddingLeft: 10
    }

    const padding = {
        padding: 20
    }


    // The reason for positioning the buttons thus is to avoid accidental clicks forward or backwards to ease the workers patience.     
    return(
        <div>
            <h1 style={padding} > {type} </h1>
            {toggleAllButton()}
            {nextButton()}
            {backButton()}
        <div style={paddingTop} >
        <table>
            <thead>
                <tr>
                    <td>  NAME  </td>
                    <td style={paddingLeft} >  COLOR </td>
                    <td style={paddingLeft} >  MANUFACTURER  </td>
                    <td style={paddingLeft} >  PRICE </td>
                    <td style={paddingLeft} >  ID  </td>
                    <td style={paddingLeft} > </td>
                    <td style={paddingLeft} > AVAILIBILITY</td>
                    
                </tr>
                {renderItems()}
                                
            </thead>
        </table>
        </div>
        {backButton()}
        {nextButton()}
        </div>
    )

}

export default ProductList