import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017"; // replace with your actual MongoDB URI
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    await client.connect();
    const database = client.db("Strategies");
    const collection = database.collection("My_Strategies");

    // Fetch data only for specific indices
    //const indices = ["NIFTY", "BANKNIFTY", "SENSEX", "MIDCPNIFTY", "BANKEX"];
    const data = await collection
      .find({ Symbol: { $in: indices } })
      .project({ Symbol: 1, LTP: 1, Cls: 1 })
      .toArray();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch LTP data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    await client.close();
  }
}
