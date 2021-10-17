# 20조 REWIND Frontend
### Team
+ Frontend : 오세명,한우석 (REACT)
+ Backend :  오준석,최선강 (SPRING)
<br><br>
### REWIND란?
+ 그 등안 Backend,Frontend가 공부하고 정리했던 내용들을 각 프레임워크별 (Spring,React,Node.js)로 모두 공유할 수 있는 게시판을 구현하려고 합니다. 게시판은 기본적으로 메인페이지에 모든 프레임워크들의 게시글들이 한번에 보여지며 각 카테고리속에는 그에 해당하는 게시글들만 보여집니다. 유저는 로그인을 하여야 기본적인 서비스를 이용할 수 있습니다.

+ [데모 영상(유튜브)](https://youtu.be/k1jPlPFCqfk)
<br><br>

### Objective

1.  Frontend와 Backend 다른환경에서의 연동(CORS)
2.  회원가입 & Spring에서 JWT 방식의 로그인
3.  게시판 구현(CRUD 적용,프론트에서 작성시 마크다운형태로 구현)
4.  댓글 작성(CRUD 적용)
5.  메인페이지 페이징,카테고리별 페이징
<br><br>

### Project Collaboration Process
<details markdown = "1">
<summary>
API설계
</summary>

### 로그인/회원가입
|기능　　　　　|Method|URL|Request|Response|
|---|---|---|---|---|
|로그인|POST|/login|{ email: email< String >,<br>pw:pw < String >}|{result:"success"< String >,<br>token:token< String >,<br>nickname:nickname < String >}<br>{result:fail < String >,<br>errorMessage:""< String >,<br>httpStatus:"BAD_REQUEST"< String > }
|회원가입|POST|/signup|{email:email< String > ,<br>pw:pw< String > pwCheck:pwCheck< String > <br>nickname:nickname< String >}|{result:success< String > <br> result:fail< String >}|
|아이디 중복확인|POST|/signup/duplicate_id|{ email:email < String > }|{result:success< String > ,<br> result:fail< String >}|
|닉네임 중복확인|POST|signup/duplicate_nickname|{ nickname:nickname < String > }|{reslu:success< String>}<br>{result:fail< String > }|
|카카오|GET|/kakao/callback|-|-|

### 메인페이지
|기능　　　　　|Method|URL|Request|Response|
|---|---|---|---|---|
|게시글목록|GET|/posts/{page}|-| [ content : { <br> insertDt : insertDt< String >,<br>modifiedDt : modifiedDt< String >,<br>id : id< String >,<br>category : category< String >,<br>titile : titile< String >,<br>author : author< String >,<br>nickname : nickname< String >,<br>contents : contents< String >},<br>pageable : {<br>pageSize : 10,<br>pageNumber : 1},<br>last : last< String >,<br>totalPages : totalPages< Number >,<br>totalElements : totalElements< Number >,<br>size : size< Number >,<br>number : number< Number >,<br>first : < Boolean >,<br>last:  < Boolean >,<br>numberOfElements : numberOfElements< Number >,],<br>...<br>]|
|카테고리 게시글 목록|GET|/posts/{category}/{page}|-|[content : {<br>insertDt : insertDt< String >,<br>modifiedDt : modifiedDt< String >,<br>id : id< String >,<br>category : category< String >,<br>titile : titile< String >,<br>author : author< String >,<br>nickname : nickname< String >,<br>contents : contents< String ><br>},<br>pageable : {<br>pageSize : 10,<br>pageNumber : 1<br>},<br>last : last< String >,<br>totalPages : totalPages< Number >,<br>totalElements : totalElements< Number >,<br>size : size< Number >,<br>number : number< Number >,<br>first : first< String >,<br>numberOfElements : numberOfElements< Number >,],<br>...<br>]|

