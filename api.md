# API Document

## 어드민 관련
- 로그인을 제외한 모든 어드민 API는 Authorization 헤더에 토큰을 넣어야 합니다.

### 로그인

#### Request
- URI : /api/cert/signin
- Method: `POST`
- Body: application/x-www-form-urlencoded
```json
  {
    "id": "admin id",
    "pw": "admin pw",
  }
```
#### Response
- 응답 예시
```json
  {
    "status":200,
    "code":1,
    "desc":"successful login",
    "admin":"서지녁",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWM2Y2E0MDk3NjcxMDBkMDFhOGJlMTUiLCJ1c2VyIjoi7ISc7KeA64WBIiwiaWF0IjoxNTI0NzE3ODYxLCJleHAiOjE1MjQ3Mjg2NjEsImlzcyI6ImRnc3diYW1ib28ub2EudG8iLCJzdWIiOiJ1c2VydG9rZW4ifQ.qd9y16wVS2WhRqpGWntzILihV8d17SasWLihZBz6ds"
   }
  ```

##### status
- 200 : 성공
- 401 : 실패
- 500 : 서지녁에게 문의할 것

##### code
- 0: 실패
- 1: 성공 
- 솔직히 왜 넣은지 모르겠음

##### desc
- 얘도 왜 넣은지 모르겠음

##### admin
- 어드민 이름
- 승인 요청할 때 쓰임 토큰이랑 같이 살려두시길

##### token
- jwt 토큰
- 요청때 마다 필요함


### 승인 대기 글 갯수
- URI : /api/admin/count
- Method: `GET`

#### Response
- 응답 예시
```json
  {
    "status":200,
    "code":0,
    "count":135,
    "desc":"successful count"
   }
  ```

##### status
- 200 : 성공
- 204 : 대기 글이 없음
- 500 : 서지녁에게 문의할 것

##### code
- 0: 실패
- 1: 성공 
- 솔직히 왜 넣은지 모르겠음

##### count
- 대기 글 갯수

##### desc
- 얘도 왜 넣은지 모르겠음


### 인증 대기 글 불러오기
- URI : /api/admin/posted
- Method: `GET`
- Query: idx
  - idx번 글부터 5개씩 불러옴
    - 5로 요청하면 idx가 5번인 글부터 10번까지 5개

#### Response
- 응답 예시
- `GET` /api/admin/posted/0
```json
  {
  "status": 200,
  "code": 1,
  "posted": [
    {
      "idx": 689,
      "desc": "ddasdasdasdasd",
      "writeDate": "2018-4-26 14:22:02",
      "isChange": false
    },
    {
      "idx": 690,
      "desc": "asdasdadasdasd",
      "writeDate": "2018-4-26 14:22:05",
      "isChange": false
    },
    {
      "idx": 691,
      "desc": "asdasdasdadasd",
      "writeDate": "2018-4-26 14:22:08",
      "isChange": false
    }
  ],
  "desc": "successful request"
}
  ```

##### status
- 200 : 성공
- 204 : 대기 글 없음
- 500 : 서지녁에게 문의할 것

##### code
- 0: 실패
- 1: 성공 
- 솔직히 왜 넣은지 모르겠음

##### posted
- 대기 글 정보

##### desc
- 얘도 왜 넣은지 모르겠음


### 승인
- URI : /api/admin/allow
- Method: `POST`
- Body: application/x-www-form-urlencoded
```json
  {
    "id": "승인할 글의 idx",
    "admin": "어드민 이름",
  }
```

#### Response
- 응답 예시
```json
  {
    "status":201,
    "code":1,
    "desc":"successful request"
   }
  ```

##### status
- 201 : 성공
- 408 : 페이스북 api 오류
- 204 : 요청 idx 값에 해당하는 글이 없음
- 232 : 요청 idx 값에 해당하는 글이 이미 승인/거절 됐음

##### code
- 0: 실패
- 1: 성공 
- 솔직히 왜 넣은지 모르겠음

