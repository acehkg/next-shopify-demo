import storefrontClient from '../../utils/graphClient';

export default async function handler(req, res) {
  //test graphQL hook
  try {
    const data = await storefrontClient.request(req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
