import bcrypt from "bcrypt";
import client from "../../client";
import  jwt  from "jsonwebtoken";

export default {
  Mutation: {
    
    login: async (_,{username, password}) =>{
        //find user with args.username
        const user = await client.user.findFirst({where:{username}});
        if(!user){
          return{
              ok: false,
              error: "User not found",              
          };     
        }

        const passwordOk = await bcrypt.compare(password, user.password);
        if(!passwordOk){
            return{
                ok: false,
                error: "password is not incorrect"
            }
        }

        const token = await jwt.sign({id:user.id}, process.env.SECRET_KEY);      
        return{
            ok: true,
            token,
        }      
        
      //  const token = await jwt.sign({id:user.id}, process.env.SECRET_KEY);

      //  console.log(token);
   
        //const passwordOk = await bcrypt.compare(password, user.password);
        //console.log(passwordOk);
        //check password with args.password
        //issue a token   
      },
  },
};