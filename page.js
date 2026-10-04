import Link from "next/link";

export default function Home(){
  return <main>
    <div className="nav"><div className="nav-inner"><div className="brand">Review QR Prototype</div><Link href="/admin">Admin</Link></div></div>
    <div className="container">
      <div className="card center" style={{marginTop:30}}>
        <h1 className="title">QR Review Assistance</h1>
        <p className="muted">Prototype for authorized business QR codes and genuine customer review assistance.</p>
        <hr/>
        <p>Demo QR token:</p>
        <Link className="btn" href="/q/DEMO-8K2P-7XQ9">Open Demo Customer Flow</Link>
      </div>
    </div>
  </main>
}