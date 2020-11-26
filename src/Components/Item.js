import React, { useState } from 'react'

const Item = ( {item, manufacturers} ) => {
    const [availability, setAvailability] = useState()
    const [showAvailibility, setShowAvailibility] = useState(false)


    // puts colours in separate variable to better render colours in a readable form.
    var colors = ""
    for(var i = 0; i < item.color.length -1; i++) {
        colors += item.color[i] + ", "
    }
    colors+= item.color[item.color.length - 1]


    // handles the button for showing an items availability. Shortens loading time to not show availability for all
    // but to only show for individual items, rather than having every item iterate through manufacturers list and 
    // render their unique results.  
    const handleClick = () => {

        if(showAvailibility === false) {
            setShowAvailibility(true)
        } else {
            setShowAvailibility(false)
        }

        if(manufacturers[0] === undefined) {
            setAvailability("Error: no data! Reload page")
        
        } else if(manufacturers[0].hasOwnProperty('id') ) {

            var upperCaseId = item.id.toUpperCase()
            const availability = manufacturers.find(obj => obj.id === upperCaseId)
            console.log(availability)

            if(availability === undefined) {
                setAvailability("Error: no data! Reload page")
            } else if(availability.DATAPAYLOAD.includes("LESSTHAN10")) {
                setAvailability("Less than 10")
            } else if (availability.DATAPAYLOAD.includes("OUTOFSTOCK")) {
                setAvailability("Out of stock")
            } else {
                setAvailability("In stock")
            }
        }

    }


    // Toggles the rendering of an items availibility data.
    const toggleShowAvailibility = () => {
    
        if(showAvailibility === true) {
            return <td  > {availability} </td>
        } 
            return <td> </td>

    }


    const paddingLeft = {
        paddingLeft: 10
    }

    
    return(
        <tr>
          <td > {item.name} </td>
          <td style={paddingLeft} > {colors} </td>
          <td style={paddingLeft} > {item.manufacturer} </td>
          <td style={paddingLeft} > {item.price} </td>
          <td style={paddingLeft} > {item.id} </td>
          <td style={paddingLeft} > <button onClick={handleClick}> check availibility </button> </td>
          {toggleShowAvailibility()}              
        </tr>
      )        
}

export default Item