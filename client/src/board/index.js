import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { useUser, useClerk } from "@clerk/clerk-react";
import Login from "../login";

const HealthForm = () => {
    const [symptoms, setSymptoms] = useState("");
    const [mood, setMood] = useState("🙂 Good");
    const [medications, setMedications] = useState("");
    const [notes, setNotes] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [entries, setEntries] = useState([]);
    const { user } = useUser();
    const { openSignIn } = useClerk();

    const fetchUserData = async () => {
        if (!user?.id) return;

        try {
            const { data } = await axios.get("https://health-tracker-33rv.onrender.com/v1/health/", {
                headers: {
                    token: user.id,
                },
            });
            setEntries(data.getData);
            console.log("User data from backend:", data.getData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user?.id]);

    const handleSubmit = async () => {
        const newEntry = {
            symptoms: symptoms.split(",").map((s) => s.trim()).filter(Boolean),
            mood,
            medications: medications.split(",").map((m) => m.trim()).filter(Boolean),
            notes,
            date: new Date().toISOString().split("T")[0],
        };

        try {
            await axios.post(
                "https://health-tracker-33rv.onrender.com/v1/health/add",
                newEntry,
                {
                    headers: {
                        token: user?.id,
                    },
                }
            );

            setSymptoms("");
            setMood("🙂 Good");
            setMedications("");
            setNotes("");
            setShowForm(false);
            fetchUserData();
        } catch (error) {
            console.error("Error saving health entry:", error);
            alert("Failed to save health entry.");
        }
    };

    const addBtn = () => {
        if (user?.id) {
            setShowForm(true);
        } else {
            openSignIn({ redirectUrl: window.location.href });
        }
    };

    return (
        <>
            <Login />
            <div className="health-container">
                {!showForm ? (
                    <>
                        <button className="add-btn" onClick={addBtn}>
                            Add Health Entry
                        </button>

                        <h2 className="table-title">Your Health Entries</h2>
                        <div className="health-table-wrapper">
                            <table className="health-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Symptoms</th>
                                        <th>Mood</th>
                                        <th>Medications</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entries.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: "center" }}>
                                                No entries yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        entries.map((entry, index) => (
                                            <tr key={index}>
                                                <td>{entry.date}</td>
                                                <td>{entry.symptoms.join(", ")}</td>
                                                <td>{entry.mood}</td>
                                                <td>{entry.medications.join(", ")}</td>
                                                <td>{entry.notes}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div className="form-container">
                        <h2 className="form-title">🩺 Add Health Details</h2>
                        <form className="form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label>Symptoms</label>
                                <input
                                    type="text"
                                    placeholder="e.g., headache, fever"
                                    value={symptoms}
                                    onChange={(e) => setSymptoms(e.target.value)}
                                />
                                <small>Separate with commas</small>
                            </div>

                            <div className="form-group">
                                <label>Mood</label>
                                <select value={mood} onChange={(e) => setMood(e.target.value)}>
                                    <option>🙂 Good</option>
                                    <option>😐 Okay</option>
                                    <option>😞 Bad</option>
                                    <option>😖 Stressed</option>
                                    <option>😴 Tired</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Medications</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Paracetamol, Ibuprofen"
                                    value={medications}
                                    onChange={(e) => setMedications(e.target.value)}
                                />
                                <small>Separate with commas</small>
                            </div>

                            <div className="form-group">
                                <label>Notes</label>
                                <textarea
                                    type="text"
                                    rows="3"
                                    placeholder="e.g., Poor sleep last night"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="button" onClick={handleSubmit}>
                                    Submit
                                </button>
                                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default HealthForm;
