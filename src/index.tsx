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
    <NavigationBar f={scrollToPosition}></NavigationBar>
    <div className="App" ref={scrollRef} style={{ overflow: "auto" }}>
      <div style={{ whiteSpace: "nowrap" }}>
        <StoryBox f={scrollToPosition}></StoryBox>
      </div>
    </div></>
  );

}

const StoryBoxRoot = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 50vw;
  width: 500vw;
  gap: 240px;
  padding-left: 36px;
  
  background: #EED555;
`

const Box = styled.div`
  display: flex;
  flex-direction: row;
  // border: 1px solid black;
`

const Story = styled.div`
  display: flex;
  word-wrap: break-word;
  white-space: normal;

  margin-top: 240px;
  margin-left: 12px;
  width: 480px;
  height: 200px;
  font-size: 20px;
  // border: 1px solid black;
`

const Name = styled.span`
  color: blue;
  cursor: pointer;
`


interface StoryBoxProps {
  f : (positionX : number) => void
}
const StoryBox = ({f} : StoryBoxProps) => {

  return (
    <StoryBoxRoot>
      
    <Box>
      <Story>
        <p>
        <Name onClick={() => f(550)}>양규</Name>의 아들, 한석이 고종 병술년 11월 28일에 태어난다. 이후 <Name onClick={() => f(1000)}>한석</Name>은 예규에게 입양된다. 한석은 보성 선씨와 결혼한다. 배우자인 선씨는 신묘년 2월 15일에 태어났으며, 아버지의 성함은 선영문이다. 한석은 1959년 5월 4일에 생을 마감하고, 가장등 가족묘지에 잠들어있다. 선씨는 1958년 12월 20일에 생을 마감하고, 우동간 합봉유비에 잠들어있다.</p>
      </Story>
    </Box>
    <Box>
      <Story>
      한석과 선씨의 첫째 아들, 락천이 1913년 정월 11일에 태어난다. 락천은 장흥 임씨와 결혼한다. 배우자인 임씨는 1912년 8월 31일에 태어났으며, 아버지의 성함은 임흥태이다. 락천은 1990년 7월 27일에 생을 마감하고, 가장등 가족묘지에 잠들어있다.
      </Story>
      <Story>
      한석과 선씨의 둘째 아들, 락재가 1917년 정월 10일에 태어난다. 락재는 경주 김씨 안순과 결혼한다. 배우자인 안순은 1923년 8월 27일에 태어났으며, 아버지의 성함은 김윤호이다. 락재는 1949년 5월 13일에 생을 마감하고, 탑동에 잠들어있다.
      </Story>
      <Story>
      한석과 선씨의 셋째 아들, 락행이 1926년 2월 18일에 태어난다. 락행은 달성 배씨 갑자와 결혼한다. 배우자인 갑자는 1924년 9월 5일에 태어났으며, 아버지의 성함은 배평묵이다. 락행은 1959년 8월 7일에 생을 마감하고, 탑동에 잠들어있다.
      </Story>
    </Box>
    <Box>
        <Story>
        </Story>
    </Box>
    <Box>
    </Box>
    <Box>
      <Story>
      </Story>
    </Box>
      
    </StoryBoxRoot>
  )
}


const NavigationBarRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height : 40px;
  width : 90vw;
  position: fixed;
  top: 0;
  z-index: 100;
  margin: 48px;
`

const NavigationBarItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
`
interface NavigationBarProps {
  f : (positionX : number) => void
}
const NavigationBar = ({f} : NavigationBarProps) => {
  return (
    <NavigationBarRoot>
      <NavigationBarItem onClick={() => f(0)}>[청주 김씨]</NavigationBarItem>
      <NavigationBarItem onClick={() => f(1000)}>15대</NavigationBarItem>
      <NavigationBarItem onClick={() => f(2000)}>16대</NavigationBarItem>
      <NavigationBarItem onClick={() => f(3000)}>17대</NavigationBarItem>
      <NavigationBarItem onClick={() => f(4000)}>18대</NavigationBarItem>
      <NavigationBarItem onClick={() => f(5000)}>19대</NavigationBarItem>
    </NavigationBarRoot>
  )
}


ReactDOM.render(
  <App/>
 ,
  document.getElementById("root")
);
