import React, { useState} from 'react'
import Item from './Item'

const SearchForItem = ({manufacturers, items, counter, setCounter}) => {
    const [searchname, setSearchname] = useState('')
    const [searchId, setSearchId] = useState('')


    // Hides initial setup with a loading courtain if list or manufacturers list is undefined.
    if(items === undefined || items.length === 0 || manufacturers === undefined || counter !== 5) {
        return(
            <div> <h1> Loading...  </h1> </div>
        )
    }

    
    // Handles the textfield for Name and Id.
    const handleSearchNameChange = (event) => {
        console.log(event.target.value)
        event.preventDefault()
        setSearchname(event.target.value.toUpperCase())
    }

    const handleSearchIdChange = (event) => {
        setSearchId(event.target.value)
    }

    // Prevents accidental refresh of page, should a worker hit enter upon searching for item.
    const preventReload = (event) => {
        event.preventDefault()
    }


    const FilteredItems = items.filter(item => item.name.includes(searchname))
    console.log(FilteredItems.length)


    // Created a top for the data table so as to have a cleaner return code.
    const tableTop = () => {
        return (
        <tr>
            <td  >  NAME   </td>
            <td style={padding3} > COLOR  </td>
            <td style={padding3} > MANUFACTURER </td>
            <td style={padding3} > PRICE </td>
            <td style={padding3}>  ID  </td>
            <td style={padding3} > </td>
            <td style={padding3} > AVAILIBILITY</td>
        </tr>            
        )
    }

    // Determines the conditions for how to display which item upon search.
    const displayItems = () => {

        if(searchname === '' && searchId === '') {
            return <div style={padding} > enter name or id in search fields </div>
        
        } 
        
        // To quicken search and reduce lag, the items can only be displayed if 100 items match the 
        // name searched for. Hence returning the message to many matches if matches exceed 100 items. 
        else if(FilteredItems.length > 100 && searchId === '') {
            return <div style={padding} > Too many matches </div>
        
        } 
        
        else if(FilteredItems.length === 0 && searchId === '') {
            return <div style={padding} > No such name in inventory </div>
        
        } 
        
        // If an item is searched for by its Id property, then the search mechanism will focus on finding item by
        // Id, rather than by name. Since Ids are more specific than names, a single item only will be displayed 
        // if it matches the Id searched for. Else message will convey that no such Id exists in list. 
        else if (searchId !== '') {
            const item = items.find(item => item.id === searchId)

            if(item === undefined) {
                return <div style={padding} > no such id registered </div>
            }
            
            return (
                <div style={padding2}>
                    <table>
                        <thead>
                            {tableTop()}
                            <Item key={item.id} item={item} manufacturers={manufacturers} />
                        </thead>
                    </table>
                </div>        
            ) 
        }
            
        return (
            <div style={padding2}>
                <table>
                    <thead>
                        {tableTop()}
                        {FilteredItems.map(item => <Item key={item.id} item={item} manufacturers={manufacturers} />)}         
                    </thead>
                </table>
            </div>
        )
    }


    const padding = {
        padding: 20
    }

    const padding2 = {
        paddingTop: 25
    }

    const padding3 = {
        paddingLeft: 10
    }


    return (
        <div> 
            <div style={padding} >SEARCH FOR ITEM BY: </div>
            <div  >
                <form onSubmit={preventReload} > Name:  </form>
                <input value={searchname} onChange={handleSearchNameChange}  />
                <form onSubmit={preventReload} > Id:  </form>
                <input value={searchId} onChange={handleSearchIdChange}  />
            </div>
            {displayItems()}
        </div>
    )
}

export default SearchForItem