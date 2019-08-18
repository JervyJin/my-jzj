package main // 一个程序只能有一个main 包

import "fmt" //导入 fmt包

//定义函数
func main() {
	//声明变量类型
	// var a int = 12
	// fmt.Println(a)

	//第二种声明变量的方式,自动推导变量的类型
	a :=12
	// fmt.Printf("a type is %T\n") //Printf 检测变量类型
	fmt.Println( a )
}

