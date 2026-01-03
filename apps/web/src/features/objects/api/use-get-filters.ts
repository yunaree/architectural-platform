import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "@/lib/graphql-client";
import { Tag, Country } from "@/features/objects/types";

const GET_FILTERS_QUERY = gql`
  query GetFilters {
    tags(pagination: { limit: 100 }) {
      documentId
      name
      slug
    }
    countries(pagination: { limit: 100 }) {
      documentId
      name
      code
    }
  }
`;

interface FiltersResponse {
    tags: Tag[];
    countries: Country[];
}

export function useGetFilters() {
    return useQuery({
        queryKey: ["filters"],
        queryFn: async () => {
            return client.request<FiltersResponse>(GET_FILTERS_QUERY);
        },
        staleTime: 1000 * 60 * 10,
    });
}