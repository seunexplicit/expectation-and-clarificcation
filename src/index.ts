'use strict';
import 'reflect-metadata';
import { resolve } from 'path';
import { Application } from './config/application';
import './config/dotenv';

//console.log('2 typeof ftt '+ typeof dotenv.config);
export default new Application();