import { createContext, useState, useEffect } from 'react';
import { CLIENT_ID, SESSION_COOKIE_NAME } from '@lib/constants';
import registerToken from '@lib/registerToken';
import { setCookie } from '@lib/cookies';

const UserSessionContext = createContext([]);

export function UserSessionProvider({ children }) {
  const [userSession, setUserSession] = useState({});

  /**
   * Creates a user session, valid for a certain period (1 hour).
   * Saves user login details into local storage.
   * Saves session token into local storage and in a cookie.
   * Creates user session context.
   */
  const createSession = async (email: string, name: string) => {
    const token = await registerToken(CLIENT_ID, email, name);
    const expirationDate = new Date().setHours(new Date().getHours() + 1);
    const session = { token: token.data.sl_token, email: email, name: name, expiresAt: expirationDate };

    // Set local storage info
    localStorage.setItem('userSession', JSON.stringify(session));

    // Set cookie
    setCookie(SESSION_COOKIE_NAME, token.data.sl_token, 1);

    // Set user session context
    setUserSession(session);
  };

  /**
   * Gets the user session saved in localStorage and sets it in state
   */
  useEffect(() => {
    setUserSession(JSON.parse(localStorage.getItem('userSession')) || {});
  }, [JSON.stringify(userSession)]);

  return <UserSessionContext.Provider value={[userSession, createSession]}>{children}</UserSessionContext.Provider>;
}

export default UserSessionContext;
