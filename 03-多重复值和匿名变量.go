package main // 一个程序只能有一个main 包

import "fmt" //导入 fmt包

//定义函数
func main() {
	// 多重变量赋值
	a, b := 30, 40
	a, b = b, a
	fmt.Printf("a=%d, b=%d\n", a, b)
	//交换两个值
	// i := 10
	// j := 20
	i, j := 10, 20
	i, j = j, i	
	fmt.Printf("i=%d, j=%d\n", i, j)

}

