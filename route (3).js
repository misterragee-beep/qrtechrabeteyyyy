import {getQrByToken,getBusiness,incrementScan} from '../../../../lib/store';
export async function GET(req,{params}){
  const q=getQrByToken(params.token);
  if(!q||q.status!=="active") return Response.json({error:"This QR code is invalid or disabled."},{status:404});
  incrementScan(params.token);
  const business=getBusiness(q.businessId);
  return Response.json({business,qr:{id:q.id,token:q.token}});
}