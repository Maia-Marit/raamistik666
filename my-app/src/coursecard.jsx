
import { useState } from "react";

function CourseCard({ image, title, description }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article style={styles.card}>
      {image && !imageError ? (
        <img
          src={image}
          alt={title}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <div style={styles.imageFallback}>
          Pilt pole saadaval
        </div>
      )}

      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
      </div>
    </article>
  );
}

const styles = {
  card: {
    width: "280px",
    overflow: "hidden",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    display: "block",
  },
  imageFallback: {
    minHeight: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    color: "#20211f",
  },
  content: {
    padding: "30px",
  },
  title: {
    margin: "0 0 10px",
    color: "#0836ef",
  },
  description: {
    margin: 0,
    lineHeight: 1.5,
    color: "#20211f",
  },
};

export default CourseCard;
