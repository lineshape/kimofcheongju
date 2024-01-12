import "./main.css";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
// import styled from "@emotion/styled";
import styled, { keyframes } from "styled-components";
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
  line-height: 1.7;
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
  setComment: (x: string) => void;
  setInputPhase: (x: boolean) => void;
}

const CommentBox = ({
  name,
  comments,
  setComment,
  setInputPhase,
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
      setComment(content + "\n" + comments);
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

 // 배경색 바꾸기

const StoryBoxRoot = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100vh;
  width: 1050vw;
  gap: 17.7vw;
  padding-left: 48px;
  
  background: #1C1C1C;
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
  height: 90vh;
`;

const Story = styled.div`
  display: flex;
  word-wrap: break-word;
  white-space: pre-wrap;
  position: relative;
  z-index: 2;
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

// 댓글 글씨색 바꾸기

const Comment = styled.div`
  display: flex;
  width: 30.6vw;
  position: absolute;
  top: 350px;
  margin-left: 16.1vw;
  word-wrap: break-word;
  white-space: pre-wrap;
  z-index: 1;

  font-family: "agchoijeongho-screen", sans-serif;
  font-size: 2.5vh;
  line-height: 1.7;
  color: #646464;
`;

interface StoryBoxProps {
  f: (positionX: number) => void;
}

const StoryBox = ({ f }: StoryBoxProps) => {
  const [inputphase, setInputPhase] = useState<boolean>(false);
  const [commentTo, setCommentTo] = useState<string>("");
  // 15대
  const [comment1, setComment1] = useState<string>(""); // 형석
  // 16대
  const [comment2, setComment2] = useState<string>(""); // 락성
  const [comment3, setComment3] = useState<string>(""); // 락민
  const [comment4, setComment4] = useState<string>(""); // 락현
  // 17대
  const [comment5, setComment5] = useState<string>(""); // 두석
  const [comment6, setComment6] = useState<string>(""); // 두락
  const [comment7, setComment7] = useState<string>(""); // 두현
  const [comment8, setComment8] = useState<string>(""); // 두경
  const [comment9, setComment9] = useState<string>(""); // 락성과 임씨의 딸
  const [comment10, setComment10] = useState<string>(""); // 경민
  const [comment11, setComment11] = useState<string>(""); // 락민과 안영의 두 딸
  const [comment12, setComment12] = useState<string>(""); // 락현과 배씨의 두 딸
  // 18대
  const [comment13, setComment13] = useState<string>(""); // 수미
  const [comment14, setComment14] = useState<string>(""); // 현우
  const [comment15, setComment15] = useState<string>(""); // 현정
  const [comment16, setComment16] = useState<string>(""); // 수현
  const [comment17, setComment17] = useState<string>(""); // 준필
  const [comment18, setComment18] = useState<string>(""); // 재성
  const [comment19, setComment19] = useState<string>(""); // 호준
  const [comment20, setComment20] = useState<string>(""); // 정은
  const [comment21, setComment21] = useState<string>(""); // 현수
  const [comment22, setComment22] = useState<string>(""); // 은정
  const [comment23, setComment23] = useState<string>(""); // 재현
  const [comment24, setComment24] = useState<string>(""); // 성혁
  const [comment25, setComment25] = useState<string>(""); // 동민
  // 19대
  const [comment26, setComment26] = useState<string>(""); // 선형
  const [comment27, setComment27] = useState<string>(""); // 소형
  const [comment28, setComment28] = useState<string>(""); // 민기
  const [comment29, setComment29] = useState<string>(""); // 태훈
  const [comment30, setComment30] = useState<string>(""); // 민지

  const [comment1visible, setComment1Visible] = useState<boolean>(false);
  const [comment2visible, setComment2Visible] = useState<boolean>(false);
  const [comment3visible, setComment3Visible] = useState<boolean>(false);
  const [comment4visible, setComment4Visible] = useState<boolean>(false);
  const [comment5visible, setComment5Visible] = useState<boolean>(false);
  const [comment6visible, setComment6Visible] = useState<boolean>(false);
  const [comment7visible, setComment7Visible] = useState<boolean>(false);
  const [comment8visible, setComment8Visible] = useState<boolean>(false);
  const [comment9visible, setComment9Visible] = useState<boolean>(false);
  const [comment10visible, setComment10Visible] = useState<boolean>(false);
  const [comment11visible, setComment11Visible] = useState<boolean>(false);
  const [comment12visible, setComment12Visible] = useState<boolean>(false);
  const [comment13visible, setComment13Visible] = useState<boolean>(false);
  const [comment14visible, setComment14Visible] = useState<boolean>(false);
  const [comment15visible, setComment15Visible] = useState<boolean>(false);
  const [comment16visible, setComment16Visible] = useState<boolean>(false);
  const [comment17visible, setComment17Visible] = useState<boolean>(false);
  const [comment18visible, setComment18Visible] = useState<boolean>(false);
  const [comment19visible, setComment19Visible] = useState<boolean>(false);
  const [comment20visible, setComment20Visible] = useState<boolean>(false);
  const [comment21visible, setComment21Visible] = useState<boolean>(false);
  const [comment22visible, setComment22Visible] = useState<boolean>(false);
  const [comment23visible, setComment23Visible] = useState<boolean>(false);
  const [comment24visible, setComment24Visible] = useState<boolean>(false);
  const [comment25visible, setComment25Visible] = useState<boolean>(false);
  const [comment26visible, setComment26Visible] = useState<boolean>(false);
  const [comment27visible, setComment27Visible] = useState<boolean>(false);
  const [comment28visible, setComment28Visible] = useState<boolean>(false);
  const [comment29visible, setComment29Visible] = useState<boolean>(false);
  const [comment30visible, setComment30Visible] = useState<boolean>(false);

  const [reference1, setreference1] = useState<number>(0);
  const [reference2, setreference2] = useState<number>(0);
  const [reference3, setreference3] = useState<number>(0);
  const [reference4, setreference4] = useState<number>(0);
  const [reference5, setreference5] = useState<number>(0);
  const [reference6, setreference6] = useState<number>(0);
  const [reference7, setreference7] = useState<number>(0);
  const [reference8, setreference8] = useState<number>(0);
  const [reference9, setreference9] = useState<number>(0);
  const [reference10, setreference10] = useState<number>(0);
  const [reference11, setreference11] = useState<number>(0);
  const [reference12, setreference12] = useState<number>(0);
  const [reference13, setreference13] = useState<number>(0);
  const [reference14, setreference14] = useState<number>(0);
  const [reference15, setreference15] = useState<number>(0);
  const [reference16, setreference16] = useState<number>(0);
  const [reference17, setreference17] = useState<number>(0);
  const [reference18, setreference18] = useState<number>(0);
  const [reference19, setreference19] = useState<number>(0);
  const [reference20, setreference20] = useState<number>(0);
  const [reference21, setreference21] = useState<number>(0);
  const [reference22, setreference22] = useState<number>(0);
  const [reference23, setreference23] = useState<number>(0);
  const [reference24, setreference24] = useState<number>(0);
  const [reference25, setreference25] = useState<number>(0);
  const [reference26, setreference26] = useState<number>(0);
  const [reference27, setreference27] = useState<number>(0);
  const [reference28, setreference28] = useState<number>(0);
  const [reference29, setreference29] = useState<number>(0);
  const [reference30, setreference30] = useState<number>(0);

  const [hiddenText1, setHiddenText1] =
    useState<string>("한성대학교를 졸업했다.");

  return (
    <StoryBoxRoot>
      <>
        {inputphase &&
          (commentTo === "형석" ? (
            <CommentBox
              name={commentTo}
              comments={comment1}
              setComment={setComment1}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "락성" ? (
            <CommentBox
              name={commentTo}
              comments={comment2}
              setComment={setComment2}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "락민" ? (
            <CommentBox
              name={commentTo}
              comments={comment3}
              setComment={setComment3}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "락현" ? (
            <CommentBox
              name={commentTo}
              comments={comment4}
              setComment={setComment4}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "두석" ? (
            <CommentBox
              name={commentTo}
              comments={comment5}
              setComment={setComment5}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "두락" ? (
            <CommentBox
              name={commentTo}
              comments={comment6}
              setComment={setComment6}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "두현" ? (
            <CommentBox
              name={commentTo}
              comments={comment7}
              setComment={setComment7}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "두경" ? (
            <CommentBox
              name={commentTo}
              comments={comment8}
              setComment={setComment8}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "락성과 임씨의 딸" ? (
            <CommentBox
              name={commentTo}
              comments={comment9}
              setComment={setComment9}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "경민" ? (
            <CommentBox
              name={commentTo}
              comments={comment10}
              setComment={setComment10}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "락민과 안영의 두 딸" ? (
            <CommentBox
              name={commentTo}
              comments={comment11}
              setComment={setComment11}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "락현과 배씨의 두 딸" ? (
            <CommentBox
              name={commentTo}
              comments={comment12}
              setComment={setComment12}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "수미" ? (
            <CommentBox
              name={commentTo}
              comments={comment13}
              setComment={setComment13}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "현우" ? (
            <CommentBox
              name={commentTo}
              comments={comment14}
              setComment={setComment14}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "현정" ? (
            <CommentBox
              name={commentTo}
              comments={comment15}
              setComment={setComment15}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "수현" ? (
            <CommentBox
              name={commentTo}
              comments={comment16}
              setComment={setComment16}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "준필" ? (
            <CommentBox
              name={commentTo}
              comments={comment17}
              setComment={setComment17}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "재성" ? (
            <CommentBox
              name={commentTo}
              comments={comment18}
              setComment={setComment18}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "호준" ? (
            <CommentBox
              name={commentTo}
              comments={comment19}
              setComment={setComment19}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "정은" ? (
            <CommentBox
              name={commentTo}
              comments={comment20}
              setComment={setComment20}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "현수" ? (
            <CommentBox
              name={commentTo}
              comments={comment21}
              setComment={setComment21}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "은정" ? (
            <CommentBox
              name={commentTo}
              comments={comment22}
              setComment={setComment22}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "재현" ? (
            <CommentBox
              name={commentTo}
              comments={comment23}
              setComment={setComment23}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "성혁" ? (
            <CommentBox
              name={commentTo}
              comments={comment24}
              setComment={setComment24}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "동민" ? (
            <CommentBox
              name={commentTo}
              comments={comment25}
              setComment={setComment25}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "선형" ? (
            <CommentBox
              name={commentTo}
              comments={comment26}
              setComment={setComment26}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "소형" ? (
            <CommentBox
              name={commentTo}
              comments={comment27}
              setComment={setComment27}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "민기" ? (
            <CommentBox
              name={commentTo}
              comments={comment28}
              setComment={setComment28}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "태훈" ? (
            <CommentBox
              name={commentTo}
              comments={comment29}
              setComment={setComment29}
              setInputPhase={setInputPhase}
            />
          ) : commentTo === "민지" ? (
            <CommentBox
              name={commentTo}
              comments={comment30}
              setComment={setComment30}
              setInputPhase={setInputPhase}
            />
          ) : null)}
      </>
      <GenRoot>
        <Box>
          <Column>
            <Story>
              <p>
                동규의 아들,{" "}
                <Name
                  onClick={() => {
                    f(0);
                    setComment1Visible(!comment1visible);
                    setCommentTo("형석");
                  }}
                >
                  형석
                </Name>
                이 고종 병술년 11월 28일에 태어난다. 이후 형석은 선규에게
                입양된다. 형석은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EB%B3%B4%EC%84%B1_%EC%84%A0%EC%94%A8"
                  target="_blank"
                >
                  보성 선씨
                </a>
                와 결혼한다. 배우자인 선씨는 신묘년 2월 15일에 태어났으며,
                아버지의 성함은 선영식이다. 형석은 1959년 5월 4일에 생을
                마감하고,{" "}
                <span
                  onClick={() => {
                    if (reference1 === 1) {
                      setreference1(0);
                    } else {
                      setreference1(1);
                    }
                  }}
                >
                  가장등 가족묘지
                </span>
                에 잠들어있다. 선씨는 1958년 12월 20일에 생을 마감하고, 우동간
                합봉유비에 잠들어있다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("형석");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment1visible && <Comment>{comment1}</Comment>}
            {reference1 != 0 && getReference(reference1)}
          </Column>
        </Box>
        <Generation>15대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Column>
            <Story>
              <p>
                <Name onClick={() => f(0)}>형석</Name>과 선씨의 첫째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 0.5);
                    setComment2Visible(!comment2visible);
                  }}
                >
                  락성
                </Name>
                이 1913년 정월 11일에 태어난다. 락성은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%9E%A5%ED%9D%A5_%EC%9E%84%EC%94%A8"
                  target="_blank"
                >
                  장흥 임씨
                </a>
                와 결혼한다. 배우자인 임씨는 1912년 8월 31일에 태어났으며,
                아버지의 성함은 임흥재이다. 락성은 1990년 7월 27일에 생을
                마감하고, 가장등 가족묘지에 잠들어있다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("락성");
                    setInputPhase(true);
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
                <Name onClick={() => f(0)}>형석</Name>과 선씨의 둘째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 0.822);
                    setComment3Visible(!comment3visible);
                  }}
                >
                  락민
                </Name>
                이 1917년 정월 10일에 태어난다. 락민은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EA%B2%BD%EC%A3%BC_%EA%B9%80%EC%94%A8"
                  target="_blank"
                >
                  경주 김씨
                </a>{" "}
                안영과 결혼한다. 배우자인 안영은 1923년 8월 27일에 태어났으며,
                아버지의 성함은 김윤석이다. 락민은 1949년 5월 13일에 생을
                마감하고,{" "}
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
                    setInputPhase(true);
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
                <Name onClick={() => f(0)}>형석</Name>과 선씨의 셋째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 1.144);
                    setComment4Visible(!comment4visible);
                  }}
                >
                  락현
                </Name>
                이 1926년 2월 18일에 태어난다. 락현은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EB%8B%AC%EC%84%B1_%EB%B0%B0%EC%94%A8"
                  target="_blank"
                >
                  달성 배씨
                </a>
                와 결혼한다. 배우자인 배씨는 1924년 9월 5일에 태어났으며,
                아버지의 성함은 배평학이다. 락현은 1959년 8월 7일에 생을
                마감하고,{" "}
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
                    setInputPhase(true);
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
                <Name onClick={() => f(window.innerWidth * 0.5)}>락성</Name>과
                임씨의 첫째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 1.627);
                    setComment5Visible(!comment5visible);
                  }}
                >
                  두석
                </Name>
                이 1939년 2월 28일에 태어난다. 두석은{" "}
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
                    setInputPhase(true);
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
                <Name onClick={() => f(window.innerWidth * 0.5)}>락성</Name>과
                임씨의 둘째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 1.949);
                    setComment6Visible(!comment6visible);
                  }}
                >
                  두락
                </Name>
                이 1945년 10월 18일에 태어난다. 두락은{" "}
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
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment6visible && <Comment>{comment6}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name onClick={() => f(window.innerWidth * 0.5)}>락성</Name>과
                임씨의 셋째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 2.271);
                    setComment7Visible(!comment7visible);
                  }}
                >
                  두현
                </Name>
                이 1948년 2월 15일에 태어난다. 중앙대학교 신문방송학과를
                졸업하고, 국가경찰공무원을 정년퇴직한다. 대통령 표창장
                제133613호와 대한민국{" "}
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
                경선은 순천간호전문대학을 졸업했다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("두현");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment7visible && <Comment>{comment7}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name onClick={() => f(window.innerWidth * 0.5)}>락성</Name>과
                임씨의 넷째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 2.593);
                    setComment8Visible(!comment8visible);
                  }}
                >
                  두경
                </Name>
                이 1951년 7월 9일에 태어난다. 두경은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EB%B0%80%EC%96%91_%EB%B0%95%EC%94%A8"
                  target="_blank"
                >
                  밀양 박씨
                </a>{" "}
                숙자와 결혼한다. 배우자인 숙자는 1957년 12월 17일에 태어났다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("두경");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment8visible && <Comment>{comment8}</Comment>}
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
                과 임씨에게{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 2.915);
                    setComment9Visible(!comment9visible);
                  }}
                >
                  한명의 딸
                </Name>
                도 있었다. 그녀는{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%A0%84%EC%A3%BC_%EC%9D%B4%EC%94%A8"
                  target="_blank"
                >
                  전주 이씨
                </a>{" "}
                황국과 결혼해, 아들 광민을 낳는다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("락성과 임씨의 딸");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment9visible && <Comment>{comment9}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name onClick={() => f(window.innerWidth * 0.822)}>락민</Name>과
                안영의 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.237);
                    setComment10Visible(!comment10visible);
                  }}
                >
                  경민
                </Name>
                이 1947년 정월 26일에 태어난다. 경민은{" "}
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
                에 잠들어있다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("경민");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment10visible && <Comment>{comment10}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name onClick={() => f(window.innerWidth * 0.822)}>락민</Name>과
                안영에게는{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.559);
                    setComment11Visible(!comment11visible);
                  }}
                >
                  두명의 딸
                </Name>
                이 있었다. 첫째 딸은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%A0%9C%EC%A3%BC_%EA%B3%A0%EC%94%A8"
                  target="_blank"
                >
                  제주 고씨
                </a>{" "}
                재윤과 결혼해, 첫째 아들 용식과 둘째 아들 용민을 낳는다. 둘째
                딸은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EA%B4%91%EC%82%B0_%EA%B9%80%EC%94%A8"
                  target="_blank"
                >
                  광산 김씨
                </a>{" "}
                안석과 결혼해, 첫째 아들 중혁과 둘째 아들 중식을 낳는다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("락민과 안영의 두 딸");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment11visible && <Comment>{comment11}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onMouseEnter={() => setComment4Visible(true)}
                  onMouseLeave={() => setComment4Visible(false)}
                  onClick={() => f(window.innerWidth * 1.144)}
                >
                  락현
                </Name>
                과 배씨에게는{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.881);
                    setComment12Visible(!comment12visible);
                  }}
                >
                  두명의 딸
                </Name>
                이 있었다. 첫째 딸은{" "}
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
                덕형과 결혼한다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("락현과 배씨의 두 딸");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment12visible && <Comment>{comment12}</Comment>}
          </Column>
        </Box>
        <Generation>17대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Column>
            <Story>
              <p>
                <Name onClick={() => f(window.innerWidth * 1.627)}>두석</Name>과
                옥순의 첫째 딸,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 4.364);
                    setComment13Visible(!comment13visible);
                  }}
                >
                  수미
                </Name>
                가 1965년 12월 3일에 태어난다.{" "}
                <span
                  onClick={() =>
                    setHiddenText1(
                      "한성대학교를 졸업했다고 기록되어 있지만 사실이 아닌듯하다."
                    )
                  }
                >
                  {hiddenText1}
                </span>{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("수미");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment13visible && <Comment>{comment13}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name onClick={() => f(window.innerWidth * 1.627)}>두석</Name>과
                옥순의 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 4.686);
                    setComment14Visible(!comment14visible);
                  }}
                >
                  현우
                </Name>
                가 1969년 8월 18일 서울에서 태어난다. 국민대학교를 졸업했다고
                기록되어 있지만 사실은 서경대학교를 졸업했다고 한다. 현우는{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%A0%84%EC%A3%BC_%EC%9D%B4%EC%94%A8"
                  target="_blank"
                >
                  전주 이씨
                </a>{" "}
                재희와 결혼한다. 배우자인 재희는 1973년 5월 18일에 태어났다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("현우");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment14visible && <Comment>{comment14}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name onClick={() => f(window.innerWidth * 1.627)}>두석</Name>과
                옥순 둘째 딸,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 5.008);
                    setComment15Visible(!comment15visible);
                  }}
                >
                  현정
                </Name>
                이 1973년 4월 23일에 태어난다. 한양대학교를 졸업했다고 기록되어
                있지만 사실이 아닌 듯하다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("현정");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment15visible && <Comment>{comment15}</Comment>}
          </Column>
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
                과 옥순 셋째 딸,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 5.33);
                    setComment16Visible(!comment16visible);
                  }}
                >
                  수현
                </Name>
                이 1976년 8월 14일에 태어난다. 상명대학교를 졸업했다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("수현");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment16visible && <Comment>{comment16}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name onClick={() => f(window.innerWidth * 1.949)}>두락</Name>과
                경자의 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 5.652);
                    setComment17Visible(!comment17visible);
                  }}
                >
                  준필
                </Name>
                이 1986년 6월 26일에 태어난다. 연세대학교 방송학과를 졸업했다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("준필");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment17visible && <Comment>{comment17}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 2.271);
                  }}
                >
                  두현
                </Name>
                과 경선의 첫째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 5.974);
                    setComment18Visible(!comment18visible);
                  }}
                >
                  재성
                </Name>
                이 1974년 4월 5일에 태어난다. 중국심양한의과대학을 졸업했는지는
                확실하지 않다. 재성은 가락 금씨 영은과 결혼한다. 배우자인 영은은
                1968년 3월 20일에 태어났으며, 아버지의 성함은 문식이다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("재성");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment18visible && <Comment>{comment18}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 2.271);
                  }}
                >
                  두현
                </Name>
                과 경선의 둘째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 6.296);
                    setComment19Visible(!comment19visible);
                  }}
                >
                  호준
                </Name>
                이 1976년 3월 19일에 태어난다. 고려대학교 행정학과를 졸업했다.
                호준은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%98%81%EC%96%91_%EB%82%A8%EC%94%A8"
                  target="_blank"
                >
                  영양 남씨
                </a>{" "}
                주영과 결혼한다. 주영은 1975년 6월 2일에 태어났다. 배우자인
                주영의 아버지의 성함은 무천이다. 주영은 이화여자대학교 영문과를
                졸업했다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("호준");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment19visible && <Comment>{comment19}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 2.271);
                  }}
                >
                  두현
                </Name>
                과 경선의 첫째 딸,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 6.618);
                    setComment20Visible(!comment20visible);
                  }}
                >
                  정은
                </Name>
                이 1993년 2월 28일에 태어난다. 동서울대학교 전자학과를 졸업했다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("정은");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment20visible && <Comment>{comment20}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                두경과 숙자의 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 6.94);
                    setComment21Visible(!comment21visible);
                  }}
                >
                  현수
                </Name>
                가 1980년 11월 7일에 태어난다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("현수");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment21visible && <Comment>{comment21}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.237);
                  }}
                >
                  경민
                </Name>
                과 매화의 첫째 딸,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 7.262);
                    setComment22Visible(!comment22visible);
                  }}
                >
                  은정
                </Name>
                이 1973년 12월 25일에 태어난다. 은정은 윤씨 창수와 결혼해, 아들
                치환을 낳는다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("은정");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment22visible && <Comment>{comment22}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.237);
                  }}
                >
                  경민
                </Name>
                과 매화의 첫째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 7.584);
                    setComment23Visible(!comment23visible);
                  }}
                >
                  재현
                </Name>
                이 1975년 5월 5일에 태어난다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("재현");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment23visible && <Comment>{comment23}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.237);
                  }}
                >
                  경민
                </Name>
                과 매화의 둘째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 7.906);
                    setComment24Visible(!comment24visible);
                  }}
                >
                  성혁
                </Name>
                이 1977년 5월 28일에 태어난다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("성혁");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment24visible && <Comment>{comment24}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.237);
                  }}
                >
                  경민
                </Name>
                과 매화의 셋째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 8.228);
                    setComment25Visible(!comment25visible);
                  }}
                >
                  동민
                </Name>
                이 1979년 8월 9일에 태어난다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("동민");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment25visible && <Comment>{comment25}</Comment>}
          </Column>
        </Box>
        <Generation>18대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 4.686);
                  }}
                >
                  현우
                </Name>
                와 재희의 첫째 딸,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 8.711);
                    setComment26Visible(!comment26visible);
                  }}
                >
                  선형
                </Name>
                이 2001년 9월 3일에 태어난다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("선형");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment26visible && <Comment>{comment26}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 4.686);
                  }}
                >
                  현우
                </Name>
                와 재희의 둘째 딸,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 9.033);
                    setComment27Visible(!comment27visible);
                  }}
                >
                  소형
                </Name>
                이 2003년 10월 24일에 태어난다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("소형");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment27visible && <Comment>{comment27}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 5.974);
                  }}
                >
                  재성
                </Name>
                과 영은의 첫째 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 9.355);
                    setComment28Visible(!comment28visible);
                  }}
                >
                  민기
                </Name>
                가 2016년 4월 16일에 태어난다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("민기");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment28visible && <Comment>{comment28}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 6.296);
                  }}
                >
                  호준
                </Name>
                과 주영의 아들,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 9.677);
                    setComment29Visible(!comment29visible);
                  }}
                >
                  태훈
                </Name>
                이 2007년 11월 26일에 태어난다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("태훈");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment29visible && <Comment>{comment29}</Comment>}
          </Column>
          <Column>
            <Story>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 6.296);
                  }}
                >
                  호준
                </Name>
                과 주영의 딸,{" "}
                <Name
                  onClick={() => {
                    f(window.innerWidth * 9.999);
                    setComment30Visible(!comment30visible);
                  }}
                >
                  민지
                </Name>
                가 2009년 11월 12일에 태어난다.{" "}
                <CommentButton
                  onClick={() => {
                    setCommentTo("민지");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {comment30visible && <Comment>{comment30}</Comment>}
          </Column>
        </Box>
        <Generation>19대</Generation>
      </GenRoot>
    </StoryBoxRoot>
  );
};

