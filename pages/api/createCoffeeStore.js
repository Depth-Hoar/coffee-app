const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIR_TABLE_TOKEN }).base(
  process.env.AIR_TABLE_BASE_KEY
);

const table = base("coffee-stores");

console.log({ table }, "TABLESSS");

const createCoffeeStore = async (req, res) => {
  console.log({ req });

  if (req.method === "POST") {
       //find a record
       const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

      try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id=${id}`,
        })
        .firstPage();
 
      console.log({ findCoffeeStoreRecords });
 
      if (findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json(records);
      } else {
        //create a record
        const createRecords = await table.create([
          {
            fields: {
              id,
              name,
              address,
              neighbourhood,
              voting,
              imgUrl,
            },
          },
        ]);
        // res.json({ message: "create a record", records: createRecords });
        const records = createRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json(records);
      }
    } catch (err) {
      console.error("Error finding store", err);
      res.status(500);
      res.json({ message: "Error finding store", err });
     }
  }
};

export default createCoffeeStore