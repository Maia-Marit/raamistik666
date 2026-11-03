import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  memo,
} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { useTranslation } from "react-i18next";

// ------------------------------------
// SEADED
// ------------------------------------

const PEOPLE_API_URL = "http://192.168.42.160:3003/people";
const COURSES_STORAGE_KEY = "react-kursused";

// ------------------------------------
// STIILID
// ------------------------------------

const appContainerStyle = {
  fontFamily: "Arial, sans-serif",
  padding: "20px",
  minHeight: "100vh",
  backgroundColor: "#fafafa",
};

const pageStyle = {
  padding: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
};

const navStyle = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "15px",
  padding: "15px 20px",
  backgroundColor: "#f1f1f1",
  marginBottom: "20px",
  borderRadius: "6px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#0756a5",
  fontWeight: "bold",
};

const contentStyle = {
  padding: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "15px",
};

const smallButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const patchButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const addButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#17a2b8",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  backgroundColor: "#f9f9f9",
  marginBottom: "20px",
};

const inputStyle = {
  padding: "9px",
  fontSize: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "100%",
  boxSizing: "border-box",
};

const horizontalScrollContainerStyle = {
  display: "flex",
  gap: "20px",
  overflowX: "auto",
  padding: "5px 2px 18px",
  scrollBehavior: "smooth",
  alignItems: "stretch",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
};

const cardImageStyle = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  backgroundColor: "#eee",
};

const cardContentStyle = {
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
};

const namesContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const personCardStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  backgroundColor: "#fff",
};

const personButtonsStyle = {
  display: "flex",
  gap: "5px",
  flexWrap: "wrap",
};

// ------------------------------------
// KURSUSEKAART
// ------------------------------------

const ItemCard = memo(function ItemCard({
  id,
  pilt,
  nimi,
  kirjeldus,
  onMuuda,
  onKustuta,
}) {
  return (
    <article
      style={{
        ...cardStyle,
        width: "280px",
        minWidth: "280px",
      }}
    >
      <img
        src={pilt || "https://picsum.photos/600/400"}
        alt={nimi}
        loading="lazy"
        style={cardImageStyle}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src =
            "https://picsum.photos/600/400?grayscale";
        }}
      />

      <div style={cardContentStyle}>
        <h3 style={{ margin: "0 0 8px" }}>
          {nimi}
        </h3>

        <p style={{ color: "#555", margin: "0 0 15px" }}>
          {kirjeldus}
        </p>

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "auto",
          }}
        >
          <button
            onClick={() => onMuuda(id)}
            style={smallButtonStyle}
            type="button"
          >
            Muuda
          </button>

          <button
            onClick={() => onKustuta(id)}
            style={deleteButtonStyle}
            type="button"
          >
            Kustuta
          </button>
        </div>
      </div>
    </article>
  );
});

// ------------------------------------
// KURSUSE VORM
// ------------------------------------

