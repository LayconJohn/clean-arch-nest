export class CreateRouteDto {
    //TO_DO: implementar o class validator
    title: string;

    startPosition: { lat: number; lng: number };
  
    endPosition: { lat: number; lng: number };
}
