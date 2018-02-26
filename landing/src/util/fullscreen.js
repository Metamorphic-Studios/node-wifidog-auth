import React, {Component} from 'react';

export default class Fullscreen extends Component {
   constructor(props) {
      super(props);
      this.state = {
         ...props
      };
   }

   _getStyles(){

      var style = {
         position : this.props.overlay ? 'absolute' : 'relative',
         top : 0,
         width : '100vw',
         height : '100vh',
         backgroundSize : 'cover',
         backgroundPosition : 'center'
      };

      if(this.props.display)
         style.background = 'linear-gradient(' + this.props.gradient + ')';
      else
         style.backgroundImage = 'url(' + this.props.imageSrc + ')';
      return style;
   }

   render() {
      return (
         <div className='backgr' style={this._getStyles()}/>
      );
   }
}  

