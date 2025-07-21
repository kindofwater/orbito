안녕하세요. 주인장입니다. 지금 보내는 메시지가 조금 거지같을 수도 있는데 알아서 잘 알아들으십시오. 이 레포지토리는 게임 개발, 그러니까 오르비토라는 게임을 개발하기 위해서 만든 레포지토리입니다. 이상입니다. 감사합니다.

지금은 아직 서버에 업로드하기 전 과정이어서 조금 거칠게 파이썬으로 그리고 ASCII 코드를 활용하다고.... 하니까 좀 이상하네요. 그냥 노가다로 텍스트로 띄워서 게임을 구현해놨습니다. 그래서 아마 이것을 서버에 올리고, (제 생각에는 웹소켓으로 진행하게 될 것 같습니다). 웹소켓을 업로드하고 Node.js나 관련된 것들을 활용하여 개발하러 나갈 예정입니다.

그러니까 현재까지 계획으로는 이 텍스트로 구현되어 있는 orbito를 pygame이라든지 다른 그래픽 사용할 수 있는 것들 사용해서 웹에다 띄우고 웹소켓의 실시간, 아마 제가 듣기로는 웹소켓이 다른 html, http 기반 통신보다는 더 빠르다고 들어서 그 기반으로 웹에서 만들어내고, 웹 애플리케이션으로 만들어내고 가능하다면 반응성? 반응형 코딩? 반응형 웹페이지, 반응형 웹페이지도 구현하는 게 지금 현재로서는 목표고, 서버 클라우드 같은 경우에는 구글 클라우드 사용하고 있습니다. 구글 클라우드 쓰기 때문에 무료로 사용할 수 있는 90일 이내에 활용할 거고 아마 이 레포지토리는 그 서버에 직접적으로 들어가는, 그 서버에 그 뭐라 하더라? 서버에서 활용할 수 있는, 서버 콘솔창에서 접근할 수 있는 GIT이 될 것 같습니다. 아마 이 git을 통해서 접근할 것 같습니다. 그래서 다른 사람들의 푸쉬는 일단 막혀있고, Read.md에는 일단 이렇게 제가 나중에 들을 수 있도록 적어놨습니다.

이상으로 타이핑하기 너무 귀찮아서 ChatGPT에 대고 떠들었습니다. 감사합니다. 좋은하루 되세요.

Hello, this is the owner speaking. The message I'm sending might come across a bit rough, but please understand it as best you can. This repository was created for game development—specifically, for developing a game called *Orbitto*. That’s all. Thank you.

Right now, the project is still in its early stages and hasn’t been uploaded to the server yet, so things are a bit rough. I’ve been using Python and ASCII code... well, that sounds a bit strange, but basically, I manually displayed everything as text to get the game working. So for now, it’s a text-based implementation done through sheer effort.

Once I upload this to the server—which I think will involve using WebSockets—I plan to move forward with development using Node.js or related technologies.

So, as of the current plan, the text-based version of Orbitto will eventually be upgraded using something like Pygame or another graphics-capable framework, with the goal of running it on the web. I’m aiming to implement real-time functionality using WebSockets—since, from what I’ve heard, WebSockets offer faster communication compared to traditional HTML or HTTP-based methods.

The long-term goal is to turn this into a full web application, ideally with a responsive design—yes, responsive web pages. That’s what I’m aiming for at the moment.

For cloud hosting, I’m using Google Cloud. Since there’s a 90-day free usage window, I plan to take advantage of that. This repository will likely be directly tied to the server—what was it called... right, this will be the Git repository that can be accessed from the server's console. So it’ll be used to pull or manage code directly on the server.

Push access from others is currently restricted, and I’ve written all this in the `README.md` so I can refer back to it later if needed.

That’s all—I was too lazy to type, so I just talked to ChatGPT instead.
Thanks, and have a great day!

