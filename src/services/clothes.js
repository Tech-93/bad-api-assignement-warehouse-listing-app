import axios from 'axios'
const productUrl = 'https://bad-api-assignment.reaktor.com/products/'
const availabilityUrl = 'https://bad-api-assignment.reaktor.com/availability/'


const getShirts = () => axios.get(productUrl + "shirts")

const getJackets = () => axios.get(productUrl + "jackets")

const getAccessores = () => axios.get(productUrl + "accessories")

const getXoon = () => axios.get(availabilityUrl + "xoon")

const getNouke = () => axios.get(availabilityUrl + "nouke")

const getDerp = () => axios.get(availabilityUrl + "derp")

const getReps = () => axios.get(availabilityUrl + "reps")

const getAbiplos = () => axios.get(availabilityUrl + "abiplos")

const Clothes = {
    getShirts,
    getJackets,
    getAccessores,
    getXoon,
    getAbiplos,
    getDerp,
    getReps,
    getNouke
}

export default Clothes