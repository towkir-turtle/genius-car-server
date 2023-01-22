const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// middlewares:
app.use(cors());
app.use(express.json());

// user: geniusdbuser
// password: qeruGSoozuu09ITP

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vvjfl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db('geniusCarServer');
    const serviceCollection = database.collection('services');

    app.get('/services', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
  } finally {
    // await client.close();
  }
}

run().catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.send('genius car server is running!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
