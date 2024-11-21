export const backendDomin = "http://localhost:8080";
// const backendDomin = "https://major-mi15.onrender.com";

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  deleteUser: {
    url: `${backendDomin}/api/delete-user`,
    method: "post",
  },
  request_otp: {
    url: `${backendDomin}/api/requestOtp`,
    method: "post",
  },

  verify_otp: {
    url: `${backendDomin}/api/verifyOtp`,
    method: "post",
  },

  new_psw: {
    url: `${backendDomin}/api/newPsw`,
    method: "post",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  updateUserRole: {
    url: `${backendDomin}/api/update-user-role`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  deleteProduct: {
    url: `${backendDomin}/api/delete-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "post",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },

  createOrder: {
    url: `${backendDomin}/api/create-order`,
    method: 'post'
  },
  saveOrder: {
    url: `${backendDomin}/api/save-order`,
    method: 'post'
  },
  paymentSuccess: {
    url: `${backendDomin}/api/payment-success`,
    method: 'post'
  },
  invoiceDownload: {
    url: `${backendDomin}/api/invoice-download`,
    method: 'get'
  },
  invoiceDelete :{
    url : `${backendDomin}/api/invoice-delete`,
    method:"post"
  },
  getOrders: {
    url: `${backendDomin}/api/get-orders`,
    method: 'post'
  },
  getOrder: {
    url: `${backendDomin}/api/get-order`,
    method: 'post'
  },
  cancelOrder: {
    url: `${backendDomin}/api/cancel-order`,
    method: 'post'
  },
  changeStatus: {
    url: `${backendDomin}/api/change-status`,
    method: 'post'
  }
};

export default SummaryApi;
