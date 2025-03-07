# Framer Motion

- https://motion.dev/docs/react-quick-start
- https://velog.io/@keumky1/Framer-Motion-입문하기
- https://nykim.work/114
- https://examples.motion.dev/react

## 설치

```bash
npm install framer-motion
```

## 실습

- /src/pages/Framer.jsx

```jsx
import { motion } from "framer-motion";
const Framer = () => {
  return (
    <div>
      <h1>Framer Motion</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5 }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "darkblue",
          color: "white",
          borderRadius: 10,
        }}
      >
        애니메이션용 DIV
      </motion.div>
    </div>
  );
};
export default Framer;
```

- 나타내기

```jsx
import { motion } from "framer-motion";
import { useState } from "react";
const Framer = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <h1>Framer Motion</h1>
      <button onClick={() => setVisible(!visible)}>실행</button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "darkblue",
          color: "white",
          borderRadius: 10,
        }}
      >
        애니메이션용 DIV
      </motion.div>
    </div>
  );
};
export default Framer;
```

- 움직이기

```jsx
import { motion } from "framer-motion";
import { useState } from "react";
const Framer = () => {
  const [visible, setVisible] = useState(false);
  const [move, setMove] = useState(false);
  return (
    <div>
      <h1>Framer Motion</h1>
      <button onClick={() => setMove(!move)}>실행</button>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: move ? 200 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "darkblue",
          color: "white",
          borderRadius: 10,
        }}
      >
        애니메이션용 DIV
      </motion.div>
    </div>
  );
};
export default Framer;
```

- 회전시키기

```jsx
import { motion } from "framer-motion";
import { useState } from "react";
const Framer = () => {
  const [visible, setVisible] = useState(false);
  const [move, setMove] = useState(false);
  const [rot, setRot] = useState(false);

  return (
    <div>
      <h1>Framer Motion</h1>
      <button onClick={() => setRot(!rot)}>실행</button>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: rot ? 360 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "darkblue",
          color: "white",
          borderRadius: 10,
        }}
      >
        애니메이션용 DIV
      </motion.div>
    </div>
  );
};
export default Framer;
```

- 드래그

```jsx
import { motion } from "framer-motion";
import { useState } from "react";
const Framer = () => {
  const [visible, setVisible] = useState(false);
  const [move, setMove] = useState(false);
  const [rot, setRot] = useState(false);

  return (
    <div>
      <h1>Framer Motion</h1>
      <button onClick={() => setRot(!rot)}>실행</button>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: rot ? 360 : 0 }}
        transition={{ duration: 0.5 }}
        drag
        dragConstraints={{ left: 0, right: 500, top: -100, bottom: 500 }}
        style={{
          width: 200,
          height: 200,
          backgroundColor: "darkblue",
          color: "white",
          borderRadius: 10,
        }}
      >
        애니메이션용 DIV
      </motion.div>
    </div>
  );
};
export default Framer;
```
