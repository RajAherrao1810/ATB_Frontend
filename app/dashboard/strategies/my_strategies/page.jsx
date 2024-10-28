"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const MyStrategiesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const strategyId = searchParams.get("strategyId");

  const [strategies, setStrategies] = useState(() => {
    const savedStrategies = localStorage.getItem("strategies");
    return savedStrategies ? JSON.parse(savedStrategies) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStrategy = async () => {
      if (!strategyId) return;

      if (strategies.some((strategy) => strategy._id === strategyId)) return;

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/strategy/${strategyId}`);
        const newStrategy = response.data.strategy;

        const updatedStrategies = [...strategies, newStrategy];
        setStrategies(updatedStrategies);
        localStorage.setItem("strategies", JSON.stringify(updatedStrategies));
      } catch (err) {
        setError("Error fetching strategy details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStrategy();
  }, [strategyId, strategies]);

  const handleDelete = (id) => {
    const updatedStrategies = strategies.filter((strategy) => strategy._id !== id);
    setStrategies(updatedStrategies);
    localStorage.setItem("strategies", JSON.stringify(updatedStrategies));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Strategies</h1>

      {strategies.length > 0 ? (
        strategies.map((strategy) => (
          <div key={strategy._id} style={styles.strategyBox}>
            <h2>{strategy.name}</h2>
            {Object.entries(strategy).map(([key, value]) =>
              key !== "_id" && key !== "name" ? (
                <p key={key}>
                  <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                  {value.toString()}
                </p>
              ) : null
            )}
            <button onClick={() => console.log(`Deploying strategy with ID: ${strategy._id}`)}>
              Deploy Strategy
            </button>
            <button onClick={() => handleDelete(strategy._id)} style={styles.deleteButton}>
              Delete Strategy
            </button>
          </div>
        ))
      ) : (
        <p>No strategy details found.</p>
      )}
    </div>
  );
};

const styles = {
  strategyBox: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    marginBottom: "1rem",
  },
  deleteButton: {
    marginTop: "1rem",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default MyStrategiesPage;
