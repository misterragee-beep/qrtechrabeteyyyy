import {addBusiness} from "../../../lib/store";
export async function POST(req){
  const body=await req.json();
  if(!body.name||!body.googleReviewUrl) return Response.json({error:"Name and Google review URL are required"},{status:400});
  return Response.json(addBusiness(body));
}