const express = require("express");
const path = require("path");
const { db } = require("./firebase");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Test write when server starts
db.ref("test").set({ hello: "world" })
  .then(() => console.log("Test data written to Firebase"))
  .catch(err => console.error("Error writing test data:", err));

// Save game route
app.post("/api/save-game", async (req, res) => {
  const { gameId, board, currentPlayer, winner } = req.body;
  try {
    await db.ref("games/" + gameId).set({ board, currentPlayer, winner });
    res.status(200).send("Game saved");
  } catch (err) {
    console.error("Error saving game:", err);
    res.status(500).send("Error saving game");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
