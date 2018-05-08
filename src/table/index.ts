import { chain, Rule } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { buildComponent } from '../utils/devkit-utils/component';

/**
 * table component.
 */
export default function (options: Schema): Rule {
  return chain([
    buildComponent({ ...options })
  ]);
}

