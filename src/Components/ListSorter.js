
const SortedLists = (shirts, jackets, accessories) => {

    shirts.sort((a ,b) => {
        if(a.name < b.name) {
          return -1
        }
    
        if(a.name > b.name) {
          return 1
        }
    
        return 0
      })
    
      
      jackets.sort((a ,b) => {
        if(a.name < b.name) {
          return -1
        }
    
        if(a.name > b.name) {
          return 1
        }
    
        return 0
      })
    
    
      accessories.sort((a ,b) => {
        if(a.name < b.name) {
          return -1
        }
    
        if(a.name > b.name) {
          return 1
        }
    
        return 0
      })
}

export default SortedLists