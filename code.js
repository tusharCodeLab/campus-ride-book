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

  // commit range
  const start = moment("2025-11-01");
  const end = moment("2026-02-28");

  // total days between
  const diff = end.diff(start, "days");

  // random day
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

  await git.commit(date, {
    "--date": date
  });

  makeCommit(n - 1);
};

makeCommit(100);