import { useMutation, useQueryClient } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "@/lib/graphql-client";

const UPDATE_VIEWS_MUTATION = gql`
  mutation UpdateObject($documentId: ID!, $views: Int) {
    updateObject(documentId: $documentId, data: { views: $views }) {
      documentId
      views
    }
  }
`;

export function useUpdateViews() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ documentId, views }: { documentId: string; views: number }) => {
            return client.request(UPDATE_VIEWS_MUTATION, {
                documentId,
                views
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["object"] });
        },
    });
}