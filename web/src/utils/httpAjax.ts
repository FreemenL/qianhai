import axios from "axios";

class httpAjax{
  static get(url:string, data:any, config={}){
    return httpAjax.fetch('get')(url, data, config)
  }
  static post(url:string, data:any, config={}){
    return httpAjax.fetch('post')(url, data, config)
  }
  static fetch(method:string){
    return function(url:string, data:any, config?:object){
      return new Promise((resolve, reject) => {
        axios[method](url, data, config)
          .then(result => {
            if(0===result.data.code){
              return resolve(result.data.data);
            }
            reject(result.data.message);
          })
          .catch(result => {
            reject(result);
          })
      });
    }
  }
}


export default httpAjax;