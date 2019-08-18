package main // 一个程序只能有一个main 包

import "fmt" //导入 fmt包

func main(){
	// iota 常量自动生成器，每隔一行自动累加一
	// iota 给常量赋值使用
	const(
		a = iota //0
		b = iota //1
		c = iota //2
	)
	fmt.Printf("a=%d, b=%d, c=%d\n", a, b, c)

	// iota 遇到const从置为 0 
	const d = iota //2 -> 0
	fmt.Printf("d=%d\n", d)

	const(
		i = iota //0
		j1, j2, j3 = iota, iota, iota //j1=1 j2=1 j3=1
		k = iota //2
	)
	fmt.Printf("i=%d,j1=%d,j2=%d,j3=%d,k=%d\n", i, j1, j2, j3 ,k,)
}



