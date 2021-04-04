'use strict';
import 'reflect-metadata';
import { resolve } from 'path';
import { Application } from './config/application';
import './config/dotenv';

export default new Application();