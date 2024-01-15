import "./main.css";
import React, { useState, useEffect, useRef, forwardRef, ReactNode } from "react";
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
      <ShowHelp/>
    </>
  );
};

const CommentBoxRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 42%;
  height: 50%;
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1C1C1C;
  // gap: 24px;
  box-shadow: 0px 0px 20px 5px rgba(201,218,93,.5);
`;

const CommentHeader = styled.div`
  display: flex;
  margin: 48px 48px 24px 48px;
  justify-content: space-between;
  height: 40px;
  color: #C9DA5D;
  font-size: 2.5vh;
`;

const CommentContent = styled.textarea`
  display: flex;
  margin-left: 48px;
  margin-right: 48px;
  color: #53592D;
  width: auto;
  height: 65%;
  background: #1C1C1C;
  font-size: 2.5vh;
  resize: none;
  outline: none;
  line-height: 1.7;
`;
const CommentSend = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 48px 48px 48px 48px;
  color: #C9DA5D;
  font-size: 2.5vh;
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
          style={{ textDecoration: "underline dotted 3px", textUnderlineOffset: 
        "12px" }}
        >{`'${name}'에게 전할 이야기가 있나요?`}</div>
        <div style={{ cursor: "pointer" }} onClick={() => setInputPhase(false)}>
          닫기
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
        style={{
          color: content === "이곳에 전하고 싶은 이야기를 작성해주세요." || content === "" ? '#53592D' : '#C9DA5D'
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
  margin-bottom: 48px;
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

const StoryStyled = styled.div`
  display: flex;
  word-wrap: break-word;
  white-space: pre-wrap;
  position: relative;
  z-index: 2;
  margin-top: 13vh;
  width: 30.6vw;
  height: 200px;
  font-size: 2.5vh;
  line-height: 1.7;

  .scroll-animation {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }
  
  .scroll-animation-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

// StoryProps 타입 정의
interface StoryProps {
  children: ReactNode;
}

const Story = forwardRef<HTMLParagraphElement, StoryProps>(({ children }, ref) => (
  <StoryStyled>
    <p ref={ref} className="scroll-animation">
      {children}
    </p>
  </StoryStyled>
));

const Generation = styled.div`
  display: flex;
  font-size: 3.26vh;
`;

const Name = styled.span`
  animation: colorChange 1.5s infinite;
  cursor: pointer;
`;

const CommentButton = styled.span`
  cursor: pointer;
`;


interface CommentProps {
  rotation: number; // 회전 각도
}

// 랜덤 회전각도를 생성하는 함수
const getRandomRotation = () => {
  return Math.floor(Math.random() * (10 - (-10) + 1)) + (-10);
};

// 댓글 글씨색 바꾸기

const Comment = styled.div<CommentProps>`
  display: flex;
  width: 30.6vw;
  position: absolute;
  top: 350px;
  margin-left: 16.1vw;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  z-index: 0;

  font-family: 'DAEAM_LEE_TAE_JOON', serif;
  font-size: 2.5vh;
  line-height: 1.7;
  color: #484848;

  transform: rotateZ(${props => props.rotation}deg);

`;


interface StoryBoxProps {
  f: (positionX: number) => void;
}

