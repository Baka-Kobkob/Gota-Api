import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());

app.get("/api/check-ff-account", async (req, res) => {
  const { uid, region } = req.query;

  if (!uid || !region) {
    return res.status(400).json({ success: false, message: "សូមបញ្ចូល uid និង region" });
  }

  try {
    const response = await axios.get(`https://info-ob49.vercel.app/api/account/?uid=${uid}&region=${region}`);
    const data = response.data;

    const result = {
      success: true,
      game: "free fire",
      player_id: data.basicInfo.accountId,
      region: data.basicInfo.region,
      nickname: data.basicInfo.nickname,
      level: data.basicInfo.level,
      clan_name: data.clanBasicInfo?.clanName || null,
      pet_name: data.petInfo?.name || null,
    };

    return res.json(result);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "មានបញ្ហាក្នុងការទាញព័ត៌មាន Free Fire" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

export default app;
