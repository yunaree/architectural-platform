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
}

export interface Country {
    id: string;
    name: string;
    code?: string;
}

export interface ObjectEntity {
    documentId: string;
    title: string;
    slug: string;
    description: any; // Це поле типу "Rich text (Blocks)", воно повертає JSON масив блоків
    year: number;
    views: number;
    locationCoords: any; // Це JSON поле

    beforeImage?: StrapiImage;
    afterImage?: StrapiImage;
    modelFile?: StrapiImage;

    // Зв'язки
    tags: Tag[];
    country?: Country;
}