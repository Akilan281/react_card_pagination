export const CARD_LIST = "card_list"

export  const cardListing =(data)=>{
 return{
     type : CARD_LIST,
     payload: data
 }
}