function CourseForm({
  muudetavId,
  algNimi,
  algKirjeldus,
  algPilt,
  onSalvesta,
  onTuhista,
}) {
  const [nimi, setNimi] = useState(algNimi || "");
  const [kirjeldus, setKirjeldus] = useState(
    algKirjeldus || ""
  );
  const [pilt, setPilt] = useState(algPilt || "");

  function handleSubmit(event) {
    event.preventDefault();

    if (!nimi.trim() || !kirjeldus.trim()) {
      alert("Palun täida nimi ja kirjeldus!");
      return;
    }

    onSalvesta({
      nimi: nimi.trim(),
      kirjeldus: kirjeldus.trim(),
      pilt: pilt.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3>
        {muudetavId !== null
          ? "Muuda kursust"
          : "Lisa uus kursus"}
      </h3>

      <input
        type="text"
        placeholder="Kursuse nimi"
        value={nimi}
        onChange={(e) => setNimi(e.target.value)}
        style={inputStyle}
        required
      />

      <textarea
        placeholder="Kirjeldus"
        value={kirjeldus}
        onChange={(e) => setKirjeldus(e.target.value)}
        rows={3}
        style={{
          ...inputStyle,
          resize: "vertical",
        }}
        required
      />

      <input
        type="url"
        placeholder="Pildi URL (valikuline)"
        value={pilt}
        onChange={(e) => setPilt(e.target.value)}
        style={inputStyle}
      />

      <div style={{ display: "flex", gap: "8px" }}>
        <button type="submit" style={buttonStyle}>
          Salvesta
        </button>

        <button
          type="button"
          onClick={onTuhista}
          style={deleteButtonStyle}
        >
          Tühista
        </button>
      </div>
    </form>
  );
}

// ------------------------------------
// KURSUSTE HALDAMINE
// ------------------------------------

function CourseManager() {
  const [kursused, setKursused] = useState(() => {
    try {
      const saved = localStorage.getItem(
        COURSES_STORAGE_KEY
      );

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Kursuste laadimine ebaõnnestus:", error);
      return [];
    }
  });

  const [naitaVormi, setNaitaVormi] = useState(false);
  const [muudetavId, setMuudetavId] = useState(null);

  // Salvestamine ainult siis, kui kursuste nimekiri muutub.
  useEffect(() => {
    try {
      localStorage.setItem(
        COURSES_STORAGE_KEY,
        JSON.stringify(kursused)
      );
    } catch (error) {
      console.error("Kursuste salvestamine ebaõnnestus:", error);
    }
  }, [kursused]);

  // Valitud kursuse leidmise optimeerimine.
  const valitudKursus = useMemo(
    () =>
      kursused.find(
        (kursus) => kursus.id === muudetavId
      ) || null,
    [kursused, muudetavId]
  );

  // Kursuse salvestamine.
  const handleSalvesta = useCallback(
    (andmed) => {
      if (muudetavId !== null) {
        setKursused((praegused) =>
          praegused.map((kursus) =>
            kursus.id === muudetavId
              ? { ...kursus, ...andmed }
              : kursus
          )
        );
      } else {
        setKursused((praegused) => [
          ...praegused,
          {
            id: `${Date.now()}-${Math.random()}`,
            ...andmed,
          },
        ]);
      }

      setMuudetavId(null);
      setNaitaVormi(false);
    },
    [muudetavId]
  );

  // Muutmise alustamine.
  const alustaMuutmist = useCallback((id) => {
    setMuudetavId(id);
    setNaitaVormi(true);
  }, []);

  // Kursuse kustutamine.
  const kustutaKursus = useCallback((id) => {
    if (!window.confirm("Kas soovid kursuse kustutada?")) {
      return;
    }

    setKursused((praegused) =>
      praegused.filter((kursus) => kursus.id !== id)
    );

    setMuudetavId((praegune) =>
      praegune === id ? null : praegune
    );

    setNaitaVormi(false);
  }, []);

  const avaVorm = useCallback(() => {
    setMuudetavId(null);
    setNaitaVormi((praegune) => !praegune);
  }, []);

  const tuhistaVorm = useCallback(() => {
    setNaitaVormi(false);
    setMuudetavId(null);
  }, []);

  return (
    <div style={pageStyle}>
      <h2>Kursuste galerii</h2>

      <p>
        Keri kursusekaarte horisontaalselt vasakule ja paremale.
      </p>

      <button
        onClick={avaVorm}
        style={addButtonStyle}
        type="button"
      >
        {naitaVormi
          ? "Sulge vorm"
          : "+ Lisa uus kursus"}
      </button>

      {naitaVormi && (
        <CourseForm
          key={muudetavId ?? "uus-kursus"}
          muudetavId={muudetavId}
          algNimi={valitudKursus?.nimi}
          algKirjeldus={valitudKursus?.kirjeldus}
          algPilt={valitudKursus?.pilt}
          onSalvesta={handleSalvesta}
          onTuhista={tuhistaVorm}
        />
      )}

      <div style={horizontalScrollContainerStyle}>
        {kursused.length === 0 ? (
          <p>
            Kursuseid pole veel lisatud. Lisa esimene kursus!
          </p>
        ) : (
          kursused.map((kursus) => (
            <ItemCard
              key={kursus.id}
              id={kursus.id}
              pilt={kursus.pilt}
              nimi={kursus.nimi}
              kirjeldus={kursus.kirjeldus}
              onMuuda={alustaMuutmist}
              onKustuta={kustutaKursus}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ------------------------------------
// AVALEHT
// ------------------------------------

function Home() {
  const { t } = useTranslation();

  const [olek, setOlek] = useState("algus");

  const kaivitaProtsess = useCallback(() => {
    setOlek("laadimine");

    window.setTimeout(() => {
      const onEdukas = Math.random() > 0.5;

      setOlek(onEdukas ? "edu" : "viga");

      if (!onEdukas) {
        window.setTimeout(() => {
          setOlek("algus");
        }, 2500);
      }
    }, 2000);
  }, []);

  return (
    <div style={pageStyle}>
      <h2>{t("home", "Avaleht")}</h2>

      <p>
        {t("welcome", "Tere tulemast meie rakendusse!")}
      </p>

      <p>
        {t(
          "apiInfo",
          "Siin saad tutvuda kursuste ja inimestega."
        )}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "25px",
          marginBottom: "30px",
        }}
      >
        <div style={{ ...cardStyle, width: "280px" }}>
          <img
            src="https://i.pinimg.com/736x/0e/ee/9b/0eee9bfaf9217cacbc7aa387b6f07bb9.jpg"
            alt="Kursus"
            loading="lazy"
            style={cardImageStyle}
          />

          <div style={cardContentStyle}>
            <h3>
              {t("courseTitle", "Meie kursus")}
            </h3>

            <p style={{ color: "#555", margin: 0 }}>
              {t(
                "courseDescription",
                "Õpi ja arenda uusi oskusi."
              )}
            </p>
          </div>
        </div>
      </div>

      <CourseManager />

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <h3>
          {t("simulation", "Tahvli nupu simulatsioon")}
        </h3>

        {olek === "algus" && (
          <>
            <p>
              {t(
                "pressToStart",
                "Vajuta protsessi alustamiseks."
              )}
            </p>

            <button
              onClick={kaivitaProtsess}
              style={buttonStyle}
              type="button"
            >
              {t("start", "Alusta")}
            </button>
          </>
        )}

        {olek === "laadimine" && (
          <p style={{ color: "#ffa500", fontSize: "20px" }}>
            🔄 {t("loading", "Laadimine...")}
          </p>
        )}

        {olek === "edu" && (
          <div style={{ color: "green" }}>
            <p style={{ fontSize: "24px" }}>
              ✓ {t("successTitle", "Õnnestus!")}
            </p>

            <p>
              {t(
                "success",
                "Protsess lõpetati edukalt."
              )}
            </p>

            <button
              onClick={() => setOlek("algus")}
              style={smallButtonStyle}
              type="button"
            >
              {t("restart", "Alusta uuesti")}
            </button>
          </div>
        )}

        {olek === "viga" && (
          <div style={{ color: "red" }}>
            <p style={{ fontSize: "24px" }}>
              ⚠️ {t("error", "Tekkis viga")}
            </p>

            <p>
              {t("returning", "Proovitakse uuesti.")}
            </p>

            <button
              onClick={() => setOlek("algus")}
              style={deleteButtonStyle}
              type="button"
            >
              {t("back", "Tagasi")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------------------------
// INIMESTE LEHT
// ------------------------------------

function About() {
  const [inimesed, setInimesed] = useState([]);
  const [laadimine, setLaadimine] = useState(true);
  const [viga, setViga] = useState("");

  const [naitaVormi, setNaitaVormi] = useState(false);
  const [nimi, setNimi] = useState("");
  const [vanus, setVanus] = useState("");
  const [muudetavInimene, setMuudetavInimene] = useState(null);

  // GET - inimeste laadimine.
  const laeInimesed = useCallback(async (signal) => {
    setLaadimine(true);
    setViga("");

    try {
      const response = await fetch(PEOPLE_API_URL, {
        signal,
      });

      if (!response.ok) {
        throw new Error(
          "Inimeste laadimine ebaõnnestus."
        );
      }

      const andmed = await response.json();

      setInimesed(
        Array.isArray(andmed) ? andmed : []
      );
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }

      setViga(
        `${error.message} Kontrolli API serveri tööd ja aadressi.`
      );
    } finally {
      if (!signal?.aborted) {
        setLaadimine(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    laeInimesed(controller.signal);

    return () => {
      controller.abort();
    };
  }, [laeInimesed]);

  // Vormiväljade puhastamine.
  const puhastaVorm = useCallback(() => {
    setNimi("");
    setVanus("");
    setMuudetavInimene(null);
    setNaitaVormi(false);
  }, []);

  // POST - inimese lisamine.
  async function lisaInimene(event) {
    event.preventDefault();

    if (!nimi.trim() || vanus === "" || Number(vanus) < 0) {
      alert("Palun sisesta korrektne nimi ja vanus!");
      return;
    }

    try {
      const response = await fetch(PEOPLE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nimi: nimi.trim(),
          vanus: Number(vanus),
        }),
      });

      if (!response.ok) {
        throw new Error("Inimese lisamine ebaõnnestus.");
      }

      await laeInimesed();
      puhastaVorm();
    } catch (error) {
      setViga(error.message);
    }
  }

  // DELETE - inimese kustutamine.
  async function kustutaInimene(id) {
    if (!window.confirm("Kas soovid inimese kustutada?")) {
      return;
    }

    try {
      const response = await fetch(
        `${PEOPLE_API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Kustutamine ebaõnnestus.");
      }

      await laeInimesed();
    } catch (error) {
      setViga(error.message);
    }
  }

  // PUT - inimese täielik muutmine.
  async function muudaPUT(event) {
    event.preventDefault();

    if (!nimi.trim() || vanus === "" || Number(vanus) < 0) {
      alert("Palun sisesta korrektne nimi ja vanus!");
      return;
    }

    try {
      const response = await fetch(
        `${PEOPLE_API_URL}/${muudetavInimene.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nimi: nimi.trim(),
            vanus: Number(vanus),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("PUT muutmine ebaõnnestus.");
      }

      await laeInimesed();
      puhastaVorm();
    } catch (error) {
      setViga(error.message);
    }
  }

  // PATCH - ainult nime muutmine.
  async function muudaPATCH(id, uusNimi) {
    if (!uusNimi?.trim()) return;

    try {
      const response = await fetch(
        `${PEOPLE_API_URL}/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nimi: uusNimi.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("PATCH muutmine ebaõnnestus.");
      }

      await laeInimesed();
    } catch (error) {
      setViga(error.message);
    }
  }

  // Muutmise alustamine.
  function alustaMuutmist(inimene) {
    setMuudetavInimene(inimene);
    setNimi(inimene.nimi ?? "");
    setVanus(String(inimene.vanus ?? ""));
    setNaitaVormi(true);
  }

  return (
    <div style={pageStyle}>
      <h2>Meie</h2>

      <p>API kaudu saadud inimesed:</p>

      {viga && (
        <p
          role="alert"
          style={{
            color: "red",
            padding: "10px",
            background: "#fff0f0",
          }}
        >
          {viga}
        </p>
      )}

      {laadimine ? (
        <p>Inimeste laadimine...</p>
      ) : (
        <div style={namesContainerStyle}>
          {inimesed.length === 0 && (
            <p>Inimesi pole veel lisatud.</p>
          )}

          {inimesed.map((inimene) => (
            <div
              key={inimene.id}
              style={personCardStyle}
            >
              <div>
                <strong>{inimene.nimi}</strong>

                <span style={{ marginLeft: "10px" }}>
                  {inimene.vanus} aastat
                </span>
              </div>

              <div style={personButtonsStyle}>
                <button
                  onClick={() => alustaMuutmist(inimene)}
                  style={smallButtonStyle}
                  type="button"
                >
                  Muuda
                </button>

                <button
                  onClick={() => kustutaInimene(inimene.id)}
                  style={deleteButtonStyle}
                  type="button"
                >
                  Kustuta
                </button>

                <button
                  onClick={() => {
                    const uusNimi = window.prompt(
                      "Sisesta uus nimi:",
                      inimene.nimi
                    );

                    if (
                      uusNimi !== null &&
                      uusNimi.trim()
                    ) {
                      muudaPATCH(inimene.id, uusNimi);
                    }
                  }}
                  style={patchButtonStyle}
                  type="button"
                >
                  PATCH nimi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => {
          if (naitaVormi) {
            puhastaVorm();
          } else {
            setMuudetavInimene(null);
            setNimi("");
            setVanus("");
            setNaitaVormi(true);
          }
        }}
        style={addButtonStyle}
        type="button"
      >
        {naitaVormi ? "Sulge" : "Lisa inimene"}
      </button>

      {naitaVormi && (
        <form
          onSubmit={
            muudetavInimene
              ? muudaPUT
              : lisaInimene
          }
          style={formStyle}
        >
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
            required
          />

          <input
            type="number"
            min="0"
            placeholder="Vanus"
            value={vanus}
            onChange={(e) => setVanus(e.target.value)}
            style={inputStyle}
            required
          />

          <div style={{ display: "flex", gap: "8px" }}>
            <button type="submit" style={buttonStyle}>
              {muudetavInimene
                ? "Salvesta PUT"
                : "Lisa POST"}
            </button>

            <button
              type="button"
              onClick={puhastaVorm}
              style={deleteButtonStyle}
            >
              Tühista
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// ------------------------------------
// PEAMINE RAKENDUS
// ------------------------------------

export default function App() {
  const { t, i18n } = useTranslation();

  const muudaKeelt = useCallback(
    (event) => {
      i18n.changeLanguage(event.target.value);
    },
    [i18n]
  );

  return (
    <Router>
      <div style={appContainerStyle}>
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>
            {t("home", "Avaleht")}
          </Link>

          <Link to="/meist" style={linkStyle}>
            {t("about", "Meie")}
          </Link>

          <select
            value={
              i18n.language?.startsWith("en")
                ? "en"
                : "et"
            }
            onChange={muudaKeelt}
            style={{
              marginLeft: "auto",
              padding: "8px",
            }}
            aria-label="Keel"
          >
            <option value="et">Eesti</option>
            <option value="en">English</option>
          </select>
        </nav>

        <main style={contentStyle}>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/meist"
              element={<About />}
            />

            <Route
              path="*"
              element={
                <div style={pageStyle}>
                  Lehte ei leitud.
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}