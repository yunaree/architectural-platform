import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "@/lib/graphql-client";
import { ObjectEntity } from "@/features/objects/types";

const GET_OBJECT_BY_SLUG = gql`
  query GetObjectBySlug($slug: String!) {
    objects(filters: { slug: { eq: $slug } }) {
      documentId
      title
      description
      slug
      year
      views
      locationCoords
      
      beforeImage {
        url
      }
      afterImage {
        url
      }
      
      modelFile {
        url
        mime
      }
      
      tags {
        name
      }
      
      country {
        name
      }
    }
  }
`;

interface GraphqlResponse {
    objects: ObjectEntity[];
}

export function useGetObject(slug: string) {
    return useQuery({
        queryKey: ["object", slug],
        queryFn: async () => {
            const response = await client.request<GraphqlResponse>(GET_OBJECT_BY_SLUG, {
                slug,
            });
            return response.objects[0] || null;
        },
        enabled: !!slug,
    });
}