### 상세페이지
|기능　　　　　|Method|URL|Request|Response|
|---|---|---|---|---|
|게시글,댓글가져오기|GET|/post/{id}|{id : postid< String >}|{<br>category: category< String >,<br>title : title< String >,<br>author : userEmail< String >,<br>contents : contents< String >,<br>insertDt : insertDt< String >,<br>nickname : nickname< String >,<br>comments: []< List ><br>}}
|게시글 수정|POST|/post/{id}|{<br>id : postId< Number >,<br>title : title< String >,<br>contents : contents< String >,<br>category: category< String ><br>}| {<br>author: email< String >,<br>category: category< String >,<br>contents: newContents< String >,<br>id: postId< Number >,<br>insertDt: insertDt< String >,<br>nickname: nickname< String >,<br>title: newTitle< String >,<br>}|
|게시글 삭제|DELETE|/post/{id}|-|{result : 'success'< String >},<br>{result : 'fail'< String >}|
|댓글삭제|DELETE|/comment/{id}|-|{reslut:success< String>}<br>{result:fail< String > }|
|댓글수정|POST|/comment/{id}|{<br>id : commentId< String >,<br>comment : comment< String >,<br>}|{<br>result: 'success'< String >,<br>comment: {<br>comment: "sasd"< String >,<br>id: 42< Long >,<br>insertDt: "2021-10-14T22:15:58.574136"< String >,<br>modifiedDt: "2021-10-14T22:16:19.074515"< String >,<br>nickname: "오세명오세명"< String >,<br>post: {<br>author: userEmail< String >,<br>category: category< String >,<br>contents: content< String >,<br>id: 17< Long >,<br>insertDt: isoString< String >,<br>modifiedDt: isoSTring< String >,<br>nickname: userNickname< String >,<br>title: title< String >,<br>}<br>}<br>}|
|댓글작성|POST|/comment|{<br>comment : comment< String >,<br>postId: unique post id< Number ><br>}|-|

### 게시글 작성
|기능　　　　　|Method|URL|Request|Response|
|---|---|---|---|---|
|게시글등록|POST|/post|{<br>category: category< String ><br>title:title< String >,<br>contents:contents< String >,<br>}|{<br>id : id< String >,<br>category: category< String >,<br>title : title< String >,<br>author : userEmail< String >,<br>contents : contents< String >,<br>insertDt : insertDt< String >,<br>nickname : nickname< String >,<br>comments: []< List ><br>}<br>{<br>result: 'fail'<br>}|
</details>

<br>
<details markdown = "2">
<summary>
문제점 / 해결과정
</summary>

## 카카오 로그인
<div style="width: 700px; margin: 20px auto" >
<img src = "https://media.vlpt.us/images/junseokoo/post/2e4ee263-f81b-4144-9d54-4c58c6a2b57b/qwert.PNG">
</div>

+ 백엔드 강의에서 배웠던 강의의 내용을 기반으로 카카오 로그인 기능을 구현하려고 하였습니다. 백엔드 측에서 REST API 키를 받고 카카오 서비스 규약에 맞게 URI를 구성하여 링크를 만들면 유저는 해당 링크에 접속을 하여 카카오에서 선행적으로 로그인을 진행합니다. 카카오 로그인이
  성공적으로 완료되면 자동적으로 Redirection Link에 인가코드와 함께 `GET` 요청을 보내게 되고, 서버는 그 인가코드를 통하여 카카오 서비스에 재요청 후 Access token과 Refresh Token을 받아 클라이언트에 제공합니다.

+ 처음 기능을 구현할 때 프론트와 백엔드 모두는 단순히 서비스 구현 URI를 링크로 담은 엘리먼트를 만들면 된다는 생각을 하였습니다. 엘리먼트를 만들고 그 URI에 실제로 접속한 순간 JSON만 보여줄 뿐, 클라이언트의 스코프로부터 완전히 벗어났습니다. 해당 문제에 관하여 백엔드와 프론트엔드가 토의 결과
  백엔드에서의 서버사이드 렌더링 로직을 클라이언트와의 통신에도 적용하고 있다는 논리적 오류를 발견하였습니다. 이 문제를 발견한 후 클라이언트에서 인가코드를 직접 보내는 로직을 작성하였습니다.

