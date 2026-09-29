
import { useState, useEffect } from "react";
import algsedInimesed from "./inimesed.json";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

// 1. Esimene leht: Avaleht
function Home() {
  const [inimesed, setInimesed] = useState(algsedInimesed);
  const [lisaInimene, setLisaInimene] = useState(false);

  const [nimi, setNimi] = useState("");
  const [vanus, setVanus] = useState("");

function lisaUusInimene() {
  console.log("LISA NUPPU VAJUTATI");

  const uusInimene = {
    nimi: nimi,
    vanus: Number(vanus),
  };

  const uuedInimesed = [...inimesed, uusInimene];

  setInimesed(uuedInimesed);

  setNimi("");
  setVanus("");
  setLisaInimene(false);
}

 
  return (
    <div style={pageStyle}>
      <h2>Avaleht</h2>

      <h3>Inimesed</h3>

      {inimesed.map((inimene, indeks) => (
        <p key={indeks}>
          {inimene.nimi} - {inimene.vanus} aastat
        </p>
      ))}

      <button
        onClick={() => setLisaInimene(!lisaInimene)}
        style={buttonStyle}
      >
        {lisaInimene ? "Sulge" : "Lisa inimene"}
      </button>

      {lisaInimene && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            placeholder="Nimi"
            value={nimi}
            onChange={(e) => setNimi(e.target.value)}
          />

          <input
            type="number"
            placeholder="Vanus"
            value={vanus}
            onChange={(e) => setVanus(e.target.value)}
          />

          <button onClick={lisaUusInimene} style={buttonStyle}>
            Lisa
          </button>
        </div>
      )}
    </div>
  );
}

// 2. Teine leht: Meist
function About() {
  const [naitaSid, setNaitaSid] = useState(false);

  const nimed = ["Maia-Marit", "Eneli", "Birgit"];

  return (
    <div style={pageStyle}>
      <h2>Meie</h2>
      <p>Klikki, et näha kes on selle Äppi loojad</p>

      <button
        onClick={() => setNaitaSid(!naitaSid)}
        style={buttonStyle}
      >
        {naitaSid ? "Peida nimed" : "Kuva"}
      </button>

      {naitaSid && (
        <div style={namesContainerStyle}>
          {nimed.map((nimi, indeks) => (
            <span key={indeks} style={nameItemStyle}>
              {nimi}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Peamine App komponent
export default function App() {
  return (
    <Router>
      <div style={appContainerStyle}>
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>
            Avaleht
          </Link>

          <Link to="/meist" style={linkStyle}>
            Meist
          </Link>
        </nav>

        <main style={contentStyle}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meist" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// --- Stiilid ---

const appContainerStyle = {
  fontFamily: "Arial, sans-serif",
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

const navStyle = {
  display: "flex",
  gap: "20px",
  borderBottom: "2px solid #ccc",
  paddingBottom: "10px",
  marginBottom: "20px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#007bff",
  fontWeight: "bold",
};

const pageStyle = {
  padding: "10px 0",
};

const contentStyle = {
  backgroundColor: "#f9f9f9",
  padding: "20px",
  borderRadius: "8px",
  minHeight: "200px",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
  display: "block",
};

const namesContainerStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "15px",
  marginTop: "20px",
  flexWrap: "wrap",
};

const nameItemStyle = {
  backgroundColor: "#e2e8f0",
  padding: "8px 15px",
  borderRadius: "20px",
  fontSize: "16px",
  fontWeight: "500",
  color: "#1a202c",
};
