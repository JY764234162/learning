function montyHallSimulation(times = 100000) {
  let switchWins = 0;
  let stayWins = 0;

  for (let i = 0; i < times; i++) {
    // 创建三个箱子：1表示有物品，0表示空
    const boxes = [1, 0, 0];

    // 随机打乱箱子顺序
    for (let j = boxes.length - 1; j > 0; j--) {
      const randomIndex = Math.floor(Math.random() * (j + 1));
      [boxes[j], boxes[randomIndex]] = [boxes[randomIndex], boxes[j]];
    }

    // 玩家第一次随机选择
    const firstChoice = Math.floor(Math.random() * 3);

    // 找出主持人可以打开的空箱子（不是玩家选择的，且必须是空箱子）
    const remainingBoxes = [0, 1, 2].filter((index) => index !== firstChoice);
    const hostOpens = remainingBoxes.find((index) => boxes[index] === 0);

    // 找出最后一个未打开的箱子
    const finalBox = remainingBoxes.find((index) => index !== hostOpens);

    // 统计不换和换的获胜情况
    if (boxes[firstChoice] === 1) {
      stayWins++;
    }
    if (boxes[finalBox] === 1) {
      switchWins++;
    }
  }

  // 计算概率
  const stayProbability = ((stayWins / times) * 100).toFixed(2);
  const switchProbability = ((switchWins / times) * 100).toFixed(2);

  return {
    stay: stayProbability + "%",
    switch: switchProbability + "%",
    stayCount: stayWins,
    switchCount: switchWins,
    totalGames: times,
  };
}

// 添加可视化结果的函数
function visualizeResults(result) {
  const barLength = 50; // 图表长度
  const stayBar = "█".repeat(
    Math.floor((parseFloat(result.stay) * barLength) / 100)
  );
  const switchBar = "█".repeat(
    Math.floor((parseFloat(result.switch) * barLength) / 100)
  );

  console.log("\n可视化结果：");
  console.log(`不换: ${stayBar} ${result.stay}`);
  console.log(`换  : ${switchBar} ${result.switch}`);
}

// 执行模拟并显示可视化结果
const result = montyHallSimulation();
console.log("模拟结果：");
console.log(`总游戏次数: ${result.totalGames}`);
console.log(`不换的获胜次数: ${result.stayCount}`);
console.log(`换的获胜次数: ${result.switchCount}`);
console.log(`不换的获胜概率: ${result.stay}`);
console.log(`换的获胜概率: ${result.switch}`);
visualizeResults(result);
