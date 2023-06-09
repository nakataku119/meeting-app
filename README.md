# アプリ概要
ミーティング調整アプリ。<br>
事前に議題の設定やアイスブレイクのお題提供(実装予定）などの機能があり、<br>
1on1やチームミーティングの調整を円滑にします。

# Firebaseの準備
- Firebaseプロジェクトを作成。APIKeyなどをメモ。
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
