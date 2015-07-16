# incremental-search
incremental search web app

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
