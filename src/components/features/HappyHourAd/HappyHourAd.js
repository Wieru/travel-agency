import React from 'react';
import styles from './HappyHourAd.module.scss';
import PropTypes from 'prop-types';
import {formatTime} from '../../../utils/formatTime';

class HappyHourAd extends React.Component {

  constructor(){
    super();
    /* run this.forceUpdate() every second */ 
    setInterval(() => {
      this.forceUpdate();
    }, 1000);
    
  }

  static propTypes = {
    title: PropTypes.string,
    promoDescription: PropTypes.string,
  }

  getCountdownTime(){
    const currentTime = new Date();
    const nextNoon = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate(), 12, 0, 0, 0));
  
    if(currentTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentTime.getUTCDate()+1);
    }
  
    return Math.round((nextNoon.getTime() - currentTime.getTime())/1000);
  }

  render() {
    const {title, promoDescription} = this.props;
    const countdownTime = formatTime(this.getCountdownTime());
    return(
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>{countdownTime > 23*60*60 ? promoDescription:(countdownTime)}</div>
      </div>
    );  
  }
}

HappyHourAd.defaultProps = {
  title: 'Happy Hour',
  promoDescription: 'Happy Hour is on!',
};  

export default HappyHourAd;
