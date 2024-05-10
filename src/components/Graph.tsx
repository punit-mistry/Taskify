// import React from "react";
// import { AxisOptions, Chart } from "react-charts";

// const Graph = () => {
//   const data = [
//     {
//         label: 'React Charts',
//         data: [
//           {
//             date: new Date(),
//             stars: 23467238,
//           },
//           {
//             date: new Date(),
//             stars: 124,
//           },
//           {
//             date: new Date(),
//             stars: 23423,
//           },
//           {
//             date: new Date(),
//             stars: 234,
//           },
//         ],
//       },
//     {
//         label: 'React Charts',
//         data: [
      
//           {
//             date: new Date(),
//             stars: 124,
//           },
         
//         ],
//       },
//   ];

//   const primaryAxis = React.useMemo(
//     () => ({
//       getValue: (datum) => datum.date,
//     }),
//     []
//   );

//   const secondaryAxes = React.useMemo(
//     () => [
//       {
//         getValue: (datum) => datum.stars,
//         elementType: 'area',
//       },
//     ],
//     []
//   );

//   return (
//     <div className="h-[40vh]">
//       <p>This is Graph</p>
//       <Chart
//         options={{
//           data,
//           primaryAxis,
//           secondaryAxes,
//         }}
//       />
//     </div>
//   );
// };

// export default Graph;
