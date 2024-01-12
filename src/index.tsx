import "./main.css";
import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { useHorizontalScroll } from "./useSideScroll.tsx";

const App = () => {
  const scrollRef = useHorizontalScroll();

  const scrollToPosition = (positionX: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: positionX,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <NavigationBar f={scrollToPosition} />
      <div className="App" ref={scrollRef} style={{ overflow: "auto" }}>
        <div style={{ whiteSpace: "nowrap" }}>
          <StoryBox f={scrollToPosition}></StoryBox>
        </div>
      </div>
      <ShowHelp />
    </>
  );
};

const CommentBoxRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 601px;
  height: 408px;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000;
  gap: 24px;
`;

const CommentHeader = styled.div`
  display: flex;
  margin: 24px 24px 0px 24px;
  justify-content: space-between;
  height: 40px;
  color: #eed555;
  font-size: 20px;
`;

const CommentContent = styled.textarea`
  display: flex;
  margin-left: 48px;
  margin-right: 48px;
  color: #eed555;
  width: 505px;
  height: 232px;
  background: #000;
  border: 1px solid black;
  font-size: 20px;
  resize: none;
  outline: none;
`;
const CommentSend = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 24px;
  margin-right: 24px;
  color: #eed555;
  font-size: 20px;
`;

interface CommentBoxProps {
  name: string;
  comments: string;
  setComments: (x: string) => void;
  setInputPhase: (x: boolean) => void;

  index?: number;
  commentsnew?: string[];
  setCommentsnew?: (x: string) => void;
}

const CommentBox = ({
  name,
  comments,
  setComments,
  setInputPhase,
  setCommentsnew,
}: CommentBoxProps) => {
  const [content, setContent] = useState<string>(
    "이곳에 전하고 싶은 이야기를 작성해주세요."
  );
  const [errormessage, setErrorMessage] = useState<string>("");

  const SendComment = () => {
    if (
      content === "이곳에 전하고 싶은 이야기를 작성해주세요." ||
      content === ""
    ) {
      setErrorMessage("이야기를 입력해주세요.");
    } else {
      setComments(comments + content + "\n");
      setInputPhase(false);
    }
  };

  const SendCommentnew = () => {
    if (
      content === "이곳에 전하고 싶은 이야기를 작성해주세요." ||
      content === ""
    ) {
      setErrorMessage("이야기를 입력해주세요.");
    } else {
      setCommentsnew((prevComments) => {
        const newComments = [...prevComments];
        newComments[index] = value;
        return newComments;
      });
      setInputPhase(false);
    }
  };

  return (
    <CommentBoxRoot>
      <CommentHeader>
        <div
          style={{ textDecoration: "underline" }}
        >{`'${name}'에게 전할 이야기가 있나요?`}</div>
        <div style={{ cursor: "pointer" }} onClick={() => setInputPhase(false)}>
          X
        </div>
      </CommentHeader>
      <CommentContent
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={() => {
          setErrorMessage("");
          if (content === "이곳에 전하고 싶은 이야기를 작성해주세요.") {
            setContent("");
          }
        }}
      ></CommentContent>
      <CommentSend>
        <div>{errormessage}</div>
        <div style={{ cursor: "pointer" }} onClick={SendComment}>
          보내기
        </div>
      </CommentSend>
    </CommentBoxRoot>
  );
};

const StoryBoxRoot = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100vh;
  width: 1050vw;
  gap: 17.7vw;
  padding-left: 48px;

  background: #eed555;
`;
const GenRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 51px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6vw;
`;

const Column = styled.div`
  position: relative;
`;

const Story = styled.div`
  display: flex;
  word-wrap: break-word;
  white-space: pre-wrap;

  margin-top: 176px;
  width: 30.6vw;
  height: 200px;
  font-size: 2.5vh;
  line-height: 1.7;
`;

const Generation = styled.div`
  display: flex;
  font-size: 2.5rem;
`;

