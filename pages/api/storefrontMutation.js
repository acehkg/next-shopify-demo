import storefrontClient from '../../utils/graphClient';

export default async function handler(req, res) {
  //make sure POST request from client
  if (req.method !== 'POST') {
    return res.status.json({ msg: 'Method Not Allowed' });
  }
  //parse request body
  const { QUERY, variables } = JSON.parse(req.body);
  //make request to graphQL endpoint
  try {
    const data = await storefrontClient.request(QUERY, variables);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