+ 클라이언트 측에서 카카오 로그인 기능을 구현하기 위해서는 규약 URI에 접속하도록 컴포넌트를 구성해야하지만, Redirection URI를 클라이언트 측으로 바꾸어야 했습니다. 클라이언트에서 직접 인가 코드를 받게되고 이를 서버에 `GET`을 통하여 전송한다면 클라이언트의
  스코프를 벗어나지도 않고, 서버에서는 인가코드를 받은 것으로 정상적으로 카카오에 요청을 한 후 **응답을 통해 토큰을 내려줄 수 있기 때문입니다.**

+ 서버에 정상적으로 인가코드를 전송하였으나 서버에서 카카오로 요청을 보내는 과정 속에서 오류가 발생하였는데, 이는 기존에 카카오에 요청할 때 보내는 endpoint를 클라이언트의 주소로 맞춰야 하는 규칙을 지키지 않았기 때문입니다. 해당 부분을 클라이언트의 요청 URI로 바꾸어 요청한 결과 정상적으로 토큰이 발급되었고, 로그인을 구현하였습니다.

+ 카카오 로그인을 구현하면서 클라이언트와 서버 간의 커뮤니케이션 이슈를 겪었으며, 문제의 결정적인 원인은 강의에서 배운 내용으로만 소통을 하였기 때문이라는 생각을 가지게 되었습니다. 서버 사이드 렌더링과 REST API 통신은 엄연히 다른 경계에 속해있으므로, 다음 협업 때에는 어떤 기능을 이야기 할 때 어떤 맥락에서 이야기를 하고있는지 알아야겠다는 생각을 하였습니다.

## JWT 토큰 방식의 로그인 인증 구현
+ 토큰을 이용해 클라이언트가 인증된 유저임을 증명하는 로직은 기존 서버 세션에 저장하는 기능으로부터 관심사의 분리를 하기에 적합하였습니다. 서버는 토큰만을 디코딩하여 유저의 진실성 여부를 검증할 수 있으며, 클라이언트는 불필요한 재로그인 과정을 거치지 않고 서비스를 이용할 때마다 요청만 보내면 되기 때문입니다. 이번 프로젝트에서 백엔드와 프론트엔드는 최초 로그인 시 localStorage에 AccessToken을 저장한 후 로그인을 해야만 보여주는 서비스에 대해서 토큰을 헤더에 저장하여 요청을 보내기로 합의를 하여 로직을 작성하였습니다.
<div style="width: 650px; margin: 20px auto" >
<img src= "https://media.vlpt.us/images/junseokoo/post/8c49c470-c19c-47cb-9106-d7a219bcd33c/asdf.PNG">
<br></br>
<img src = "https://media.vlpt.us/images/junseokoo/post/639091d3-3006-4fcb-a88f-f95ebdb79d5e/asdfgh.PNG">
</div>

+ 정상적으로 로그인 로직을 구현하고 다른 기능을 구현하면서 클라이언트에서 새로고침을 해야하는 일이 생겼습니다. 여기에서 새로고침을 할 때마다 클라이언트에서 저장한 userState가 초기화된다는 문제를 겪었습니다. 단순 실수로 새로고침을 하였다고 하더라도 유저가 로그인했다는 정보가 사라져버리면 사용자경험 측면에서 많은 문제를 야기한다고 생각했습니다.

+ 이 문제에 관하여 클라이언트와 백엔드는 먼저 클라이언트 쪽에서 App이 초기화되어 실행될 때마다 localStorage에 토큰이 있으면, 그 토큰을 가지고 서버에 요청을 보내어 정상적인 유저인지 판별한 후, 맞다면 로그인 관련 정보를 보내기로 합의하였으며, 계획 대로 로직을 구현하여서 로그인 인증에 대한 안정성을 확보할 수 있었습니다.

+ 그러나 AccessToken의 유효시간이 다 되었을 때를 대비하기 위한 로직은 구현하지 못하였습니다. RefreshToken을 이용하여 AccessToken이 만료되었을 때 RefreshToken을 통해 갱신하는 방법이 대표적이라는 리서치를 하였으나, 이 문제를 인지할 때의 시점이 프로젝트 마감 기한에 임박한 시점이었습니다. 그래서 우선적으로 유효시간이 만료되었으면 재로그인을 처리하는 방향으로 로직을 구현하였습니다. 다음 프로젝트부터는 RefreshToken을 이용하여 로그인 관련 로직을 구현해보겠습니다.

