// import { useState } from 'react';
// import { motion, useAnimation } from 'framer-motion';

// const LoadingIcon = () => {
//   const controls0 = useAnimation();
//   const controls1 = useAnimation();
//   const controls2 = useAnimation();

//   const initialPositions = [
//     { cx: 34, cy: 44 },
//     { cx: 44, cy: 44 },
//     { cx: 54, cy: 44 },
//   ];

//   const [positions, setPositions] = useState(initialPositions);

//   const animateCircles = async () => {
//     while (true) {
//       // Animate Circle 0 to Circle 2's position
//       await controls0.start({
//         cx: [positions[0].cx, positions[0].cx, positions[2].cx],
//         cy: [positions[0].cy, positions[0].cy - 10, positions[2].cy],
//         transition: { duration: 0.8, ease: "easeInOut" },
//       });

//       // Animate Circle 1 to Circle 0's position
//       await controls1.start({
//         cx: positions[0].cx,
//         cy: positions[0].cy,
//         transition: { duration: 0.8, ease: "linear", delay: 0.2 },
//       });

      
//       await controls2.start({
//         cx: positions[1].cx,
//         cy: positions[1].cy,
//         transition: { duration: 0.8, ease: "linear", delay: 0.2 },
//       });
//       // Update positions for the next iteration
//       // change positions based on current position after each animation on that position
//       setPositions((prevPositions) => {
//         const newPositions = [...prevPositions];
//         // newPositions.unshift(newPositions.pop()!); // Move the last element to the first
//         return newPositions;
//       });
//     }
//   };

//  animateCircles();

//   return (
//     <motion.svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <rect width="88" height="88" rx="10" fill="#FFD13A" />
//       <rect width="48" height="48" transform="translate(20 20)" fill="url(#pattern0_650_16924)" />
//       <motion.circle cx={positions[0].cx} cy={positions[0].cy} r="3" fill="#141414" animate={controls0} />
//       <motion.circle cx={positions[1].cx} cy={positions[1].cy} r="3" fill="#141414" animate={controls1} />
//       <motion.circle cx={positions[2].cx} cy={positions[2].cy} r="3" fill="#141414" animate={controls2} />
//       <defs>
//         <pattern id="pattern0_650_16924" patternContentUnits="objectBoundingBox" width="1" height="1">
//           <use xlinkHref="#image0_650_16924" />
//         </pattern>
//         <image id="image0_650_16924" width="1" height="1" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8AAAAAAAAFAAFkeJU4AAAAAElFTkSuQmCC" />
//       </defs>
//     </motion.svg>
//   );
// };

// export default LoadingIcon;

// import { motion, Variants } from 'framer-motion';

// const LoadingIcon: React.FC = () => {
//   const positions = [
//     { cx: 34, cy: 44 },
//     { cx: 44, cy: 44 },
//     { cx: 54, cy: 44 },
//   ];

//   const circleVariants: Variants = {
//     animate0: {
//       cx: [34, 34, 54],
//       cy: [44, 34, 44],
//       transition: {
//         duration: 1.5,
//         ease: 'easeInOut',
//         repeat: Infinity,
//         repeatType: 'loop',
//       },
//     },
//     animate1: {
//       cx: [44, 34],
//       cy: [44, 34],
//       transition: {
//         duration: 1.5,
//         ease: 'easeInOut',
//         repeat: Infinity,
//         repeatType: 'loop',
//         delay: 0.5,
//       },
//     },
//     animate2: {
//       cx: [54, 44],
//       cy: [44, 44],
//       transition: {
//         duration: 1.5,
//         ease: 'easeInOut',
//         repeat: Infinity,
//         repeatType: 'loop',
//         delay: 1,
//       },
//     },
//   };

//   return (
//     <motion.svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
//       <rect width="88" height="88" rx="10" fill="#FFD13A" />
//       <rect width="48" height="48" transform="translate(20 20)" fill="url(#pattern0_743_54981)" />
//       <motion.circle
//         cx={positions[0].cx}
//         cy={positions[0].cy}
//         r="3"
//         fill="#141414"
//         variants={circleVariants}
//         animate="animate0"
//       />
//       <motion.circle
//         cx={positions[1].cx}
//         cy={positions[1].cy}
//         r="3"
//         fill="#141414"
//         variants={circleVariants}
//         animate="animate1"
//       />
//       <motion.circle
//         cx={positions[2].cx}
//         cy={positions[2].cy}
//         r="3"
//         fill="#141414"
//         variants={circleVariants}
//         animate="animate2"
//       />
//       <defs>
//         <pattern id="pattern0_743_54981" patternContentUnits="objectBoundingBox" width="1" height="1">
//           <use xlinkHref="#image0_743_54981" />
//         </pattern>
//         <image id="image0_743_54981" width="1" height="1" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8AAAAAAAAFAAFkeJU4AAAAAElFTkSuQmCC" />
//       </defs>
//     </motion.svg>
//   );
// };

