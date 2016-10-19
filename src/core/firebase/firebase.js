import firebase from 'firebase';
import {firebaseConfig} from './config';

/**
 * 파이어 베이스 앱
 * @type {any}
 */
export const firebaseApp = firebase.initializeApp(firebaseConfig);

/**
 * 파이어 베이스 인증
 */
export const firebaseAuth = firebaseApp.auth();

/**
 * 파이어 베이스 데이터 베이스
 */
export const firebaseDb = firebaseApp.database();