const Reference = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  // top: 0px;
  bottom: 100px;
  z-index: 0;
  bottom: 0px;
  gap: 20px;
  padding: 30px;

  font-size: 2.5vh;
`;

const getReference = (refnum: number) => {
  switch (refnum) {
    case 0:
      return null;
    case 1:
      return (
        <Reference>
          <img src={"/image1.png"} alt="image1" height={"400px"} />
          <div>{"가족묘지 위치"}</div>
        </Reference>
      );
    case 2:
      return (
        <Reference>
          <img src={"/image2.png"} alt="image2" height={"400px"} />
          <div>{"냥냥펀치!!"}</div>
        </Reference>
      );
  }
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
      <NavigationBarItem>
        <div onClick={() => f(0)} style={{ cursor: "pointer" }}>
          [청주 김씨]
        </div>
      </NavigationBarItem>
      <NavigationBarItem>
        <div onClick={() => f(0)} style={{ cursor: "pointer" }}>
          15대
        </div>
      </NavigationBarItem>
      <NavigationBarItem>
        <div
          onClick={() => f(window.innerWidth * 0.5)}
          style={{ cursor: "pointer" }}
        >
          16대
        </div>
      </NavigationBarItem>
      <NavigationBarItem>
        <div
          onClick={() => f(window.innerWidth * 1.627)}
          style={{ cursor: "pointer" }}
        >
          17대
        </div>
      </NavigationBarItem>
      <NavigationBarItem>
        <div
          onClick={() => f(window.innerWidth * 4.364)}
          style={{ cursor: "pointer" }}
        >
          18대
        </div>
      </NavigationBarItem>
      <NavigationBarItem>
        <div
          onClick={() => f(window.innerWidth * 8.711)}
          style={{ cursor: "pointer" }}
        >
          19대
        </div>
      </NavigationBarItem>
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
