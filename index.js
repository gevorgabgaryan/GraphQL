import API from "./API"
import MongooseService from "./db/MongooseService";
import logger from "./lib/logger";
import AdminInit from './helper/InitAdmin'

(async ()=>{
    try{
        await MongooseService.init();
        await API.init();
        await AdminInit.init()
    } catch(e) {
        logger.error(e)
    }
})()