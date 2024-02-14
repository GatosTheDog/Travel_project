const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/proxy', async (req, res) => {
  const apiUrl = 'https://aio.server9.nelios.com';
  const bearerToken = 'QcKjgrWuKr0mYaavwwtpSvk7MyWhyWh3k0Secv';

  try {
    const apiRes = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(apiRes.data);
  } catch (error) {
    console.error("There was an error fetching the data:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
