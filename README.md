# Relay Race

A projector-friendly relay race board for math class. Students line up in teams of 4. A problem goes up, each runner does one step, and the class is timed each round. No scores, just the clock.

## Running a round

1. Press **Start** (or the space bar). The problem appears and the stopwatch starts.
2. The four runner cards stay blank during the race. Students decide what the next step is.
3. Press **Stop** when the class is done. The time is saved in the Round times list; the fastest round gets a star.
4. Press **Show step** to reveal a runner's line of work, then **Name step** to show what that step is called, so the class can say it first. The answer appears after the last step.
5. Press **Next round**.

**Redo round** hides the problem and resets the clock. **Clear** wipes the saved times (use it between class periods).

Keyboard: space = start / stop / next, S = show next step, arrow keys = change round.

## Lessons

| Lesson | File |
| --- | --- |
| Grade 6, 3-5 Evaluate Algebraic Expressions | `lessons/g6-3-5.js` |

To add a lesson, copy a file in `lessons/`, change the content, and add one `<script src="lessons/your-file.js"></script>` line near the bottom of `index.html`. With more than one lesson the site opens on a lesson picker. A link ending in `?lesson=g6-3-5` opens that lesson directly.

## Publishing with GitHub Pages

In the repository on GitHub: Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder `/ (root)` → Save. The site appears at `https://mathtextai-pixel.github.io/Relay-Race/` a minute or two later.
