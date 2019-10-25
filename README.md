### TODO

- データ分割機能
- 性能改善、インプットが正常に機能しない問題を解決する
- セル機能を導入せべし、矢印でセルを移動、Enterでセルの編集を行う
- ポップアップ機能でユーザに通知を行うこと
- Inputの幅がおかしいので修正すること
- DeleteDimensionComponentを作成すること
- セーブ機能出来ればほしい
- タイトルコピーボタン欲しい
- スクロールバー改善したい
- データを読み込むときに空の改行を読みとばす処理を入れたい
- eslint, jest導入したい

### 暫定対処

- ファイルを分割する

```sh
$ split -d -l 100 --additional-suffix=.csv prod.csv prod-split
$ ls prod-split* | xargs sed -i '1s/^/title\n/'
```