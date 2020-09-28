import { gql } from '@apollo/client';

export const PRODUCTS = (currency) => gql`
    query GetProducts {
        products {
            id
            image_url
            title
            price(currency:${currency})
        }
    }
`;

export const CURRENCY = () => gql`
    query GetCurrency {
        currency
    }
`;