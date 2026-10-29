import { useEffect, useState } from "react";
import "./App.css";

type Health = { status: string };

function App() {
  const [apiStatus, setApiStatus] = useState("checking…");

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json() as Promise<Health>)
      .then((data) => setApiStatus(data.status))
      .catch(() => setApiStatus("unreachable"));
  }, []);

  return (
    <main className="home">
      <h1>CivicFix</h1>
      <p>Report local problems. Track them until they're fixed.</p>
      <p className="status">
        API status: <strong>{apiStatus}</strong>
      </p>
    </main>
  );
}

export default App;