# アプリ概要
ミーティング調整アプリ。<br>
事前に議題の設定やアイスブレイクのお題提供(実装予定）などの機能があり、<br>
1on1やチームミーティングを円滑にできるようサポートします。

# Firebaseの準備
## Firebaseプロジェクトを作成
<img width="750" alt="スクリーンショット 2023-06-13 11 50 07" src="https://github.com/nakataku119/meeting-app/assets/117638149/51ee6ab7-de98-44e4-aa50-2c7e827ffc52">

- firebaseコンソールにて、【プロジェクトを追加】を選択。
- 指示通りに、プロジェクト名の入力、Googleアナリティクスの選択をする。


- 作成したプロジェクトでWebアプリを追加する。APIKeyなどをメモ。
- CloudFirestoreのデータベース作成。
- Authenticationにて、メール/パスワードのプロバイダ追加。必要に応じてユーザーを追加する。
- FirebaseCLIをインストール。

# Usage
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
FirestoreとHostingを選択。<br>
`What do you want to use as your public directory?`ではoutを指定する。<br>
`utils/firebase.ts`にFirebaseConfigの設定を追加。
```typescript:utils/firebase.ts
// utils/firebase.ts
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
```

```
$ npm run deploy
```
