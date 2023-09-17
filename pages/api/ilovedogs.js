// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//http://localhost:3000/api/ilovedogs?breed=Golden%20Retriever

export default function handler(req, res) {
  console.log({ req, res });
  const query = req.query.breed;
  res.status(200).json({ message: `I love ${query}` });
}