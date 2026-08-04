import axios from 'axios'

interface Value {
    query?: string
}
export default function useApi(){
    const Api = async(values : Value)=>{
        const response = await axios.post("http://localhost:3040/graphql",{query :values.query})
        return response 
    }
    return Api
}