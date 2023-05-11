import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function App() {
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const parentRef = useRef<HTMLUListElement>(null);
  const [properties, setProperties] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (itemsRef.current.length > 0) {
      const width = itemsRef.current[0].getBoundingClientRect().width;
      const offset = 0;
      setProperties([width, offset]);
    }
  }, []);

  const handleRef = (node: HTMLLIElement) => {
    if (itemsRef.current === null) {
      itemsRef.current = [node];
    } else {
      itemsRef.current = [...itemsRef.current, node];
    }
  };
  const listItems = [
    {
      id: 1,
      name: "hello",
    },
    {
      id: 2,
      name: "whatsup",
    },
    {
      id: 3,
      name: "cool",
    },
    {
      id: 4,
      name: "longer sentence",
    },
    {
      id: 5,
      name: "last",
    },
  ];
  const listItemsNodes = listItems.map((item, index) => {
    const handleClick = (event:React.MouseEvent) => {
      const width = event.currentTarget.getBoundingClientRect().width;
      const offset = itemsRef.current[index].getBoundingClientRect().x - parentRef.current!.getBoundingClientRect().x;
      setProperties([width, offset]);
    };
    return (
      <li key={item.id} ref={handleRef}>
        <button  onClick={handleClick} className="w-full px-2">{item.name}</button>
      </li>
    );
  });
  return (
    <div className="flex justify-center">
      <div className="w-fit">
        <ul
          className="flex gap-4"
          ref={parentRef}
        >
          {listItemsNodes}
        </ul>
        <motion.div
          animate={{ x: properties[1], width: properties[0] }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-min h-1 bg-red-500"
        ></motion.div>
      </div>
    </div>
  );
}

export default App;
