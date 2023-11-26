const bodyParser = require('body-parser');
const express =require('express');
const dbConnect=require('./config/dbConnect');
const {notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const authRouter =require('./routes/authRoute');
const productRouter =require('./routes/productRoute');
const blogRouter =require('./routes/blogRoute');
const categoryRouter =require('./routes/prodcategoryRoute');
const blogCatRouter =require('./routes/blogCatRoute');
const brandRouter =require('./routes/brandRoute');
const couponRouter =require('./routes/couponRoute');
const colorRouter =require('./routes/colorRoute');
const enqRouter =require('./routes/enqRoute');
const uploadRouter =require('./routes/uploadRoute');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const morgan = require('morgan')
dbConnect();  



  
app.use(morgan('dev'));  
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use('/api/user',authRouter);
app.use('/api/product',productRouter);
app.use('/api/blog',blogRouter);
app.use('/api/category',categoryRouter);
app.use('/api/blogcategory',blogCatRouter);
app.use('/api/brand',brandRouter); 
app.use('/api/coupon',couponRouter);
app.use('/api/color',colorRouter);
app.use('/api/enquiry',enqRouter); 
app.use('/api/upload',uploadRouter);
  
app.use(notFound);
app.use(errorHandler);   
app.listen(PORT, ()=>{  
    console.log(`Server is running at PORT ${PORT}`);
});

 