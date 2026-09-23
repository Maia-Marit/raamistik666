import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// 1. Esimene leht: Avaleht (Nüüd on siin lihtsalt puhas tekst)
function Home() {
  return (
    <div style={pageStyle}>
      <h2>Avaleht</h2>
      <p>Tere tulemast minu kahelehelise Reacti rakenduse avalehele!</p>
    </div>
  );
}

// 2. Teine leht: Meist (Siia kuva-nupp ja nimed üksteise kõrval)
function About() {
  // Olek, mis määrab, kas nimed on nähtavad või mitte
  const [naitaSid, setNaitaSid] = useState(false);

  // Kolm nime, mida kuvada
  const nimed = ["Maia-Marit", "Eneli", "Birgit"];

  return (
    <div style={pageStyle}>
      <h2>Meie</h2>
      <p>Klikki, et näha kes on selle loojad</p>

      {/* Nupp nimede kuvamiseks või peitmiseks */}
      <button onClick={() => setNaitaSid(!naitaSid)} style={buttonStyle}>
        {naitaSid ? "Peida nimed" : "Kuva"}
      </button>

      {/* Kui naitaSid on true, kuvatakse nimed üksteise kõrval */}
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
        {/* Navigatsioonimenüü */}
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>
            Avaleht
          </Link>
          <Link to="/meist" style={linkStyle}>
            Meist
          </Link>
        </nav>

        {/* Lehtede sisu */}
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
  display: "block", // Paneb nupu omaette reale
};

// UUS: Konteiner, mis paneb nimed ritta (Flexbox) ja lisab vahed
const namesContainerStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "15px",
  marginTop: "20px",
  flexWrap: "wrap", // Kui ekraan on kitsas, hüppavad nimed järgmisele reale
};

// UUS: Üksiku nime kujundus
const nameItemStyle = {
  backgroundColor: "#e2e8f0",
  padding: "8px 15px",
  borderRadius: "20px",
  fontSize: "16px",
  fontWeight: "500",
  color: "#1a202c",
};
