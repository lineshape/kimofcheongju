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
        락천과 임씨의 첫째 아들, 두식이 1939년 2월 28일에 태어난다. 두식은 김해 김씨 옥희와 결혼한다. 배우자인 옥희는 1945년 4월 20일에 태어났으며, 아버지의 성함은 김종열이다.
        </Story>
        <Story>락천과 임씨의 둘째 아들, 두일이 1945년 10월 18일에 태어난다. 두일은 이천 서씨 경욱과 결혼한다. 배우자인 경욱는 1946년 11월 26일에 태어났다.</Story>
        <Story>락천과 임씨의 셋째 아들, 두만이 1948년 2월 15일에 태어난다. 중앙대학교 신문방송학과를 졸업하고, 국가경찰공무원을 정년퇴직한다. 대통령 표창장 제133613호와 대한민국 녹조근정훈장 제78514호를 수상하기도 한다. 두만은 김해 김씨 경숙과 결혼한다. 배우자인 경숙의 아버지의 성함은 김귀봉이다. 경숙은 순천간호전문대학을 졸업했다.</Story>
        <Story>
        락천과 임씨의 넷째 아들, 두성이 1951년 7월 9일에 태어난다. 두성은 밀양 박씨 숙희와 결혼한다. 배우자인 숙희는 1957년 12월 17일에 태어났다.
        </Story>
        <Story>
        락천과 임씨에게 한명의 딸도 있었다. 그녀는 전주 이씨 황구와 결혼해, 아들 광복을 낳는다.
        </Story>
        <Story>
        락재와 안순의 아들, 경량이 1947년 정월 26일에 태어난다. 경량은 영광 김씨 매요와 결혼한다. 배우자인 매요는 1949년 7월 15일에 태어났다. 경량은 1984년 6월 6일에 생을 마감하고, 탑동에 잠들어있다.
        </Story>
        <Story>
        락재와 안순에게는 두명의 딸이 있었다. 첫째 딸은 제주 고씨 재기와 결혼해, 첫째 아들 용철과 둘째 아들 용석을 낳는다. 둘째 딸은 광산 김씨 안식과 결혼해, 첫째 아들 중철과 둘째 아들 중호를 낳는다.
        </Story>
        <Story>
        락행과 갑자에게는 두명의 딸이 있었다. 첫째 딸은 김해 김씨 상수와 결혼한다. 둘째 딸은 인동 장씨 덕철과 결혼한다. 
        </Story>
    </Box>
    <Box>
      <Story>
      두식과 옥희의 첫째 딸, 수희가 1965년 12월 3일에 태어난다. 한성대학교를 졸업했다고 기록되어 있지만 사실이 아닌 듯하다.
      </Story>
      <Story>
      두식과 옥희의 첫째 아들, 현철이 1969년 8월 18일 서울에서 태어난다. 국민대학교를 졸업했다고 기록되어 있지만 사실은 서경대학교를 졸업했다고 한다. 현철은 전주 이씨 재화와 결혼한다. 배우자인 재화는 1973년 5월 18일에 태어났다.
      </Story>
      <Story>
      두식과 옥희의 둘째 딸, 현숙이 1973년 4월 23일에 태어난다. 한양대학교를 졸업했다고 기록되어 있지만 사실이 아닌 듯하다.
      </Story>
      <Story>
      두식과 옥희의 셋째 딸, 수연이 1976년 8월 14일에 태어난다. 상명대학교를 졸업했다.
      </Story>
      <Story>두일과 경욱의 아들, 준영이 1986년 6월 26일에 태어난다. 연세대학교 방송학과를 졸업했다.</Story>
      <Story>두만과 경숙의 첫째 아들, 재헌이 1974년 4월 5일에 태어난다. 중국심양한의과대학을 졸업했는지는 확실하지 않다. 재헌은 가락 금씨 녕과 결혼한다. 배우자인 녕은 1968년 3월 20일에 태어났으며, 아버지의 성함은 영식이다.</Story>
      <Story>두만과 경숙의 둘째 아들, 호성이 1976년 3월 19일에 태어난다. 고려대학교 행정학과를 졸업했다. 호성은 영양 남씨 주희와 결혼한다. 주희는 1975년 6월 2일에 태어났다. 배우자인 주희의 아버지의 성함은 무광이다. 주희는 이화여자대학교 영문과를 졸업했다.</Story>
      <Story>두만과 경숙의 첫째 딸, 정현이 1993년 2월 28일에 태어난다. 동서울대학교 전자학과를 졸업했다.</Story>
      <Story>두성과 숙희의 아들, 현우가 1980년 11월 7일에 태어난다.</Story>
      <Story>경량과 매요의 첫째 딸, 은주가 1973년 12월 25일에 태어난다. 은주는 윤창영과 결혼해, 아들 치성을 낳는다.</Story>
      <Story>경량과 매요의 첫째 아들, 재열이 1975년 5월 5일에 태어난다.</Story>
      <Story>경량과 매요의 둘째 아들, 성현이 1977년 5월 28일에 태어난다.</Story>
      <Story>경량과 매요의 셋째 아들, 동채가 1979년 8월 9일에 태어난다.</Story>
    </Box>
    <Box>
      <Story>
      현철과 재화의 첫째 딸, 선형이 2001년 9월 3일에 태어난다.
      </Story>
      <Story>
      현철과 재화의 둘째 딸, 소형이 2003년 10월 24일에 태어난다.
      </Story>
      <Story>
      재헌과 금씨녕의 첫째 아들, 민서가 2016년 4월 16일에 태어난다.
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
