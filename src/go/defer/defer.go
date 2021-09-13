package main

import "fmt"

func main() {
	fmt.Println("Start")

	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}

	defer fmt.Println("１番目")
	defer fmt.Println("２番目")
	defer fmt.Println("３番目")

	fmt.Println("Done")
}