const StoryBox = ({ f }: StoryBoxProps) => {
  const storyRefs = useRef<HTMLElement[]>([]);

  const addToRefs = (el: HTMLParagraphElement | null) => {
    if (el && !storyRefs.current.includes(el)) {
      storyRefs.current.push(el);
    }
  };

 const [showImage, setShowImage] = useState(false);
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // const handleMouseOver = (event) => {
   // setMousePosition({ x: event.clientX, y: event.clientY });
   // setShowImage1(true);
  // };

  // const handleMouseOut = () => {
   // setShowImage1(false);
 //  };

 const imagesInfo = {
  '고종': { src: 'image1.jpg', alt: '고종' },
  '장흥 임씨': { src: 'Jhlim.png', alt: '장흥 임씨' },
  // 추가 텍스트와 이미지 정보를 여기에 추가
};

const [currentImage, setCurrentImage] = useState({ src: '', alt: '' });
const [activeText, setActiveText] = useState('');

const handleMouseOver = (text, event) => {
  if (imagesInfo[text]) {
    setCurrentImage(imagesInfo[text]);
    setShowImage(true);
    setActiveText(text);
    setMousePosition({ x: event.clientX, y: event.clientY });  // 이벤트의 위치 정보 사용
  }
};


const handleMouseOut = () => {
  setShowImage(false);
  setActiveText(''); // 활성화된 텍스트 초기화
};

const handleMouseMove = (e) => {
  setMousePosition({ x: e.clientX, y: e.clientY });
};

useEffect(() => {
  window.addEventListener('mousemove', handleMouseMove);
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, []);


// 댓글들에 대한 회전값을 저장할 상태
const [commentsRotation, setCommentsRotation] = useState<number[]>([]);

// 컴포넌트가 마운트될 때 한 번만 댓글들의 회전값을 설정
useEffect(() => {
  const rotations = new Array(30).fill(null).map(getRandomRotation);
  setCommentsRotation(rotations);
}, []); // 의존성 배열을 빈 배열로 설정하여 마운트 시에만 실행


  const [inputphase, setInputPhase] = useState<boolean>(false);
  const [commentTo, setCommentTo] = useState<string>("");
  // 15대
  const [comment1, setComment1] = useState<string>(localStorage.getItem('comment1') || ""); // 형석
  // 16대
  const [comment2, setComment2] = useState<string>(localStorage.getItem('comment2') || ""); // 락성
  const [comment3, setComment3] = useState<string>(localStorage.getItem('comment3') || ""); // 락민
  const [comment4, setComment4] = useState<string>(localStorage.getItem('comment4') || ""); // 락현
  // 17대
  const [comment5, setComment5] = useState<string>(localStorage.getItem('comment5') || ""); // 두석
  const [comment6, setComment6] = useState<string>(localStorage.getItem('comment6') || ""); // 두락
  const [comment7, setComment7] = useState<string>(localStorage.getItem('comment7') || ""); // 두현
  const [comment8, setComment8] = useState<string>(localStorage.getItem('comment8') || ""); // 두경
  const [comment9, setComment9] = useState<string>(localStorage.getItem('comment9') || ""); // 락성과 임씨의 딸
  const [comment10, setComment10] = useState<string>(localStorage.getItem('comment10') || ""); // 경민
  const [comment11, setComment11] = useState<string>(localStorage.getItem('comment11') || ""); // 락민과 안영의 두 딸
  const [comment12, setComment12] = useState<string>(localStorage.getItem('comment12') || ""); // 락현과 배씨의 두 딸
  // 18대
  const [comment13, setComment13] = useState<string>(localStorage.getItem('comment13') || ""); // 수미
  const [comment14, setComment14] = useState<string>(localStorage.getItem('comment14') || ""); // 현우
  const [comment15, setComment15] = useState<string>(localStorage.getItem('comment15') || ""); // 현정
  const [comment16, setComment16] = useState<string>(localStorage.getItem('comment16') || ""); // 수현
  const [comment17, setComment17] = useState<string>(localStorage.getItem('comment17') || ""); // 준필
  const [comment18, setComment18] = useState<string>(localStorage.getItem('comment18') || ""); // 재성
  const [comment19, setComment19] = useState<string>(localStorage.getItem('comment19') || ""); // 호준
  const [comment20, setComment20] = useState<string>(localStorage.getItem('comment20') || ""); // 정은
  const [comment21, setComment21] = useState<string>(localStorage.getItem('comment21') || ""); // 현수
  const [comment22, setComment22] = useState<string>(localStorage.getItem('comment22') || ""); // 은정
  const [comment23, setComment23] = useState<string>(localStorage.getItem('comment23') || ""); // 재현
  const [comment24, setComment24] = useState<string>(localStorage.getItem('comment24') || ""); // 성혁
  const [comment25, setComment25] = useState<string>(localStorage.getItem('comment25') || ""); // 동민
  // 19대
  const [comment26, setComment26] = useState<string>(localStorage.getItem('comment26') || ""); // 선형
  const [comment27, setComment27] = useState<string>(localStorage.getItem('comment27') || ""); // 소형
  const [comment28, setComment28] = useState<string>(localStorage.getItem('comment28') || ""); // 민기
  const [comment29, setComment29] = useState<string>(localStorage.getItem('comment29') || ""); // 태훈
  const [comment30, setComment30] = useState<string>(localStorage.getItem('comment30') || ""); // 민지

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

    const [toggleText1, setToggleText1] = useState<boolean>(false);

const toggleHiddenText1 = () => {
    setToggleText1(!toggleText1);
    setHiddenText1(toggleText1 ? "한성대학교를 졸업했다." : "한성대학교를 졸업했다고 기록되어 있지만 사실이 아닌 듯하다.");
};


    const [hiddenText2, setHiddenText2] =
    useState<string>("국민대학교를 졸업했다.");

    const [toggleText2, setToggleText2] = useState<boolean>(false);

const toggleHiddenText2 = () => {
    setToggleText2(!toggleText2);
    setHiddenText2(toggleText2 ? "국민대학교를 졸업했다." : "국민대학교를 졸업했다고 기록되어 있지만 사실은 서경대학교를 졸업했다고 한다.");
};

    const [hiddenText3, setHiddenText3] =
    useState<string>("한양대학교를 졸업했다.");

    const [toggleText3, setToggleText3] = useState<boolean>(false);

const toggleHiddenText3 = () => {
    setToggleText3(!toggleText3);
    setHiddenText3(toggleText3 ? "한양대학교를 졸업했다." : "한양대학교를 졸업했다고 기록되어 있지만 사실이 아닌 듯하다.");
};


    const [hiddenText4, setHiddenText4] =
    useState<string>("중국심양한의과대학을 졸업했다.");

    const [toggleText4, setToggleText4] = useState<boolean>(false);

const toggleHiddenText4 = () => {
    setToggleText4(!toggleText4);
    setHiddenText4(toggleText4 ? "중국심양한의과대학을 졸업했다." : "중국심양한의과대학을 졸업했는지는 확실하지 않다.");
};

   
  storyRefs.current = []; // 컴포넌트가 재렌더링될 때마다 배열 초기화

 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation-visible');
          } else {
            entry.target.classList.remove('scroll-animation-visible');
          }
        });
      },
      { threshold: 0.5 }
    );

    storyRefs.current.forEach((ref) => {
      observer.observe(ref);
    });

    return () => {
      storyRefs.current.forEach((ref) => {
        observer.unobserve(ref);
      });
    };
  }, []);
  
  
  useEffect(() => {
    localStorage.setItem('comment1', comment1);
  }, [comment1]);

  useEffect(() => {
    localStorage.setItem('comment2', comment2);
  }, [comment2]);

  useEffect(() => {
    localStorage.setItem('comment3', comment3);
  }, [comment3]);

  useEffect(() => {
    localStorage.setItem('comment4', comment4);
  }, [comment4]);

  useEffect(() => {
    localStorage.setItem('comment5', comment5);
  }, [comment5]);

  useEffect(() => {
    localStorage.setItem('comment6', comment6);
  }, [comment6]);

  useEffect(() => {
    localStorage.setItem('comment7', comment7);
  }, [comment7]);

  useEffect(() => {
    localStorage.setItem('comment8', comment8);
  }, [comment8]);

  useEffect(() => {
    localStorage.setItem('comment9', comment9);
  }, [comment9]);

  useEffect(() => {
    localStorage.setItem('comment10', comment10);
  }, [comment10]);

  useEffect(() => {
    localStorage.setItem('comment11', comment11);
  }, [comment11]);

  useEffect(() => {
    localStorage.setItem('comment12', comment12);
  }, [comment12]);

  useEffect(() => {
    localStorage.setItem('comment13', comment13);
  }, [comment13]);

  useEffect(() => {
    localStorage.setItem('comment14', comment14);
  }, [comment14]);

  useEffect(() => {
    localStorage.setItem('comment15', comment15);
  }, [comment15]);

  useEffect(() => {
    localStorage.setItem('comment16', comment16);
  }, [comment16]);

  useEffect(() => {
    localStorage.setItem('comment17', comment17);
  }, [comment17]);

  useEffect(() => {
    localStorage.setItem('comment18', comment18);
  }, [comment18]);

  useEffect(() => {
    localStorage.setItem('comment19', comment19);
  }, [comment19]);

  useEffect(() => {
    localStorage.setItem('comment20', comment20);
  }, [comment20]);

  useEffect(() => {
    localStorage.setItem('comment21', comment21);
  }, [comment21]);

  useEffect(() => {
    localStorage.setItem('comment22', comment22);
  }, [comment22]);

  useEffect(() => {
    localStorage.setItem('comment23', comment23);
  }, [comment23]);

  useEffect(() => {
    localStorage.setItem('comment24', comment24);
  }, [comment24]);

  useEffect(() => {
    localStorage.setItem('comment25', comment25);
  }, [comment25]);

  useEffect(() => {
    localStorage.setItem('comment26', comment26);
  }, [comment26]);

  useEffect(() => {
    localStorage.setItem('comment27', comment27);
  }, [comment27]);

  useEffect(() => {
    localStorage.setItem('comment28', comment28);
  }, [comment28]);

  useEffect(() => {
    localStorage.setItem('comment29', comment29);
  }, [comment29]);

  useEffect(() => {
    localStorage.setItem('comment30', comment30);
  }, [comment30]);


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
            <Story ref={addToRefs}>
              <p>
                동규의 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(0);
                    // setComment1Visible(!comment1visible);
                    setCommentTo("형석");
                  }}
                >
                  형석
                </Name>
                이 <a href="https://ko.wikipedia.org/wiki/%EA%B3%A0%EC%A2%85_(%EB%8C%80%ED%95%9C%EC%A0%9C%EA%B5%AD)" className="animated-text"
                onMouseOver={(e) => handleMouseOver('고종', e)} onMouseOut={handleMouseOut}>고종</a> 병술년 11월 28일에 태어난다. 이후 <span className="animated-text"
                  onClick={() => {
                    if (reference1 === 2) {
                      setreference1(0);
                    } else {
                      setreference1(2);
                    }
                  }}
                >
                  형석은 선규에게 입양된다.
                </span> 형석은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EB%B3%B4%EC%84%B1_%EC%84%A0%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  보성 선씨
                </a>
                와 결혼한다. 배우자인 선씨는 신묘년 2월 15일에 태어났으며,
                아버지의 성함은 선영식이다. 형석은 1959년 5월 4일에 생을
                마감하고, 가장등 가족묘지에 잠들어있다. 선씨는 1958년 12월 20일에 생을 마감하고, 우동간 합봉유비에 잠들어있다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("형석");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment1visible && <Comment>{comment1}</Comment>} */}
            <Comment rotation={commentsRotation[0]}>{comment1}</Comment>
            {reference1 != 0 && getReference(reference1)}
            {showImage && activeText === '고종' && (
  <img
    src={currentImage.src}
    alt={currentImage.alt}
    style={{
      position: 'absolute',
      left: mousePosition.x,
      top: mousePosition.y,
      zIndex: 1000,
      width: '250px',
      height: '250px',
    }}
  />
)}
          </Column>
        </Box>
        <Generation>15대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(0)}>형석</Name>과 선씨의 첫째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 0.5);
                    // setComment2Visible(!comment2visible);
                  }}
                >
                  락성
                </Name>
                이 1913년 정월 11일에 태어난다. 락성은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%9E%A5%ED%9D%A5_%EC%9E%84%EC%94%A8"
                  target="_blank" className="animated-text" onMouseOver={(e) => handleMouseOver('장흥 임씨', e)} onMouseOut={handleMouseOut}
                >
                  장흥 임씨
                </a>
                와 결혼한다. 배우자인 임씨는 1912년 8월 31일에 태어났으며,
                아버지의 성함은 임흥재이다. 락성은 1990년 7월 27일에 생을
                마감하고, 가장등 가족묘지에 잠들어있다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("락성");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment2visible && <Comment>{comment2}</Comment>} */}
            <Comment rotation={commentsRotation[1]}>{comment2}</Comment>
            {showImage && activeText === '장흥 임씨' && (
  <img
    src={currentImage.src}
    alt={currentImage.alt}
    style={{
      position: 'absolute',
      left: mousePosition.x > window.innerWidth / 2 
          ? `calc(${mousePosition.x}px - ${window.innerWidth/2}px)` 
          : (mousePosition.x - 150) + 'px',
      top: mousePosition.y + 'px',
      zIndex: 1000,
      width: '250px',
      height: '250px',
    }}
  />
)}
        </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(0)}>형석</Name>과 선씨의 둘째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 0.822);
                    // setComment3Visible(!comment3visible);
                  }}
                >
                  락민
                </Name>
                이 1917년 정월 10일에 태어난다. 락민은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EA%B2%BD%EC%A3%BC_%EA%B9%80%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  경주 김씨
                </a>{" "}
                안영과 결혼한다. 배우자인 안영은 1923년 8월 27일에 태어났으며,
                아버지의 성함은 김윤석이다. 락민은 1949년 5월 13일에 생을
                마감하고,{" "}
                <a
                  href="https://www.google.com/maps/place/%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%88%98%EC%9B%90%EC%8B%9C+%EA%B6%8C%EC%84%A0%EA%B5%AC+%ED%83%91%EB%8F%99/data=!4m2!3m1!1s0x357b428a61d2cf27:0x296fe9e040b1b8bf?sa=X&ved=2ahUKEwi94-LVxNWDAxVxm1YBHbmJBpcQ8gF6BAgTEAA"
                  target="_blank" className="animated-text"
                >
                  탑동
                </a>
                에 잠들어있다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("락민");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment3visible && <Comment>{comment3}</Comment>} */}
            <Comment rotation={commentsRotation[2]}>{comment3}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(0)}>형석</Name>과 선씨의 셋째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 1.144);
                   // setComment4Visible(!comment4visible);
                  }}
                >
                  락현
                </Name>
                이 1926년 2월 18일에 태어난다. 락현은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EB%8B%AC%EC%84%B1_%EB%B0%B0%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  달성 배씨
                </a>
                와 결혼한다. 배우자인 배씨는 1924년 9월 5일에 태어났으며,
                아버지의 성함은 배평학이다. 락현은 1959년 8월 7일에 생을
                마감하고,{" "}
                <a
                  href="https://www.google.com/maps/place/%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%88%98%EC%9B%90%EC%8B%9C+%EA%B6%8C%EC%84%A0%EA%B5%AC+%ED%83%91%EB%8F%99/data=!4m2!3m1!1s0x357b428a61d2cf27:0x296fe9e040b1b8bf?sa=X&ved=2ahUKEwi94-LVxNWDAxVxm1YBHbmJBpcQ8gF6BAgTEAA"
                  target="_blank" className="animated-text"
                >
                  탑동
                </a>
                에 잠들어있다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("락현");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment4visible && <Comment>{comment4}</Comment>} */}
            <Comment rotation={commentsRotation[3]}>{comment4}</Comment>
          </Column>
        </Box>
        <Generation>16대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(window.innerWidth * 0.5)}>락성</Name>과
                임씨의 첫째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 1.627);
                  //   setComment5Visible(!comment5visible);
                  }}
                >
                  두석
                </Name>
                이 1939년 2월 28일에 태어난다. 두석은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EA%B9%80%ED%95%B4_%EA%B9%80%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  김해 김씨
                </a>{" "}
                옥순과 결혼한다. 배우자인 옥순은 1945년 4월 20일에 태어났으며,
                아버지의 성함은 김종석이다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("두석");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment5visible && <Comment>{comment5}</Comment>} */}
            <Comment rotation={commentsRotation[4]}>{comment5}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(window.innerWidth * 0.5)}>락성</Name>과
                임씨의 둘째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 1.949);
                   // setComment6Visible(!comment6visible);
                  }}
                >
                  두락
                </Name>
                이 1945년 10월 18일에 태어난다. 두락은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%B2%9C_%EC%84%9C%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  이천 서씨
                </a>{" "}
                경자와 결혼한다. 배우자인 경자는 1946년 11월 26일에 태어났다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("두락");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment6visible && <Comment>{comment6}</Comment>} */}
            <Comment rotation={commentsRotation[5]}>{comment6}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(window.innerWidth * 0.5)}>락성</Name>과
                임씨의 셋째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 2.271);
                   // setComment7Visible(!comment7visible);
                  }}
                >
                  두현
                </Name>
                이 1948년 2월 15일에 태어난다. 중앙대학교 신문방송학과를
                졸업하고, 국가경찰공무원을 정년퇴직한다. <span className="animated-text"
                  onClick={() => {
                    if (reference7 === 3) {
                      setreference7(0);
                    } else {
                      setreference7(3);
                    }
                  }}
                >
                  대통령 표창장
                </span>{" "}
                제133613호와 대한민국{" "}
                <a
                  href="https://www.policemuseum.go.kr/pm_info_new/relic_new_view.asp?lcode=&mcode=&id=4709&page=12&category_1=%C6%F7%BB%F3%B7%F9&category_2=&searchString="
                  target="blank" className="animated-text"
                >
                  녹조근정훈장
                </a>{" "}
                제78514호를 수상하기도 한다. 두현은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EA%B9%80%ED%95%B4_%EA%B9%80%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  김해 김씨
                </a>{" "}
                경선과 결혼한다. 배우자인 경선의 아버지의 성함은 김귀수이다.
                경선은 <a
                  href="https://encykorea.aks.ac.kr/Article/E0031994"
                  target="_blank" className="animated-text"
                >
                  순천간호전문대학
                </a>을 졸업했다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("두현");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment7visible && <Comment>{comment7}</Comment>} */}
            <Comment rotation={commentsRotation[6]}>{comment7}</Comment>
            {reference7 != 0 && getReference(reference7)}
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(window.innerWidth * 0.5)}>락성</Name>과
                임씨의 넷째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 2.593);
                   // setComment8Visible(!comment8visible);
                  }}
                >
                  두경
                </Name>
                이 1951년 7월 9일에 태어난다. 두경은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EB%B0%80%EC%96%91_%EB%B0%95%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  밀양 박씨
                </a>{" "}
                숙자와 결혼한다. 배우자인 숙자는 1957년 12월 17일에 태어났다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("두경");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment8visible && <Comment>{comment8}</Comment>} */}
            <Comment rotation={commentsRotation[7]}>{comment8}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onMouseEnter={() => setComment2Visible(true)}
                  onMouseLeave={() => setComment2Visible(false)}
                  onClick={() => f(window.innerWidth * 0.5)}
                >
                  락성
                </Name>
                과 임씨에게{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 2.915);
                    // setComment9Visible(!comment9visible);
                  }}
                >
                  한명의 딸
                </Name>
                도 있었다. <span className="animated-text"
                  onClick={() => {
                    if (reference9 === 4) {
                      setreference9(0);
                    } else {
                      setreference9(4);
                    }
                  }}
                >
                  이름은 알 수 없다.
                </span> 그녀는{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%A0%84%EC%A3%BC_%EC%9D%B4%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  전주 이씨
                </a>{" "}
                황국과 결혼해, 아들 광민을 낳는다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("락성과 임씨의 딸");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment9visible && <Comment>{comment9}</Comment>} */}
            <Comment rotation={commentsRotation[8]}>{comment9}</Comment>
            {reference9 != 0 && getReference(reference9)}
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(window.innerWidth * 0.822)}>락민</Name>과
                안영의 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 3.237);
                   // setComment10Visible(!comment10visible);
                  }}
                >
                  경민
                </Name>
                이 1947년 정월 26일에 태어난다. 경민은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%98%81%EA%B4%91_%EA%B9%80%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  영광 김씨
                </a>{" "}
                매화와 결혼한다. 배우자인 매화는 1949년 7월 15일에 태어났다.
                경민은 1984년 6월 6일에 생을 마감하고,{" "}
                <a
                  href="https://www.google.com/maps/place/%EA%B2%BD%EA%B8%B0%EB%8F%84+%EC%88%98%EC%9B%90%EC%8B%9C+%EA%B6%8C%EC%84%A0%EA%B5%AC+%ED%83%91%EB%8F%99/data=!4m2!3m1!1s0x357b428a61d2cf27:0x296fe9e040b1b8bf?sa=X&ved=2ahUKEwi94-LVxNWDAxVxm1YBHbmJBpcQ8gF6BAgTEAA"
                  target="_blank" className="animated-text"
                >
                  탑동
                </a>
                에 잠들어있다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("경민");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment10visible && <Comment>{comment10}</Comment>} */}
            <Comment rotation={commentsRotation[9]}>{comment10}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(window.innerWidth * 0.822)}>락민</Name>과
                안영에게는{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 3.559);
                   // setComment11Visible(!comment11visible);
                  }}
                >
                  두명의 딸
                </Name>
                이 있었다. <span className="animated-text"
                  onClick={() => {
                    if (reference11 === 5) {
                      setreference11(0);
                    } else {
                      setreference11(5);
                    }
                  }}
                >
                  이름은 알 수 없다.
                </span> 첫째 딸은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%A0%9C%EC%A3%BC_%EA%B3%A0%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  제주 고씨
                </a>{" "}
                재윤과 결혼해, 첫째 아들 용식과 둘째 아들 용민을 낳는다. 둘째
                딸은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EA%B4%91%EC%82%B0_%EA%B9%80%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  광산 김씨
                </a>{" "}
                안석과 결혼해, 첫째 아들 중혁과 둘째 아들 중식을 낳는다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("락민과 안영의 두 딸");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment11visible && <Comment>{comment11}</Comment>} */}
            <Comment rotation={commentsRotation[10]}>{comment11}</Comment>
            {reference11 != 0 && getReference(reference11)}
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onMouseEnter={() => setComment4Visible(true)}
                  onMouseLeave={() => setComment4Visible(false)}
                  onClick={() => f(window.innerWidth * 1.144)}
                >
                  락현
                </Name>
                과 배씨에게는{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 3.881);
                  //  setComment12Visible(!comment12visible);
                  }}
                >
                  두명의 딸
                </Name>
                이 있었다. <span className="animated-text"
                  onClick={() => {
                    if (reference12 === 6) {
                      setreference12(0);
                    } else {
                      setreference12(6);
                    }
                  }}
                >
                  이름은 알 수 없다.
                </span> 첫째 딸은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EA%B9%80%ED%95%B4_%EA%B9%80%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  김해 김씨
                </a>{" "}
                상현과 결혼한다. 둘째 딸은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%9D%B8%EB%8F%99_%EC%9E%A5%EC%94%A8_(%EC%83%81%EC%9E%A5%EA%B5%B0%EA%B3%84)"
                  target="_blank" className="animated-text"
                >
                  인동 장씨
                </a>{" "}
                덕형과 결혼한다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("락현과 배씨의 두 딸");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment12visible && <Comment>{comment12}</Comment>} */}
            <Comment rotation={commentsRotation[11]}>{comment12}</Comment>
            {reference12 != 0 && getReference(reference12)}
          </Column>
        </Box>
        <Generation>17대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(window.innerWidth * 1.627)}>두석</Name>과
                옥순의 첫째 딸,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 4.364);
                   // setComment13Visible(!comment13visible);
                  }}
                >
                  수미
                </Name>
                가 1965년 12월 3일에 태어난다.{" "}
                <span className="animated-text"
                  onClick={toggleHiddenText1}
                >
                  {hiddenText1}
                </span>{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("수미");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment13visible && <Comment>{comment13}</Comment>} */}
            <Comment rotation={commentsRotation[12]}>{comment13}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(window.innerWidth * 1.627)}>두석</Name>과
                옥순의 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 4.686);
                   // setComment14Visible(!comment14visible);
                  }}
                >
                  현우
                </Name>
                가 1969년 8월 18일 서울에서 태어난다. <span className="animated-text"
                  onClick={toggleHiddenText2}
                >
                  {hiddenText2}
                </span> 현우는{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%A0%84%EC%A3%BC_%EC%9D%B4%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  전주 이씨
                </a>{" "}
                재희와 결혼한다. 배우자인 재희는 1973년 5월 18일에 태어났다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("현우");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment14visible && <Comment>{comment14}</Comment>} */}
            <Comment rotation={commentsRotation[13]}>{comment14}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(window.innerWidth * 1.627)}>두석</Name>과
                옥순 둘째 딸,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 5.008);
                   // setComment15Visible(!comment15visible);
                  }}
                >
                  현정
                </Name>
                이 1973년 4월 23일에 태어난다. <span className="animated-text"
                  onClick={toggleHiddenText3}
                >
                  {hiddenText3}
                </span>{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("현정");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment15visible && <Comment>{comment15}</Comment>} */}
            <Comment rotation={commentsRotation[14]}>{comment15}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onMouseEnter={() => setComment5Visible(true)}
                  onMouseLeave={() => setComment5Visible(false)}
                  onClick={() => f(window.innerWidth * 1.627)}
                >
                  두석
                </Name>
                과 옥순 셋째 딸,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 5.33);
                   // setComment16Visible(!comment16visible);
                  }}
                >
                  수현
                </Name>
                이 1976년 8월 14일에 태어난다. 상명대학교를 졸업했다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("수현");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment16visible && <Comment>{comment16}</Comment>} */}
            <Comment rotation={commentsRotation[15]}>{comment16}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name onClick={() => f(window.innerWidth * 1.949)}>두락</Name>과
                경자의 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 5.652);
                   // setComment17Visible(!comment17visible);
                  }}
                >
                  준필
                </Name>
                이 1986년 6월 26일에 태어난다. 연세대학교 방송학과를 졸업했다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("준필");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment17visible && <Comment>{comment17}</Comment>} */}
            <Comment rotation={commentsRotation[16]}>{comment17}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 2.271);
                  }}
                >
                  두현
                </Name>
                과 경선의 첫째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 5.974);
                   // setComment18Visible(!comment18visible);
                  }}
                >
                  재성
                </Name>
                이 1974년 4월 5일에 태어난다. <span className="animated-text"
                  onClick={toggleHiddenText4}
                >
                  {hiddenText4}
                </span> 재성은 <a
                  href="https://ko.wikipedia.org/wiki/%EB%B4%89%ED%99%94_%EA%B8%88%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  봉화 금씨
                </a> 영은과 결혼한다. 배우자인 영은은
                1968년 3월 20일에 태어났으며, 아버지의 성함은 문식이다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("재성");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment18visible && <Comment>{comment18}</Comment>} */}
            <Comment rotation={commentsRotation[17]}>{comment18}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 2.271);
                  }}
                >
                  두현
                </Name>
                과 경선의 둘째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 6.296);
                   // setComment19Visible(!comment19visible);
                  }}
                >
                  호준
                </Name>
                이 1976년 3월 19일에 태어난다. 고려대학교 행정학과를 졸업했다.
                호준은{" "}
                <a
                  href="https://ko.wikipedia.org/wiki/%EC%98%81%EC%96%91_%EB%82%A8%EC%94%A8"
                  target="_blank" className="animated-text"
                >
                  영양 남씨
                </a>{" "}
                주영과 결혼한다. 주영은 1975년 6월 2일에 태어났다. 배우자인
                주영의 아버지의 성함은 무천이다. 주영은 이화여자대학교 영문과를
                졸업했다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("호준");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment19visible && <Comment>{comment19}</Comment>} */}
            <Comment rotation={commentsRotation[18]}>{comment19}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 2.271);
                  }}
                >
                  두현
                </Name>
                과 경선의 첫째 딸,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 6.618);
                   // setComment20Visible(!comment20visible);
                  }}
                >
                  정은
                </Name>
                이 1993년 2월 28일에 태어난다. <span className="animated-text"
                  onClick={() => {
                    if (reference20 === 7) {
                      setreference20(0);
                    } else {
                      setreference20(7);
                    }
                  }}
                >
                  동서울대학교
                </span> 전자학과를 졸업했다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("정은");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment20visible && <Comment>{comment20}</Comment>} */}
            <Comment rotation={commentsRotation[19]}>{comment20}</Comment>
            {reference20 != 0 && getReference(reference20)}
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                두경과 숙자의 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 6.94);
                   // setComment21Visible(!comment21visible);
                  }}
                >
                  현수
                </Name>
                가 1980년 11월 7일에 태어난다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("현수");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment21visible && <Comment>{comment21}</Comment>} */}
            <Comment rotation={commentsRotation[20]}>{comment21}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.237);
                  }}
                >
                  경민
                </Name>
                과 매화의 첫째 딸,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 7.262);
                   // setComment22Visible(!comment22visible);
                  }}
                >
                  은정
                </Name>
                이 1973년 12월 25일에 태어난다. 은정은 윤씨 창수와 결혼해, 아들
                치환을 낳는다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("은정");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment22visible && <Comment>{comment22}</Comment>} */}
            <Comment rotation={commentsRotation[21]}>{comment22}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.237);
                  }}
                >
                  경민
                </Name>
                과 매화의 첫째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 7.584);
                   // setComment23Visible(!comment23visible);
                  }}
                >
                  재현
                </Name>
                이 1975년 5월 5일에 태어난다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("재현");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment23visible && <Comment>{comment23}</Comment>} */}
            <Comment rotation={commentsRotation[22]}>{comment23}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.237);
                  }}
                >
                  경민
                </Name>
                과 매화의 둘째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 7.906);
                   // setComment24Visible(!comment24visible);
                  }}
                >
                  성혁
                </Name>
                이 1977년 5월 28일에 태어난다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("성혁");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment24visible && <Comment>{comment24}</Comment>} */}
            <Comment rotation={commentsRotation[23]}>{comment24}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 3.237);
                  }}
                >
                  경민
                </Name>
                과 매화의 셋째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 8.228);
                   // setComment25Visible(!comment25visible);
                  }}
                >
                  동민
                </Name>
                이 1979년 8월 9일에 태어난다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("동민");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment25visible && <Comment>{comment25}</Comment>} */}
            <Comment rotation={commentsRotation[24]}>{comment25}</Comment>
          </Column>
        </Box>
        <Generation>18대</Generation>
      </GenRoot>
      <GenRoot>
        <Box>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 4.686);
                  }}
                >
                  현우
                </Name>
                와 재희의 첫째 딸,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 8.711);
                   // setComment26Visible(!comment26visible);
                  }}
                >
                  선형
                </Name>
                이 <span className="animated-text"
                  onClick={() => {
                    if (reference26 === 8) {
                      setreference26(0);
                    } else {
                      setreference26(8);
                    }
                  }}
                >
                  2001년 9월 3일에 태어난다.
                </span>
{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("선형");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment26visible && <Comment>{comment26}</Comment>} */}
            <Comment rotation={commentsRotation[25]}>{comment26}</Comment>
            {reference26 != 0 && getReference(reference26)}
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 4.686);
                  }}
                >
                  현우
                </Name>
                와 재희의 둘째 딸,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 9.033);
                   // setComment27Visible(!comment27visible);
                  }}
                >
                  소형
                </Name>
                이 2003년 10월 24일에 태어난다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("소형");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment27visible && <Comment>{comment27}</Comment>} */}
            <Comment rotation={commentsRotation[26]}>{comment27}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 5.974);
                  }}
                >
                  재성
                </Name>
                과 영은의 첫째 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 9.355);
                  //  setComment28Visible(!comment28visible);
                  }}
                >
                  민기
                </Name>
                가 2016년 4월 16일에 태어난다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("민기");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment28visible && <Comment>{comment28}</Comment>} */}
            <Comment rotation={commentsRotation[27]}>{comment28}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 6.296);
                  }}
                >
                  호준
                </Name>
                과 주영의 아들,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 9.677);
                   // setComment29Visible(!comment29visible);
                  }}
                >
                  태훈
                </Name>
                이 2007년 11월 26일에 태어난다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("태훈");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment29visible && <Comment>{comment29}</Comment>} */}
            <Comment rotation={commentsRotation[28]}>{comment29}</Comment>
          </Column>
          <Column>
            <Story ref={addToRefs}>
              <p>
                <Name
                  onClick={() => {
                    f(window.innerWidth * 6.296);
                  }}
                >
                  호준
                </Name>
                과 주영의 딸,{" "}
                <Name className="main-name"
                  onClick={() => {
                    f(window.innerWidth * 9.999);
                   // setComment30Visible(!comment30visible);
                  }}
                >민지
                </Name>
                가 2009년 11월 12일에 태어난다.{" "}
                <CommentButton className="animated-text"
                  onClick={() => {
                    setCommentTo("민지");
                    setInputPhase(true);
                  }}
                >
                  ☛
                </CommentButton>
              </p>
            </Story>
            {/* {comment30visible && <Comment>{comment30}</Comment>} */}
            <Comment rotation={commentsRotation[29]}>{comment30}</Comment>
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
  align-items: flex-start;
  width: 30.6vw;

  position: absolute;
  // top: 0px;
  bottom: 100px;
  z-index: 1;
  bottom: 0px;
  gap: 1.63vh;

  font-size: 2.5vh;

  img {
    max-width: 100%; // 이미지의 최대 너비를 Reference 컴포넌트의 너비로 제한
    height: auto;
    max-height: 450px;
  }

  div {
    max-width: 100%; 
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-family: 'DAEAM_LEE_TAE_JOON', serif;
    line-height: 1.7;
    color: #B3B3B3; 
  }
