export interface StrapiImage {
    id: string;
    url: string;
    width?: number;
    height?: number;
    mime?: string;
}

export interface Tag {
    documentId: string;
    name: string;
    slug: string;
    objects?: { count: number }
}

export interface Country {
    documentId: string;
    name: string;
    code: string;
}

export interface ObjectEntity {
    documentId: string;
    title: string;
    slug: string;
    description: any;
    year: number;
    views: number;
    locationCoords: any;

    beforeImage?: StrapiImage;
    afterImage?: StrapiImage;
    modelFile?: StrapiImage;

    tags: Tag[];
    country?: Country;
}