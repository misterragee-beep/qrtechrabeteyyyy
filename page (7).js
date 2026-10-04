 "use client";
import {useEffect,useState} from "react";
import {useParams} from "next/navigation";

export default function Customer(){
  const {token}=useParams();
  const [data,setData]=useState(null);
  const [selected,setSelected]=useState([]);
  const [custom,setCustom]=useState("");
  const [copied,setCopied]=useState(false);

  useEffect(()=>{ fetch("/api/qr/"+token).then(r=>r.json()).then(setData); },[token]);

  if(!data) return <div className="container">Loading...</div>;
  if(data.error) return <div className="container"><div className="card"><h2>QR unavailable</h2><p>{data.error}</p></div></div>;

  const toggle=(p)=>setSelected(s=>s.includes(p.id)?s.filter(x=>x!==p.id):[...s,p.id]);
  const generated = selected.map(id=>data.business.prompts.find(p=>p.id===id)?.text).filter(Boolean).join(" ");
  const review = custom || generated || "I had a good experience here. Please edit this to reflect your own experience before posting.";

  async function copy(){
    await navigator.clipboard.writeText(review);
    setCopied(true);
    await fetch("/api/events",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({token,action:"copy_review"})});
  }
  async function openGoogle(){
    await fetch("/api/events",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({token,action:"open_google"})});
    window.location.href=data.business.googleReviewUrl;
  }

  return <main>
    <div className="nav"><div className="nav-inner"><div className="brand">{data.business.name}</div></div></div>
    <div className="container">
      <div className="card">
        <h1 className="title" style={{fontSize:27}}>How was your experience?</h1>
        <p className="muted">Select the points that genuinely describe your visit, then edit the draft so it reflects your own experience.</p>
        <div className="row" style={{margin:"18px 0"}}>
          {data.business.prompts.map(p=><button key={p.id} className={"pill "+(selected.includes(p.id)?"selected":"")} onClick={()=>toggle(p)}>{p.label}</button>)}
        </div>
        <textarea className="textarea" value={custom || generated} onChange={e=>setCustom(e.target.value)} placeholder="Write or edit your own review here..."/>
        <div className="notice" style={{marginTop:14}}>
          Please only post a review that accurately reflects your own experience.
        </div>
        <div className="row" style={{marginTop:14}}>
          <button className="btn secondary" onClick={copy}>{copied?"Copied":"Copy review"}</button>
          <button className="btn success" onClick={openGoogle}>Open Google Reviews</button>
        </div>
      </div>
    </div>
  </main>
}