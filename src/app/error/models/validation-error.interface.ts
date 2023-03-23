export interface ValidationError {
    entity: string;
    property: string;
    invalidValue: string;
    message: string;
}
