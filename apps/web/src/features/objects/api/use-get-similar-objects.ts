import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "@/lib/graphql-client";
import { ObjectEntity } from "@/features/objects/types";

const GET_CANDIDATES = gql`
  query GetCandidates($excludeId: ID) {
    objects(
      pagination: { limit: 20 }
      filters: { documentId: { ne: $excludeId } }
      sort: ["publishedAt:desc"]
    ) {
      documentId
      title
      slug
      description
      year
      views
      tags {
        name
        slug
      }
      country {
        code
        name
      }
      afterImage {
        url
      }
      beforeImage {
        url
      }
    }
  }
`;

interface ObjectsResponse {
    objects: ObjectEntity[];
}

export function useGetSimilarObjects(currentObject: ObjectEntity | undefined) {
    return useQuery({
        queryKey: ["similar-objects", currentObject?.documentId],
        queryFn: async () => {
            if (!currentObject) return [];

            const tagSlugs = currentObject.tags.map((t) => t.slug);
            const countryCode = currentObject.country?.code;

            const response = await client.request<ObjectsResponse>(GET_CANDIDATES, {
                excludeId: currentObject.documentId,
            });

            const candidates = response.objects;

            const scoredCandidates = candidates.map((obj) => {
                let score = 0;

                obj.tags.forEach((tag) => {
                    if (tagSlugs.includes(tag.slug)) score += 3;
                });

                if (obj.country?.code === countryCode) score += 1;

                score += Math.random();

                return { ...obj, _score: score };
            });

            scoredCandidates.sort((a, b) => b._score - a._score);

            return scoredCandidates.slice(0, 4);
        },
        enabled: !!currentObject?.documentId,
        staleTime: 1000 * 60 * 60,
    });
}