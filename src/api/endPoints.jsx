import { LOGOUT_THREAD, ADD_CATEGORY,GET_ALL_CATEGORIES  } from "./ApiThread";
//http://localhost:3333/admin/logout

/*And endPoint has the 3 parts 
    baseUrl => constant
    resource Routes => change depending on the request
    params=> the paramaters that come with : first /:4

    endPoint = baseUrl + routes + parameter

*/
export const baseUrl = (url)=> "http://localhost:3333" + url;
const makeUrl = (endPoint, params = {}) => {
  for (var param in params) {
    endPoint = endPoint.replace(param, params[param]);
  }
  // support without [:]
  var oldEndPoint;
  do {
    oldEndPoint = endPoint;
    endPoint = endPoint.replace(":", "");
  } while (oldEndPoint !== endPoint);

  return baseUrl(endPoint, "");
};

export const apiEndPoints = {
  [LOGOUT_THREAD]: {
    endPoint: () => makeUrl("/admin/logout"),
    apiMethod:"post",
  },
  [ADD_CATEGORY ]:{
    endPoint: () => makeUrl("/admin/products/add-cat"),
    apiMethod:"post",
  },
  [GET_ALL_CATEGORIES]:{
    endPoint: () => makeUrl("/admin/products/cats/all"),
    apiMethod:"get",
  }
}