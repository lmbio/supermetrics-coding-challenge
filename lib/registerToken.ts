/**
 * Registers a token to be used in subsequent queries
 * @param clientId - Client ID provided by Supermetrics (e.g. ju16a6m81mhid5ue1z3v2g0uh)
 * @param email - Email address (from the login screen)
 * @param name - Name (from the login screen)
 * @returns - Promise containing the new registered token sl_token, client_id and email
 */
export default function registerToken(clientId: string, email: string, name: string): Promise<any> {
  const requestOptions = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      email: email,
      name: name,
    }),
  };

  return fetch('https://api.supermetrics.com/assignment/register', requestOptions)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
}
