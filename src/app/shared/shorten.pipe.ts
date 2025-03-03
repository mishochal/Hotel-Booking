import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

    transform(value: string | undefined, maxLenght: number): string {
        if (!value) {
            return "";
        } else if (value.length < maxLenght) {
            return value;
        } else {
            return value.substring(0, maxLenght) + "...";
        }
    }

}
