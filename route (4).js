import {getQrByToken,logEvent} from "../../../lib/store";
export async function POST(req){
  const body=await req.json();
  const q=getQrByToken(body.token);
  if(!q) return Response.json({error:"Invalid QR"},{status:404});
  return Response.json(logEvent({qrId:q.id,businessId:q.businessId,action:body.action||"unknown"}));
}