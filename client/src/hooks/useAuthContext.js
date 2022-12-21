import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


//useAuthContext hook
//using this hook, we can use the AuthContext value (i.e the user value) on a state component,
//by invoking the hook and destructuring the user from the context object.
//Note that in the AuthContext, we have the dispatch function that we can also use in other components 
//as well to perform dispatches and update the state
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}
