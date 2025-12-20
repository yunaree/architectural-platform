export interface ObjectEntity {
    id: number | string;
    title: string;
    description: string;
    imageUrl?: string;
    tags: string[];
}

// Якщо у тебе будуть ще типи для фільтрів, їх теж сюди
export interface FilterState {
    tags: string[];
    search: string;
}