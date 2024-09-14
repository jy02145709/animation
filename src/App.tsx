import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 600px;
  div {
    grid-column: span 1;
  }
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  width: 400px;
  height: 150px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 255, 0.8);
  border-radius: 50%;
  position: absolute;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  margin-top: 600px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const boxVariants = {
  hover: ({
    direction,
  }: {
    direction: "left" | "right" | "top" | "bottom";
  }) => ({
    scale: 1.1 /* 호버 시 스케일 조정 */,
    x: direction === "left" ? -10 : 10,
    y: direction === "top" ? -10 : 10,
    transition: { type: "tween", duration: 0.5 },
  }),
  normal: { scale: 1, x: 0, y: 0 },
};

function App() {
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const [isMoved, setIsMoved] = useState(false);

  return (
    <Wrapper>
      <Grid>
        <Box
          layoutId="1"
          custom={{ direction: "top" }}
          variants={boxVariants}
          whileHover="hover"
          animate="normal"
          onClick={() => setSelectedId("1")}
        />
        <Box
          layoutId="2"
          custom={{ direction: "top" }}
          variants={boxVariants}
          whileHover="hover"
          animate="normal"
          onClick={() => setSelectedId("2")}
        >
          {!isMoved && (
            <Circle
              layoutId="circle"
              transition={{ type: "tween", duration: 0.5 }}
            />
          )}
        </Box>
        <Box
          layoutId="3"
          custom={{ direction: "bottom" }}
          variants={boxVariants}
          whileHover="hover"
          animate="normal"
          onClick={() => setSelectedId("3")}
        >
          {isMoved && (
            <Circle
              layoutId="circle"
              transition={{ type: "tween", duration: 0.5 }}
            />
          )}
        </Box>
        <Box
          layoutId="4"
          custom={{ direction: "bottom" }}
          variants={boxVariants}
          whileHover="hover"
          animate="normal"
          onClick={() => setSelectedId("4")}
        />
      </Grid>

      <AnimatePresence>
        {selectedId && (
          <Overlay
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedId(null)}
          >
            <Box layoutId={selectedId} style={{ width: 400, height: 200 }} />
          </Overlay>
        )}
      </AnimatePresence>

      <Button onClick={() => setIsMoved((prev) => !prev)}>Switch</Button>
    </Wrapper>
  );
}

export default App;
