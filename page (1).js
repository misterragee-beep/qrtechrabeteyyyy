 "use client";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Admin(){
  const [data,setData]=useState(null);
  const [name,setName]=useState("");
  const [url,setUrl]=useState("");
  const [msg,setMsg]=useState("");

  async function load(){ setData(await fetch("/api/admin").then(r=>r.json())); }
  useEffect(()=>{load()},[]);

  async function addBusiness(e){
    e.preventDefault();
    const r=await fetch("/api/businesses",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name,googleReviewUrl:url})});
    const x=await r.json(); setMsg(x.error||"Business added"); setName("");setUrl("");load();
  }
  async function addQr(businessId){
    await fetch("/api/qrs",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({businessId})}); load();
  }
  async function toggle(id){ await fetch("/api/qrs/"+id,{method:"PATCH"}); load(); }

  if(!data) return <div className="container">Loading...</div>;
  return <main>
    <div className="nav"><div className="nav-inner"><div className="brand">Admin Dashboard</div><Link href="/">Home</Link></div></div>
    <div className="container grid">
      <div className="grid grid-3">
        <div className="card"><div className="muted">Businesses</div><div className="stat">{data.businesses.length}</div></div>
        <div className="card"><div className="muted">QR codes</div><div className="stat">{data.qrs.length}</div></div>
        <div className="card"><div className="muted">Logged events</div><div className="stat">{data.events.length}</div></div>
      </div>

      <div className="card">
        <h2>Add business</h2>
        <form onSubmit={addBusiness} className="grid grid-2">
          <input className="input" placeholder="Business name" value={name} onChange={e=>setName(e.target.value)} required/>
          <input className="input" placeholder="Google review URL" value={url} onChange={e=>setUrl(e.target.value)} required/>
          <button className="btn" type="submit">Add business</button>
        </form>
        {msg && <p className="muted">{msg}</p>}
      </div>

      {data.businesses.map(b=><div className="card" key={b.id}>
        <div className="space">
          <div><h2 style={{margin:"0 0 6px"}}>{b.name}</h2><span className={"badge "+b.status}>{b.status}</span></div>
          <button className="btn" onClick={()=>addQr(b.id)}>+ Create QR</button>
        </div>
        <p className="small muted">{b.googleReviewUrl}</p>
        <hr/>
        <div className="grid">
          {data.qrs.filter(q=>q.businessId===b.id).map(q=><div key={q.id} className="space">
            <div><strong>{q.token}</strong><div className="small muted">{q.scans||0} scans · {new Date(q.createdAt).toLocaleString()}</div></div>
            <div className="row">
              <Link className="btn secondary" href={"/q/"+q.token}>Open</Link>
              <button className={"btn "+(q.status==="active"?"danger":"success")} onClick={()=>toggle(q.id)}>{q.status==="active"?"Disable":"Enable"}</button>
            </div>
          </div>)}
        </div>
      </div>)}
    </div>
  </main>
}