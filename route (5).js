import {addQr} from "../../../lib/store";
export async function POST(req){
  const {businessId}=await req.json();
  return Response.json(addQr(businessId));
}