`;

const getReference = (refnum: number) => {
  switch (refnum) {
    case 0:
      return null;
    case 2:
      return (
        <Reference>
          <img src={"/image2.png"} alt="image2"  />
          <div>{"당시에는 대를 잇기 위해 아들을 입양하는 일이 흔했다."}</div>
        </Reference>
      );
    case 3:
      return (
        <Reference>
          <img src={"/image3.webp"} alt="image3"  />
          <div>{"이렇게 생겼다고 한다."}</div>
        </Reference>
      );
      case 4:
      return (
        <Reference>
          <img src={"/족보여자.PNG"} alt="image4"  />
          <div>{"당시에는 딸의 이름 대신 딸의 배우자 이름이 기록되곤 했다."}</div>
        </Reference>
      );
      case 5:
      return (
        <Reference>
          <img src={"/족보여자.PNG"} alt="image5" />
          <div>{"당시에는 딸의 이름 대신 딸의 배우자 이름이 기록되곤 했다."}</div>
        </Reference>
      );
      case 6:
      return (
        <Reference>
          <img src={"/족보여자.PNG"} alt="image6"  />
          <div>{"당시에는 딸의 이름 대신 딸의 배우자 이름이 기록되곤 했다."}</div>
        </Reference>
      );
      case 7:
      return (
        <Reference>
          <img src={"/동서울.PNG"} alt="image7"  />
          <div>{"‘서울’만 매우 크게 쓰여있어 헷갈릴 뻔했다."}</div>
        </Reference>
      );
      case 8:
        return (
          <Reference>
            <img src={"/선형.jpg"} alt="image8"  />
            <div>{"그로부터 약 22년 뒤 이 웹사이트를 기획하고 디자인했다."}</div>
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
  padding-bottom: 4.89vh;
  gap: 1.6vw;
`;

