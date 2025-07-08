import Hero from '../hero/Hero';
import Navbar from '../navbar/Navbar'
import Categories from '../product/Categories';
import Products from '../product/Products';

const Home  =()=> {

    return (
      <>
        <Navbar/>
        <Hero/>
        <Categories/>
        <Products/>
      </>
    )
}
export default Home;