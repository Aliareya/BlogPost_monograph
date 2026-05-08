import CategoriesSection from "./sections/CategoriesSection";
import FeaturedPosts from "./sections/FeaturedPosts";
import HeroSection from "./sections/HeroSection"
import LatestArticles from "./sections/LatestArticles";
import NewsletterSection from "./sections/NewsletterSection";

const Home = () =>{
  return (
    <>
    <HeroSection/>
    <CategoriesSection/>
    <FeaturedPosts/>
    <LatestArticles/>
    <NewsletterSection/>
    </>
    
  )
}


export default Home;