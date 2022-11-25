import { AuthenticationStrategy } from "@loopback/authentication";
import { Request, RedirectRoute, HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import parseBearerToken from 'parse-bearer-token'
import { parse } from "path";
import { AutenticacionService } from "../services";
import { service } from "@loopback/core";

//registrar cada estrategia en aplication.ts en lo ultimo

export class EstrategiaAdministrador implements AuthenticationStrategy{
    name: string="admin";

    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
        ){}

    async authenticate(request: Request): Promise<UserProfile | RedirectRoute> {
        let token=parseBearerToken(request);
        if (token) {
            let datos=this.servicioAutenticacion.ValidacionToken(token)
            if (datos) {
                if(datos.data.id==""){
                let perfil:UserProfile = Object.assign({
                    nombre:datos.data.nombre
                    });return perfil;
                    }else{
                        throw new HttpErrors[401]("Tiene un token valido pero no esta autorizado para este registro")
                    }         
            } else {
                throw new HttpErrors[401]("Token invalido")
            }
        }else{
            throw new HttpErrors[401]("No hay un token en esta solicitud");
        }
    }
}