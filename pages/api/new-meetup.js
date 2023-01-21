import { MongoClient } from 'mongodb'

//api/new-meetup
// POST /api/new-meetup


async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data; // pas forcément besoin 

    const client = await MongoClient.connect('mongodb+srv://jeanro2b:password@cluster0.xcf5fdg.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups'); // on peut donner le nom que l'on veut

    const resulat = await meetupsCollection.insertOne(data); // le data DOIT etre un object

    client.close();

    res.status(201).json({message: 'RDV inséré!'});
  }
}

export default handler;
