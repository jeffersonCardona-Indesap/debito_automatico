import { Pipe, PipeTransform } from '@angular/core';
import { TipoMatriculaEnum } from '../Enum';

@Pipe({
  name: 'tipoMatricula'
})
export class TipoMatriculaPipe implements PipeTransform {
  transform(value: number): string {
    return TipoMatriculaEnum[value];
  }

}
