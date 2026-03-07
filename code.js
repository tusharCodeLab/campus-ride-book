import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";
const git = simpleGit();

// 🔧 YOU DECIDE HOW MANY DATES WILL HAVE COMMITS
const NUMBER_OF_DATES = 40;

// generate random date from last year
const getRandomDateLastYear = () => {
  const start = moment().subtract(1, "year").startOf("year");
  const end = moment().subtract(1, "year").endOf("year");

  const diff = end.diff(start, "days");
  const randomDay = random.int(0, diff);

  return start.clone().add(randomDay, "days");
};

const makeCommits = async () => {
  for (let i = 1; i <= NUMBER_OF_DATES; i++) {

    const date = getRandomDateLastYear();

    // random commits on this date (1–7)
    const commitsToday = random.int(1, 4);

    console.log(`\n📅 Date ${i}: ${date.format("YYYY-MM-DD")} → ${commitsToday} commits`);

    for (let j = 1; j <= commitsToday; j++) {

      const commitDate = date.clone().add(random.int(0, 23), "hours");

      const data = {
        date: commitDate.format()
      };

      await jsonfile.writeFile(FILE_PATH, data);

      await git.add(FILE_PATH);
      await git.commit(commitDate.format(), {
        "--date": commitDate.format()
      });

      console.log(`   commit ${j} at ${commitDate.format()}`);
    }
  }

  console.log("\n🚀 Pushing commits...");
  await git.push();
};

makeCommits();