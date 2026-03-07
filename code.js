import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";
const git = simpleGit();

const makeCommit = async (n) => {

  if (n === 0) {
    console.log("✅ All commits done, pushing...");
    await git.push();
    return;
  }

  // commit range: Feb–Mar 2026
  const start = moment("2026-02-01");
  const end = moment("2026-03-31");

  const diff = end.diff(start, "days");

  // pick random day
  const randomDay = random.int(0, diff);

  const date = start
    .clone()
    .add(randomDay, "days")
    .add(random.int(0, 23), "hours")
    .format();

  const data = { date };

  console.log(`📅 Commit #${n}: ${date}`);

  await jsonfile.writeFile(FILE_PATH, data);
  await git.add(FILE_PATH);
  await git.commit(date, { "--date": date });

  makeCommit(n - 1);//kk
};

makeCommit(100);