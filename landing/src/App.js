import React, { Component } from 'react';
import Fullscreen from './util/fullscreen.js';
import FacebookLogin from './components/facebook-button.js';
import GoogleLogin from './components/google-button.js';



import './App.css';


  
   


class App extends Component {
  
   handleSocialLogin = (user) => {
      console.log(user)
   }

   handleSocialLoginFailure = (err) => {
      console.error(err)
   }

    _renderDesktop() {

      const fb = () => (
         <div className='wifi-login-fb'/>
      );

      return(
      <div className='wifi-desktop'>
      <div className='wifi-container-desktop'>

      <Fullscreen display={'gradient'} gradient={'-70deg, #95ea93, #77e6a1'}/>
      <Fullscreen imageSrc={require('./images/background-pattern-vector.svg')} overlay={true}/>
       <img className='bg-img-left' src={require('./images/illustration-left.svg')}/>
       <img className='bg-img-right' src={require('./images/illustration-right.svg')}/>

       <div className='wifi-logo-container'>
         <div>
            <div className='wifi-header-sub-one'>METAMORPHIC</div>
            <div className='wifi-header-sub-two'>STUDIOS</div>
         </div>
         <div className='wifi-logo-symbol'>&</div>
         <div className='wifi-cafe-logo'/>
       </div>

       <div className='wifi-main-container'>

         <div className='wifi-main-metasymbol'/>
         <div style={{display : 'flex', flexDirection : 'column'}}>
             <div className='wifi-main-header'>HAVE SOME</div>
              <div style={{  display : 'flex', flexDirection : 'row'}}>

                <div className='wifi-main-title'>WIFI</div> 
                <div className='wifi-main-wifisymbol'/>
              </div>  
             <div className='wifi-main-header'>ON THE HOUSE!</div>
         </div>
         </div>

       <div className='wifi-footer-container'>
         <div className='wifi-footer-body'>POWERED BY <b>METAMORPHIC</b> STUDIOS</div>
         <div className='wifi-footer-body'>LOGIN <b>WITH:</b></div>

         <div style={{display : 'flex', flexDirection : 'row', marginTop : '15px'}}>
            <FacebookLogin 
            provider="facebook"
            appId='196039087814273'
            onLoginSuccess={this.handleSocialLogin}
            onLoginFailure={this.handleSocialLoginFailure}/> 
            <GoogleLogin 
            provider="google"
            appId='506077427327-v762fumnmc8mi48gv5qb61e7vjt2vgnc.apps.googleusercontent.com'
            onLoginSuccess={this.handleSocialLogin}
            onLoginFailure={this.handleSocialLoginFailure}/>   
            <div className='wifi-login-email'/>
         </div>
            

       </div>

      </div>
      </div>

      );
     }

   _renderMobile() {
      return(
         <div className='wifi-mobile'>
         <div className='wifi-container-mobile'>
                       
               <Fullscreen display={'gradient'} gradient={'-70deg, #95ea93, #77e6a1'} />
               <Fullscreen imageSrc={require('./images/mobile-background-pattern-vector.svg')} overlay={true}/>
         
       <img className='bg-img-top' src={require('./images/illustration-top.svg')}/>
       <img className='bg-img-bottom' src={require('./images/illustration-bottom.svg')}/>
               
         <div className='wifi-logo-container-mobile'>
            <div className='wifi-header-sub-one-mobile'>METAMORPHIC</div>
            <div className='wifi-header-sub-two-mobile'>STUDIOS</div>
            <div className='wifi-logo-symbol-mobile'>&</div>
            <div className='wifi-cafe-logo-mobile'/>
       </div>

       <div className='wifi-main-container-mobile'>

         <div className='wifi-main-metasymbol-mobile'/>
         <div style={{display : 'flex', flexDirection : 'column'}}>
             <div className='wifi-main-header-mobile'>HAVE SOME</div>
              <div style={{  display : 'flex', flexDirection : 'row'}}>

                <div className='wifi-main-title-mobile'>WIFI</div> 
                <div className='wifi-main-wifisymbol-mobile'/>
              </div>  
             <div className='wifi-main-header-mobile'>ON THE HOUSE!</div>
         </div>
         </div>

       <div className='wifi-footer-container-mobile'>
         <div className='wifi-footer-body-mobile'>POWERED BY <b>METAMORPHIC</b> STUDIOS</div>
         <div className='wifi-footer-body-mobile'>LOGIN <b>WITH:</b></div>

         <div style={{display : 'flex', flexDirection : 'row', marginTop : '15px'}}>
            <div className='wifi-login-fb'/>
            <div className='wifi-login-gplus'/>
            <div className='wifi-login-email'/>
         </div>
            

       </div>

         
            </div>
         </div>
      );
   }

   render () {
      var isMobile = false;
      if(/Android|webOS|iPhone|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent)) {
         isMobile = true;
      }

      return (
         <div id="wifi" style={{position : 'relative'}}>
            {isMobile ? this._renderMobile() : this._renderDesktop()}    
         </div>
      );
   }


  
    
}

export default App;
