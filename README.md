# Usage
## 前提
- Firebaseプロジェクトを作成。
- CloudFirestoreのデータベース作成。
- Authenticationにて、メール/パスワードのプロバイダ追加。
- SDKの設定、`utils/firebase.ts`にfirebaseConfigの値を追加。

```
$ git clone https://github.com/nakataku119/meeting-app.git
```
```
$ npm install
```
```
$ firebase login
```
```
$ firebase init
```
FirestoreとHostingを選択。<br>`What do you want to use as your public directory?`ではoutを指定する。

```
$ npm run deploy
```
