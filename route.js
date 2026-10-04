import {getBusinesses,getQrs,getEvents} from "../../../lib/store";
export async function GET(){ return Response.json({businesses:getBusinesses(),qrs:getQrs(),events:getEvents()}); }