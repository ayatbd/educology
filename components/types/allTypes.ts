type Role = {
    id: string;
    title: string;
    subtitle: string;
    link?: string;
    image: string;
};

// participants
export type StatusType = 'On Track' | 'Attention' | 'Behind' | 'Critical';

export interface Student {
    id: string;
    name: string;
    phone: string;
    status: StatusType;
    image: string;
}

export interface StatCard {
    label: string;
    count: string;
    status: StatusType;
    bgColor: string;
    dotColor: string;
    borderColor: string;
}

export type { Role };
