import gql from "graphql-tag";

export const data = gql`
  query goods {
    shop_goods {
      id
      images
      title
      price
      rating
      description,
      quantity,
      category
    }
  }
`;
