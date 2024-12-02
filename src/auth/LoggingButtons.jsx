import { useAuth0 } from '@auth0/auth0-react';

/**
 * TODO: Ticket 3:
 * Implement authentication and logging functionality using Auth0
 */


export const LoggingButtons = () => {
  // Dev Note: Replace hardcode by destructuring from Auth0 hook
  let { loginWithRedirect, logout, isAuthenticated } = useAuth0()
   
  const buttonText = isAuthenticated ? 'Log Out' : 'Log In';

  //Dev Note: added functionality to handler below, testing whether isAuthenticated is truthy, 
  //which determines whether clicking the button acts as a logout of login button.

  const handleLogging = () => {
    if (isAuthenticated) {
      logout()
      isAuthenticated = false
    } else {
      loginWithRedirect()
    }
  };

  return (
    <button className='nav-btn  px-4 py-1' onClick={handleLogging}>
      {buttonText}
    </button>
  );
};