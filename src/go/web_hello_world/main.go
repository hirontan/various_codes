package main

import (
	"fmt"
	"net/http" // HTTPプロトコルを利用してくれるパッケージ
)

func handler(writer http.ResponseWriter, request *http.Request) {
	// URLのアドレスからパスの文字列を取得する
	fmt.Fprintf(writer, "Hello World!, %s", request.URL.Path[1:])
}

func main() {
	// パスを指定したときに動作をハンドリングする
	http.HandleFunc("/", handler)

	// サーバを自分のPCの中で起動
	// ポート: 8080
	http.ListenAndServe(":8080", nil)
}
