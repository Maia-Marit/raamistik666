import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// API aadress
const API_URL = "http://192.168.42.160:3003/people";

// ------------------------------------
// 1. AVALEHT
// ------------------------------------

function Home() {
  return (
    <div style={pageStyle}>
      <h2>Avaleht</h2>

      <p>Tere tulemast minu Reacti rakendusse!</p>

      <p>Rakendus kasutab inimeste andmete haldamiseks API-t.</p>
    </div>
  );
}

// ------------------------------------
// 2. MEIE
// ------------------------------------

function About() {
  // Inimeste nimekiri
  const [inimesed, setInimesed] = useState([]);

  // Vorm
  const [naitaVormi, setNaitaVormi] = useState(false);

  // Väljad
  const [nimi, setNimi] = useState("");
  const [vanus, setVanus] = useState("");

  // Muutmise olek
  const [muudetavInimene, setMuudetavInimene] = useState(null);

  // ------------------------------------
  // GET
  // Võtame inimesed API-st
  // ------------------------------------

  async function laeInimesed() {
    try {
      const response = await fetch(API_URL);

      const andmed = await response.json();

      setInimesed(andmed);
    } catch (error) {
      console.error("Inimeste laadimine ebaõnnestus:", error);
    }
  }

  // Laeme inimesed kohe, kui leht avaneb
  useEffect(() => {
    laeInimesed();
  }, []);

  // ------------------------------------
  // POST
  // UUE INIMESE LISAMINE
  // ------------------------------------

  async function lisaInimene() {
    if (nimi === "" || vanus === "") {
      alert("Palun täida mõlemad väljad!");
      return;
    }

    const uusInimene = {
      nimi: nimi,
      vanus: Number(vanus),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(uusInimene),
      });

      if (!response.ok) {
        throw new Error("Inimese lisamine ebaõnnestus");
      }

      // Laeme API-st värsked andmed
      await laeInimesed();

      // Tühjendame vormi
      setNimi("");
      setVanus("");

      setNaitaVormi(false);
    } catch (error) {
      console.error(error);
    }
  }

  // ------------------------------------
  // DELETE
  // INIMESE KUSTUTAMINE
  // ------------------------------------

  async function kustutaInimene(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Kustutamine ebaõnnestus");
      }

      // Laeme uuesti inimesed
      await laeInimesed();
    } catch (error) {
      console.error(error);
    }
  }

  // ------------------------------------
  // PUT
  // INIMESE TÄIELIK MUUTMINE
  // ------------------------------------

  async function muudaPUT() {
    if (nimi === "" || vanus === "") {
      alert("Palun täida mõlemad väljad!");
      return;
    }

    const muudetudInimene = {
      nimi: nimi,
      vanus: Number(vanus),
    };

    try {
      const response = await fetch(`${API_URL}/${muudetavInimene.id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(muudetudInimene),
      });

      if (!response.ok) {
        throw new Error("PUT muutmine ebaõnnestus");
      }

      await laeInimesed();

      setMuudetavInimene(null);
      setNimi("");
      setVanus("");
    } catch (error) {
      console.error(error);
    }
  }

  // ------------------------------------
  // PATCH
  // MUUDAME AINULT NIME
  // ------------------------------------

  async function muudaPATCH(id) {
    if (nimi === "") {
      alert("Sisesta uus nimi!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          nimi: nimi,
        }),
      });

      if (!response.ok) {
        throw new Error("PATCH muutmine ebaõnnestus");
      }

      await laeInimesed();

      setNimi("");
    } catch (error) {
      console.error(error);
    }
  }

  // ------------------------------------
  // MUUTMISE ALUSTAMINE
  // ------------------------------------

  function alustaMuutmist(inimene) {
    setMuudetavInimene(inimene);

    setNimi(inimene.nimi);
    setVanus(inimene.vanus);

    setNaitaVormi(true);
  }

  return (
    <div style={pageStyle}>
      <h2>Meie</h2>

      <p>API kaudu saadud inimesed:</p>

      {/* ------------------------------------
          INIMESTE KUVA
      ------------------------------------ */}

      <div style={namesContainerStyle}>
        {inimesed.map((inimene) => (
          <div key={inimene.id} style={personCardStyle}>
            <strong>{inimene.nimi}</strong>

            <span>{inimene.vanus} aastat</span>

            <div style={personButtonsStyle}>
              {/* PUT */}
              <button
                onClick={() => alustaMuutmist(inimene)}
                style={smallButtonStyle}
              >
                Muuda
              </button>

              {/* DELETE */}
              <button
                onClick={() => kustutaInimene(inimene.id)}
                style={deleteButtonStyle}
              >
                Kustuta
              </button>

              {/* PATCH */}
              <button
                onClick={() => {
                  const uusNimi = prompt("Sisesta uus nimi:", inimene.nimi);

                  if (uusNimi) {
                    setNimi(uusNimi);

                    setTimeout(() => {
                      muudaPATCH(inimene.id);
                    }, 0);
                  }
                }}
                style={patchButtonStyle}
              >
                PATCH nimi
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------------------
          LISA / MUUDA NUPP
      ------------------------------------ */}

      <button
        onClick={() => {
          setNaitaVormi(!naitaVormi);

          if (muudetavInimene) {
            setMuudetavInimene(null);
            setNimi("");
            setVanus("");
          }
        }}
        style={addButtonStyle}
      >
        {naitaVormi ? "Sulge" : "Lisa inimene"}
      </button>

      {/* ------------------------------------
          VORM
      ------------------------------------ */}

      {naitaVormi && (
        <div style={formStyle}>
          <h3>{muudetavInimene ? "Muuda inimest" : "Lisa uus inimene"}</h3>

          <input
            type="text"
            placeholder="Nimi"
            value={nimi}
            onChange={(e) => setNimi(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Vanus"
            value={vanus}
            onChange={(e) => setVanus(e.target.value)}
            style={inputStyle}
          />

          {muudetavInimene ? (
            <button onClick={muudaPUT} style={buttonStyle}>
              Salvesta PUT
            </button>
          ) : (
            <button onClick={lisaInimene} style={buttonStyle}>
              Lisa POST
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ------------------------------------
// 3. PEAMINE APP
// ------------------------------------

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

// ------------------------------------
// STIILID
// ------------------------------------

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
};

const addButtonStyle = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "20px",
};

const namesContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "20px",
};

const personCardStyle = {
  backgroundColor: "#e2e8f0",
  padding: "15px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
};

const personButtonsStyle = {
  display: "flex",
  gap: "8px",
  marginLeft: "auto",
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

const smallButtonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "7px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "7px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const patchButtonStyle = {
  backgroundColor: "#6f42c1",
  color: "white",
  border: "none",
  padding: "7px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const formStyle = {
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "white",
};

const inputStyle = {
  display: "block",
  width: "250px",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
};
