// 45개의 정수값을 저장하기 위한 배열 생성.
var lotto = new Array(45);
		
// 배열의 각 요소에 1~45의 값을 저장한다.
for(var i = 0; i < lotto.length; i++){
	lotto[i] = i+1;
}
var temp = 0; // 두 값을 바꾸는데 사용할 임시변수
var j = 0; // 임의의 값을 얻어서 저장할 변수

// 배열에 저장된 값이 잘 섞이도록 충분히 큰 반복횟수를 지정한다.
// 배열의 첫 번째 요소와 임의의 요소에 저장된 값을 서로 바꿔서 값을 섞는다.
for(var i = 0; i < 100; i++){
	j = (parseInt)(Math.random()*45); // 배열 범위(0~44)의 임의의 값을 얻는다.
	temp = lotto[0];
	lotto[0] = lotto[j]
	lotto[j] = temp;
}
	
// 배열 lotto의 앞에서 부터 6개의 인덱스를 출력한다.
for(var i = 0; i < 6; i++){
	console.log(lotto[i]);
}
