import { formattedCurrency } from "../scripts/utils/money.js";
export class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;    
  }

  getRatingurl(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPriceCents() {
    return `${formattedCurrency(this.priceCents )}`;
  }

  extraInfoHtml(){
    return '';
  }
  
} 

class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHtml(){

    return `<a href ="${this.sizeChartLink}" target "_blank">Size Chart</a>`;
  }
}
 
class Appliances extends Product{
  instructionsLink;
  warrentyLink;

  constructor(productDetails){
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrentyLink = productDetails.warrentyLink;
  }

  extraInfoHtml(){
    return `<a href ="${this.instructionsLink}" target "_blank">Instructions</a>
    <a href ="${this.warrentyLink}" target "_blank">Warrenty</a>`
  }
}
export let products =[];
export function loadProductFetch(){
  const newPromise = fetch("https://supersimplebackend.dev/products")
  .then((response)=>{
    return response.json();
  }).then((responseText) =>{
     products = responseText.map( (productDetails) => {
  if(productDetails.type === 'clothing'){
    return new Clothing(productDetails);
  }
  else if(productDetails.type === 'appliances'){
     return new Appliances(productDetails);
  }
  return new Product(productDetails);
} );
  console.log(products);
 

})
  return newPromise;}

  


export function loadProducts(callBack){
const productReq = new XMLHttpRequest();
productReq.addEventListener('load',()=> {
  products = JSON.parse(productReq.response).map( (productDetails) => {
  if(productDetails.type === 'clothing'){
    return new Clothing(productDetails);
  }
  else if(productDetails.type === 'appliances'){
     return new Appliances(productDetails);
  }
  return new Product(productDetails);
} );
  console.log(products);
  callBack();

})
productReq.open('GET',"https://supersimplebackend.dev/products");
productReq.send();}

 