const Name = styled.span`
  color: blue;
  cursor: pointer;
`;

const CommentButton = styled.span`
  cursor: pointer;
`;

const Comment = styled.div`
  display: flex;
  width: 30.6vw;
  position: absolute;
  top: 350px;
  margin-left: 16.1vw;
  word-wrap: break-word;
  white-space: pre-wrap;
  // border: 1px solid black;

  font-size: 2.5vh;
  line-height: 1.7;
  color: #9424bb;
`;

interface StoryBoxProps {
  f: (positionX: number) => void;
}

const StoryBox = ({ f }: StoryBoxProps) => {
  const [comments, setComments] = useState(Array(29).fill(""));
  const [commentTo, setCommentTo] = useState<string>("");
  const [comment1, setComment1] = useState<string>(""); // 형석
  const [comment2, setComment2] = useState<string>(""); // 락성
  const [comment3, setComment3] = useState<string>(""); // 락민
  const [comment4, setComment4] = useState<string>(""); // 락현
  const [comment5, setComment5] = useState<string>(""); // 두석
  const [comment6, setComment6] = useState<string>(""); // 두락
  const [comment7, setComment7] = useState<string>(""); //
  const [comment8, setComment8] = useState<string>(""); //
  const [comment9, setComment9] = useState<string>(""); //
  const [comment10, setComment10] = useState<string>(""); //
  const [comment11, setComment11] = useState<string>(""); //
  const [comment12, setComment12] = useState<string>(""); //
  const [comment13, setComment13] = useState<string>(""); //
  const [comment14, setComment14] = useState<string>(""); //
  const [comment15, setComment15] = useState<string>(""); //
  const [comment16, setComment16] = useState<string>(""); //
  const [comment17, setComment17] = useState<string>(""); //
  const [comment18, setComment18] = useState<string>(""); //
  const [comment19, setComment19] = useState<string>(""); //
  const [comment20, setComment20] = useState<string>(""); //
  const [comment21, setComment21] = useState<string>(""); //
  const [comment22, setComment22] = useState<string>(""); //
  const [comment23, setComment23] = useState<string>(""); //
  const [comment24, setComment24] = useState<string>(""); //
  const [comment25, setComment25] = useState<string>(""); //
  const [comment26, setComment26] = useState<string>(""); //
  const [comment27, setComment27] = useState<string>(""); //
  const [comment28, setComment28] = useState<string>(""); //
  const [comment29, setComment29] = useState<string>(""); //
  const [comment1visible, setComment1Visible] = useState<boolean>(false);
  const [comment2visible, setComment2Visible] = useState<boolean>(false);
  const [comment3visible, setComment3Visible] = useState<boolean>(false);
  const [comment4visible, setComment4Visible] = useState<boolean>(false);
  const [comment5visible, setComment5Visible] = useState<boolean>(false);
  const [comment6visible, setComment6Visible] = useState<boolean>(false);
  const [inputphase1, setInputPhase1] = useState<boolean>(false);
  const [inputphase2, setInputPhase2] = useState<boolean>(false);
  const [inputphase3, setInputPhase3] = useState<boolean>(false);
  const [inputphase4, setInputPhase4] = useState<boolean>(false);
  const [inputphase5, setInputPhase5] = useState<boolean>(false);
  const [inputphase6, setInputPhase6] = useState<boolean>(false);

  return (
    <StoryBoxRoot>
      {inputphase1 && (
        <CommentBox
          name={commentTo}
          comments={comment1}
          setComments={setComment1}
          setInputPhase={setInputPhase1}
        />
      )}
      {inputphase2 && (
        <CommentBox
          name={commentTo}
          comments={comment2}
          setComments={setComment2}
          setInputPhase={setInputPhase2}
        />
      )}
      {inputphase3 && (
        <CommentBox
          name={commentTo}
          comments={comment3}
          setComments={setComment3}
          setInputPhase={setInputPhase3}
        />
      )}
      {inputphase4 && (
        <CommentBox
          name={commentTo}
          comments={comment4}
          setComments={setComment4}
          setInputPhase={setInputPhase4}
        />
      )}
      {inputphase5 && (
        <CommentBox
          name={commentTo}
          comments={comment5}
          setComments={setComment5}
          setInputPhase={setInputPhase5}
        />
      )}
      {inputphase6 && (
        <CommentBox
          name={commentTo}
          comments={comment6}
          setComments={setComment6}
          setInputPhase={setInputPhase6}
        />
      )}
      <GenRoot>
        <Box>
          <Column>
            <Story>
              <p>
                동규의 아들,{" "}
                <Name
                  onMouseEnter={() => setComment1Visible(true)}
                  onMouseLeave={() => setComment1Visible(false)}
                  onClick={() => f(0)}
                >
                  형석
                </Name>
                이 고종 병술년 11월 28일에 태어난다. 이후{" "}
                <Name
                  onMouseEnter={() => setComment1Visible(true)}
                  onMouseLeave={() => setComment1Visible(false)}
                  onClick={() => f(0)}
                >
                  형석
                </Name>
                은 선규에게 입양된다.{" "}
                <Name
                  onMouseEnter={() => setComment1Visible(true)}
                  onMouseLeave={() => setComment1Visible(false)}
                  onClick={() => f(0)}
                >
                  형석
                </Name>
                은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EB%B3%B4%EC%84%B1_%EC%84%A0%EC%94%A8"
                  target="_blank"
                >
                  보성 선씨
                </a>
                와 결혼한다. 배우자인 선씨는 신묘년 2월 15일에 태어났으며,
                아버지의 성함은 선영식이다.{" "}
                <Name
                  onMouseEnter={() => setComment1Visible(true)}
                  onMouseLeave={() => setComment1Visible(false)}
                  onClick={() => f(0)}
                >
                  형석
                </Name>
                은 1959년 5월 4일에 생을 마감하고, 가장등 가족묘지에 잠들어있다.
                선씨는 1958년 12월 20일에 생을 마감하고, 우동간 합봉유비에
                잠들어있다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("형석");
                    setInputPhase1(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment1visible && <Comment>{comment1}</Comment>}
          </Column>
        </Box>
        <Generation>15대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Column>
            <Story>
              <p>
                <Name
                  onMouseEnter={() => setComment1Visible(true)}
                  onMouseLeave={() => setComment1Visible(false)}
                  onClick={() => f(0)}
                >
                  형석
                </Name>
                과 선씨의 첫째 아들,{" "}
                <Name
                  onMouseEnter={() => setComment2Visible(true)}
                  onMouseLeave={() => setComment2Visible(false)}
                  onClick={() => f(window.innerWidth * 0.5)}
                >
                  락성
                </Name>
                이 1913년 정월 11일에 태어난다.{" "}
                <Name
                  onMouseEnter={() => setComment2Visible(true)}
                  onMouseLeave={() => setComment2Visible(false)}
                  onClick={() => f(window.innerWidth * 0.5)}
                >
                  락성
                </Name>
                은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%9E%A5%ED%9D%A5_%EC%9E%84%EC%94%A8"
                  target="_blank"
                >
                  장흥 임씨
                </a>
                와 결혼한다. 배우자인 임씨는 1912년 8월 31일에 태어났으며,
                아버지의 성함은 임흥재이다.{" "}
                <Name
                  onMouseEnter={() => setComment2Visible(true)}
                  onMouseLeave={() => setComment2Visible(false)}
                  onClick={() => f(window.innerWidth * 0.5)}
                >
                  락성
                </Name>
                은 1990년 7월 27일에 생을 마감하고, 가장등 가족묘지에
                잠들어있다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("락성");
                    setInputPhase2(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment2visible && <Comment>{comment2}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onMouseEnter={() => setComment1Visible(true)}
                  onMouseLeave={() => setComment1Visible(false)}
                  onClick={() => f(0)}
                >
                  형석
                </Name>
                과 선씨의 둘째 아들,{" "}
                <Name
                  onMouseEnter={() => setComment3Visible(true)}
                  onMouseLeave={() => setComment3Visible(false)}
                  onClick={() => f(window.innerWidth * 0.822)}
                >
                  락민
                </Name>
                이 1917년 정월 10일에 태어난다.{" "}
                <Name
                  onMouseEnter={() => setComment3Visible(true)}
                  onMouseLeave={() => setComment3Visible(false)}
                  onClick={() => f(window.innerWidth * 0.822)}
                >
                  락민
                </Name>
                은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EA%B2%BD%EC%A3%BC_%EA%B9%80%EC%94%A8"
                  target="_blank"
                >
                  경주 김씨
                </a>{" "}
                안영과 결혼한다. 배우자인 안영은 1923년 8월 27일에 태어났으며,
                아버지의 성함은 김윤석이다.{" "}
                <Name
                  onMouseEnter={() => setComment3Visible(true)}
                  onMouseLeave={() => setComment3Visible(false)}
                  onClick={() => f(window.innerWidth * 0.822)}
                >
                  락민
                </Name>
                은 1949년 5월 13일에 생을 마감하고,{" "}
                <a
                  href="https://www.google.com/maps/place/%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%88%98%EC%9B%90%EC%8B%9C+%EA%B6%8C%EC%84%A0%EA%B5%AC+%ED%83%91%EB%8F%99/data=!4m2!3m1!1s0x357b428a61d2cf27:0x296fe9e040b1b8bf?sa=X&ved=2ahUKEwi94-LVxNWDAxVxm1YBHbmJBpcQ8gF6BAgTEAA"
                  target="_blank"
                >
                  탑동
                </a>
                에 잠들어있다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("락민");
                    setInputPhase3(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment3visible && <Comment>{comment3}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onMouseEnter={() => setComment1Visible(true)}
                  onMouseLeave={() => setComment1Visible(false)}
                  onClick={() => f(0)}
                >
                  형석
                </Name>
                과 선씨의 셋째 아들,{" "}
                <Name
                  onMouseEnter={() => setComment4Visible(true)}
                  onMouseLeave={() => setComment4Visible(false)}
                  onClick={() => f(window.innerWidth * 1.144)}
                >
                  락현
                </Name>
                이 1926년 2월 18일에 태어난다.{" "}
                <Name
                  onMouseEnter={() => setComment4Visible(true)}
                  onMouseLeave={() => setComment4Visible(false)}
                  onClick={() => f(window.innerWidth * 1.144)}
                >
                  락현
                </Name>
                은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EB%8B%AC%EC%84%B1_%EB%B0%B0%EC%94%A8"
                  target="_blank"
                >
                  달성 배씨
                </a>
                와 결혼한다. 배우자인 배씨는 1924년 9월 5일에 태어났으며,
                아버지의 성함은 배평학이다.{" "}
                <Name
                  onMouseEnter={() => setComment4Visible(true)}
                  onMouseLeave={() => setComment4Visible(false)}
                  onClick={() => f(window.innerWidth * 1.144)}
                >
                  락현
                </Name>
                은 1959년 8월 7일에 생을 마감하고,{" "}
                <a
                  href="https://www.google.com/maps/place/%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%88%98%EC%9B%90%EC%8B%9C+%EA%B6%8C%EC%84%A0%EA%B5%AC+%ED%83%91%EB%8F%99/data=!4m2!3m1!1s0x357b428a61d2cf27:0x296fe9e040b1b8bf?sa=X&ved=2ahUKEwi94-LVxNWDAxVxm1YBHbmJBpcQ8gF6BAgTEAA"
                  target="_blank"
                >
                  탑동
                </a>
                에 잠들어있다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("락현");
                    setInputPhase4(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment4visible && <Comment>{comment4}</Comment>}
          </Column>
        </Box>
        <Generation>16대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Column>
            <Story>
              <p>
                <Name
                  onMouseEnter={() => setComment2Visible(true)}
                  onMouseLeave={() => setComment2Visible(false)}
                  onClick={() => f(window.innerWidth * 0.5)}
                >
                  락성
                </Name>
                과 임씨의 첫째 아들,{" "}
                <Name
                  onMouseEnter={() => setComment5Visible(true)}
                  onMouseLeave={() => setComment5Visible(false)}
                  onClick={() => f(window.innerWidth * 1.627)}
                >
                  두석
                </Name>
                이 1939년 2월 28일에 태어난다.{" "}
                <Name
                  onMouseEnter={() => setComment5Visible(true)}
                  onMouseLeave={() => setComment5Visible(false)}
                  onClick={() => f(window.innerWidth * 1.627)}
                >
                  두석
                </Name>
                은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EA%B9%80%ED%95%B4_%EA%B9%80%EC%94%A8"
                  target="_blank"
                >
                  김해 김씨
                </a>{" "}
                옥순과 결혼한다. 배우자인 옥순은 1945년 4월 20일에 태어났으며,
                아버지의 성함은 김종석이다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("두석");
                    setInputPhase5(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment5visible && <Comment>{comment5}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onMouseEnter={() => setComment2Visible(true)}
                  onMouseLeave={() => setComment2Visible(false)}
                  onClick={() => f(window.innerWidth * 0.5)}
                >
                  락성
                </Name>
                과 임씨의 둘째 아들,{" "}
                <Name
                  onMouseEnter={() => setComment6Visible(true)}
                  onMouseLeave={() => setComment6Visible(false)}
                  onClick={() => f(window.innerWidth * 1.949)}
                >
                  두락
                </Name>
                이 1945년 10월 18일에 태어난다.{" "}
                <Name
                  onMouseEnter={() => setComment6Visible(true)}
                  onMouseLeave={() => setComment6Visible(false)}
                  onClick={() => f(window.innerWidth * 1.949)}
                >
                  두락
                </Name>
                은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%B2%9C_%EC%84%9C%EC%94%A8"
                  target="_blank"
                >
                  이천 서씨
                </a>{" "}
                경자와 결혼한다. 배우자인 경자는 1946년 11월 26일에 태어났다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("두락");
                    setInputPhase6(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment6visible && <Comment>{comment6}</Comment>}
          </Column>
          <Story>
            <p>
              <Name
                onMouseEnter={() => setComment2Visible(true)}
                onMouseLeave={() => setComment2Visible(false)}
                onClick={() => f(window.innerWidth * 0.5)}
              >
                락성
              </Name>
              과 임씨의 셋째 아들, 두현이 1948년 2월 15일에 태어난다. 중앙대학교
              신문방송학과를 졸업하고, 국가경찰공무원을 정년퇴직한다. 대통령
              표창장 제133613호와 대한민국{" "}
              <a
                href="https://www.policemuseum.go.kr/pm_info_new/relic_new_view.asp?lcode=&mcode=&id=4709&page=12&category_1=%C6%F7%BB%F3%B7%F9&category_2=&searchString="
                target="blank"
              >
                녹조근정훈장
              </a>{" "}
              제78514호를 수상하기도 한다. 두현은{" "}
              <a
                href="https://ko.wikipedia.org/wiki/%EA%B9%80%ED%95%B4_%EA%B9%80%EC%94%A8"
                target="_blank"
              >
                김해 김씨
              </a>{" "}
              경선과 결혼한다. 배우자인 경선의 아버지의 성함은 김귀수이다.
              경선은 순천간호전문대학을 졸업했다.
            </p>
          </Story>
          <Story>
            <p>
              <Name
                onMouseEnter={() => setComment2Visible(true)}
                onMouseLeave={() => setComment2Visible(false)}
                onClick={() => f(window.innerWidth * 0.5)}
              >
                락성
              </Name>
              과 임씨의 넷째 아들, 두경이 1951년 7월 9일에 태어난다. 두경은{" "}
              <a
                href="https://ko.wikipedia.org/wiki/%EB%B0%80%EC%96%91_%EB%B0%95%EC%94%A8"
                target="_blank"
              >
                밀양 박씨
              </a>{" "}
              숙자와 결혼한다. 배우자인 숙자는 1957년 12월 17일에 태어났다.
            </p>
          </Story>
          <Story>
            <p>
              <Name
                onMouseEnter={() => setComment2Visible(true)}
                onMouseLeave={() => setComment2Visible(false)}
                onClick={() => f(window.innerWidth * 0.5)}
              >
                락성
              </Name>
              과 임씨에게 한명의 딸도 있었다. 그녀는{" "}
              <a
                href="https://ko.wikipedia.org/wiki/%EC%A0%84%EC%A3%BC_%EC%9D%B4%EC%94%A8"
                target="_blank"
              >
                전주 이씨
              </a>{" "}
              황국과 결혼해, 아들 광민을 낳는다.
            </p>
          </Story>
          <Story>
            <p>
              <Name
                onMouseEnter={() => setComment3Visible(true)}
                onMouseLeave={() => setComment3Visible(false)}
                onClick={() => f(window.innerWidth * 0.822)}
              >
                락민
              </Name>
              과 안영의 아들, 경민이 1947년 정월 26일에 태어난다. 경민은{" "}
              <a
                href="https://ko.wikipedia.org/wiki/%EC%98%81%EA%B4%91_%EA%B9%80%EC%94%A8"
                target="_blank"
              >
                영광 김씨
              </a>{" "}
              매화와 결혼한다. 배우자인 매화는 1949년 7월 15일에 태어났다.
              경민은 1984년 6월 6일에 생을 마감하고,{" "}
              <a
                href="https://www.google.com/maps/place/%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%88%98%EC%9B%90%EC%8B%9C+%EA%B6%8C%EC%84%A0%EA%B5%AC+%ED%83%91%EB%8F%99/data=!4m2!3m1!1s0x357b428a61d2cf27:0x296fe9e040b1b8bf?sa=X&ved=2ahUKEwi94-LVxNWDAxVxm1YBHbmJBpcQ8gF6BAgTEAA"
                target="_blank"
              >
                탑동
              </a>
              에 잠들어있다.
            </p>
          </Story>
          <Story>
            <p>
              <Name
                onMouseEnter={() => setComment3Visible(true)}
                onMouseLeave={() => setComment3Visible(false)}
                onClick={() => f(window.innerWidth * 0.822)}
              >
                락민
              </Name>
              과 안영에게는 두명의 딸이 있었다. 첫째 딸은{" "}
              <a
                href="https://ko.wikipedia.org/wiki/%EC%A0%9C%EC%A3%BC_%EA%B3%A0%EC%94%A8"
                target="_blank"
              >
                제주 고씨
              </a>{" "}
              재윤과 결혼해, 첫째 아들 용식과 둘째 아들 용민을 낳는다. 둘째 딸은{" "}
              <a
                href="https://ko.wikipedia.org/wiki/%EA%B4%91%EC%82%B0_%EA%B9%80%EC%94%A8"
                target="_blank"
              >
                광산 김씨
              </a>{" "}
              안석과 결혼해, 첫째 아들 중혁과 둘째 아들 중식을 낳는다.
            </p>
          </Story>
          <Story>
            <p>
              <Name
                onMouseEnter={() => setComment4Visible(true)}
                onMouseLeave={() => setComment4Visible(false)}
                onClick={() => f(window.innerWidth * 1.144)}
              >
                락현
              </Name>
              과 배씨에게는 두명의 딸이 있었다. 첫째 딸은{" "}
              <a
                href="https://ko.wikipedia.org/wiki/%EA%B9%80%ED%95%B4_%EA%B9%80%EC%94%A8"
                target="_blank"
              >
                김해 김씨
              </a>{" "}
              상현과 결혼한다. 둘째 딸은{" "}
              <a
                href="https://ko.wikipedia.org/wiki/%EC%9D%B8%EB%8F%99_%EC%9E%A5%EC%94%A8_(%EC%83%81%EC%9E%A5%EA%B5%B0%EA%B3%84)"
                target="_blank"
              >
                인동 장씨
              </a>{" "}
              덕형과 결혼한다.
            </p>
          </Story>
        </Box>
        <Generation>17대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Column>
            <Story>
              <p>
                <Name
                  onMouseEnter={() => setComment5Visible(true)}
                  onMouseLeave={() => setComment5Visible(false)}
                  onClick={() => f(window.innerWidth * 1.627)}
                >
                  두석
                </Name>
                과 옥순의 첫째 딸, 수미가 1965년 12월 3일에 태어난다.
                한성대학교를 졸업했다고 기록되어 있지만 사실이 아닌 듯하다.
              </p>
            </Story>
          </Column>
          <Story>
            <p>
              <Name
                onMouseEnter={() => setComment5Visible(true)}
                onMouseLeave={() => setComment5Visible(false)}
                onClick={() => f(window.innerWidth * 1.627)}
              >
                두석
              </Name>
              과 옥순의 아들, 현우가 1969년 8월 18일 서울에서 태어난다.
              국민대학교를 졸업했다고 기록되어 있지만 사실은 서경대학교를
              졸업했다고 한다. 현우는{" "}
              <a
                href="https://ko.wikipedia.org/wiki/%EC%A0%84%EC%A3%BC_%EC%9D%B4%EC%94%A8"
                target="_blank"
              >
                전주 이씨
              </a>{" "}
              재희와 결혼한다. 배우자인 재희는 1973년 5월 18일에 태어났다.
            </p>
          </Story>
          <Story>
            <p>
              <Name
                onMouseEnter={() => setComment5Visible(true)}
                onMouseLeave={() => setComment5Visible(false)}
                onClick={() => f(window.innerWidth * 1.627)}
              >
                두석
              </Name>
              과 옥순 둘째 딸, 현정이 1973년 4월 23일에 태어난다. 한양대학교를
              졸업했다고 기록되어 있지만 사실이 아닌 듯하다.
            </p>
          </Story>
          <Story>
            <p>
              <Name
                onMouseEnter={() => setComment5Visible(true)}
                onMouseLeave={() => setComment5Visible(false)}
                onClick={() => f(window.innerWidth * 1.627)}
              >
                두석
              </Name>
              과 옥순 셋째 딸, 수현이 1976년 8월 14일에 태어난다. 상명대학교를
              졸업했다.
            </p>
          </Story>
          <Story>
            <p>
              <Name
                onMouseEnter={() => setComment6Visible(true)}
                onMouseLeave={() => setComment6Visible(false)}
                onClick={() => f(window.innerWidth * 1.949)}
              >
                두락
              </Name>
              과 경자의 아들, 준필이 1986년 6월 26일에 태어난다. 연세대학교
              방송학과를 졸업했다.
            </p>
          </Story>
          <Story>
            <p>
              두현과 경선의 첫째 아들, 재성이 1974년 4월 5일에 태어난다.
              중국심양한의과대학을 졸업했는지는 확실하지 않다. 재성은 가락 금씨
              영은과 결혼한다. 배우자인 영은은 1968년 3월 20일에 태어났으며,
              아버지의 성함은 문식이다.
            </p>
          </Story>
          <Story>
            <p>
              두현과 경선의 둘째 아들, 호준이 1976년 3월 19일에 태어난다.
              고려대학교 행정학과를 졸업했다. 호준은{" "}
              <a
                href="https://ko.wikipedia.org/wiki/%EC%98%81%EC%96%91_%EB%82%A8%EC%94%A8"
                target="_blank"
              >
                영양 남씨
              </a>{" "}
              주영과 결혼한다. 주영은 1975년 6월 2일에 태어났다. 배우자인 주영의
              아버지의 성함은 무천이다. 주영은 이화여자대학교 영문과를 졸업했다.
            </p>
          </Story>
          <Story>
            <p>
              두현과 경선의 첫째 딸, 정은이 1993년 2월 28일에 태어난다.
              동서울대학교 전자학과를 졸업했다.
            </p>
          </Story>
          <Story>
            <p>두경과 숙자의 아들, 현수가 1980년 11월 7일에 태어난다.</p>
          </Story>
          <Story>
            <p>
              경민과 매화의 첫째 딸, 은정이 1973년 12월 25일에 태어난다. 은정은
              윤씨 창수와 결혼해, 아들 치환을 낳는다.
            </p>
          </Story>
          <Story>
            <p>경민과 매화의 첫째 아들, 재현이 1975년 5월 5일에 태어난다.</p>
          </Story>
          <Story>
            <p>경민과 매화의 둘째 아들, 성혁이 1977년 5월 28일에 태어난다.</p>
          </Story>
          <Story>
            <p>경민과 매화의 셋째 아들, 동민이 1979년 8월 9일에 태어난다.</p>
          </Story>
        </Box>
        <Generation>18대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Story>
            <p>현우와 재희의 첫째 딸, 선형이 2001년 9월 3일에 태어난다.</p>
          </Story>
          <Story>
            <p>현우와 재희의 둘째 딸, 소형이 2003년 10월 24일에 태어난다.</p>
          </Story>
          <Story>
            <p>재성과 영은의 첫째 아들, 민기가 2016년 4월 16일에 태어난다.</p>
          </Story>
          <Story>
            <p>호준과 주영의 아들, 태훈이 2007년 11월 26일에 태어난다.</p>
          </Story>
          <Story>
            <p>호준과 주영의 딸, 민지가 2009년 11월 12일에 태어난다.</p>
          </Story>
        </Box>
        <Generation>19대</Generation>
      </GenRoot>
    </StoryBoxRoot>
  );
};

const NavigationBarRoot = styled.div`
  display: flex;
  height: 40px;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 100;
  // margin: 48px;
  padding-left: 48px;
  padding-top: 40px;
  gap: 1.6vw;
`;

const NavigationBarItem = styled.div`
  display: flex;
  font-size: 2.5rem;
  width: 14.5vw;
`;
interface NavigationBarProps {
  f: (positionX: number) => void;
}
const NavigationBar = ({ f }: NavigationBarProps) => {
  return (
    <NavigationBarRoot>
      <NavigationBarItem onClick={() => f(0)}>[청주 김씨]</NavigationBarItem>
      <NavigationBarItem onClick={() => f(0)}>15대</NavigationBarItem>
      <NavigationBarItem onClick={() => f(window.innerWidth * 0.5)}>
        16대
      </NavigationBarItem>
      <NavigationBarItem onClick={() => f(window.innerWidth * 1.627)}>
        17대
      </NavigationBarItem>
      <NavigationBarItem onClick={() => f(11130)}>18대</NavigationBarItem>
      <NavigationBarItem onClick={() => f(22260)}>19대</NavigationBarItem>
    </NavigationBarRoot>
  );
};

const ShowHelpRoot = styled.div`
  display: flex;
  position: fixed;
  bottom: 51px;
  right: 48px;
  z-index: 100;

  font-size: 2.5rem;
`;

const ShowHelp = () => {
  return <ShowHelpRoot>☛전할 이야기가 있나요?</ShowHelpRoot>;
};

ReactDOM.render(<App />, document.getElementById("root"));
