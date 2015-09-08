# incremental-search
incremental search web app

Demo
----
http://kdama.github.io/incremental-search/
* [デフォルトのデータ](https://docs.google.com/spreadsheets/d/1NH9rvVIudYRMMU4ETmRNdiTJQR36xCVYviVWjTEj5pM/pubhtml) は `http://kazina.com/dummy/` により生成したものです

要求
----

* Web 上に存在するデータを取得して表示する
  * 例えば: [sharable link](https://support.google.com/docs/answer/2494822) で共有された [Google Sheets](https://docs.google.com/spreadsheets/) シート
* [インクリメンタルサーチ](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%A1%E3%83%B3%E3%82%BF%E3%83%AB%E3%82%B5%E3%83%BC%E3%83%81) による検索機能を持つ
* 最後に取得したデータを保存しておき、次回表示時に利用する

仕様
----

* Google Sheets シート
  * 先頭行を列ラベルとみなし、データは 2 行目から格納されているものとする
  * 少なくとも先頭 1 列を読み込み、リストに表示し、インクリメンタルサーチの対象にする
  * 少なくとも先頭 200 件のデータを読み込む
* UI
  * 少なくとも **URL 入力欄** と **検索ボックス** と **データのリスト** を持つ
* 機能
  * 初期状態では、最後に取得した全てのデータが **リスト** に表示される
    * 最後に取得したデータが存在しないとき、*デフォルトの URL* から取得した全てのデータが **リスト** に表示される
  * **検索ボックス** が空のとき、全てのデータが **リスト** に表示される
  * **検索ボックス** が空でないとき、検索文字列に部分一致するデータのみが **リスト** に表示される

開発
----

* *デフォルトの URL* は、HTML または JavaScript に直接記述してよい
* フロントエンドフレームワークとして [Bootstrap](http://getbootstrap.com/) を利用してよい
* JavaScript ライブラリとして [jQuery](http://jquery.com/), [Knockout](http://knockoutjs.com/) のみ利用してよい
* JavaScript のスタイルは [jQuery's JavaScript Style Guide](https://contribute.jquery.org/style-guide/js/) に従う
* JavaScript を HTML ファイルに直接記述してはならない

設計
----

* Collections
  * **プロパティ**
    * 変数: **キー**
    * 変数: **値**
  * **アイテム**
    * 変数: **プロパティの配列**
    * 機能: **プロパティの配列** の中に **与えられた文字列** に部分一致する **値** を持つものが存在するかを返す
* Model
  * 変数: **アイテムの配列**
  * 機能: **読み込み先の URL** からGoogle Sheets の JSON を取得して **アイテムの配列** に入れる
* ViewModel
  * 変数: **読み込み先の URL**
  * 変数: **検索キーワード**
  * 変数: **アイテムの配列** -- ローカルストレージのキャッシュをもとに初期化される
  * 機能: **与えられたアイテム** が **検索キーワード** にマッチしているかを返す
  * 機能: 最後に取得した **アイテムの配列** をローカルストレージにキャッシュする
* View
  * ViewModel の **読み込み先の URL** にバインドした入力欄を持つ
  * ViewModel の **検索キーワード** にバインドした入力欄を持つ
  * ViewModel の **アイテムの配列** のうち **検索キーワード** にマッチするアイテムを表示する
