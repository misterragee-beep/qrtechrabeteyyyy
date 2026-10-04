import {toggleQr} from "../../../../lib/store";
export async function PATCH(req,{params}){ return Response.json(toggleQr(params.id)); }