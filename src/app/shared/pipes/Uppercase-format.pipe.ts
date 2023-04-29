
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'uppercase'})
export class UpperCaseFormatPipe implements PipeTransform {

    transform(value: string): string {
        return value.toUpperCase();
      }
}