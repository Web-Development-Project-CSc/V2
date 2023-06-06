const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/IMAGES/Flavours');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const ctrlAccounts = require('../controllers/ctrlAccounts');
const ctrlProducts = require('../controllers/ctrlProducts');
const ctrlOrders = require('../controllers/ctrlOrders');
const Page = require('../controllers/pages')

router.get('/', Page.ADMIN.dashboard);
router.get('/login', Page.ADMIN.adminLogin)
router.get('/orders', Page.ADMIN.allOrders );
router.get('/products', Page.ADMIN.allProducts);
router.get('/users', Page.ADMIN.allUsers);
router.get('/not', Page.PUBLIC.notAnAdmin)

router.post('/getProductResults',ctrlProducts.searchProducts);
router.post('/getUserResults', ctrlAccounts.searchUsers);
router.post('/getOrderResults', ctrlOrders.searchOrders);

router.get('/modify',ctrlAccounts.adminModifier)
router.get('/modifyproduct',ctrlProducts.modify)
router.get('/removeo',ctrlOrders.remove)
router.get("/removep",ctrlProducts.remove)
router.get("/removeu",ctrlAccounts.remove)

router.post("/addinguser",ctrlAccounts.addUser)
router.post('/addproducts', upload.single('image'),  ctrlProducts.addProduct)
router.post('/progress', ctrlOrders.progress)

module.exports = router;
