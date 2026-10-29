
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import CourseCard from "./coursecard";
import CourseManager from "./coursemanager";

import i18n from "./i18n";
import { useTranslation } from "react-i18next";

// API aadress
const API_URL = "http://192.168.42.160:3003/people";

// ------------------------------------
// 1. AVALEHT
// ------------------------------------

function Home() {
  const { t } = useTranslation();
  const [olek, setOlek] = useState("algus");

  const käivitaProtsess = () => {
    setOlek("laadimine");

    setTimeout(() => {
      const onEdukas = Math.random() > 0.5;

      if (onEdukas) {
        setOlek("edu");
      } else {
        setOlek("viga");

        setTimeout(() => {
          setOlek("algus");
        }, 2500);
      }
    }, 2000);
  };

  return (
    <div style={pageStyle}>
      <h2>{t("home")}</h2>
      <p>{t("welcome")}</p>
      <p>{t("apiInfo")}</p>

      {/* Kursusekaart */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "25px",
          marginBottom: "30px",
        }}
      >
        <CourseCard
          image="https://i.pinimg.com/736x/0e/ee/9b/0eee9bfaf9217cacbc7aa387b6f07bb9.jpg"
          title={t("courseTitle")}
          description={t("courseDescription")}
        />
      </div>

      <CourseManager />

      {/* Tahvli nupu simulatsioon */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h3>{t("simulation")}</h3>

        {olek === "algus" && (
          <div>
            <p>{t("pressToStart")}</p>
            <button
              onClick={käivitaProtsess}
              style={buttonStyle}
            >
              {t("start")}
            </button>
          </div>
        )}

        {olek === "laadimine" && (
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#ffa500",
            }}
          >
            🔄 {t("loading")}
          </p>
        )}

        {olek === "edu" && (
          <div style={{ color: "green" }}>
            <p style={{ fontSize: "24px" }}>
              ✓ {t("successTitle")}
            </p>
            <p>{t("success")}</p>
            <button
              onClick={() => setOlek("algus")}
              style={smallButtonStyle}
            >
              {t("restart")}
            </button>
          </div>
        )}

        {olek === "viga" && (
          <div style={{ color: "red" }}>
            <p style={{ fontSize: "24px" }}>
              ⚠️ {t("error")}
            </p>
            <p>{t("returning")}</p>
            <button
              onClick={() => setOlek("algus")}
              style={deleteButtonStyle}
            >
              {t("back")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// ------------------------------------
// 2. MEIE
// ------------------------------------
function About() {
  const [inimesed, setInimesed] = useState([]);
  const [naitaVormi, setNaitaVormi] = useState(false);
  const [nimi, setNimi] = useState("");
  const [vanus, setVanus] = useState("");
  const [muudetavInimene, setMuudetavInimene] = useState(null);

  async function laeInimesed() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Inimeste laadimine ebaõnnestus");
      }

      const andmed = await response.json();
      setInimesed(andmed);
    } catch (error) {
      console.error(
        "Inimeste laadimine ebaõnnestus:",
        error
      );
    }
  }

  useEffect(() => {
    laeInimesed();
  }, []);

  async function lisaInimene() {
    if (nimi.trim() === "" || vanus === "") {
      alert("Palun täida mõlemad väljad!");
      return;
    }

    const uusInimene = {
      nimi: nimi.trim(),
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

      await laeInimesed();
      setNimi("");
      setVanus("");
      setNaitaVormi(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function kustutaInimene(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Kustutamine ebaõnnestus");
      }

      await laeInimesed();
    } catch (error) {
      console.error(error);
    }
  }

  async function muudaPUT() {
    if (nimi.trim() === "" || vanus === "") {
      alert("Palun täida mõlemad väljad!");
      return;
    }

    const muudetudInimene = {
      nimi: nimi.trim(),
      vanus: Number(vanus),
    };

    try {
      const response = await fetch(
        `${API_URL}/${muudetavInimene.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(muudetudInimene),
        }
      );

      if (!response.ok) {
        throw new Error("PUT muutmine ebaõnnestus");
      }

      await laeInimesed();
      setMuudetavInimene(null);
      setNimi("");
      setVanus("");
      setNaitaVormi(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function muudaPATCH(id, uusNimi) {
    if (uusNimi.trim() === "") {
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
          nimi: uusNimi.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("PATCH muutmine ebaõnnestus");
      }

      await laeInimesed();
    } catch (error) {
      console.error(error);
    }
  }

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

      <div style={namesContainerStyle}>
        {inimesed.map((inimene) => (
          <div key={inimene.id} style={personCardStyle}>
            <strong>{inimene.nimi}</strong>
            <span>{inimene.vanus} aastat</span>

            <div style={personButtonsStyle}>
              <button
                onClick={() => alustaMuutmist(inimene)}
                style={smallButtonStyle}
              >
                Muuda
              </button>

              <button
                onClick={() => kustutaInimene(inimene.id)}
                style={deleteButtonStyle}
              >
                Kustuta
              </button>

              <button
                onClick={() => {
                  const uusNimi = prompt(
                    "Sisesta uus nimi:",
                    inimene.nimi
                  );

                  if (uusNimi !== null && uusNimi.trim()) {
                    muudaPATCH(inimene.id, uusNimi);
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

      {naitaVormi && (
        <div style={formStyle}>
          <h3>
            {muudetavInimene
              ? "Muuda inimest"
              : "Lisa uus inimene"}
          </h3>

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
            <button
              onClick={muudaPUT}
              style={buttonStyle}
            >
              Salvesta PUT
            </button>
          ) : (
            <button
              onClick={lisaInimene}
              style={buttonStyle}
            >
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
  const { t, i18n } = useTranslation();

  return (
    <Router>
      <div style={appContainerStyle}>
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>
            {t("home")}
          </Link>

          <Link to="/meist" style={linkStyle}>
            {t("about")}
          </Link>

          <select
            value={i18n.language.startsWith("en") ? "en" : "et"}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            style={{ marginLeft: "15px", padding: "8px" }}
            aria-label={t("language")}
          >
            <option value="et">Eesti</option>
            <option value="en">English</option>
          </select>
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
// 4. STIILID
// ------------------------------------
const appContainerStyle = {
  fontFamily: "Arial, sans-serif",
  padding: "20px",
};

const navStyle = {
  display: "flex",
  gap: "15px",
  marginBottom: "20px",
};

const linkStyle = {
  textDecoration: "none",
  color: "blue",
  fontWeight: "bold",
};

const contentStyle = {
  padding: "10px",
};

const pageStyle = {
  maxWidth: "900px",
  margin: "0 auto",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const smallButtonStyle = {
  padding: "5px 10px",
  margin: "2px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "5px 10px",
  margin: "2px",
  background: "red",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const patchButtonStyle = {
  padding: "5px 10px",
  margin: "2px",
  background: "gray",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const addButtonStyle = {
  padding: "10px 20px",
  marginTop: "15px",
  cursor: "pointer",
};

const namesContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const personCardStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
};

const personButtonsStyle = {
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
};

const formStyle = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "300px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

