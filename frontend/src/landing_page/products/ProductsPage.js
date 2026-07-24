import React from 'react';

import OpenAccount from '../OpenAccount';

import Hero from './Hero';
import LeaftImage from  './LeftImage';
import RightImage from './RightImage';
import Universe from './Universe';


function AboutPage() {
    return ( 
         <>
       

         <Hero/>
         <LeaftImage  imageURL="images/kite.png" productName="Kite" productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices." tryDemo="" learnMore="" googlePlay="" appStore="" />
         <RightImage/>
         <LeaftImage  imageURL="images/coin.png" productName="Coin" productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices." tryDemo="" learnMore="" googlePlay="" appStore="" />
         <RightImage/>
         <LeaftImage  imageURL="images/varsity.png" productName="Varsity mobile" productDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go." tryDemo="" learnMore="" googlePlay="" appStore="" />
         <RightImage/>
         <Universe/>
      
         </>
    );
}

export default AboutPage;
