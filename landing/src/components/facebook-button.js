import React from 'react'
import SocialLogin from 'react-social-login'

const Button = ({ children, triggerLogin, ...props }) => (
   <div className='wifi-login-fb' onClick={triggerLogin}/>
)

export default SocialLogin(Button)
