import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from './useAuthContext'


//useSignup hook
//to signup user and get a reponse back and if successful and user logged in, update the
//user property in the AuthContext that user is logged in now
export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const navigate = useNavigate()

    const signup = async (formData) => {
        setIsLoading(true)
        setError(null) //reset the error back to null again every time a signup request is made

        const response = await fetch('http://localhost:7001/signup', {
            method: 'POST',
            // headers: {'Content-Type': 'multipart/form-data'},
            body: formData
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            console.log(json.error)
        }

        //if okay: 
        //a. update the AuthContext with the user we get back(i.e the email we're sending from the server,
        //using a dispatch and the action login)
        //b. reset the loading state to false
        //c. take the json web token we get back and store somewhere in the browser via local storage 
        //(i.e even if the user closes the browser the web token is still there stored for the user so 
        //he's logged in still)
        if (response.ok) {
            //save the user (i.e email and token gotten from the response data or json object or that the 
            //server is sending back) to local storage
            localStorage.setItem('user', JSON.stringify(json)) //the first param is any random name you call
            //the item and the second stringifies the response data or json object because it's an object 
            //and has to be stringified into json again because we have to store strings inside local storage

            //update the AuthContext
            dispatch({type: 'LOGIN', payload: json}) //the payload is going to be the user we get back

            setIsLoading(false)

            navigate('/login')
        }
    }

    return { signup, isLoading, error }
}