##### desc
- 얘도 왜 넣은지 모르겠음


### 거절
- URI : /api/admin/reject
- Method: `POST`
- Body: application/x-www-form-urlencoded
```json
  {
    "id": "거절할 글의 idx",
    "admin": "어드민 이름",
  }
```

#### Response
- 응답 예시
```json
  {
    "status":201,
    "code":1,
    "desc":"successful request"
   }
  ```

##### status
- 201 : 성공
- 204 : 요청 idx 값에 해당하는 글이 없음
- 232 : 요청 idx 값에 해당하는 글이 이미 승인/거절 됐음

##### code
- 0: 실패
- 1: 성공 
- 솔직히 왜 넣은지 모르겠음

##### desc
- 얘도 왜 넣은지 모르겠음

## 유저 관련

### 전체 글 갯수
- URI : /api/user/count
- Method: `GET`

#### Response
- 응답 예시
```json
  {
    "status":200,
    "code":0,
    "count":135,
    "desc":"successful count"
   }
  ```

##### status
- 200 : 성공
- 204 : 대기 글이 없음
- 500 : 서지녁에게 문의할 것

##### code
- 0: 실패
- 1: 성공 
- 솔직히 왜 넣은지 모르겠음

##### count
- 대기 글 갯수

##### desc
- 얘도 왜 넣은지 모르겠음


### 글 가져오기
- URI : /api/user/posted
- Method: `GET`
- Query: idx
  - idx번 글부터 5개씩 불러옴
    - 5로 요청하면 idx가 5번인 글부터 10번까지 5개

#### Response
- 응답 예시
```json
{
  "status": 200,
  "code": 1,
  "posted": [
    {
      "idx": 343,
      "desc": "윤규성 선생님\n천안함 뱃지도 사주시면 매우 감사하겠습니다^^^^^^^^^^^^^^^^^^^^^",
      "writeDate": "2018-4-26 08:35:17",
      "allowDate": "2018-4-26 08:43:39"
    },
    {
      "idx": 342,
      "desc": "자기한테서 냄새가 나면\n다른 사람들을 생각해서라도\n배려하는 차원에서\n냄새를 없애보려 노력이라도 해주세요",
      "writeDate": "2018-4-25 22:31:41",
      "allowDate": "2018-4-26 08:43:20"
    },
    {
      "idx": 341,
      "desc": "오늘 점심시간에 급식실에서 컴퓨터로 뭐 하고 계셨던건가요??",
      "writeDate": "2018-4-26 00:05:26",
      "allowDate": "2018-4-26 08:42:26"
    },
    {
      "idx": 340,
      "desc": "curl JSON 안에 \\n 적으면 개행 되나요?\n?",
      "writeDate": "2018-4-25 21:19:09",
      "allowDate": "2018-4-25 22:13:30"
    },
    {
      "idx": 339,
      "desc": "요새 글리젠이 안되노",
      "writeDate": "2018-4-25 17:45:36",
      "allowDate": "2018-4-25 22:13:28"
    }
  ],
  "desc": "successful request"
}
  ```

##### status
- 200 : 성공
- 204 : 글 없음
- 500 : 서지녁에게 문의할 것

##### code
- 0: 실패
- 1: 성공 
- 솔직히 왜 넣은지 모르겠음

##### posted
- 글 정보

##### desc
- 얘도 왜 넣은지 모르겠음

### 제보하기
- URI : /api/user/post
- Method: `POST`
- Body: application/x-www-form-urlencoded
```json
  {
    "desc": "제보 내용"
  }
```

#### Response
- 응답 예시
```json
{
  "status": 201,
  "code": 1,
  "desc": "successful request"
}
  ```

##### status
- 201 : 성공
- 500 : 서지녁에게 문의할 것

##### code
- 0: 실패
- 1: 성공 
- 솔직히 왜 넣은지 모르겠음

##### desc
- 얘도 왜 넣은지 모르겠음
