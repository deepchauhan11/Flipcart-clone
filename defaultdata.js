import {products} from './src/constants/data'
import Product from './product_schema';

const DefaultData = async () => {
    try{
         await Product.insertMany(products);
        console.log('Products has been sucessfully imported')
    }
    catch(error){
        console.log('Error in fetching default data', error)
    }

}

export default DefaultData;