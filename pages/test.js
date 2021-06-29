import { gql } from 'graphql-request';
import useStorefront from '../hooks/useStorefront';

const query = gql`
  {
    products(first: 5) {
      edges {
        node {
          title
        }
      }
    }
  }
`;

const test = () => {
  const { loading, error, response } = useStorefront(query);

  let data;
  response ? (data = response.products.edges) : null;

  return (
    <div>
      {loading || response == null ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {data.map(({ node }) => {
            return <h1 key={node.title}>{node.title}</h1>;
          })}
        </div>
      )}
    </div>
  );
};

export default test;