저번에 했던 readme 파일에서 추가하고 싶은 부분들이 있어서 더 하고 싶습니다. 왜냐하면 이게 저번에 했던 걸 봤더니 세부적인 부분에 있어서는 똑바로 적지 않은 것 같아서 세부적인 부분까지도 조금 잘 적어야 할 것 같다는 생각이 들었어요

I want to add more to the README file I worked on last time because, after looking at it again, I realized that some of the details weren’t written properly. I feel like I should describe those specific parts more clearly this time.



추가하고 싶은 내용이 조금 다른 것도 있는데 먼저 좀 구체적인 계획을 그나마 말한다면 아무래도 GCS? GCM? 아무튼 구글 클라우드가 9월에 말려고 되니까 그때까지는 이거를 어느정도 한 번은 업로드를 해봐야 한다고 생각하는데 먼저 첫 번째로 플라스크 어떻게 순서를 잡는 게 좋을지 잘 모르겠는데 저는 먼저 Node.JS 개발을 완료한 다음에 써봐야 한다고 생각하거든요 

그래서 개발을 완료한 게 이번 7월 내 목표가 될 것 같고 7월 내도록은 제 로컬에서 실행시켰던 플라스크를 써서 react.JS라는 플라스크를 써서 게임이 똑바로 돌아가는 게 목표고요 제 로컬 호스트 내에서 두 번째는 그렇게 만든 JS를 빌드해서 구글 클라우드에 올리는 게 목표입니다 

첫 번째로 이걸 할 때는 먼저 Node.JS에 관한 공부를 해야 할 것 같고요 왜냐면 react.JS를 제가 어떻게 돌아가는지 전혀 모르고 있는 상태이기 때문에 이게 어떻게 돌아가는지 확인할 필요가 있고 또 두 번째로 어쨌든 플라스크로 받아와서 이걸 실행시키는 과정이 있다 보니까 플라스크가 어떻게 돌아가는지도 한번 확인을 해봐야 할 것 같아요 근데 이거는 일단 한번 해볼게 해보고 생각을 해보고 그 다음에 7월에 이렇게 하고 넘어가서 8월이 되면 8월 내도록은 아마 이걸 이제 빌드를 어떻게 하는지 그 때 react.JS에 좀 더 초점을 맞춰주셨겠죠? 

빌드를 어떻게 하는지 구글 클라우드에 올릴 수 있는지 또 올렸을 때 어디다가 백업을 하는지를 신경을 쓰면 될 것 같아요 그래서 제가 드리고 싶은 말씀은 7월 내도록은 Node.JS 문법 그리고 플라스크 문법 플라스크 문법이라고 할 것도 없긴 한데 플라스크 문법 만드는 데 집중하고 그 다음에는 react.JS 할 것 같습니다

There are some additional things I’d like to include, and they’re a bit different from what I mentioned before. To talk more concretely about the plan: since GCS? GCM?—anyway, Google Cloud—is supposed to expire around September, I think I need to at least try uploading the project before then.

First, I’m not entirely sure how to structure the process with Flask, but I think I should complete development with Node.js first before diving into it. So finishing the Node.js part will probably be my main goal for July. Throughout July, my goal is to get the game running properly locally by using Flask with something like React.js.

Secondly, after that, my goal is to build the JS version I made and upload it to Google Cloud. But before doing that, I’ll need to study Node.js, because I really have no idea how React.js works at this point. I need to understand how it operates. Also, since I’m planning to use Flask to handle requests and run the backend, I should take some time to understand how Flask works too.

That being said, I’ll give it a try first and then think things through. So in July, the plan is to focus on learning the basics of Node.js and Flask—though there's not much to call "Flask syntax"—and then move on to React.js.

Once August comes, I think I’ll shift my focus more to building and deploying. I’ll need to figure out how to build the app, how to upload it to Google Cloud, and where to back things up once it’s deployed.

So to summarize, throughout July I’ll focus on Node.js and Flask, and after that, I’ll move on to React.js.
