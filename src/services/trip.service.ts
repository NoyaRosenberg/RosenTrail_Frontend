export interface Trip {
    _id: string;
    destinations: string[];
    startDate?: Date;
    endDate?: Date;
    ownerId?: string;
    participantsId?: string[];
    unregisteredParticipants?: string[];
    activitiesId?: string[];
    description: string;
    image: string;
}