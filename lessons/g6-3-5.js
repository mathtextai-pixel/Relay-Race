/*
  Relay Race lesson file.

  Math shorthand used in "expression", "values" and "work":
    ^2        exponent            x^2
    {3/4}     stacked fraction    1{3/4} is the mixed number one and three fourths
    letters   shown in italics as variables
  Type the real symbols for times and divide:  ×  ÷  −

  Every round needs exactly 4 steps, one per runner.

  "examples" are optional. They come before Round 1, show the problem right
  away, and are not timed.
*/
window.RELAY_LESSONS = window.RELAY_LESSONS || [];
window.RELAY_LESSONS.push({
  id: "g6-3-5",
  grade: 6,
  lesson: "3-5",
  title: "Evaluate Algebraic Expressions",
  examples: [
    {
      expression: "3x + y^2 − 5",
      values: ["x = 4", "y = 6"],
      steps: [
        { job: "Substitute", work: "3(4) + 6^2 − 5" },
        { job: "Exponent", work: "3(4) + 36 − 5" },
        { job: "Multiply", work: "12 + 36 − 5" },
        { job: "Add and subtract", work: "43" }
      ],
      answer: "43"
    },
    {
      expression: "r^2 − 10s ÷ 5",
      values: ["r = 9", "s = 4"],
      steps: [
        { job: "Substitute", work: "9^2 − 10(4) ÷ 5" },
        { job: "Exponent", work: "81 − 10(4) ÷ 5" },
        { job: "Multiply and divide", work: "81 − 8" },
        { job: "Subtract", work: "73" }
      ],
      answer: "73"
    }
  ],
  rounds: [
    {
      level: "Whole numbers",
      expression: "4n + m^2 − 6",
      values: ["n = 3", "m = 5"],
      steps: [
        { job: "Substitute", work: "4(3) + 5^2 − 6" },
        { job: "Exponent", work: "4(3) + 25 − 6" },
        { job: "Multiply", work: "12 + 25 − 6" },
        { job: "Add and subtract", work: "31" }
      ],
      answer: "31"
    },
    {
      level: "Whole numbers",
      expression: "t^2 − 12w ÷ 3",
      values: ["t = 8", "w = 2"],
      steps: [
        { job: "Substitute", work: "8^2 − 12(2) ÷ 3" },
        { job: "Exponent", work: "64 − 12(2) ÷ 3" },
        { job: "Multiply and divide", work: "64 − 8" },
        { job: "Subtract", work: "56" }
      ],
      answer: "56"
    },
    {
      level: "Whole numbers",
      expression: "5a + 2b ÷ c + d^2",
      values: ["a = 4", "b = 9", "c = 3", "d = 2"],
      steps: [
        { job: "Substitute", work: "5(4) + 2(9) ÷ 3 + 2^2" },
        { job: "Exponent", work: "5(4) + 2(9) ÷ 3 + 4" },
        { job: "Multiply and divide", work: "20 + 6 + 4" },
        { job: "Add", work: "30" }
      ],
      answer: "30"
    },
    {
      level: "Whole numbers",
      expression: "(x + y)^2 ÷ 4",
      values: ["x = 7", "y = 5"],
      steps: [
        { job: "Substitute", work: "(7 + 5)^2 ÷ 4" },
        { job: "Parentheses", work: "12^2 ÷ 4" },
        { job: "Exponent", work: "144 ÷ 4" },
        { job: "Divide", work: "36" }
      ],
      answer: "36"
    },
    {
      level: "Decimals",
      expression: "2.5 + 6k ÷ 4",
      values: ["k = 3"],
      steps: [
        { job: "Substitute", work: "2.5 + 6(3) ÷ 4" },
        { job: "Multiply", work: "2.5 + 18 ÷ 4" },
        { job: "Divide", work: "2.5 + 4.5" },
        { job: "Add", work: "7" }
      ],
      answer: "7"
    },
    {
      level: "Decimals",
      expression: "x^2 + 3x",
      values: ["x = 1.5"],
      steps: [
        { job: "Substitute", work: "1.5^2 + 3(1.5)" },
        { job: "Exponent", work: "2.25 + 3(1.5)" },
        { job: "Multiply", work: "2.25 + 4.5" },
        { job: "Add", work: "6.75" }
      ],
      answer: "6.75"
    },
    {
      level: "Decimals",
      expression: "2(p + 1.5) − q",
      values: ["p = 4.5", "q = 3.2"],
      steps: [
        { job: "Substitute", work: "2(4.5 + 1.5) − 3.2" },
        { job: "Parentheses", work: "2(6) − 3.2" },
        { job: "Multiply", work: "12 − 3.2" },
        { job: "Subtract", work: "8.8" }
      ],
      answer: "8.8"
    },
    {
      level: "Decimals",
      story: "A skate park charges $6 to get in plus $1.50 for each hour. Mia stays for h hours and uses a $2 coupon.",
      expression: "6 + 1.5h − 2",
      values: ["h = 3"],
      steps: [
        { job: "Substitute", work: "6 + 1.5(3) − 2" },
        { job: "Multiply", work: "6 + 4.5 − 2" },
        { job: "Add", work: "10.5 − 2" },
        { job: "Subtract", work: "8.5" }
      ],
      answer: "$8.50"
    },
    {
      level: "Fractions",
      expression: "6m ÷ 3 + {3/4}",
      values: ["m = {1/2}"],
      steps: [
        { job: "Substitute", work: "6({1/2}) ÷ 3 + {3/4}" },
        { job: "Multiply", work: "3 ÷ 3 + {3/4}" },
        { job: "Divide", work: "1 + {3/4}" },
        { job: "Add", work: "1{3/4}" }
      ],
      answer: "1{3/4}"
    },
    {
      level: "Fractions",
      expression: "s^2 + 2s",
      values: ["s = {1/2}"],
      steps: [
        { job: "Substitute", work: "({1/2})^2 + 2({1/2})" },
        { job: "Exponent", work: "{1/4} + 2({1/2})" },
        { job: "Multiply", work: "{1/4} + 1" },
        { job: "Add", work: "1{1/4}" }
      ],
      answer: "1{1/4}"
    },
    {
      level: "Fractions",
      expression: "8 − g ÷ {1/2}",
      values: ["g = {3/4}"],
      steps: [
        { job: "Substitute", work: "8 − {3/4} ÷ {1/2}" },
        { job: "Rewrite as multiplication", work: "8 − {3/4} × 2" },
        { job: "Multiply", work: "8 − 1{1/2}" },
        { job: "Subtract", work: "6{1/2}" }
      ],
      answer: "6{1/2}"
    },
    {
      level: "Challenge",
      expression: "a^2 ÷ 4 + 2.5b",
      values: ["a = 6", "b = 3"],
      steps: [
        { job: "Substitute", work: "6^2 ÷ 4 + 2.5(3)" },
        { job: "Exponent", work: "36 ÷ 4 + 2.5(3)" },
        { job: "Divide and multiply", work: "9 + 7.5" },
        { job: "Add", work: "16.5" }
      ],
      answer: "16.5"
    }
  ]
});
