import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  //   background-color: blue;
  //   margin-bottom: 100px;
  height: 50px;
  width: 100%;
  border: 1px solid black;
`;

const Body = styled.div`
  display: flex;
  width: 100%;
`;

const ItemBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  border: 1px solid black;
`;

interface ItemProps {
  generation: number;
  people: string[];
}

const Item = ({ generation, people }: ItemProps) => {
  const [onMouse, setOnMouse] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setOnMouse(true);
  };
  const handleMouseLeave = () => {
    setOnMouse(false);
  };

  return (
    <ItemBox onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {onMouse ? (
        people.map((person, index) => (
          <div key={index}>{onMouse ? `${person}` : `${generation}대`}</div>
        ))
      ) : (
        <div>{generation}대</div>
      )}
    </ItemBox>
  );
};

ReactDOM.render(
  <>
    <Header>
      <div>청주김씨의 일원이신가요?</div>
      <div>[청주김씨]</div>
      <div>전할 이야기가 있나요?</div>
    </Header>
    <Body>
      <Item generation={15} people={["김선형", "강혁준"]} />
      <Item generation={16} people={["김마크"]} />
      <Item generation={17} people={["김또또", "강성민"]} />
      <Item generation={18} people={["송호준", "연식"]} />
      <Item generation={19} people={["김한별", "구경회"]} />
    </Body>
  </>,
  document.getElementById("root")
);
console.log("Hello, world!");
