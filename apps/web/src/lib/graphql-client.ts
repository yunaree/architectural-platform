import { GraphQLClient } from "graphql-request";

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/graphql";

export const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
        // Тут можна додати токени авторизації, якщо треба
        // authorization: `Bearer ${token}`,
    },
});