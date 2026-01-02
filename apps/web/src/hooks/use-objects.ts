// hooks/use-objects.ts
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "@/lib/graphql-client";
import { ObjectEntity } from "@/types/objects";

const GET_OBJECTS_QUERY = gql`
  query GetObjects($term: String) {
    objects(
      filters: {
        or: [
          { title: { contains: $term } },
          { description: { contains: $term } }
        ]
      }
    ) {
      title
      description
      tags {
        name
      }
    }
  }
`;

interface GraphqlResponse {
    objects: any;
}

export function useObjects(searchQuery: string = "") {
    return useQuery({
        queryKey: ["objects", searchQuery],
        queryFn: async () => {
            const response = await client.request<GraphqlResponse>(GET_OBJECTS_QUERY, {
                term: searchQuery,
            });
            return response.objects;
        },
    });
}