const NavigationBarItem = styled.div`
  display: flex;
  font-size: 3.26vh;
  width: 14.5vw;

  &:hover {
    text-decoration: underline dotted 4px;
    text-underline-offset: 12px;
  }
`;
interface NavigationBarProps {
  f: (positionX: number) => void;
}
const NavigationBar = ({ f }: NavigationBarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <NavigationBarRoot>
      <NavigationBarItem>
        <div onClick={() => f(0)} style={{ cursor: "pointer", fontFamily: isHovered ? 'ChosunKm' : 'GapyeongHanseokbong-Bold', }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        {isHovered ? '淸州金氏' : '청주김씨'}
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
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  bottom: 48px;
  right: 48px;
  z-index: 100;
  font-size: 3.26vh;
  white-space: normal;
  line-height: 0.8;
`;


const ShowHelp = () => {
    // 텍스트 상태 관리
    const [hiddenText, setHiddenText] = useState<ReactNode>('☛ 전할 이야기가 있나요?');

    // 마우스가 컴포넌트 위에 올라갔을 때 실행될 함수
    const handleMouseEnter = () => {
      setHiddenText(
      <>
      <span>각 문단의 ☛ 버튼을</span><br />
      <span>클릭하면 해당 문단의</span><br />
      <span>주인공과 관련된 이야기를</span><br />
      <span>추가할 수 있어요.</span>
      </>
      );
    };

    // 마우스가 컴포넌트를 벗어났을 때 실행될 함수
    const handleMouseLeave = () => {
      setHiddenText('☛ 전할 이야기가 있나요?');
    };

    return (
      <ShowHelpRoot onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {hiddenText}
      </ShowHelpRoot>
    );
  };

 export default ShowHelp;




ReactDOM.render(<App />, document.getElementById("root"));
