import "./main.css"
import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { useHorizontalScroll } from "./useSideScroll.tsx";

const App = () => {
  const scrollRef = useHorizontalScroll();

  const scrollToPosition = (positionX : number) => {
    if(scrollRef.current) {
      scrollRef.current.scrollTo({
        left: positionX,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <NavigationBar f={scrollToPosition}/>
      <div className="App" ref={scrollRef} style={{ overflow: "auto" }}>
        <div style={{ whiteSpace: "nowrap" }}>
          <StoryBox f={scrollToPosition}></StoryBox>
        </div>
      </div>
      <ShowHelp/>
    </>
  );

}

const CommentBoxRoot = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 601px;
  height: 408px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000;
  gap: 24px;
  
`

const CommentHeader = styled.div`
  display: flex;
  margin: 24px 24px 0px 24px;
  justify-content: space-between;
  height: 40px;
  color: #EED555;
  font-size: 20px;
`
 
const CommentContent = styled.textarea`
  display: flex;
  margin-left: 48px;
  margin-right: 48px;
  color: #EED555;
  width: 505px;
  height: 232px;
  background: #000;
  border: 1px solid black ;
  font-size: 20px;
  resize: none;
  outline: none;

`
const CommentSend = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 24px;
  margin-right: 24px;
  color: #EED555;
  font-size: 20px;
`

interface CommentBoxProps {
  name: string,
  comments: string,
  setComments: (x: string) => void,
  setInputPhase: (x: boolean) => void,
}

const CommentBox = ({name, comments, setComments, setInputPhase}: CommentBoxProps) => {
  const [content, setContent] = useState<string>("이곳에 전하고 싶은 이야기를 작성해주세요.");
  const [errormessage, setErrorMessage] = useState<string>("");
  
  const SendComment = () => {
    if(content === "이곳에 전하고 싶은 이야기를 작성해주세요." || content === "") {
      setErrorMessage("이야기를 입력해주세요.");
    }else{
      setComments(comments + "\n" + content);
      setInputPhase(false);
    }
  }
  

  return (
    <CommentBoxRoot>
      <CommentHeader>
        <div style={{textDecoration: 'underline'}}>{`'${name}'에게 전할 이야기가 있나요?`}</div>
        <div style={{cursor: 'pointer'}} onClick={() => setInputPhase(false)} >X</div>
      </CommentHeader>
      <CommentContent value={content} onChange={(e) => setContent(e.target.value)} onFocus={() => {setErrorMessage(""); if(content === "이곳에 전하고 싶은 이야기를 작성해주세요.") {setContent("")}}}>
      </CommentContent>
      <CommentSend >
        <div>{errormessage}</div>
        <div style={{cursor: 'pointer'}} onClick={SendComment}>보내기</div>
      </CommentSend>
      
    </CommentBoxRoot>
  )
}

const StoryBoxRoot = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100vh;
  width: 1000vw;
  gap: 17.7vw;
  padding-left: 48px;
  
  background: #EED555;
`
const GenRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 51px;
  
`

const Box = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6vw;
`

const Story = styled.div`
  display: flex;
  word-wrap: break-word;
  white-space: normal;

  margin-top: 176px;
  width: 30.6vw;
  height: 200px;
  font-size: 2.5vh;
  line-height: 1.7;
`

const Generation = styled.div`
  display: flex;
  font-size: 2.5rem;
`

const Name = styled.span`
  color: blue;
  cursor: pointer;
`

const Comment = styled.span`
  cursor: pointer;
`


interface StoryBoxProps {
  f : (positionX : number) => void
}

const StoryBox = ({f} : StoryBoxProps) => {
  const [comment1, setComment1] = useState<string>("");
  const [comment1visible, setComment1Visible] = useState<boolean>(false);
  const [commentTo, setCommentTo] = useState<string>("");
  const [inputphase, setInputPhase] = useState<boolean>(false);


  const handleCommentClick = (name: string) => {
    setCommentTo(name);
    setInputPhase(true);
  };

  return (
    <StoryBoxRoot>
      {inputphase && <CommentBox name={commentTo} comments={comment1} setComments={setComment1} setInputPhase={setInputPhase}/>}
    <GenRoot>
      <Box>
        <Story>
          <p>
          <Name  onClick={() => f(0)}>양규</Name>의 아들, <Name onMouseEnter={() => setComment1Visible(true)} onMouseLeave={() => setComment1Visible(false)} onClick={() => f(0)}>한석</Name>이 고종 병술년 11월 28일에 태어난다. 이후 <Name onMouseEnter={() => setComment1Visible(true)} onMouseLeave={() => setComment1Visible(false)} onClick={() => f(0)}>한석</Name>은 예규에게 입양된다. <Name onMouseEnter={() => setComment1Visible(true)} onMouseLeave={() => setComment1Visible(false)} onClick={() => f(0)}>한석</Name>은 <a href="https://ko.wikipedia.org/wiki/%EB%B3%B4%EC%84%B1_%EC%84%A0%EC%94%A8" target="_blank">보성 선씨</a>와 결혼한다. 배우자인 선씨는 신묘년 2월 15일에 태어났으며, 아버지의 성함은 선영문이다. <Name onMouseEnter={() => setComment1Visible(true)} onMouseLeave={() => setComment1Visible(false)} onClick={() => f(0)}>한석</Name>은 1959년 5월 4일에 생을 마감하고, 가장등 가족묘지에 잠들어있다. 선씨는 1958년 12월 20일에 생을 마감하고, 우동간 합봉유비에 잠들어있다. <Comment onClick={() => handleCommentClick("한석")}>☛</Comment></p>
        </Story>
      </Box>
      {comment1visible && <div>{comment1}</div>}
      <Generation>15대</Generation>
    </GenRoot>
    <GenRoot>
      <Box>
        <Story>
          <p>
        한석과 선씨의 첫째 아들, 락천이 1913년 정월 11일에 태어난다. 락천은 <a href="https://ko.wikipedia.org/wiki/%EC%9E%A5%ED%9D%A5_%EC%9E%84%EC%94%A8" target="_blank">장흥 임씨</a>와 결혼한다. 배우자인 임씨는 1912년 8월 31일에 태어났으며, 아버지의 성함은 임흥태이다. 락천은 1990년 7월 27일에 생을 마감하고, 가장등 가족묘지에 잠들어있다.</p>
        </Story>
        <Story>
        <p>한석과 선씨의 둘째 아들, 락재가 1917년 정월 10일에 태어난다. 락재는 <a href="https://ko.wikipedia.org/wiki/%EA%B2%BD%EC%A3%BC_%EA%B9%80%EC%94%A8" target="_blank">경주 김씨</a> 안순과 결혼한다. 배우자인 안순은 1923년 8월 27일에 태어났으며, 아버지의 성함은 김윤호이다. 락재는 1949년 5월 13일에 생을 마감하고, <a href="https://www.google.com/maps/place/%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%88%98%EC%9B%90%EC%8B%9C+%EA%B6%8C%EC%84%A0%EA%B5%AC+%ED%83%91%EB%8F%99/data=!4m2!3m1!1s0x357b428a61d2cf27:0x296fe9e040b1b8bf?sa=X&ved=2ahUKEwi94-LVxNWDAxVxm1YBHbmJBpcQ8gF6BAgTEAA" target="_blank">탑동</a>에 잠들어있다.</p>
        </Story>
        <Story>
        <p>한석과 선씨의 셋째 아들, 락행이 1926년 2월 18일에 태어난다. 락행은 <a href="https://ko.wikipedia.org/wiki/%EB%8B%AC%EC%84%B1_%EB%B0%B0%EC%94%A8" target="_blank">달성 배씨</a> 갑자와 결혼한다. 배우자인 갑자는 1924년 9월 5일에 태어났으며, 아버지의 성함은 배평묵이다. 락행은 1959년 8월 7일에 생을 마감하고, <a href="https://www.google.com/maps/place/%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%88%98%EC%9B%90%EC%8B%9C+%EA%B6%8C%EC%84%A0%EA%B5%AC+%ED%83%91%EB%8F%99/data=!4m2!3m1!1s0x357b428a61d2cf27:0x296fe9e040b1b8bf?sa=X&ved=2ahUKEwi94-LVxNWDAxVxm1YBHbmJBpcQ8gF6BAgTEAA" target="_blank">탑동</a>에 잠들어있다.</p>
        </Story>
      </Box>
      <Generation>16대</Generation>
    </GenRoot>
    <GenRoot>
      <Box>
          <Story>
          <p>락천과 임씨의 첫째 아들, 두식이 1939년 2월 28일에 태어난다. 두식은 <a href="https://ko.wikipedia.org/wiki/%EA%B9%80%ED%95%B4_%EA%B9%80%EC%94%A8" target="_blank">김해 김씨</a> 옥희와 결혼한다. 배우자인 옥희는 1945년 4월 20일에 태어났으며, 아버지의 성함은 김종열이다.</p>
          </Story>
          <Story><p>락천과 임씨의 둘째 아들, 두일이 1945년 10월 18일에 태어난다. 두일은 <a href="https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%B2%9C_%EC%84%9C%EC%94%A8" target="_blank">이천 서씨</a> 경욱과 결혼한다. 배우자인 경욱는 1946년 11월 26일에 태어났다.</p></Story>
          <Story><p>락천과 임씨의 셋째 아들, 두만이 1948년 2월 15일에 태어난다. 중앙대학교 신문방송학과를 졸업하고, 국가경찰공무원을 정년퇴직한다. 대통령 표창장 제133613호와 대한민국 <a href="https://www.policemuseum.go.kr/pm_info_new/relic_new_view.asp?lcode=&mcode=&id=4709&page=12&category_1=%C6%F7%BB%F3%B7%F9&category_2=&searchString=" target="blank">녹조근정훈장</a> 제78514호를 수상하기도 한다. 두만은 <a href="https://ko.wikipedia.org/wiki/%EA%B9%80%ED%95%B4_%EA%B9%80%EC%94%A8" target="_blank">김해 김씨</a> 경숙과 결혼한다. 배우자인 경숙의 아버지의 성함은 김귀봉이다. 경숙은 순천간호전문대학을 졸업했다.</p></Story>
          <Story>
          <p>락천과 임씨의 넷째 아들, 두성이 1951년 7월 9일에 태어난다. 두성은 <a href="https://ko.wikipedia.org/wiki/%EB%B0%80%EC%96%91_%EB%B0%95%EC%94%A8" target="_blank">밀양 박씨</a> 숙희와 결혼한다. 배우자인 숙희는 1957년 12월 17일에 태어났다.</p>
          </Story>
          <Story>
          <p>락천과 임씨에게 한명의 딸도 있었다. 그녀는 <a href="https://ko.wikipedia.org/wiki/%EC%A0%84%EC%A3%BC_%EC%9D%B4%EC%94%A8" target="_blank">전주 이씨</a> 황구와 결혼해, 아들 광복을 낳는다.</p>
          </Story>
          <Story>
          <p>락재와 안순의 아들, 경량이 1947년 정월 26일에 태어난다. 경량은 <a href="https://ko.wikipedia.org/wiki/%EC%98%81%EA%B4%91_%EA%B9%80%EC%94%A8" target="_blank">영광 김씨</a> 매요와 결혼한다. 배우자인 매요는 1949년 7월 15일에 태어났다. 경량은 1984년 6월 6일에 생을 마감하고, <a href="https://www.google.com/maps/place/%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%88%98%EC%9B%90%EC%8B%9C+%EA%B6%8C%EC%84%A0%EA%B5%AC+%ED%83%91%EB%8F%99/data=!4m2!3m1!1s0x357b428a61d2cf27:0x296fe9e040b1b8bf?sa=X&ved=2ahUKEwi94-LVxNWDAxVxm1YBHbmJBpcQ8gF6BAgTEAA" target="_blank">탑동</a>에 잠들어있다.</p>
          </Story>
          <Story>
          <p>락재와 안순에게는 두명의 딸이 있었다. 첫째 딸은 <a href="https://ko.wikipedia.org/wiki/%EC%A0%9C%EC%A3%BC_%EA%B3%A0%EC%94%A8" target="_blank">제주 고씨</a> 재기와 결혼해, 첫째 아들 용철과 둘째 아들 용석을 낳는다. 둘째 딸은 <a href="https://ko.wikipedia.org/wiki/%EA%B4%91%EC%82%B0_%EA%B9%80%EC%94%A8" target="_blank">광산 김씨</a> 안식과 결혼해, 첫째 아들 중철과 둘째 아들 중호를 낳는다.</p>
          </Story>
          <Story>
          <p>락행과 갑자에게는 두명의 딸이 있었다. 첫째 딸은 <a href="https://ko.wikipedia.org/wiki/%EA%B9%80%ED%95%B4_%EA%B9%80%EC%94%A8" target="_blank">김해 김씨</a> 상수와 결혼한다. 둘째 딸은 <a href="https://ko.wikipedia.org/wiki/%EC%9D%B8%EB%8F%99_%EC%9E%A5%EC%94%A8_(%EC%83%81%EC%9E%A5%EA%B5%B0%EA%B3%84)" target="_blank">인동 장씨</a> 덕철과 결혼한다.</p> 
          </Story>
      </Box>
      <Generation>17대</Generation>
    </GenRoot>
    <GenRoot>
      <Box>
        <Story>
        <p>두식과 옥희의 첫째 딸, 수희가 1965년 12월 3일에 태어난다. 한성대학교를 졸업했다고 기록되어 있지만 사실이 아닌 듯하다.</p>
        </Story>
        <Story>
        <p>두식과 옥희의 첫째 아들, 현철이 1969년 8월 18일 서울에서 태어난다. 국민대학교를 졸업했다고 기록되어 있지만 사실은 서경대학교를 졸업했다고 한다. 현철은 <a href="https://ko.wikipedia.org/wiki/%EC%A0%84%EC%A3%BC_%EC%9D%B4%EC%94%A8" target="_blank">전주 이씨</a> 재화와 결혼한다. 배우자인 재화는 1973년 5월 18일에 태어났다.</p>
        </Story>
        <Story>
        <p>두식과 옥희의 둘째 딸, 현숙이 1973년 4월 23일에 태어난다. 한양대학교를 졸업했다고 기록되어 있지만 사실이 아닌 듯하다.</p>
        </Story>
        <Story>
        <p>두식과 옥희의 셋째 딸, 수연이 1976년 8월 14일에 태어난다. 상명대학교를 졸업했다.</p>
        </Story>
        <Story><p>두일과 경욱의 아들, 준영이 1986년 6월 26일에 태어난다. 연세대학교 방송학과를 졸업했다.</p></Story>
        <Story><p>두만과 경숙의 첫째 아들, 재헌이 1974년 4월 5일에 태어난다. 중국심양한의과대학을 졸업했는지는 확실하지 않다. 재헌은 가락 금씨 녕과 결혼한다. 배우자인 녕은 1968년 3월 20일에 태어났으며, 아버지의 성함은 영식이다.</p></Story>
        <Story><p>두만과 경숙의 둘째 아들, 호성이 1976년 3월 19일에 태어난다. 고려대학교 행정학과를 졸업했다. 호성은 <a href="https://ko.wikipedia.org/wiki/%EC%98%81%EC%96%91_%EB%82%A8%EC%94%A8" target="_blank">영양 남씨</a> 주희와 결혼한다. 주희는 1975년 6월 2일에 태어났다. 배우자인 주희의 아버지의 성함은 무광이다. 주희는 이화여자대학교 영문과를 졸업했다.</p></Story>
        <Story><p>두만과 경숙의 첫째 딸, 정현이 1993년 2월 28일에 태어난다. 동서울대학교 전자학과를 졸업했다.</p></Story>
        <Story><p>두성과 숙희의 아들, 현우가 1980년 11월 7일에 태어난다.</p></Story>
        <Story><p>경량과 매요의 첫째 딸, 은주가 1973년 12월 25일에 태어난다. 은주는 윤창영과 결혼해, 아들 치성을 낳는다.</p></Story>
        <Story><p>경량과 매요의 첫째 아들, 재열이 1975년 5월 5일에 태어난다.</p></Story>
        <Story><p>경량과 매요의 둘째 아들, 성현이 1977년 5월 28일에 태어난다.</p></Story>
        <Story><p>경량과 매요의 셋째 아들, 동채가 1979년 8월 9일에 태어난다.</p></Story>
      </Box>
      <Generation>18대</Generation>
    </GenRoot>
    <GenRoot>
      <Box>
        <Story>
        <p>현철과 재화의 첫째 딸, 선형이 2001년 9월 3일에 태어난다.</p>
        </Story>
        <Story>
        <p>현철과 재화의 둘째 딸, 소형이 2003년 10월 24일에 태어난다.</p>
        </Story>
        <Story>
        <p>재헌과 금씨녕의 첫째 아들, 민서가 2016년 4월 16일에 태어난다.</p>
        </Story>
      </Box>
      <Generation>19대</Generation>
    </GenRoot>
      
    </StoryBoxRoot>
  )
}

  

const NavigationBarRoot = styled.div`
  display: flex;
  height : 40px;
  width : 100vw;
  position: fixed;
  top: 0;
  z-index: 100;
  // margin: 48px;
  padding-left: 48px;
  padding-top: 40px;
  gap: 1.6vw;
`

const NavigationBarItem = styled.div`
  display: flex;
  font-size: 2.5rem;
  width: 14.5vw;
`
interface NavigationBarProps {
  f : (positionX : number) => void
}
const NavigationBar = ({f} : NavigationBarProps) => {
  return (
    <NavigationBarRoot>
      <NavigationBarItem onClick={() => f(0)}>[청주 김씨]</NavigationBarItem>
      <NavigationBarItem onClick={() => f(0)}>15대</NavigationBarItem>
      <NavigationBarItem onClick={() => f(1235)}>16대</NavigationBarItem>
      <NavigationBarItem onClick={() => f(4120)}>17대</NavigationBarItem>
      <NavigationBarItem onClick={() => f(11130)}>18대</NavigationBarItem>
      <NavigationBarItem onClick={() => f(22260)}>19대</NavigationBarItem>
    </NavigationBarRoot>
  )
}

const ShowHelpRoot = styled.div`
  display: flex;
  position: fixed;
  bottom: 51px;
  right: 48px;
  z-index: 100;

  font-size: 2.5rem;
`

const ShowHelp = () => {
  return (
    <ShowHelpRoot>
      ☛전할 이야기가 있나요?
    </ShowHelpRoot>
  )
}

ReactDOM.render(
  <App/>
 ,
  document.getElementById("root")
);
