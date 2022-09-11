export class CreateDoublecheckDto {
    id?: string;
    courses: Course[];
    checked?: boolean;
    structureId: string;
}

type Course = {
    name?: string;
    id?: string;
    courseId: string;
    errors: Error[];
    createdAt?: Date;
    editedAt?: Date;
};

type Error = {
    id?: string;
    name: string;
    type: 'error' | 'warning';
    severity: 'high' | 'low' | 'medium';
    itemId?: string;
    itemName: string;
    itemType: string;
    errorId: string;
    message: string;
};
