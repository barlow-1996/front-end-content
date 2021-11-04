function minCoin(amount, coins) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
      for (let j = 0; j < coins.length; j++) {
        if (i >= coins[j]) {
          dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
        } else break;
      }
    }
    return Number.isFinite(dp[amount]) ? dp[amount] : -1;
  }

  // 测试
  // 如果没有任何一种硬币组合能组成总金额，返回 -1
  let value = minCoin(2, [3]);
  console.log(value);