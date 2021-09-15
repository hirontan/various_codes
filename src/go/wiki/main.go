package main

import (
	"io/ioutil"
)

// データ構造
type Page struct {
	Title string // タイトル
	Body  []byte // タイトルのコンテンツ
}

// テキストファイルの保存
func (p *Page) save() error {
	// タイトルの名前でテキストを保存
	// 拡張子は txt
	filename := p.Title + ".txt"

	// テキストデータを読み書きする権限を付与
	return ioutil.WriteFile(filename, p.Body, 0600)
}

// タイトルからファイル名を読み込み、新しいページのポインタを返却
func loadPage(title string) (*Page, error) {
	filename := title + ".txt"
	body, err := ioutil.ReadFile(filename)

	// errに値があったら、bodyをnilにして返却
	if err != nil {
		return nil, err
	}

	return &Page{Title: title, Body: body}
}
