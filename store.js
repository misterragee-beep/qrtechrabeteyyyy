// Prototype-only in-memory store.
// Replace this with PostgreSQL/Supabase before production.

const businesses = [
  {
    id: "biz_demo",
    name: "Demo Salon",
    googleReviewUrl: "https://www.google.com/",
    status: "active",
    prompts: [
      { id: "p1", label: "Service", text: "The service was good and matched what I needed." },
      { id: "p2", label: "Staff", text: "The staff were friendly and helpful." },
      { id: "p3", label: "Cleanliness", text: "The place was clean and comfortable." },
      { id: "p4", label: "Value", text: "I felt the service was good value for the price." }
    ]
  }
];

const qrs = [
  { id: "qr_demo", token: "DEMO-8K2P-7XQ9", businessId: "biz_demo", status: "active", createdAt: new Date().toISOString(), scans: 0 }
];

const events = [];

export function getBusinesses(){ return businesses; }
export function getBusiness(id){ return businesses.find(b => b.id === id); }
export function getQrByToken(token){ return qrs.find(q => q.token === token); }
export function getQrs(){ return qrs; }
export function getEvents(){ return events; }

export function addBusiness({name, googleReviewUrl}) {
  const b = { id: "biz_" + Date.now(), name, googleReviewUrl, status:"active",
    prompts: [
      {id:"p_"+Date.now()+"_1", label:"Service", text:"The service was good and suited my needs."},
      {id:"p_"+Date.now()+"_2", label:"Staff", text:"The staff were friendly and helpful."},
      {id:"p_"+Date.now()+"_3", label:"Cleanliness", text:"The place was clean and comfortable."}
    ]
  };
  businesses.push(b); return b;
}
export function addQr(businessId) {
  const token = crypto.randomUUID().replaceAll("-","").slice(0,16).toUpperCase();
  const q = {id:"qr_"+Date.now(), token, businessId, status:"active", createdAt:new Date().toISOString(), scans:0};
  qrs.push(q); return q;
}
export function toggleQr(id) {
  const q=qrs.find(x=>x.id===id); if(q) q.status=q.status==="active"?"disabled":"active"; return q;
}
export function logEvent(data) {
  const event={id:"evt_"+Date.now()+"_"+Math.random().toString(36).slice(2,7), ...data, timestamp:new Date().toISOString()};
  events.push(event); return event;
}
export function incrementScan(token) {
  const q=getQrByToken(token); if(q) q.scans=(q.scans||0)+1;
  return q;
}