// 0-1 背包问题
// 有 n 件物品和一个容量为 w 的背包，第 i 件物品消耗的容量为 weights[i]，价值为 values[i]，求解放入哪些物品可以使得背包中总价值最大。
function knapsack1(weights, values, w){
    let n = weights.length; // 获取物品个数
    let dp = new Array(n).fill(0).map(v => new Array(w + 1).fill(0)); // 定义动态矩阵
    dp[-1] = new Array(w + 1).fill(0); // 处理边界

    for(let i = 0; i < n; i++) {
        for(let j = 0; j <= w; j++) {
            if(j < weights[i]) dp[i][j] = dp[i - 1][j];
            else dp[i][j] = Math.max(dp[i - 1][j], (dp[i - 1][j - weights[i]]) + values[i]);
        }
    }
    return dp[n - 1][w];
}

console.log(knapsack1([2,2,6,5,4],[6,3,5,4,6],10)); // 15

// 完全背包问题
// 有 n 件物品和一个容量为 w 的背包，每种物品都有无限次可用，第 i 件物品消耗的容量为 weights[i]，价值为 values[i]，求解放入哪些物品可以使得背包中总价值最大。
function knapsack2(weights, values, w){
    let n = weights.length; // 获取物品个数
    let dp = new Array(n).fill(0).map(v => new Array(w + 1).fill(0)); // 定义动态矩阵
    dp[-1] = new Array(w + 1).fill(0); // 处理边界

    for(let i = 0; i < n; i++) {
        for(let j = 0; j <= w; j++) {
                let bound = Math.floor(j / weights[i]);
                for(let k = 0; k <= bound; k++) {
                    dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - k * weights[i]] + k * values[i]);
                }
        }
    }
    return dp[n - 1][w];
}

console.log(knapsack2([3,2,2],[5,10,20], 5)); // 40