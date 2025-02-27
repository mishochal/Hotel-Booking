import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: string | undefined, maxLenght: number): string {
        if (!value || value.length < maxLenght) {
            return "";
        } else {
            return value.substring(0, maxLenght) + "...";
        }
    }

}
