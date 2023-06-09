class AuthService {
  constructor (public host: string) {
    this.host = host
  }

  public async handleLogin(userData: any) {
    const response = await fetch(
      `${this.host}auth/login`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
    return await response.json()
  }
}

export default AuthService