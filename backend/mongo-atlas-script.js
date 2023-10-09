const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://dbUser:forzaheroots24@heroots.ifybqhd.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Get a reference to the database
    const db = await client.db("heroots-events");

    console.log("db", db)

    // Specify the collection name
    const collection = await db.collection('events'); // heroots-events.events

    console.log("collection", collection)

    try {
        // Find all documents in the collection
        const documents = await collection.find({}).toArray();
        // Print the retrieved documents
        console.log('Retrieved documents:', documents);
    } catch (err) {
        console.error('Error retrieving documents:', err);
    }

  } catch (e) {

    console.error(e);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
