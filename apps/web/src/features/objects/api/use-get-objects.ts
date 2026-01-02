import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "@/lib/graphql-client";
import { ObjectEntity } from "@/features/objects/types";

const GET_ALL_OBJECTS_QUERY = gql`
  query GetAllObjects($page: Int!, $pageSize: Int!) {
    objects(pagination: { page: $page, pageSize: $pageSize }) {
      documentId
      title
      slug
      year
      views
      
      beforeImage {
        url
      }
      afterImage {
        url
      }
      
      tags {
        documentId
        name
        slug
      }
      
      country {
        name
      }

      description 
    }
  }
`;

interface GraphqlResponse {
    objects: ObjectEntity[];
}

export function useGetObjects(page: number = 1, pageSize: number = 9) {
    return useQuery({
        queryKey: ["objects", page, pageSize],
        queryFn: async () => {
            const response = await client.request<GraphqlResponse>(GET_ALL_OBJECTS_QUERY, {
                page,
                pageSize
            });
            return response.objects;
        },
        placeholderData: (previousData) => previousData,
    });
}