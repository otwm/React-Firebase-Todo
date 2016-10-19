import {firebaseDb} from "./firebase";

/**
 * 파이어 베이스 리스트
 */
export class FirebaseList {
    //TODO: actions에 제약을 걸 수 있는 방법을 생각해 보자. 또한 효율적인 정보 구조 노출 방법도 생각해보자.
    //TODO: actions에 어떤 이벤트(ex: onAdd)를 걸수 있는지 알 수 없음.
    //TODO: path에 대한 get/set 제거 여부를 검토해보자.
    //TODO: remove 등의 메서드에 기본 reject, resolve를 등록 해 보자.

    /**
     * 생성자
     * @param actions 액션 이벤트 정의들
     * @param modelClass
     * @param path 경로
     */
    constructor(actions, modelClass, path = null) {
        this._actions = actions;
        this._modelClass = modelClass;
        this._path = path;
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }

    push(value) {
        return new Promise((resolve, reject) => {
            firebaseDb.ref(this._path)
                .push(value, error => error ? reject(error) : resolve());
        });
    }

    remove(key) {
        return new Promise((resolve, reject) => {
            firebaseDb.ref(`${this._path}/${key}`)
                .remove(error => error ? reject(error) : resolve());
        });
    }

    set(key, value) {
        return new Promise((resolve, reject) => {
            firebaseDb.ref(`${this._path}/${key}`)
                .set(value, error => error ? reject(error) : resolve());
        });
    }

    update(key, value) {
        return new Promise((resolve, reject) => {
            firebaseDb.ref(`${this._path}/${key}`)
                .update(value, error => error ? reject(error) : resolve());
        });
    }

    subscribe(emit) {
        let ref = firebaseDb.ref(this._path);
        let initialized = false;
        let list = [];

        ref.once('value', () => {
            initialized = true;
            emit(this._actions.onLoad(list));
        });

        ref.on('child_added', snapshot => {
            if (initialized) {
                emit(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
            }
            else {
                list.push(this.unwrapSnapshot(snapshot));
            }
        });

        ref.on('child_changed', snapshot => {
            emit(this._actions.onChange(this.unwrapSnapshot(snapshot)));
        });

        ref.on('child_removed', snapshot => {
            emit(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
        });

        this._unsubscribe = () => ref.off();
    }

    unsubscribe() {
        this._unsubscribe();
    }

    unwrapSnapshot(snapshot) {
        let attrs = snapshot.val();
        attrs.key = snapshot.key;
        return new this._modelClass(attrs);
    }
}
