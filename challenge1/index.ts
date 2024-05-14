/**
 
    **Description:** 
    You are given a set of points on a 2D plane. Each point is represented as a pair of integers (x, y). The cost of connecting two points (x1, y1) and (x2, y2) is defined as the Manhattan distance between them: |x1 - x2| + |y1 - y2|.

    Your task is to find the minimum cost to connect all points with each other, such that every point is connected to at least one other point. You can assume that there are no duplicate points.

    **Input:** A list of points represented as pairs of integers [(x1, y1), (x2, y2), ..., (xn, yn)].

    **Output:** Return the minimum cost to connect all the points.

    **Constraints:**

        - 1 <= points.length <= 1000
        - 10^6 <= xi, yi <= 10^6
        - All pairs (xi, yi) are distinct.

    Input: = [(0,0), (2,2), (3,10), (5,2), (7,0)]

    Output: 20
    Explanation:

    Here's one possible way to connect the points with the minimum cost:

    1. Connect (0,0) and (2,2) with a cost of 4 (|0-2| + |0-2|).
    2. Connect (2,2) and (5,2) with a cost of 3 (|2-5| + |2-2|).
    3. Connect (5,2) and (7,0) with a cost of 4 (|5-7| + |2-0|).
    4. Connect (2,2) and (3,10) with a cost of 9 (|2-3| + |2-10|).

    The total cost is 4 + 3 + 4 + 9 = 20.

    Note that there may be other ways to connect the points with the same minimum cost.
 * 
 */

const solve = (arr: number[][]) => {
  let sum = 0;
  let current = arr[0];
  let minSumIndex = 0,
    minSum = Number.MAX_SAFE_INTEGER;
  const arr2 = arr.slice(0);
  let j = 0;

  while (arr2.length > 0) {
    if (j === arr2.length - 1) {
      arr2.splice(j, 1);
      sum += minSum;
      j = 0;
    } else {
      const [p1, p2] = current;
      const [f1, f2] = arr2[j];
      const diff = Math.abs(p1 - f1) + Math.abs(p2 - f2);

      if (diff < minSum && diff > 0) {
        minSum = diff;
        minSumIndex = j;
      }

      j++;
    }
  }

  return sum;
};

console.log(
  solve([
    [0, 0],
    [2, 2],
    [3, 10],
    [5, 2],
    [7, 0],
  ])
);
