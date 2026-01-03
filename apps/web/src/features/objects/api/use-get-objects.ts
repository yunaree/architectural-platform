import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "@/lib/graphql-client";
import { ObjectEntity } from "@/features/objects/types";
import Fuse from "fuse.js";

const GET_OBJECTS = gql`
  query GetObjects($page: Int!, $pageSize: Int!, $tags: [String], $country: String, $sort: [String]) {
    objects(
      pagination: { page: $page, pageSize: $pageSize }
      filters: {
        tags: { slug: { in: $tags } }
        country: { code: { eq: $country } }
      }
      sort: $sort
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
        name
      }
      beforeImage {
        url
      }
      afterImage {
        url
      }
    }
  }
`;

interface ObjectsResponse {
    objects: ObjectEntity[];
}

export function useGetObjects(
    page: number,
    pageSize: number,
    search: string,
    tags: string[],
    country: string | null,
    sort: string[]
) {
    const isSearching = search.length > 0;

    const limit = isSearching ? 100 : pageSize;
    const currentPage = isSearching ? 1 : page;

    const variables: any = {
        page: currentPage,
        pageSize: limit,
        sort
    };

    if (tags.length > 0) variables.tags = tags;
    if (country && country !== "all") variables.country = country;

    return useQuery({
        queryKey: ["objects", page, pageSize, search, tags, country, sort],
        queryFn: async () => {
            const response = await client.request<ObjectsResponse>(GET_OBJECTS, variables);
            let data = response.objects;

            if (isSearching && data.length > 0) {
                const fuse = new Fuse(data, {
                    keys: [
                        "title",
                    ],
                    threshold: 0.4,
                    includeScore: true
                });

                const result = fuse.search(search);
                data = result.map(res => res.item);
            }

            return data;
        },
        placeholderData: (prev) => prev,
    });
}