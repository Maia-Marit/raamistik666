

import { useEffect, useState } from "react";
import CourseCard from "./coursecard";

const initialCourses = [
  {
    id: 1,
    image: "SIIA_KASSIMAANIA_PILDI_URL",
    title: "Kassimaania 1. kursus",
    description: "SIIA KIRJUTA KASSIMAANIA KURSUSE KIRJELDUS",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/12134441/pexels-photo-12134441.jpeg",
    title: "Moodle kursus",
    description:
      "Siit leiad kursuse ülesanded, õppematerjalid ja muu vajaliku info.",
  },
];

export default function CourseManager() {
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem("my-courses");
      return saved ? JSON.parse(saved) : initialCourses;
    } catch {
      return initialCourses;
    }
  });

  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("my-courses", JSON.stringify(courses));
  }, [courses]);

  function resetForm() {
    setTitle("");
    setImage("");
    setDescription("");
    setEditingId(null);
    setFormOpen(false);
  }

  function addCourse() {
    setEditingId(null);
    setTitle("");
    setImage("");
    setDescription("");
    setFormOpen(true);
  }

  function editCourse(course) {
    setEditingId(course.id);
    setTitle(course.title);
    setImage(course.image);
    setDescription(course.description);
    setFormOpen(true);
  }

  function saveCourse(event) {
    event.preventDefault();

    const courseData = {
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
    };

    if (
      !courseData.title ||
      !courseData.image ||
      !courseData.description
    ) {
      return;
    }

    if (editingId !== null) {
      setCourses((current) =>
        current.map((course) =>
          course.id === editingId
            ? { ...course, ...courseData }
            : course
        )
      );
    } else {
      setCourses((current) => [
        ...current,
        {
          id: Date.now(),
          ...courseData,
        },
      ]);
    }

    resetForm();
  }

  function deleteCourse(id) {
    if (window.confirm("Kas soovid selle kursuse kustutada?")) {
      setCourses((current) =>
        current.filter((course) => course.id !== id)
      );

      if (editingId === id) {
        resetForm();
      }
    }
  }

  const styles = {
    page: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "24px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
      marginBottom: "24px",
    },
    button: {
      padding: "10px 16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
    },
    addButton: {
      background: "#2563eb",
      color: "white",
    },
    editButton: {
      background: "#e5e7eb",
      color: "#111827",
    },
    deleteButton: {
      background: "#fee2e2",
      color: "#991b1b",
    },
    
grid: {
  display: "flex",
  gap: "24px",
  overflowX: "auto",
  overflowY: "hidden",
  padding: "10px 4px 20px",
  scrollBehavior: "smooth",
  WebkitOverflowScrolling: "touch",
},
    
card: {
  flex: "0 0 280px",
  width: "280px",
  boxSizing: "border-box",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  overflow: "hidden",
  paddingBottom: "16px",
},

    actions: {
      display: "flex",
      gap: "8px",
      padding: "0 16px",
      flexWrap: "wrap",
    },
    form: {
      display: "grid",
      gap: "14px",
      maxWidth: "600px",
      marginBottom: "28px",
      padding: "20px",
      border: "1px solid #d1d5db",
      borderRadius: "10px",
    },
    label: {
      display: "grid",
      gap: "6px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      boxSizing: "border-box",
      padding: "10px",
      border: "1px solid #9ca3af",
      borderRadius: "6px",
      font: "inherit",
    },
  };

  return (
    <main style={styles.page}>
      <div style={styles.heading}>
        <h1>Kursused</h1>

        <button
          type="button"
          style={{ ...styles.button, ...styles.addButton }}
          onClick={addCourse}
        >
          + Lisa kursus
        </button>
      </div>

      {formOpen && (
        <form style={styles.form} onSubmit={saveCourse}>
          <h2>
            {editingId !== null
              ? "Muuda kursust"
              : "Lisa uus kursus"}
          </h2>

          <label style={styles.label}>
            Kursuse nimi
            <input
              style={styles.input}
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Nt Matemaatika"
              required
            />
          </label>

          <label style={styles.label}>
            Pildi URL
            <input
              style={styles.input}
              type="url"
              value={image}
              onChange={(event) =>
                setImage(event.target.value)
              }
              placeholder="https://..."
              required
            />
          </label>

          <label style={styles.label}>
            Kirjeldus
            <textarea
              style={styles.input}
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Kirjuta lühike kirjeldus..."
              rows={4}
              required
            />
          </label>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="submit"
              style={{
                ...styles.button,
                ...styles.addButton,
              }}
            >
              Salvesta
            </button>

            <button
              type="button"
              style={styles.button}
              onClick={resetForm}
            >
              Tühista
            </button>
          </div>
        </form>
      )}

      {courses.length === 0 ? (
        <p>
          Kursuseid pole veel lisatud. Vajuta „Lisa kursus“.
        </p>
      ) : (
        <div style={styles.grid}>
          {courses.map((course) => (
            <article key={course.id} style={styles.card}>
              <CourseCard
                image={course.image}
                title={course.title}
                description={course.description}
              />

              <div style={styles.actions}>
                <button
                  type="button"
                  style={{
                    ...styles.button,
                    ...styles.editButton,
                  }}
                  onClick={() => editCourse(course)}
                >
                  Muuda
                </button>

                <button
                  type="button"
                  style={{
                    ...styles.button,
                    ...styles.deleteButton,
                  }}
                  onClick={() => deleteCourse(course.id)}
                >
                  Kustuta
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

