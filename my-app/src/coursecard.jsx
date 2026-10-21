
function CourseCard({ image, title, description }) {
  return (
    <div style={styles.card}>
      <img
        src={image}
        alt={title}
        style={styles.image}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />

      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
      </div>
    </div>
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
