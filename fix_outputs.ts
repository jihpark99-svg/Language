import fs from 'fs';

function fixOutputs() {
  // Python fixes
  let py = fs.readFileSync('./src/data/python.ts', 'utf-8');
  py = py.replace("output: 'name, age'", "output: '앨리스 20'");
  py = py.replace("output: 'apple_count'", "output: '5'");
  py = py.replace("output: 'pi'", "output: '3.14159'");
  py = py.replace("output: 'is_raining'", "output: 'True'");
  py = py.replace("output: '3.3333... (소수점까지)\\n3) # 3 (몫만 깔끔하게)'", "output: '3.3333333333333335\\n3'");
  py = py.replace("output: '1\\n0 (짝수)'", "output: '1\\n0'");
  py = py.replace("output: '2의 3승 (2 * 2 * 2) = 8\\n5의 2승 = 25'", "output: '8\\n25'");
  py = py.replace("output: 'greeting + \" \" + name'", "output: '안녕 파이썬'");
  py = py.replace("output: '제 이름은 name이고, 나이는 age살입니다.\"'", "output: '제 이름은 앨리스이고, 나이는 20살입니다.'");
  py = py.replace("output: '반갑습니다, name님!\"'", "output: '이름이 무엇인가요? 앨리스\\n반갑습니다, 앨리스님!'");
  py = py.replace("output: '내년에는 age + 1살이 되시네요!\"'", "output: '나이를 입력하세요: 20\\n내년에는 21살이 되시네요!'");
  py = py.replace("output: 'fruits'", "output: \"['사과', '바나나', '포도']\"");
  py = py.replace("output: 'fruits'", "output: \"['사과', '바나나', '오렌지']\""); 
  py = py.replace("output: 'colors[0]'", "output: '빨강'");
  py = py.replace("output: 'person'", "output: \"{'이름': '밥', '나이': 20}\"");
  py = py.replace("output: 'person.keys()\\nperson.values()'", "output: \"dict_keys(['이름', '나이'])\\ndict_values(['앨리스', 20])\"");
  py = py.replace("output: '성인입니다.\\n미성년자입니다.'", "output: '미성년자입니다.'");
  py = py.replace("output: 'A학점\\nB학점\\nC학점'", "output: 'B학점'");
  py = py.replace("output: 'f + \" 맛있어요!\"'", "output: '사과 맛있어요!\\n바나나 맛있어요!\\n포도 맛있어요!'");
  py = py.replace("output: '0, 1, 2 출력'", "output: '0\\n1\\n2'");
  py = py.replace("output: '반복합니다!'", "output: '반복합니다!\\n반복합니다!\\n반복합니다!'");
  py = py.replace("output: 'i'", "output: '0\\n1\\n2'");
  py = py.replace("output: 'i'", "output: '0\\n1\\n3\\n4'");
  py = py.replace("output: 'name님, 환영합니다!\"'", "output: '앨리스님, 환영합니다!'");
  py = py.replace("output: 'secret'", "output: \"NameError: name 'notExistVariable' is not defined\"");
  py = py.replace("output: '1부터 10 사이의 랜덤 숫자: num\"'", "output: '1부터 10 사이의 랜덤 숫자: 7'");
  fs.writeFileSync('./src/data/python.ts', py);

  // Java fixes
  let java = fs.readFileSync('./src/data/java.ts', 'utf-8');
  java = java.replace("output: 'numbers[0]'", "output: '1'");
  java = java.replace("output: 'age'", "output: '20'");
  java = java.replace("output: 'appleCount'", "output: '5'");
  java = java.replace("output: 'weight'", "output: '65.5'");
  java = java.replace("output: 'name'", "output: '앨리스'");
  java = java.replace("output: '10 출력 (소수점 버려짐)'", "output: '10'");
  java = java.replace("output: 'name + \"는 \" + age + \"살입니다.\"'", "output: '자바는 20살입니다.'");
  java = java.replace("output: '성인입니다.\\n미성년자입니다.'", "output: '미성년자입니다.'");
  java = java.replace("output: 'A\\nB'", "output: 'B'");
  java = java.replace("output: '안녕!'", "output: '안녕!\\n안녕!\\n안녕!'");
  java = java.replace("output: '반복!'", "output: '반복!\\n반복!\\n반복!'");
  java = java.replace("output: 'i'", "output: '1\\n2\\n3'");
  java = java.replace("output: 'i'", "output: '1\\n2\\n4\\n5'");
  java = java.replace("output: 'f'", "output: '사과\\n바나나'");
  java = java.replace("output: '이름: \\n\"환영합니다, \" + name'", "output: '이름: 앨리스\\n환영합니다, 앨리스'");
  java = java.replace("output: '\"메시지: \" + msg'", "output: '메시지: 안녕!'");
  fs.writeFileSync('./src/data/java.ts', java);

  // JS fixes
  let js = fs.readFileSync('./src/data/javascript.ts', 'utf-8');
  js = js.replace("output: 'name'", "output: '밥'");
  js = js.replace("output: 'age'", "output: '20'");
  js = js.replace("output: 'appleCount, weight'", "output: '5 1.5'");
  js = js.replace("output: 'isRaining'", "output: 'true'");
  js = js.replace("output: 'name + \"는 \" + age + \"살입니다.\"'", "output: 'JS는 20살입니다.'");
  js = js.replace("output: '제 이름은 name이고, 나이는 age살입니다.'", "output: '제 이름은 앨리스이고, 나이는 20살입니다.'");
  js = js.replace("output: 'fruits'", "output: \"[ '사과', '바나나', '포도' ]\"");
  js = js.replace("output: 'person'", "output: \"{ name: '앨리스', age: 20 }\"");
  js = js.replace("output: 'person.name\\nperson.age'", "output: '앨리스\\n20'");
  js = js.replace("output: '성인입니다.\\n미성년자입니다.'", "output: '미성년자입니다.'");
  js = js.replace("output: 'A학점\\nB학점'", "output: 'B학점'");
  js = js.replace("output: '안녕하세요!'", "output: '안녕하세요!\\n안녕하세요!\\n안녕하세요!'");
  js = js.replace("output: '반복합니다!'", "output: '반복합니다!\\n반복합니다!\\n반복합니다!'");
  js = js.replace("output: 'i'", "output: '0\\n1\\n3\\n4'");
  js = js.replace("output: 'f'", "output: '사과\\n바나나'");
  js = js.replace("output: 'key, person[key]'", "output: 'name 앨리스\\nage 20'");
  js = js.replace("output: 'name + \"님, 환영합니다!\"'", "output: '앨리스님, 환영합니다!'");
  js = js.replace("output: 'result'", "output: '8'");
  js = js.replace("output: 'count + \"초 지남\"'", "output: '1초 지남\\n2초 지남\\n3초 지남\\n...'");
  js = js.replace("output: 'notExistVariable\\n에러가 발생했지만, 프로그램은 계속됩니다!'", "output: '에러가 발생했지만, 프로그램은 계속됩니다!'");
  fs.writeFileSync('./src/data/javascript.ts', js);
  
  console.log('Fixed outputs');
}

fixOutputs();