// export default LoadingIcon;


import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';


const LoadingIcon: React.FC = () => {
  const initialPositions = [
    { cx: 34, cy: 44 },
    { cx: 44, cy: 44 },
    { cx: 54, cy: 44 },
  ];

  const [positions, setPositions] = useState(initialPositions);

  const controls = positions.map(() => useAnimation());

  const animateCircles = async () => {

    await Promise.all(positions.map(async (_, index) => {
      const nextIndex = (index + 1) % positions.length; // Wrap around to the start
      const thirdIndex = (index + 2) % positions.length;
    
      return controls[index].start({
        // cx: positions[nextIndex].cx,
        // cy: positions[nextIndex].cy,
        // new logic for 0 position
        cx: nextIndex === 0 ? [positions[nextIndex].cx, (positions[2].cx + positions[1].cx) / 2, positions[0].cx] : positions[nextIndex].cx,
        cy: nextIndex === 0 ? [positions[nextIndex].cy, positions[2].cy - 20, positions[0].cy] : positions[nextIndex].cy,
        transition: { duration: 1.5, ease: 'easeInOut', staggerChildren: 2 },
      });
    }));

    // Update positions for the next animation cycle
    setPositions(prevPositions => [
      prevPositions[2], 
      prevPositions[0],  
      prevPositions[1],  
    ]);

    // Continue the animation loop
    animateCircles();
  };


    animateCircles();


  return (
    <motion.svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="88" height="88" rx="10" fill="#FFD13A" />
      <rect width="48" height="48" transform="translate(20 20)" fill="url(#pattern0_743_54981)" />



      {positions.map((position, index) => (
        <motion.circle
          key={index}
          cx={position.cx}
          cy={position.cy}
          r="3"
          fill="#141414"
          animate={controls[index]}
          initial={false} 
        />
      ))}
      
      <defs>
        <pattern id="pattern0_743_54981" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_743_54981" />
        </pattern>
        <image id="image0_743_54981" width="1" height="1" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8AAAAAAAAFAAFkeJU4AAAAAElFTkSuQmCC" />
      </defs>
    </motion.svg>
  );
};

export default LoadingIcon;


// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const LoadingIcon: React.FC = () => {
//   const initialPositions = [
//     { cx: 34, cy: 44 },
//     { cx: 44, cy: 44 },
//     { cx: 54, cy: 44 },
//   ];

//   const [positions, setPositions] = useState(initialPositions);


//       setPositions(prevPositions => [
//         prevPositions[2],  // Move last to first
//         prevPositions[0],  // Move first to second
//         prevPositions[1],  // Move second to third
//       ]);


//   const circleVariants = (index: number) => ({
//     animate: {
//       cx: [
//         positions[index].cx,
//         index === 0 ? positions[2].cx : positions[(index + 1) % positions.length].cx
//       ],
//       cy: [
//         positions[index].cy,
//         index === 0 ? positions[2].cy - 10 : positions[(index + 1) % positions.length].cy
//       ],
      
     
//     }
    
//   });

//   return (
//     <motion.svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <rect width="88" height="88" rx="10" fill="#FFD13A" />
//       <rect width="48" height="48" transform="translate(20 20)" fill="url(#pattern0_743_54981)" />

//       {positions.map((position, index) => (
//         <motion.circle
//           key={index}
//           cx={position.cx}
//           cy={position.cy}
//           r="3"
//           fill="#141414"
//           // variants={circleVariants(index)}
//           initial={false}
//           // animate="animate"
//           transition={{
//             duration: 1.5, 
//             ease: 'easeInOut',
//             staggerChildren: 2
//           }}
//         />
//       ))}
      
//       <defs>
//         <pattern id="pattern0_743_54981" patternContentUnits="objectBoundingBox" width="1" height="1">
//           <use xlinkHref="#image0_743_54981" />
//         </pattern>
//         <image id="image0_743_54981" width="1" height="1" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8AAAAAAAAFAAFkeJU4AAAAAElFTkSuQmCC" />
//       </defs>
//     </motion.svg>
//   );
// };

// export default LoadingIcon;