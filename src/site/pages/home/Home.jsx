import CategoriesSection from "./sections/CategoriesSection";
import FeaturedPosts from "./sections/FeaturedPosts";
import HeroSection from "./sections/HeroSection"
import LatestArticles from "./sections/LatestArticles";

const Home = () =>{
  return (
    <>
    <HeroSection/>
    <CategoriesSection/>
    <FeaturedPosts/>
    <LatestArticles/>
    </>
    
  )
}


export default Home;