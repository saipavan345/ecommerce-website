import React from 'react'
import Banner from './Banner'
import HomeCategory from '../Home/HomeCategory';
import CategoryShowCase from './CategoryShowCase';
import Register from './Register';
import LocationSprade from './LocationSprade';
import AboutUs from './AboutUs';
import AppSection from './AppSection';
import Sponsor from './Sponsor';






function Home() {
  return (
    <>
     <Banner/>
     <HomeCategory/>
     <CategoryShowCase/>
     <Register/>
     <LocationSprade/>
     <AboutUs/>
     <AppSection/>
     <Sponsor/>
    </>
   
  )
}
export default Home