## TeamWork
+ 이번에 처음으로 Frontend와 Backend가 협력하여 프로젝트를 진행해보았는데 저희조 같은경우는 우선적으로 `API설계`에 많은 시간을 투자했습니다. 이 과정 덕분에 오류 발생,수정,삭제부분이 생길시 다른조에 비해서 좀더 원활하게 진행이 되었다고 생각합니다. API설계의 중요성을 다시금 깨달았으며 매우 중요한 과정이란것을 알게 되었습니다.
그리고 Frontend와 Backend가 서로의 요구사항 및 변경사항을 당연히 모두가 100% 만족은 할 수 없었겠지만, `지속적인 소통`을 통해 서로의 만족을 채우려고 노력했던 Team이었다고 생각합니다.Frontend와 Backend의 `배려`가 너무 돋보이는 Team이었고 좋은 분위기 속에서 프로젝트를 진행하였기 때문에 목표 한 결과가 나왔다고 생각합니다.
</details>
<br>

### 프론트엔드 작업을 하면서 느꼈던 것
#### 1. GlobalState의 볼륨과 서버 요청 사이의 갭
- 비록 프로젝트의 단위가 작지만 클라이언트가 어떤 수준으로 state를 관리하면 좋을지 논의를 하였습니다. 이야기를 한 배경은 다음과 같습니다. 루트 페이지로 `GET`을 보내게 된다면 비즈니스 로직에 필요한 데이터를 서버로부터 제공받습니다. 이 데이터는 **GET을 보내는 시점에 국한된** staleValue입니다. 그런데 유저가 상세 페이지로 이동을 할 때는 staleValue가 아닌 freshValue을 제공해야한다고 생각했습니다. 그래서 매 번 페이지로 이동할 때마다 어차피 새로운 값을 받는다면, 상세페이지 컴포넌트에서 localState로 데이터를 관리하고, redux에서 관리하는 globalState의 볼륨을 줄이자는 결론을 도출하였습니다.

+ 처음 내린 결론을 토대로 로직을 리팩토링하고난 다음 프론트엔드에서는 *어차피 정보의 최신성을 보장할 것이라면 루트 페이지로 이동할 때마다 API call을 보내는 것이 좋지 않은가?* 라는 질문을 가지고 회의를 진행하였습니다. **정보의 최신성 보장**과 **API Call Cost** 사이에서 뚜렷한 결론을 내리지 못한 저희는 항해99 리액트 멘토님께 자문을 구하였습니다.

+ 멘토님께서는 매 프로젝트마다 다르며, 타겟 유저에 따라 다르다고 답변을 해주셨으며, 이에 관하여 저희 프로젝트에서 과연 어떤 유저를 타겟으로 설정하였는지에 대해 되돌아보게 되었습니다. 처음 프로젝트 회의를 할 때 이 부분에 대해 논의를 하지 않았다는걸 알게된 후, 비용의 관점으로 생각을 전환하였습니다. 오랜 숙고와 이야기를 끝으로 **루트 페이지에서 최초에 접속했을 때, 새로고침을 하지 않는 이상 API call을 하지 않고 state으로 관리하자는** 결론을 내리고 로직을 그대로 두었습니다.

+ 이런 결론을 내린 이유는, 기업의 관점에서 생각했을 때 서버 역시 하나의 비용이며, 매 번 요청을 보낼 때마다 돈이 나간다고 생각을 한다면 고객에게 서비스를 제공함으로써 얻는 이익보다도 서버 유지를 위한 비용이 더 많이 들 것이라고 생각했기 때문입니다.

+ 프론트엔드 협업을 처음 진행하면서 기능 구현에만 집중하지 않고, 서비스적인 측면에서 생각하여 로직을 전개했던 좋은 경험이 되었습니다.
