import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const xx=require("generate-password");
const cryptoJS= require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  GenerarPassword(){
    let password= xx.generate({
      length: 10,
      numbers: true
    });
    return password;
  }

  EncriptarPassword(password:string){
    let passwordE= cryptoJS.MD5(password);
    return passwordE;
  }
}
