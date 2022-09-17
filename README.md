# Flask 웹 사이트 예시

현재 branch의 코드는 Flask를 이용한 기본적인 서버의 예시입니다.

기존 main branch의 코드는 `old_test` 폴더에 따로 저장해놨습니다.

## 필요 프로그램
* Python (저는 3.10.6 사용중입니다.)
* Git
* Visual Studio Code

## 실행해보기

1. git과 VSCode가 설치되어있는지 확인해주세요.
2. VSCode를 열고, 메인 페이지의 `Clone Repository`를 클릭해주세요.
3. 주소 입력란에 `https://github.com/Runas8128/SNC.git`를 입력해주세요.
4. 파일을 저장할 폴더를 지정해주세요.
5. 좌측 하단의 `main` 부분 클릭하고, `flask`를 선택해주세요.
6. 다음 명령어를 차례대로 입력해주세요.
```
python -m venv venv
(VSCode 재시작 후 터미널 실행시 맨 앞에 "(venv)"가 나오는지 확인)
pip install -r requirements.txt
flask init-db
```
7. `flask run` 명령어를 실행하면 웹서버가 실행됩니다.
    * `http://127.0.0.1:5000/`로 접속해 제대로 실행이 되는지 확인해주세요.
