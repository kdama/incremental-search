# incremental-search
incremental search web app

Demo
----
http://kdama.github.io/incremental-search/
* [デフォルトのデータ](https://docs.google.com/spreadsheets/d/1NH9rvVIudYRMMU4ETmRNdiTJQR36xCVYviVWjTEj5pM/pubhtml) は「なんちゃって個人情報」`http://kazina.com/dummy/` により生成したものです

要求
----

* Web 上に存在するデータを取得して表示する
  * 例えば: [sharable link](https://support.google.com/docs/answer/2494822) で共有された [Google Sheets](https://docs.google.com/spreadsheets/) シート
* [インクリメンタルサーチ](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%A1%E3%83%B3%E3%82%BF%E3%83%AB%E3%82%B5%E3%83%BC%E3%83%81) による検索機能を持つ

仕様
----

* Google Sheets シート
  * 先頭行を列ラベルとみなし、データは 2 行目から格納されているものとする
  * 少なくとも先頭 1 列を読み込み、リストに表示し、インクリメンタルサーチの対象にする
  * 少なくとも先頭 200 件のデータを読み込む
* UI
  * 少なくとも **検索ボックス** と **データのリスト** を持つ
* 機能
  * 初期状態では *デフォルトの URL* から取得した全てのデータが **リスト** に表示される
  * **検索ボックス** が空のとき、全てのデータが **リスト** に表示される
  * **検索ボックス** が空でないとき、検索文字列に部分一致するデータのみが **リスト** に表示される

開発
----

* *デフォルトの URL* は、HTML または JavaScript に直接記述してよい
* フロントエンドフレームワークとして [Bootstrap](http://getbootstrap.com/) を利用してよい
* JavaScript ライブラリとして [jQuery](http://jquery.com/), [Knockout](http://knockoutjs.com/) のみ利用してよい
* JavaScript のスタイルは [jQuery's JavaScript Style Guide](https://contribute.jquery.org/style-guide/js/) に従う
* JavaScript を HTML ファイルに直接記述してはならない

方針
----

* HTML
  * **URL バー**: 余裕あれば付ける。`<input>` でやる。隣に [Go] button を置く
  * **検索ボックス**: `<input>` でやる。隣に button は置かない。keyUp イベントでインクリメンタルサーチする
  * **データのリスト**: `<ul>` `<li>` でがんばる
* Google Sheets からの取得
  1. URL の最後に ?alt=json 付けると JSON もらえるらしい... `http://creator.aainc.co.jp/archives/6240`
  2. gs$cell をがんばって読む (ここがいちばんつらそう..)
  3. 必要なだけ `<ul>` `<li>` を生成する
* インクリメンタルサーチ
  * 一旦リストの全要素を hide して、contains で絞ったものだけ show すればいいらしい... `http://tech.aainc.co.jp/archives/6364`
